import { describe, it, expect } from "vitest";
import { compileSolidity } from "@/lib/compiler";
import { ContractSimulator } from "@/lib/simulator";

describe("Solidity Compiler & EVM Simulator Engine", () => {
  it("compiles valid Solidity contract successfully", () => {
    const source = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;

    function increment() public {
        count += 1;
    }
}`;

    const result = compileSolidity(source);
    expect(result.success).toBe(true);
    expect(result.contracts["Counter"]).toBeDefined();
    expect(result.contracts["Counter"].abi.length).toBeGreaterThan(0);
  });

  it("catches syntax errors during compilation", () => {
    const invalidSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Broken {
    uint256 public count
}`;

    const result = compileSolidity(invalidSource);
    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0].severity).toBe("error");
  });

  it("simulates contract state changes and gas tracking correctly", () => {
    const source = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;

    function increment() public {
        count += 1;
    }
}`;

    const compilation = compileSolidity(source);
    expect(compilation.success).toBe(true);

    const simulator = new ContractSimulator(compilation.contracts["Counter"]);
    const execResult = simulator.executeFunction(source, "increment");

    expect(execResult.success).toBe(true);
    expect(execResult.gasUsed).toBeGreaterThan(20000);
    expect(execResult.stateChanges["count"]).toEqual({ before: 0, after: 1 });
  });

  it("handles reverts and invalid calls cleanly", () => {
    const source = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Vault {
    function withdraw(uint256 amount) public {}
}`;

    const compilation = compileSolidity(source);
    const simulator = new ContractSimulator(compilation.contracts["Vault"]);

    const execResult = simulator.executeFunction(source, "withdraw", [100]);
    expect(execResult.success).toBe(false);
    expect(execResult.revertReason).toBeDefined();
  });
});
