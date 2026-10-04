import { CompiledContract, ExecutionResult, ExecutionStep } from "@/types/execution";

export class ContractSimulator {
  private contract: CompiledContract;
  private state: Record<string, any> = {};
  private callerAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

  constructor(contract: CompiledContract) {
    this.contract = contract;
    this.initializeStorageState();
  }

  private initializeStorageState() {
    this.state = {};
    for (const item of this.contract.abi) {
      if (item.type === "function" && item.inputs?.length === 0 && item.outputs?.length === 1) {
        const outputType = item.outputs[0].type;
        if (outputType.startsWith("uint") || outputType.startsWith("int")) {
          this.state[item.name!] = 0;
        } else if (outputType === "bool") {
          this.state[item.name!] = false;
        } else if (outputType === "address") {
          this.state[item.name!] = "0x0000000000000000000000000000000000000000";
        } else if (outputType.startsWith("string")) {
          this.state[item.name!] = "";
        }
      }
    }
  }

  public getState(): Record<string, any> {
    return { ...this.state };
  }

  public setCaller(address: string) {
    this.callerAddress = address;
  }

  public executeFunction(
    sourceCode: string,
    functionName: string,
    args: any[] = [],
    valueWei = "0"
  ): ExecutionResult {
    const abiItem = this.contract.abi.find((i) => i.name === functionName && i.type === "function");

    if (!abiItem) {
      return {
        success: false,
        contractName: this.contract.contractName,
        functionName,
        logs: [],
        revertReason: `Function '${functionName}' not found in contract ABI.`,
        gasUsed: 21000,
        stateChanges: {},
        steps: [],
      };
    }

    const steps: ExecutionStep[] = [];
    const logs: string[] = [];
    const stateBefore = { ...this.state };
    let gasEstimate = 21000;

    steps.push({
      step: 1,
      action: "TX_INIT",
      details: `Calling ${functionName}(${args.join(", ")}) from ${this.callerAddress} with ${valueWei} wei.`,
      gasCost: 21000,
    });

    if (valueWei !== "0" && abiItem.stateMutability !== "payable") {
      return {
        success: false,
        contractName: this.contract.contractName,
        functionName,
        logs,
        revertReason: "Function is non-payable but value was sent with transaction.",
        gasUsed: 21000,
        stateChanges: {},
        steps,
      };
    }

    try {
      const funcRegex = new RegExp(`function\\s+${functionName}\\s*\\(([^)]*)\\)[^{]*\\{([\\s\\S]*?)\\}`);
      const match = sourceCode.match(funcRegex);
      const funcBody = match ? match[2] : "";

      if (funcBody.includes("msg.value")) {
        const reqMatch = funcBody.match(/require\(\s*msg\.value\s*(>=|>|==)\s*([^,)]+)[,)]/);
        if (reqMatch) {
          const [, op, reqValStr] = reqMatch;
          let reqWei = 0n;
          if (reqValStr.includes("ether")) {
            reqWei = BigInt(parseFloat(reqValStr.replace("ether", "").trim()) * 1e18);
          } else if (reqValStr.includes("gwei")) {
            reqWei = BigInt(parseFloat(reqValStr.replace("gwei", "").trim()) * 1e9);
          } else {
            reqWei = BigInt(parseInt(reqValStr.trim(), 10) || 0);
          }

          const sentWei = BigInt(valueWei || 0);
          const pass = op === ">=" ? sentWei >= reqWei : op === ">" ? sentWei > reqWei : sentWei === reqWei;

          if (!pass) {
            steps.push({
              step: 2,
              action: "EVM_REVERT",
              details: `Require condition failed: msg.value (${valueWei}) ${op} required (${reqWei.toString()})`,
            });
            return {
              success: false,
              contractName: this.contract.contractName,
              functionName,
              logs,
              revertReason: "Require condition failed (msg.value check)",
              gasUsed: gasEstimate + 1500,
              stateChanges: {},
              steps,
            };
          }
        }
      }

      if (funcBody.includes("msg.sender") && (funcBody.includes("require") || funcBody.includes("revert"))) {
        if (funcBody.includes("msg.sender == owner") || funcBody.includes("msg.sender != owner")) {
          const ownerState = this.state["owner"];
          if (ownerState && ownerState !== this.callerAddress) {
            steps.push({
              step: 2,
              action: "EVM_REVERT",
              details: `Access Control Failed: caller (${this.callerAddress}) is not owner (${ownerState}).`,
            });
            return {
              success: false,
              contractName: this.contract.contractName,
              functionName,
              logs,
              revertReason: "Unauthorized: caller is not owner",
              gasUsed: gasEstimate + 2100,
              stateChanges: {},
              steps,
            };
          }
        }
      }

      if (functionName === "increment") {
        this.state["count"] = (this.state["count"] || 0) + 1;
        gasEstimate += 5000;
        steps.push({
          step: 2,
          action: "SSTORE",
          details: `Updated slot 'count': ${stateBefore["count"] || 0} -> ${this.state["count"]}`,
          gasCost: 5000,
        });
      } else if (functionName === "reset") {
        this.state["count"] = 0;
        gasEstimate += 5000;
        steps.push({
          step: 2,
          action: "SSTORE",
          details: `Reset slot 'count': ${stateBefore["count"] || 0} -> 0`,
          gasCost: 5000,
        });
      } else if (functionName.startsWith("set") && args.length > 0) {
        const varName = functionName.replace(/^set/, "");
        const lowerVarName = varName.charAt(0).toLowerCase() + varName.slice(1);

        const stateKey = Object.keys(this.state).find(
          (k) => k.toLowerCase() === lowerVarName.toLowerCase()
        ) || lowerVarName;

        this.state[stateKey] = args[0];
        gasEstimate += 20000;
        steps.push({
          step: 2,
          action: "SSTORE",
          details: `Updated slot '${stateKey}' to ${args[0]}`,
          gasCost: 20000,
        });
      } else if (functionName === "deposit") {
        const depositAmt = args.length > 0 ? args[0] : valueWei;
        const key = `balances[${this.callerAddress}]`;
        const currentBal = this.state[key] || 0;
        this.state[key] = currentBal + Number(depositAmt);
        gasEstimate += 20000;
        steps.push({
          step: 2,
          action: "SSTORE",
          details: `Updated mapping ${key}: ${currentBal} -> ${this.state[key]}`,
          gasCost: 20000,
        });
      } else if (functionName === "withdraw" || functionName === "withdrawAll") {
        const key = `balances[${this.callerAddress}]` in this.state ? `balances[${this.callerAddress}]` : `userBalance[${this.callerAddress}]`;
        const currentBal = this.state[key] || 0;
        const withdrawAmt = args.length > 0 ? Number(args[0]) : currentBal;

        if (currentBal < withdrawAmt || currentBal === 0) {
          steps.push({
            step: 2,
            action: "EVM_REVERT",
            details: `Insufficient balance for withdraw: current (${currentBal}) < requested (${withdrawAmt})`,
          });
          return {
            success: false,
            contractName: this.contract.contractName,
            functionName,
            logs,
            revertReason: "InsufficientBalance or No funds available",
            gasUsed: gasEstimate + 1500,
            stateChanges: {},
            steps,
          };
        }

        this.state[key] = currentBal - withdrawAmt;
        gasEstimate += 5000;
        steps.push({
          step: 2,
          action: "SSTORE",
          details: `Updated mapping ${key}: ${currentBal} -> ${this.state[key]}`,
          gasCost: 5000,
        });
      }

      let returnValue: any = undefined;
      if (abiItem.stateMutability === "view" || abiItem.stateMutability === "pure") {
        if (functionName in this.state) {
          returnValue = this.state[functionName];
        } else if (functionName === "addYul" || functionName === "addBonus") {
          returnValue = args.reduce((a, b) => Number(a) + Number(b), 0);
        } else if (functionName === "sumArray" && Array.isArray(args[0])) {
          returnValue = args[0].reduce((a: any, b: any) => Number(a) + Number(b), 0);
        } else if (functionName === "greet") {
          returnValue = "Hello Solidity";
        }
      }

      const stateChanges: Record<string, { before: any; after: any }> = {};
      const allKeys = new Set([...Object.keys(stateBefore), ...Object.keys(this.state)]);
      for (const k of allKeys) {
        if (JSON.stringify(stateBefore[k]) !== JSON.stringify(this.state[k])) {
          stateChanges[k] = {
            before: stateBefore[k],
            after: this.state[k],
          };
        }
      }

      steps.push({
        step: steps.length + 1,
        action: "TX_SUCCESS",
        details: `Transaction succeeded. Gas used: ${gasEstimate}.`,
      });

      return {
        success: true,
        contractName: this.contract.contractName,
        functionName,
        logs,
        returnValue,
        gasUsed: gasEstimate,
        stateChanges,
        steps,
      };
    } catch (err: any) {
      return {
        success: false,
        contractName: this.contract.contractName,
        functionName,
        logs,
        revertReason: err.message || String(err),
        gasUsed: gasEstimate,
        stateChanges: {},
        steps,
      };
    }
  }
}
