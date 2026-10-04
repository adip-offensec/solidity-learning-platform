import { NextRequest, NextResponse } from "next/server";
import solc from "solc";

export async function POST(req: NextRequest) {
  try {
    const { sourceCode, filename = "Contract.sol" } = await req.json();

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

    const rawOutput = solc.compile(JSON.stringify(input));
    const output = JSON.parse(rawOutput);

    const errors = [];
    if (output.errors) {
      for (const err of output.errors) {
        errors.push({
          severity: err.severity === "error" ? "error" : "warning",
          formattedMessage: err.formattedMessage || err.message,
        });
      }
    }

    const hasErrors = errors.some((e) => e.severity === "error");
    if (hasErrors) {
      return NextResponse.json({
        success: false,
        errors,
        contracts: {},
      });
    }

    const contracts: Record<string, any> = {};
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

    return NextResponse.json({
      success: true,
      errors,
      contracts,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      errors: [
        {
          severity: "error",
          formattedMessage: `Compilation error: ${err.message || String(err)}`,
        },
      ],
      contracts: {},
    });
  }
}
