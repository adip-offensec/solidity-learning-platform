export interface CompilationError {
  severity: "error" | "warning";
  formattedMessage: string;
  sourceLocation?: {
    file: string;
    start: number;
    end: number;
  };
}

export interface ContractABIItem {
  name?: string;
  type: "function" | "constructor" | "event" | "fallback" | "receive" | "error";
  inputs?: { name: string; type: string; indexed?: boolean }[];
  outputs?: { name: string; type: string }[];
  stateMutability?: "pure" | "view" | "nonpayable" | "payable";
}

export interface CompiledContract {
  contractName: string;
  abi: ContractABIItem[];
  bytecode: string;
  opcodes?: string;
  functionSelectors: Record<string, string>;
}

export interface CompilationResult {
  success: boolean;
  errors: CompilationError[];
  contracts: Record<string, CompiledContract>;
}

export interface ExecutionStep {
  step: number;
  action: string;
  details: string;
  gasCost?: number;
  storageStateAfter?: Record<string, any>;
}

export interface ExecutionResult {
  success: boolean;
  contractName: string;
  functionName: string;
  logs: string[];
  returnValue?: any;
  revertReason?: string;
  gasUsed: number;
  stateChanges: Record<string, { before: any; after: any }>;
  steps: ExecutionStep[];
}
