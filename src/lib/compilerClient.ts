import { CompilationResult } from "@/types/execution";

export async function compileSolidityClient(
  sourceCode: string,
  filename = "Contract.sol"
): Promise<CompilationResult> {
  try {
    const res = await fetch("/api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sourceCode, filename }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    return {
      success: false,
      errors: [
        {
          severity: "error",
          formattedMessage: `Compilation API failed: ${err.message || String(err)}`,
        },
      ],
      contracts: {},
    };
  }
}
