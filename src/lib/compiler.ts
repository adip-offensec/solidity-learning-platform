import solc from "solc";
import { CompilationResult, CompilationError, CompiledContract } from "@/types/execution";

export function compileSolidity(sourceCode: string, filename = "Contract.sol"): CompilationResult {
  const input = {
    language: "Solidity",
    sources: {
      [filename]: {
        content: sourceCode,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode", "evm.methodIdentifiers"],
        },
      },
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  };

  try {
    const rawOutput = solc.compile(JSON.stringify(input));
    const output = JSON.parse(rawOutput);

    const errors: CompilationError[] = [];
    if (output.errors) {
      for (const err of output.errors) {
        errors.push({
          severity: err.severity === "error" ? "error" : "warning",
          formattedMessage: err.formattedMessage || err.message,
          sourceLocation: err.sourceLocation
            ? {
                file: err.sourceLocation.file,
                start: err.sourceLocation.start,
                end: err.sourceLocation.end,
              }
            : undefined,
        });
      }
    }

    const hasErrors = errors.some((e) => e.severity === "error");
    if (hasErrors) {
      return {
        success: false,
        errors,
        contracts: {},
      };
    }

    const contracts: Record<string, CompiledContract> = {};
    if (output.contracts && output.contracts[filename]) {
      const fileContracts = output.contracts[filename];
      for (const contractName of Object.keys(fileContracts)) {
        const item = fileContracts[contractName];
        contracts[contractName] = {
          contractName,
          abi: item.abi,
          bytecode: item.evm?.bytecode?.object || "",
          functionSelectors: item.evm?.methodIdentifiers || {},
        };
      }
    }

    return {
      success: true,
      errors,
      contracts,
    };
  } catch (err: any) {
    return {
      success: false,
      errors: [
        {
          severity: "error",
          formattedMessage: `Solidity Compilation Exception: ${err.message || String(err)}`,
        },
      ],
      contracts: {},
    };
  }
}
