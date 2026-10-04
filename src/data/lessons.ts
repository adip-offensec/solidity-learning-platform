import { DocCoverageItem, Lesson } from "@/types/learning";

export const DOC_COVERAGE_MAP: DocCoverageItem[] = [
  {
    section: "Introduction to Smart Contracts & EVM Basics",
    officialDocUrl: "https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html",
    coveredInLessonId: "level-0-blockchain-evm",
    keyConcepts: ["Blockchain", "Accounts", "Transactions", "EVM", "Gas", "Storage/Memory/Stack overview"],
    hasExercise: true,
    hasSecurityLab: false,
  },
  {
    section: "Solidity by Example",
    officialDocUrl: "https://docs.soliditylang.org/en/latest/solidity-by-example.html",
    coveredInLessonId: "level-1-solidity-fundamentals",
    keyConcepts: ["Contract structure", "State variables", "Pragma", "Functions", "Getters"],
    hasExercise: true,
    hasSecurityLab: false,
  },
  {
    section: "Types - Value Types & Reference Types",
    officialDocUrl: "https://docs.soliditylang.org/en/latest/types.html",
    coveredInLessonId: "level-2-data-types-operators",
    keyConcepts: ["Integers", "Booleans", "Addresses", "Bytes", "Arrays", "Structs", "Enums", "Mappings"],
    hasExercise: true,
    hasSecurityLab: true,
  },
  {
    section: "Units and Globally Available Variables",
    officialDocUrl: "https://docs.soliditylang.org/en/latest/units-and-global-variables.html",
    coveredInLessonId: "level-2-globals-and-units",
    keyConcepts: ["ether/gwei/wei", "seconds/minutes/hours/days", "msg.sender", "msg.value", "block.timestamp", "tx.origin"],
    hasExercise: true,
    hasSecurityLab: true,
  },
  {
    section: "Expressions and Control Structures",
    officialDocUrl: "https://docs.soliditylang.org/en/latest/control-structures.html",
    coveredInLessonId: "level-2-control-structures-errors",
    keyConcepts: ["if/else", "for/while loops", "require/revert/assert", "Custom errors", "Try/Catch"],
    hasExercise: true,
    hasSecurityLab: true,
  },
  {
    section: "Contracts - Functions & Modifiers",
    officialDocUrl: "https://docs.soliditylang.org/en/latest/contracts.html#functions",
    coveredInLessonId: "level-3-functions-modifiers",
    keyConcepts: ["Visibility (public, private, internal, external)", "State mutability (pure, view, payable)", "Modifiers", "Events"],
    hasExercise: true,
    hasSecurityLab: true,
  },
  {
    section: "Contracts - Inheritance & Interfaces",
    officialDocUrl: "https://docs.soliditylang.org/en/latest/contracts.html#inheritance",
    coveredInLessonId: "level-3-inheritance-interfaces",
    keyConcepts: ["Single/Multiple Inheritance", "virtual/override", "Abstract Contracts", "Interfaces", "Libraries", "using for"],
    hasExercise: true,
    hasSecurityLab: true,
  },
  {
    section: "Data Locations & EVM Storage Layout",
    officialDocUrl: "https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html",
    coveredInLessonId: "level-4-data-locations-evm",
    keyConcepts: ["Storage slots (32 bytes)", "Packing", "Memory lifecycle", "Calldata efficiency", "Free memory pointer"],
    hasExercise: true,
    hasSecurityLab: true,
  },
  {
    section: "Contract Interaction & Ether Transfer",
    officialDocUrl: "https://docs.soliditylang.org/en/latest/contracts.html#sending-and-receiving-ether",
    coveredInLessonId: "level-5-ether-and-calls",
    keyConcepts: ["receive()", "fallback()", "transfer", "send", "call", "delegatecall", "staticcall", "Reentrancy"],
    hasExercise: true,
    hasSecurityLab: true,
  },
  {
    section: "Inline Assembly & Yul",
    officialDocUrl: "https://docs.soliditylang.org/en/latest/assembly.html",
    coveredInLessonId: "level-6-yul-assembly",
    keyConcepts: ["Inline assembly", "Yul syntax", "sstore/sload", "mstore/mload", "extcodesize", "bitwise ops"],
    hasExercise: true,
    hasSecurityLab: true,
  },
  {
    section: "Security & Smart Contract Auditing Practices",
    officialDocUrl: "https://docs.soliditylang.org/en/latest/security-considerations.html",
    coveredInLessonId: "sec-reentrancy-audit",
    keyConcepts: ["Checks-Effects-Interactions", "ReentrancyGuard", "tx.origin phish", "Storage Collision in Proxies"],
    hasExercise: true,
    hasSecurityLab: true,
  },
];

export const ALL_LESSONS: Lesson[] = [
  // -------------------------------------------------------------
  // LEVEL 0: PREREQUISITES
  // -------------------------------------------------------------
  {
    id: "level-0-blockchain-evm",
    title: "Level 0: Blockchain, Ethereum & EVM Essentials",
    level: "Level 0",
    levelNumber: 0,
    category: "Prerequisites",
    summary: "Understand how the Ethereum Virtual Machine (EVM) processes transactions, modifies state, and calculates gas before writing line 1 of Solidity.",
    docRef: {
      title: "Solidity Docs: Introduction to Smart Contracts",
      url: "https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html",
      section: "Overview of EVM and Transactions",
    },
    prerequisites: [],
    beginnerExplanation: "Imagine Ethereum as a single global computer that everyone in the world shares. When you write code on this global computer, it runs in a sandboxed execution engine called the EVM (Ethereum Virtual Machine).\n\nUnlike normal software running on your phone or laptop, code on Ethereum is:\n1. Immutable: Once deployed, the code cannot be altered.\n2. Deterministic: Given the exact same inputs and state, every node in the world arrives at the identical output.\n3. Paid per operation: Every instruction (adding numbers, saving data) costs fuel called Gas.",
    developerExplanation: "The EVM is a 256-bit stack-based virtual machine. It maintains a state DB of Accounts.\nThere are two account types:\n- Externally Owned Accounts (EOAs): Controlled by private key pairs (no code attached).\n- Contract Accounts: Controlled by compiled EVM bytecode.\n\nTransactions originate from EOAs. When an EOA sends a transaction to a Contract Account, the EVM executes the bytecode sequentially, updating memory, stack, and permanent storage.",
    evmExplanation: "At the bytecode level, instructions are 1-byte opcodes (e.g. ADD = 0x01, SSTORE = 0x55).\nExecution environment components:\n- Stack: Max 1024 slots of 256-bit words.\n- Memory: Linear byte array initialized per call.\n- Calldata: Immutable read-only byte array containing transaction payload.\n- Storage: Persistent key-value mapping (uint256 -> uint256 per contract address).",
    securityNotes: [
      {
        vulnerability: "Unbounded Gas Consumption",
        riskLevel: "High",
        vulnerablePattern: "Looping over unbounded dynamic arrays in state.",
        fixedPattern: "Use off-chain indexing or paginated function calls.",
        explanation: "If a transaction exceeds the block gas limit, it reverts completely, freezing contract functionality permanently (Denial of Service).",
      },
    ],
    codeExample: {
      filename: "Overview.sol",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @notice A minimal contract introducing state and execution
contract FirstStep {
    // Stored permanently in Ethereum storage slot 0
    uint256 public value;

    // Modifies storage state and consumes gas
    function setValue(uint256 _newValue) public {
        value = _newValue;
    }
}`,
    },
    stepByStepExecution: [
      { step: 1, title: "EOA submits transaction", description: "Sender signs transaction calling setValue(42) with gas limit.", evmDetail: "Tx signature verified by ECDSA" },
      { step: 2, title: "EVM prepares execution", description: "EVM sets up fresh memory and loads 42 into Calldata.", evmDetail: "Calldata loaded into execution context" },
      { step: 3, title: "State Modification", description: "Function executes SSTORE opcode targeting slot 0.", evmDetail: "Gas deducted: 20,000 gas for cold storage write" },
      { step: 4, title: "Final state committed", description: "New state value (42) is written to block storage.", evmDetail: "State root updated in Ethereum block header" },
    ],
    commonMistakes: [
      {
        mistake: "Assuming state changes are free",
        whyItHappens: "Traditional web developers are used to local memory variables.",
        howToFix: "Minimize writes to permanent storage (SSTORE) as it is the most expensive operation in EVM.",
      },
    ],
    exercise: {
      id: "ex-0-first-contract",
      title: "Deploy Your First Smart Contract",
      type: "complete",
      prompt: "Complete the SimpleStorage contract by declaring a public uint256 state variable named storedNumber and a function setNumber(uint256 _num) that updates it.",
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    // TODO: Declare a public uint256 variable named 'storedNumber'

    // TODO: Implement setNumber(uint256 _num) to update storedNumber
}`,
      solutionCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 public storedNumber;

    function setNumber(uint256 _num) public {
        storedNumber = _num;
    }
}`,
      hints: [
        "A state variable inside a contract is declared like: uint256 public storedNumber;",
        "Functions syntax: function setNumber(uint256 _num) public { ... }",
        "Assign _num to storedNumber inside the function body.",
      ],
      solutionExplanation: "By declaring uint256 public storedNumber, Solidity automatically generates a getter function for storedNumber. In setNumber, we update the state variable which persists on the blockchain.",
      testCases: [
        { description: "Check storedNumber variable exists", checkCodePattern: [/uint256\s+public\s+storedNumber;/] },
        { description: "Check setNumber function exists", targetFunction: "setNumber", args: [100], expectedStateChange: { storedNumber: 100 } },
      ],
    },
    quiz: [
      {
        id: "q-0-1",
        question: "What happens when a transaction runs out of gas during execution?",
        options: [
          "The contract keeps the state changes made up to the failure point.",
          "All state changes revert, but spent gas is not refunded.",
          "The contract is automatically deleted from the blockchain.",
          "The node operator pays the missing gas fee.",
        ],
        correctIndex: 1,
        explanation: "In Ethereum, if execution runs out of gas (OOG), all state changes are reverted to protect blockchain integrity, but the gas consumed so far is lost to compensate miners/validators.",
        deepDiveReasoning: "EVM state atomicity guarantees that either a transaction finishes completely or rolls back entirely upon failure.",
      },
    ],
    relatedLessonIds: ["level-1-solidity-fundamentals"],
  },

  // -------------------------------------------------------------
  // LEVEL 1: FUNDAMENTALS
  // -------------------------------------------------------------
  {
    id: "level-1-solidity-fundamentals",
    title: "Level 1: Solidity Fundamentals & Contract Structure",
    level: "Level 1",
    levelNumber: 1,
    category: "Fundamentals",
    summary: "Learn pragma directives, comments, state vs local variables, and basic function declarations.",
    docRef: {
      title: "Solidity Docs: Structure of a Contract",
      url: "https://docs.soliditylang.org/en/latest/structure-of-a-contract.html",
      section: "Contract Elements",
    },
    prerequisites: ["level-0-blockchain-evm"],
    beginnerExplanation: "Every Solidity file starts with two critical annotations:\n1. SPDX License Identifier: Open source licensing tag (e.g. // SPDX-License-Identifier: MIT).\n2. Pragma Directive: Tells the compiler which version of Solidity to use (e.g. pragma solidity ^0.8.20;).\n\nVariables in Solidity come in two primary flavors:\n- State Variables: Belong to the contract, saved permanently on the blockchain.\n- Local Variables: Declared inside functions, exist only while the function is executing.",
    developerExplanation: "Solidity is statically typed. Variables must be declared with explicit types.\nThe pragma directive ^0.8.20 enables compiler checks including built-in overflow/underflow protection added in version 0.8.0.",
    evmExplanation: "State variables are allocated sequentially in 32-byte storage slots starting at slot 0.\nLocal primitive variables (like uint256, address) live on the EVM Stack.",
    securityNotes: [
      {
        vulnerability: "Floating Pragma",
        riskLevel: "Low",
        vulnerablePattern: "pragma solidity ^0.8.0;",
        fixedPattern: "pragma solidity 0.8.20;",
        explanation: "Floating pragmas allow building with outdated or untested compiler versions in production deployments.",
      },
    ],
    codeExample: {
      filename: "Counter.sol",
      code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Counter {
    // State variable in storage slot 0
    uint256 public count;

    // Increments state
    function increment() public {
        count += 1;
    }

    // Pure helper function using local variable
    function addBonus(uint256 input) public pure returns (uint256) {
        uint256 bonus = 10; // Local variable on EVM stack
        return input + bonus;
    }
}`,
    },
    stepByStepExecution: [
      { step: 1, title: "Call increment()", description: "Contract receives function selector for increment().", evmDetail: "Selector = bytes4(keccak256('increment()'))" },
      { step: 2, title: "Read storage", description: "EVM reads count from slot 0 using SLOAD opcode.", evmDetail: "SLOAD cost: 2100 gas (cold read)" },
      { step: 3, title: "Add & Write", description: "Adds 1 and writes back with SSTORE opcode.", evmDetail: "SSTORE cost: 5000 gas for warm update" },
    ],
    commonMistakes: [
      {
        mistake: "Confusing state vs local variables",
        whyItHappens: "Forgetting that variables defined outside functions persist state across transactions.",
        howToFix: "Keep local variables scoped inside functions and state variables inside the contract body.",
      },
    ],
    exercise: {
      id: "ex-1-counter-contract",
      title: "Build a Resetting Counter",
      type: "scratch",
      prompt: "Create a contract named Counter with a public uint256 variable count, an increment() function, and a reset() function that sets count back to 0.",
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Write your Counter contract here`,
      solutionCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;

    function increment() public {
        count += 1;
    }

    function reset() public {
        count = 0;
    }
}`,
      hints: [
        "Declare contract named Counter: contract Counter { ... }",
        "Add uint256 public count; as a state variable.",
        "Add two public functions: increment() and reset().",
      ],
      solutionExplanation: "The contract maintains count in storage. Calling increment() adds 1, and reset() overwrites slot 0 with 0.",
      testCases: [
        { description: "Check increment", targetFunction: "increment", expectedStateChange: { count: 1 } },
        { description: "Check reset", targetFunction: "reset", expectedStateChange: { count: 0 } },
      ],
    },
    quiz: [
      {
        id: "q-1-1",
        question: "Where is a variable declared inside a function body stored during execution?",
        options: [
          "In permanent Contract Storage",
          "On the EVM Stack or Memory",
          "In the Transaction Calldata permanently",
          "On the Ethereum P2P gossip network",
        ],
        correctIndex: 1,
        explanation: "Local variables inside functions exist temporarily in memory or stack space during execution and are discarded when execution finishes.",
        deepDiveReasoning: "EVM memory and stack are transient contexts created per call frame.",
      },
    ],
    relatedLessonIds: ["level-2-data-types-operators"],
  },

  // -------------------------------------------------------------
  // LEVEL 2: CORE SOLIDITY
  // -------------------------------------------------------------
  {
    id: "level-2-data-types-operators",
    title: "Level 2: Data Types, Structs & Enums",
    level: "Level 2",
    levelNumber: 2,
    category: "Core Language",
    summary: "Deep dive into value types (integers, address, bytes) and reference types (arrays, structs, mappings).",
    docRef: {
      title: "Solidity Docs: Types",
      url: "https://docs.soliditylang.org/en/latest/types.html",
      section: "Value and Reference Types",
    },
    prerequisites: ["level-1-solidity-fundamentals"],
    beginnerExplanation: "Solidity provides several built-in primitives:\n- uint256 / int256: Unsigned and signed integers (from 8 to 256 bits).\n- address: 20-byte Ethereum account address.\n- address payable: Address that can receive Ether.\n- mapping(key => value): Key-value hash tables.\n- struct: Custom grouped data structures.\n- enum: Custom types with user-defined named constants.",
    developerExplanation: "Mappings cannot be iterated over directly because keys are not stored; only the Keccak256 hash of key + slot position is used to compute storage locations.\nDynamic arrays maintain length prefix at slot, with elements packed sequentially starting at keccak256(slot).",
    evmExplanation: "Address operations: .balance performs BALANCE opcode; .transfer() / .call() invokes ETH sending.\nEnums internally fit into uint8 (0 to 255).",
    securityNotes: [
      {
        vulnerability: "Unchecked Mapping Lookup",
        riskLevel: "Medium",
        vulnerablePattern: "Accessing non-existent mapping key assumes non-zero value.",
        fixedPattern: "Check explicitly or maintain key arrays.",
        explanation: "Accessing an uninitialized mapping key returns the type default value (0, false, 0x0).",
      },
    ],
    codeExample: {
      filename: "UserManager.sol",
      code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract UserManager {
    enum Status { Pending, Active, Suspended }

    struct User {
        string name;
        Status status;
        uint256 balance;
    }

    mapping(address => User) public users;

    function register(string memory _name) public {
        users[msg.sender] = User({
            name: _name,
            status: Status.Active,
            balance: 0
        });
    }
}`,
    },
    stepByStepExecution: [
      { step: 1, title: "Compute mapping location", description: "Calculate keccak256(abi.encode(msg.sender, slot)).", evmDetail: "Hash produces storage slot key" },
      { step: 2, title: "Store Struct fields", description: "Writes name, status, and balance to calculated slots.", evmDetail: "Status enum fits into single byte packed with name ref" },
    ],
    commonMistakes: [
      {
        mistake: "Trying to loop over a mapping",
        whyItHappens: "Developers coming from JS/Python expect Object.keys() to work.",
        howToFix: "Maintain an array of keys alongside the mapping if iteration is required.",
      },
    ],
    exercise: {
      id: "ex-2-user-registry",
      title: "Implement a User Registry with Mappings & Structs",
      type: "complete",
      prompt: "Create a mapping balances from address to uint256. Create a function deposit(uint256 amount) that adds amount to balances[msg.sender].",
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Vault {
    // TODO: Mapping from address to uint256 named balances

    // TODO: Function deposit(uint256 amount) that increases msg.sender's balance
}`,
      solutionCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Vault {
    mapping(address => uint256) public balances;

    function deposit(uint256 amount) public {
        balances[msg.sender] += amount;
    }
}`,
      hints: [
        "Declare mapping: mapping(address => uint256) public balances;",
        "Inside deposit function, use balances[msg.sender] += amount;",
        "Ensure function visibility is marked public.",
      ],
      solutionExplanation: "The mapping tracks state per caller. msg.sender is the EVM global context variable representing transaction caller.",
      testCases: [
        { description: "Test deposit updates balance", targetFunction: "deposit", args: [500], expectedStateChange: { "balances[msg.sender]": 500 } },
      ],
    },
    quiz: [
      {
        id: "q-2-1",
        question: "What is returned when you query a mapping with a key that has never been set?",
        options: [
          "An explicit Revert error",
          "null or undefined",
          "The default value of the value type (e.g., 0 for uint256)",
          "A random hash value",
        ],
        correctIndex: 2,
        explanation: "Every slot in EVM storage is conceptually initialized to zeroes. Querying an unused key returns the default zero-value.",
        deepDiveReasoning: "Solidity does not store empty key metadata in storage to optimize gas.",
      },
    ],
    relatedLessonIds: ["level-2-globals-and-units", "level-2-control-structures-errors"],
  },

  {
    id: "level-2-globals-and-units",
    title: "Level 2: Global Variables, Units & Context",
    level: "Level 2",
    levelNumber: 2,
    category: "Core Language",
    summary: "Master msg.sender, msg.value, block.timestamp, block.number, tx.origin, and Ether units (wei, gwei, ether).",
    docRef: {
      title: "Solidity Docs: Units and Global Variables",
      url: "https://docs.soliditylang.org/en/latest/units-and-global-variables.html",
      section: "Block and Transaction Properties",
    },
    prerequisites: ["level-2-data-types-operators"],
    beginnerExplanation: "Solidity gives your contract built-in variables that describe the current transaction and blockchain block:\n- msg.sender: Address of the entity calling this function.\n- msg.value: Amount of Ether (in wei) sent with the transaction.\n- block.timestamp: Epoch timestamp of current block.\n- tx.origin: EOA that initiated the entire transaction chain (DANGER: Security risk!).\n- Units: 1 ether == 1e18 wei, 1 gwei == 1e9 wei.",
    developerExplanation: "Always use msg.sender for authorization, NEVER tx.origin.\ntx.origin points to the original account that signed the transaction, making contracts susceptible to phishing attacks via malicious intermediary contracts.",
    evmExplanation: "Opcode equivalents:\n- msg.sender -> CALLER (0x33)\n- msg.value -> CALLVALUE (0x34)\n- block.timestamp -> TIMESTAMP (0x42)\n- tx.origin -> ORIGIN (0x32)",
    securityNotes: [
      {
        vulnerability: "tx.origin Phishing Attack",
        riskLevel: "Critical",
        vulnerablePattern: "require(tx.origin == owner);",
        fixedPattern: "require(msg.sender == owner);",
        explanation: "If an owner interacts with an attacker's contract, the attacker's contract can call the vulnerable contract. tx.origin will still be the owner, bypassing security checks!",
      },
    ],
    codeExample: {
      filename: "EtherReceiver.sol",
      code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract EtherReceiver {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        require(msg.value >= 1 ether, "Must send at least 1 Ether");
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }
}`,
    },
    stepByStepExecution: [
      { step: 1, title: "Send transaction with value", description: "Caller sends 1 Ether with deposit() call.", evmDetail: "CALLVALUE opcode verifies value >= 10^18" },
      { step: 2, title: "Require check", description: "EVM compares CALLVALUE against 1 ether requirement.", evmDetail: "Passes execution; balance updated" },
    ],
    commonMistakes: [
      {
        mistake: "Using tx.origin for authentication",
        whyItHappens: "Assuming tx.origin means 'who is calling this function right now'.",
        howToFix: "Always use msg.sender for authorization.",
      },
    ],
    exercise: {
      id: "ex-2-owner-check",
      title: "Fix the tx.origin Authorization Vulnerability",
      type: "bugfix",
      prompt: "The SecuredVault contract currently uses tx.origin to check the owner. Fix the code to use msg.sender instead.",
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SecuredVault {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function withdraw() public {
        require(tx.origin == owner, "Not authorized");
        // Withdraw logic...
    }
}`,
      solutionCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SecuredVault {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function withdraw() public {
        require(msg.sender == owner, "Not authorized");
        // Withdraw logic...
    }
}`,
      hints: [
        "Find the require statement in withdraw().",
        "Replace tx.origin with msg.sender.",
        "Ensure equality comparison checks owner.",
      ],
      solutionExplanation: "Using msg.sender guarantees that only the immediate caller is verified, preventing phishing relay attacks.",
      testCases: [
        { description: "Ensure msg.sender is used", checkCodePattern: [/require\(\s*msg\.sender\s*==\s*owner/] },
      ],
    },
    quiz: [
      {
        id: "q-2-2",
        question: "Why is using tx.origin dangerous for access control?",
        options: [
          "tx.origin is slower to compute in EVM.",
          "tx.origin changes every 10 seconds.",
          "A malicious contract can trick an authorized user into calling it, then call your contract with tx.origin set to the victim.",
          "tx.origin returns 0x0 on testnets.",
        ],
        correctIndex: 2,
        explanation: "If Alice (owner) calls Contract B, and B calls Contract A, in Contract A msg.sender is B, but tx.origin is Alice. If A checks tx.origin == Alice, Contract B succeeds in impersonating Alice!",
        deepDiveReasoning: "Phishing via contract redirection is one of the classic Solidity exploits.",
      },
    ],
    relatedLessonIds: ["level-2-control-structures-errors", "sec-reentrancy-audit"],
  },

  {
    id: "level-2-control-structures-errors",
    title: "Level 2: Control Structures & Custom Errors",
    level: "Level 2",
    levelNumber: 2,
    category: "Core Language",
    summary: "Control flow with if/else, for/while loops, and error handling with require, revert, assert, and custom errors.",
    docRef: {
      title: "Solidity Docs: Control Structures & Error Handling",
      url: "https://docs.soliditylang.org/en/latest/control-structures.html",
      section: "Revert and Custom Errors",
    },
    prerequisites: ["level-2-globals-and-units"],
    beginnerExplanation: "When something goes wrong in a smart contract (e.g. user doesn't have enough money), you revert the transaction:\n- require(condition, string): Checks inputs/preconditions. Unused gas is refunded.\n- revert CustomError(): Modern, gas-efficient error handling introduced in 0.8.4.\n- assert(condition): Used for internal invariant checking. Failure indicates a severe bug in code logic.",
    developerExplanation: "Custom errors save significant gas compared to string messages because custom errors use 4-byte selector encoding (keccak256('Unauthorized()')), whereas string error messages require ABI string memory encoding and storage overhead.",
    evmExplanation: "revert CustomError(arg) executes REVERT opcode (0xfd) passing 4-byte selector + ABI encoded parameters in return data buffer.\nassert(false) in Solidity <0.8 executed invalid opcode, but >=0.8 uses Panic(uint256) error revert code.",
    securityNotes: [
      {
        vulnerability: "String Error Message Gas Waste",
        riskLevel: "Low",
        vulnerablePattern: "require(condition, 'Extremely long error message that costs extra gas to deploy');",
        fixedPattern: "if (!condition) revert CustomError();",
        explanation: "Long require strings increase deployment bytecode size and execution cost.",
      },
    ],
    codeExample: {
      filename: "Bank.sol",
      code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

error InsufficientBalance(uint256 available, uint256 required);

contract Bank {
    mapping(address => uint256) public balances;

    function withdraw(uint256 amount) public {
        uint256 userBal = balances[msg.sender];
        if (userBal < amount) {
            revert InsufficientBalance(userBal, amount);
        }
        balances[msg.sender] -= amount;
    }
}`,
    },
    stepByStepExecution: [
      { step: 1, title: "Withdraw attempt", description: "User calls withdraw(100) with balance 20.", evmDetail: "Condition userBal < amount evaluates true" },
      { step: 2, title: "Trigger custom revert", description: "Executes REVERT opcode returning selector 0xf4d3...", evmDetail: "Transaction fails; state unchanged; remaining gas refunded" },
    ],
    commonMistakes: [
      {
        mistake: "Using assert for user input validation",
        whyItHappens: "Not realizing assert is meant exclusively for contract internal invariants.",
        howToFix: "Use require or custom errors for input validation.",
      },
    ],
    exercise: {
      id: "ex-2-custom-error",
      title: "Convert require to Custom Error",
      type: "complete",
      prompt: "Declare a custom error NotOwner() and replace the require call in restrictedFunction with if (msg.sender != owner) revert NotOwner();.",
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// TODO: Declare custom error NotOwner()

contract Admin {
    address public owner = msg.sender;

    function restrictedFunction() public view {
        // TODO: Replace with custom error check
        require(msg.sender == owner, "Not owner");
    }
}`,
      solutionCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

error NotOwner();

contract Admin {
    address public owner = msg.sender;

    function restrictedFunction() public view {
        if (msg.sender != owner) {
            revert NotOwner();
        }
    }
}`,
      hints: [
        "Declare error NotOwner(); outside or inside the contract.",
        "Check if (msg.sender != owner) revert NotOwner(); inside the function.",
        "Remove the old require statement.",
      ],
      solutionExplanation: "Custom errors save deployment and runtime gas compared to string error messages.",
      testCases: [
        { description: "Check error definition and revert", targetFunction: "restrictedFunction", checkCodePattern: [/error\s+NotOwner\(\);/, /revert\s+NotOwner\(\);/] },
      ],
    },
    quiz: [
      {
        id: "q-2-3",
        question: "Why are Custom Errors preferred over require(condition, 'Error Message') in Solidity 0.8+?",
        options: [
          "Custom errors automatically retry the transaction.",
          "Custom errors consume significantly less gas because they use a 4-byte selector instead of long strings.",
          "Require strings cannot be read by web3 frontends.",
          "Custom errors bypass EVM gas limits.",
        ],
        correctIndex: 1,
        explanation: "Custom errors avoid storing and encoding string characters in bytecode, reducing both contract deployment gas and runtime revert gas.",
        deepDiveReasoning: "Bytecode size directly impacts gas cost during deployment.",
      },
    ],
    relatedLessonIds: ["level-3-functions-modifiers"],
  },

  // -------------------------------------------------------------
  // LEVEL 3: CONTRACT ARCHITECTURE
  // -------------------------------------------------------------
  {
    id: "level-3-functions-modifiers",
    title: "Level 3: Functions, Modifiers & Events",
    level: "Level 3",
    levelNumber: 3,
    category: "Contract Architecture",
    summary: "Function visibility (public, private, internal, external), mutability (pure, view, payable), custom modifiers, and logging with events.",
    docRef: {
      title: "Solidity Docs: Functions and Modifiers",
      url: "https://docs.soliditylang.org/en/latest/contracts.html#functions",
      section: "Function Modifiers and Visibility",
    },
    prerequisites: ["level-2-control-structures-errors"],
    beginnerExplanation: "Functions control contract behavior.\nVisibility Rules:\n- public: Callable internally and externally.\n- external: Callable ONLY from outside the contract.\n- internal: Callable inside this contract and inherited derived contracts.\n- private: Callable ONLY inside this exact contract.\n\nMutability:\n- view: Reads contract state but does NOT modify it.\n- pure: Does NOT read OR modify contract state.\n- payable: Allows receiving Ether with the transaction.",
    developerExplanation: "Function Modifiers (modifier onlyOwner() { _; }) inject re-usable logic before/after function execution. The _; merge symbol specifies where the target function body executes.\nEvents emit logs (emit Transfer(from, to, amount);) which are stored in EVM log bloom filters.",
    evmExplanation: "Events emit LOG0 - LOG4 opcodes. Up to 3 parameters marked indexed become log topics (keccak256 search keys). Non-indexed parameters are ABI-encoded in log data.",
    securityNotes: [
      {
        vulnerability: "Missing Visibility Specifier",
        riskLevel: "Critical",
        vulnerablePattern: "function kill() { selfdestruct(payable(msg.sender)); }",
        fixedPattern: "function kill() internal { ... }",
        explanation: "In older Solidity versions (<0.5.0), omitting visibility defaulted to public, allowing anyone to execute restricted administrative functions.",
      },
    ],
    codeExample: {
      filename: "Token.sol",
      code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Token {
    address public owner;
    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }
}`,
    },
    stepByStepExecution: [
      { step: 1, title: "Call mint()", description: "Modifier checks msg.sender == owner.", evmDetail: "SLOAD owner address from storage slot 0" },
      { step: 2, title: "Execute function body", description: "Increases balance of target address.", evmDetail: "SSTORE updated user balance" },
      { step: 3, title: "Emit Event", description: "Executes LOG3 opcode with topic 0 (event sig), topic 1 (from), topic 2 (to).", evmDetail: "Log appended to transaction receipt" },
    ],
    commonMistakes: [
      {
        mistake: "Forgetting the _; in a modifier",
        whyItHappens: "New developers forget that _; represents the function body execution insertion point.",
        howToFix: "Always include _; inside modifier logic.",
      },
    ],
    exercise: {
      id: "ex-3-modifier-event",
      title: "Add a Guard Modifier and Log Event",
      type: "complete",
      prompt: "Create an event ValueChanged(uint256 newValue) and a modifier validValue(uint256 _val) that requires _val > 0. Apply them to updateValue.",
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Settings {
    uint256 public value;

    // TODO: Define event ValueChanged(uint256 newValue)

    // TODO: Define modifier validValue(uint256 _val) requiring _val > 0

    function updateValue(uint256 _val) public {
        value = _val;
    }
}`,
      solutionCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Settings {
    uint256 public value;

    event ValueChanged(uint256 newValue);

    modifier validValue(uint256 _val) {
        require(_val > 0, "Invalid value");
        _;
    }

    function updateValue(uint256 _val) public validValue(_val) {
        value = _val;
        emit ValueChanged(_val);
    }
}`,
      hints: [
        "Event syntax: event ValueChanged(uint256 newValue);",
        "Modifier syntax: modifier validValue(uint256 _val) { require(_val > 0, 'Invalid'); _; }",
        "Apply modifier to updateValue(uint256 _val) public validValue(_val) and emit ValueChanged(_val);.",
      ],
      solutionExplanation: "Modifiers clean up code duplication by validating conditions before entering function bodies.",
      testCases: [
        { description: "Check valid value", targetFunction: "updateValue", args: [10], expectedStateChange: { value: 10 } },
        { description: "Check invalid value reverts", targetFunction: "updateValue", args: [0], expectedRevert: true },
      ],
    },
    quiz: [
      {
        id: "q-3-1",
        question: "What is the primary benefit of marked 'indexed' parameters in Solidity Events?",
        options: [
          "Indexed parameters are saved in permanent contract storage.",
          "Indexed parameters allow off-chain clients (e.g. ethers.js) to quickly filter logs by those specific topic values.",
          "Indexed parameters cost 0 gas to emit.",
          "Indexed parameters prevent contracts from reverting.",
        ],
        correctIndex: 1,
        explanation: "Up to 3 event parameters can be indexed. Their Keccak hashes are stored in EVM bloom filters, enabling instant log topic searches without scanning full contract logs.",
        deepDiveReasoning: "EVM logs are optimized for off-chain event indexing.",
      },
    ],
    relatedLessonIds: ["level-3-inheritance-interfaces"],
  },

  {
    id: "level-3-inheritance-interfaces",
    title: "Level 3: Inheritance, Abstract Contracts & Interfaces",
    level: "Level 3",
    levelNumber: 3,
    category: "Contract Architecture",
    summary: "Object-oriented Solidity: single & multiple inheritance, virtual/override, abstract contracts, interfaces, and libraries.",
    docRef: {
      title: "Solidity Docs: Inheritance & Interfaces",
      url: "https://docs.soliditylang.org/en/latest/contracts.html#inheritance",
      section: "Multiple Inheritance and Abstract Contracts",
    },
    prerequisites: ["level-3-functions-modifiers"],
    beginnerExplanation: "Solidity supports Object-Oriented programming:\n- Inheritance (is Base): Parent contracts pass functions and state down to child contracts.\n- virtual & override: Parent functions marked virtual can be redefined in child contracts using override.\n- Interfaces (interface IERC20): Specify function signatures without implementation details.\n- Libraries (library Math): Stateless utility code deployed once and reused.",
    developerExplanation: "Solidity uses C3 Linearization to resolve Multiple Inheritance order and the super keyword.\nContract inheritance order must be listed from 'most base-like' to 'most derived'.",
    evmExplanation: "Calling an interface function executes CALL / STATICCALL opcode to the target contract address.\nCalling a library function with internal functions inlines bytecode directly; calling external library functions uses DELEGATECALL.",
    securityNotes: [
      {
        vulnerability: "Linearization Order Ambiguity",
        riskLevel: "Medium",
        vulnerablePattern: "contract Derived is B, A (where B inherits A)",
        fixedPattern: "contract Derived is A, B",
        explanation: "Incorrect C3 linearization order causes compilation errors or unintended function call hierarchies when using super.",
      },
    ],
    codeExample: {
      filename: "Interfaces.sol",
      code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract TokenVault {
    function getBalance(address token, address account) public view returns (uint256) {
        // Interacting with external contract via Interface
        return IERC20(token).balanceOf(account);
    }
}`,
    },
    stepByStepExecution: [
      { step: 1, title: "Construct interface wrapper", description: "Casts address token to IERC20 interface.", evmDetail: "No bytecode executed during cast" },
      { step: 2, title: "Execute STATICCALL", description: "Encodes selector for balanceOf(address) and performs low-level STATICCALL.", evmDetail: "STATICCALL guarantees state cannot be modified during query" },
    ],
    commonMistakes: [
      {
        mistake: "Trying to instantiate state variables inside an Interface",
        whyItHappens: "Expecting interfaces to behave like base classes.",
        howToFix: "Interfaces can ONLY contain function declarations without implementations, enums, and structs.",
      },
    ],
    exercise: {
      id: "ex-3-interface-impl",
      title: "Implement an Interface with virtual/override",
      type: "complete",
      prompt: "Complete Greeter contract inheriting from abstract IGreeter and implementing greet() with override keyword.",
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract IGreeter {
    function greet() public view virtual returns (string memory);
}

// TODO: Inherit from IGreeter and implement greet() returning "Hello Solidity"
contract Greeter {

}`,
      solutionCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract IGreeter {
    function greet() public view virtual returns (string memory);
}

contract Greeter is IGreeter {
    function greet() public view override returns (string memory) {
        return "Hello Solidity";
    }
}`,
      hints: [
        "Declare contract Greeter is IGreeter",
        "Implement function greet() public view override returns (string memory) { return 'Hello Solidity'; }",
        "Ensure function visibility is marked public.",
      ],
      solutionExplanation: "The override keyword signals to the compiler that this function provides the concrete implementation for the parent's virtual function.",
      testCases: [
        { description: "Check greet returns string", targetFunction: "greet", expectedReturn: "Hello Solidity" },
      ],
    },
    quiz: [
      {
        id: "q-3-2",
        question: "Which keyword MUST be present on a parent contract's function if a child contract intends to override it?",
        options: [
          "abstract",
          "payable",
          "virtual",
          "internal",
        ],
        correctIndex: 2,
        explanation: "Parent functions must explicitly include the virtual specifier to permit derived contracts to override their implementation.",
        deepDiveReasoning: "Solidity enforces explicit intent for polymorphism to avoid accidental overriding of critical logic.",
      },
    ],
    relatedLessonIds: ["level-4-data-locations-evm"],
  },

  // -------------------------------------------------------------
  // LEVEL 4: DATA LOCATIONS & EVM CONCEPTS
  // -------------------------------------------------------------
  {
    id: "level-4-data-locations-evm",
    title: "Level 4: Data Locations (Storage, Memory, Calldata) & Storage Layout",
    level: "Level 4",
    levelNumber: 4,
    category: "EVM Internals",
    summary: "Master Storage vs Memory vs Calldata, variable packing, storage slots, and gas optimization techniques.",
    docRef: {
      title: "Solidity Docs: Layout of State Variables in Storage",
      url: "https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html",
      section: "Storage Layout and Data Locations",
    },
    prerequisites: ["level-3-inheritance-interfaces"],
    beginnerExplanation: "In Solidity, reference types (arrays, structs, strings) MUST explicitly state their data location:\n1. storage: Permanent blockchain state. Highly expensive (SSTORE costs up to 20,000 gas).\n2. memory: Temporary mutable buffer created during function call. Cheap (MSTORE / MLOAD).\n3. calldata: Temporary immutable read-only input buffer. Cheapest way to pass array parameters into external functions!",
    developerExplanation: "Storage Packing Rules:\nSolidity packs adjacent state variables into the same 32-byte storage slot if they fit!\nFor example: uint128 a; uint128 b; fit together into a SINGLE 32-byte slot.\nReordering state variables by size reduces total storage slots, saving gas!",
    evmExplanation: "Slot index = sequential 0, 1, 2...\nPacking works right-to-left in little-endian order within the 32-byte slot word.\nMemory expansion cost grows quadratically when referencing memory offsets beyond 724 bytes.",
    securityNotes: [
      {
        vulnerability: "Uninitialized Storage Pointers",
        riskLevel: "High",
        vulnerablePattern: "StructData storage data;",
        fixedPattern: "StructData memory data = ... or StructData storage data = myStorageRef;",
        explanation: "In modern Solidity this is a compiler error, but understanding storage pointer aliasing is essential for proxy and assembly development.",
      },
    ],
    codeExample: {
      filename: "StoragePacking.sol",
      code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract UnoptimizedLayout {
    uint128 public a; // Slot 0 (16 bytes)
    uint256 public b; // Slot 1 (32 bytes) - cannot fit in Slot 0!
    uint128 public c; // Slot 2 (16 bytes)
}

contract OptimizedLayout {
    uint128 public a; // Slot 0 (16 bytes)
    uint128 public c; // Slot 0 (16 bytes) - Packed together!
    uint256 public b; // Slot 1 (32 bytes)
}`,
    },
    stepByStepExecution: [
      { step: 1, title: "Read packed slot", description: "SLOAD retrieves 32-byte slot 0.", evmDetail: "Contains both 'a' and 'c'" },
      { step: 2, title: "Bitwise extraction", description: "EVM uses bitwise SHIFT and AND mask to extract 'c'.", evmDetail: "c = (slot0 >> 128) & 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF" },
    ],
    commonMistakes: [
      {
        mistake: "Using memory instead of calldata for read-only external function parameters",
        whyItHappens: "Defaulting to memory out of habit.",
        howToFix: "Use calldata for external function reference parameters to avoid unnecessary memory copy allocations.",
      },
    ],
    exercise: {
      id: "ex-4-calldata-opt",
      title: "Optimize Data Location for Read-Only Arrays",
      type: "bugfix",
      prompt: "Change the parameter data location of sumArray from memory to calldata for gas optimization in an external function.",
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CalldataOptimizer {
    function sumArray(uint256[] memory numbers) external pure returns (uint256 total) {
        for (uint256 i = 0; i < numbers.length; i++) {
            total += numbers[i];
        }
    }
}`,
      solutionCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CalldataOptimizer {
    function sumArray(uint256[] calldata numbers) external pure returns (uint256 total) {
        for (uint256 i = 0; i < numbers.length; i++) {
            total += numbers[i];
        }
    }
}`,
      hints: [
        "Locate uint256[] memory numbers in function parameters.",
        "Replace memory with calldata.",
        "Verify external function visibility.",
      ],
      solutionExplanation: "Using calldata avoids copying array bytes into EVM memory, saving execution gas.",
      testCases: [
        { description: "Check sumArray works", targetFunction: "sumArray", args: [[10, 20, 30]], expectedReturn: 60 },
        { description: "Verify calldata is used", checkCodePattern: [/uint256\[\]\s+calldata\s+numbers/] },
      ],
    },
    quiz: [
      {
        id: "q-4-1",
        question: "How many 32-byte storage slots will these state variables occupy: uint128 x; uint128 y; uint256 z;?",
        options: [
          "3 slots",
          "2 slots",
          "1 slot",
          "4 slots",
        ],
        correctIndex: 1,
        explanation: "uint128 is 16 bytes. x (16 bytes) and y (16 bytes) fit together in Slot 0 (32 bytes total). z (32 bytes) requires Slot 1. Total = 2 slots.",
        deepDiveReasoning: "Solidity packs adjacent items that fit within 32-byte slot boundaries.",
      },
    ],
    relatedLessonIds: ["level-5-ether-and-calls"],
  },

  // -------------------------------------------------------------
  // LEVEL 5: ETH INTERACTION & CALLS
  // -------------------------------------------------------------
  {
    id: "level-5-ether-and-calls",
    title: "Level 5: Ether Transfers & Low-Level Calls (call vs delegatecall)",
    level: "Level 5",
    levelNumber: 5,
    category: "EVM Calls & Security",
    summary: "Receiving Ether with receive()/fallback(), sending Ether with .call(), and delegatecall context preservation.",
    docRef: {
      title: "Solidity Docs: Sending and Receiving Ether",
      url: "https://docs.soliditylang.org/en/latest/contracts.html#sending-and-receiving-ether",
      section: "Ether Transfers and Low Level Calls",
    },
    prerequisites: ["level-4-data-locations-evm"],
    beginnerExplanation: "To receive plain Ether transfers, a contract needs:\n- receive() external payable: Executed when msg.data is empty.\n- fallback() external payable: Executed when no other function matches selector.\n\nSending Ether:\n- payable(addr).transfer(amount): Deprecated.\n- (bool success, ) = addr.call{value: amount}(''): Modern standard approach forwarding gas.",
    developerExplanation: "Low-Level Calls:\n- call: Executes target contract code in target storage context.\n- delegatecall: Executes target contract code in CALLER'S storage context! msg.sender and msg.value remain unchanged! Used for Proxy Upgradability Patterns.",
    evmExplanation: "delegatecall opcode (0xf4) preserves execution context:\nCode = target address, Storage = calling contract, Value = calling contract value, Sender = original sender.",
    securityNotes: [
      {
        vulnerability: "Reentrancy Attack & Storage Collision",
        riskLevel: "Critical",
        vulnerablePattern: "(bool success, ) = msg.sender.call{value: amount}(''); balances[msg.sender] = 0;",
        fixedPattern: "balances[msg.sender] = 0; (bool success, ) = msg.sender.call{value: amount}('');",
        explanation: "Sending Ether with .call() forwards all remaining gas. If state is not updated BEFORE the call (Checks-Effects-Interactions), the recipient can recursively re-enter the withdraw function to drain funds!",
      },
    ],
    codeExample: {
      filename: "EtherStore.sol",
      code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract EtherStore {
    mapping(address => uint256) public balances;

    receive() external payable {
        balances[msg.sender] += msg.value;
    }

    // Secure withdrawal following Checks-Effects-Interactions
    function withdraw(uint256 _amount) public {
        // 1. Checks
        require(balances[msg.sender] >= _amount, "Insufficient funds");

        // 2. Effects (Update state FIRST)
        balances[msg.sender] -= _amount;

        // 3. Interactions (External call LAST)
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "ETH transfer failed");
    }
}`,
    },
    stepByStepExecution: [
      { step: 1, title: "Check balance", description: "Verifies caller balance >= requested amount.", evmDetail: "Require check passed" },
      { step: 2, title: "Deduct balance (Effects)", description: "Subtracts amount from slot balances[msg.sender] FIRST.", evmDetail: "Storage updated before external context switch" },
      { step: 3, title: "Low-level call (Interactions)", description: "Executes CALL opcode forwarding ETH.", evmDetail: "If target re-enters, balance is already 0!" },
    ],
    commonMistakes: [
      {
        mistake: "Using transfer() or send() for ETH transfers in 2024+",
        whyItHappens: "Outdated tutorials recommended .transfer() due to fixed 2300 gas limit.",
        howToFix: "Use (bool success, ) = addr.call{value: amount}('') and check require(success).",
      },
    ],
    exercise: {
      id: "ex-5-cei-pattern",
      title: "Fix Reentrancy with Checks-Effects-Interactions",
      type: "security",
      prompt: "Re-order the lines in withdrawAll() so state is updated BEFORE the low-level call is executed.",
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VulnerableVault {
    mapping(address => uint256) public balances;

    function withdrawAll() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance");

        // VULNERABLE: Call executed BEFORE state update!
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] = 0;
    }
}`,
      solutionCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VulnerableVault {
    mapping(address => uint256) public balances;

    function withdrawAll() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance");

        // SECURE: Update state BEFORE external call
        balances[msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
}`,
      hints: [
        "Find the state update line balances[msg.sender] = 0;.",
        "Move it above the payable(msg.sender).call statement.",
        "Ensure require(success) remains after the call.",
      ],
      solutionExplanation: "Updating state before invoking external calls ensures that any reentrant execution sees a balance of 0, neutralizing the attack.",
      testCases: [
        { description: "Check state is set to 0 before call", checkCodePattern: [/balances\[msg\.sender\]\s*=\s*0;\s*\(bool\s+success/] },
      ],
    },
    quiz: [
      {
        id: "q-5-1",
        question: "In a delegatecall execution from Contract A to Contract B, whose storage is modified?",
        options: [
          "Contract B's storage",
          "Contract A's storage",
          "Both A and B storage simultaneously",
          "Neither (delegatecall is read-only)",
        ],
        correctIndex: 1,
        explanation: "delegatecall executes target code inside the caller's context (Contract A). All storage writes affect Contract A's slots.",
        deepDiveReasoning: "Delegatecall allows logic reuse while keeping state isolated in the proxy contract.",
      },
    ],
    relatedLessonIds: ["level-6-yul-assembly", "sec-reentrancy-audit"],
  },

  // -------------------------------------------------------------
  // LEVEL 6: ADVANCED SOLIDITY & YUL
  // -------------------------------------------------------------
  {
    id: "level-6-yul-assembly",
    title: "Level 6: Inline Assembly, Yul & Low-Level EVM Control",
    level: "Level 6",
    levelNumber: 6,
    category: "Advanced Solidity",
    summary: "Write Yul inline assembly (assembly { ... }) for memory allocation, custom storage operations (sstore/sload), and gas optimization.",
    docRef: {
      title: "Solidity Docs: Inline Assembly",
      url: "https://docs.soliditylang.org/en/latest/assembly.html",
      section: "Yul Language Syntax and Opcodes",
    },
    prerequisites: ["level-5-ether-and-calls"],
    beginnerExplanation: "Solidity lets you drop down into low-level assembly language called Yul:\n\nassembly {\n    // Direct EVM opcode access!\n}\n\nAssembly bypasses Solidity safety checks (like array bounds checking and overflow protection). It is used for extreme gas optimization, proxy implementations, and custom cryptography.",
    developerExplanation: "Key Yul operations:\n- sload(slot) / sstore(slot, val): Direct key-value storage reads and writes.\n- mload(p) / mstore(p, val): Read/write to memory offset p.\n- mload(0x40): Reads the Free Memory Pointer! Memory offset 0x40 holds the pointer to unused memory.",
    evmExplanation: "EVM scratch space: Memory locations 0x00 - 0x3f (64 bytes) can be used as scratch space for hashing.\nFree memory pointer lives at 0x40.\nZero slot lives at 0x60.",
    securityNotes: [
      {
        vulnerability: "Corrupting the Free Memory Pointer",
        riskLevel: "High",
        vulnerablePattern: "mstore(0x40, add(ptr, 0x20)) // calculated memory size wrong",
        fixedPattern: "Always update 0x40 when allocating dynamic memory buffers.",
        explanation: "Failing to update 0x40 causes subsequent Solidity memory allocations to overwrite your custom data.",
      },
    ],
    codeExample: {
      filename: "YulStorage.sol",
      code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract YulStorage {
    uint256 public data; // Slot 0

    function setYul(uint256 _val) public {
        assembly {
            // Write directly to storage slot 0
            sstore(data.slot, _val)
        }
    }

    function getYul() public view returns (uint256 val) {
        assembly {
            // Read directly from storage slot 0
            val := sload(data.slot)
        }
    }
}`,
    },
    stepByStepExecution: [
      { step: 1, title: "Enter assembly block", description: "Bypasses high-level Solidity type checks.", evmDetail: "Executes raw Yul dialect" },
      { step: 2, title: "Execute sstore", description: "Executes opcode SSTORE(0, _val).", evmDetail: "Writes directly to storage slot" },
    ],
    commonMistakes: [
      {
        mistake: "Forgetting that memory strings/bytes have a 32-byte length prefix",
        whyItHappens: "Assuming mload(ptr) returns the string characters directly.",
        howToFix: "Remember that the first 32 bytes at a memory pointer store the array/string length; data starts at add(ptr, 0x20).",
      },
    ],
    exercise: {
      id: "ex-6-yul-bitwise",
      title: "Write Yul Inline Assembly to Add Two Numbers",
      type: "scratch",
      prompt: "Implement the function addYul(uint256 a, uint256 b) using an assembly { ... } block with opcode add(a, b).",
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract YulMath {
    function addYul(uint256 a, uint256 b) public pure returns (uint256 result) {
        // TODO: Write inline assembly to compute result = a + b
    }
}`,
      solutionCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract YulMath {
    function addYul(uint256 a, uint256 b) public pure returns (uint256 result) {
        assembly {
            result := add(a, b)
        }
    }
}`,
      hints: [
        "Use block assembly { ... }",
        "Inside assembly, assign using :=: result := add(a, b)",
        "Pass a and b as arguments to add().",
      ],
      solutionExplanation: "In Yul, := is used for variable assignment, and add(a, b) executes the raw EVM ADD opcode.",
      testCases: [
        { description: "Check addYul returns correct sum", targetFunction: "addYul", args: [15, 25], expectedReturn: 40 },
        { description: "Ensure assembly block is used", checkCodePattern: [/assembly\s*\{/, /add\(a,\s*b\)/] },
      ],
    },
    quiz: [
      {
        id: "q-6-1",
        question: "In EVM Memory architecture, where is the Free Memory Pointer stored?",
        options: [
          "At memory offset 0x00",
          "At memory offset 0x40",
          "At storage slot 0",
          "On top of the EVM Stack",
        ],
        correctIndex: 1,
        explanation: "Offset 0x40 in memory is reserved by Solidity as the Free Memory Pointer. Reading mload(0x40) yields the offset where new temporary data can be stored.",
        deepDiveReasoning: "Solidity manages memory dynamically starting at 0x80, tracking the tail with offset 0x40.",
      },
    ],
    relatedLessonIds: ["sec-reentrancy-audit"],
  },

  // -------------------------------------------------------------
  // DEDICATED SECURITY MODULE
  // -------------------------------------------------------------
  {
    id: "sec-reentrancy-audit",
    title: "Security Audit Lab: Reentrancy & Access Control Vulnerabilities",
    level: "Security Lab",
    levelNumber: 7,
    category: "Smart Contract Auditing",
    summary: "Hands-on audit practice dissecting real-world vulnerabilities: Reentrancy attacks, tx.origin exploits, and Storage Collision in Proxy contracts.",
    docRef: {
      title: "Solidity Docs: Security Considerations",
      url: "https://docs.soliditylang.org/en/latest/security-considerations.html",
      section: "Pitfalls and Vulnerability Checklist",
    },
    prerequisites: ["level-5-ether-and-calls", "level-6-yul-assembly"],
    beginnerExplanation: "Smart contract bugs have lost billions of dollars. Unlike web software where you can push a patch in 5 minutes, smart contracts are immutable. Once deployed with a bug, attackers can exploit it instantly.\n\nIn this Security Audit Lab, you will learn how hackers exploit:\n1. Reentrancy: Hijacking control flow mid-execution.\n2. Access Control Flaws: Missing permissions or bad checks.\n3. Storage Collision: Overwriting proxy storage slots accidentally.",
    developerExplanation: "Audit Checklist:\n- Checks-Effects-Interactions (CEI) pattern enforced?\n- ReentrancyGuard applied to external calls with state side-effects?\n- Access control logic uses msg.sender with explicit modifier guards?\n- ERC-20 approve / transferFrom returns check or OpenZeppelin SafeERC20 used?",
    evmExplanation: "During reentrancy, the call frame stack grows. Each nested CALL re-enters the victim contract function before previous frames execute SSTORE state changes.",
    securityNotes: [
      {
        vulnerability: "Classic Reentrancy",
        riskLevel: "Critical",
        vulnerablePattern: "payable(msg.sender).call{value: bal}(''); bal = 0;",
        fixedPattern: "Use OpenZeppelin ReentrancyGuard nonReentrant modifier or CEI pattern.",
        explanation: "The DAO hack in 2016 lost 3.6M ETH due to this exact bug pattern.",
      },
    ],
    codeExample: {
      filename: "AuditTarget.sol",
      code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

/// @notice Vulnerable Contract for Audit Exercise
contract VulnerableBank {
    mapping(address => uint256) public userBalance;

    function deposit() public payable {
        userBalance[msg.sender] += msg.value;
    }

    // AUDIT FINDING: Reentrancy Vulnerability!
    function withdraw() public {
        uint256 amount = userBalance[msg.sender];
        require(amount > 0, "No funds");

        // External call executed BEFORE zeroing balance!
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Failed");

        userBalance[msg.sender] = 0;
    }
}`,
    },
    stepByStepExecution: [
      { step: 1, title: "Attacker calls withdraw()", description: "Victim calculates amount = 10 ETH.", evmDetail: "Reads userBalance[attacker]" },
      { step: 2, title: "Call transfers ETH to Attacker Contract", description: "Attacker fallback() triggers SECOND call to withdraw().", evmDetail: "userBalance[attacker] STILL reads 10 ETH because frame 1 has not reached line userBalance = 0!" },
      { step: 3, title: "Drain complete", description: "Attacker drains contract balance repeatedly until gas limit.", evmDetail: "EVM call stack reaches depth 2+" },
    ],
    commonMistakes: [
      {
        mistake: "Relying solely on unit tests without security audit pattern scanning",
        whyItHappens: "Unit tests check happy paths, not malicious reentrant control flows.",
        howToFix: "Always model attacker scenarios, fallback reentrancy hooks, and state invariance.",
      },
    ],
    exercise: {
      id: "ex-sec-reentrancy-guard",
      title: "Audit and Fix Vulnerable Bank using ReentrancyGuard",
      type: "security",
      prompt: "Implement a reentrancy lock variable bool private locked and a modifier nonReentrant to protect withdraw().",
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SecureBank {
    mapping(address => uint256) public userBalance;
    bool private locked;

    // TODO: Define modifier nonReentrant() using the 'locked' state variable

    function withdraw() public {
        uint256 amount = userBalance[msg.sender];
        require(amount > 0, "No funds");

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Failed");

        userBalance[msg.sender] = 0;
    }
}`,
      solutionCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SecureBank {
    mapping(address => uint256) public userBalance;
    bool private locked;

    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    function withdraw() public nonReentrant {
        uint256 amount = userBalance[msg.sender];
        require(amount > 0, "No funds");

        userBalance[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Failed");
    }
}`,
      hints: [
        "Create modifier: modifier nonReentrant() { require(!locked, 'Reentrant call'); locked = true; _; locked = false; }",
        "Attach nonReentrant to withdraw() public nonReentrant.",
        "Ensure state userBalance[msg.sender] = 0; is updated before call as well.",
      ],
      solutionExplanation: "The mutex lock prevents any reentrant invocation from executing function code while locked == true.",
      testCases: [
        { description: "Check nonReentrant modifier definition", checkCodePattern: [/modifier\s+nonReentrant\(\)/, /locked\s*=\s*true;/, /locked\s*=\s*false;/] },
      ],
    },
    quiz: [
      {
        id: "q-sec-1",
        question: "What is the primary mechanism that enables a classic Reentrancy attack?",
        options: [
          "Attacker guessing the contract private key.",
          "Executing an external call to an untrusted contract BEFORE updating internal contract state, allowing the recipient fallback function to call back into the victim.",
          "Compiler bug in Solidity 0.8.0.",
          "Integer overflow when calculating ETH balance.",
        ],
        correctIndex: 1,
        explanation: "Reentrancy occurs when an untrusted external call grants execution control back to an attacker before state updates occur, enabling recursive withdrawals.",
        deepDiveReasoning: "State synchronization guarantees are broken when external calls occur mid-state modification.",
      },
    ],
    relatedLessonIds: ["level-5-ether-and-calls"],
  },
];
