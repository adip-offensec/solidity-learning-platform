"use client";

import React, { useState } from "react";
import { CompilationResult, ExecutionResult } from "@/types/execution";
import { Terminal, Cpu, Zap, AlertTriangle, CheckCircle2, Play, ShieldAlert } from "lucide-react";

interface ConsoleProps {
  compilation: CompilationResult | null;
  execution: ExecutionResult | null;
  onExecuteFunction: (functionName: string, args: any[], valueWei: string) => void;
}

export function ExecutionConsole({ compilation, execution, onExecuteFunction }: ConsoleProps) {
  const [selectedFunc, setSelectedFunc] = useState<string>("");
  const [funcArgs, setFuncArgs] = useState<string>("");
  const [msgValue, setMsgValue] = useState<string>("0");

  if (!compilation) {
    return (
      <div className="h-full bg-slate-950 border border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center text-center text-slate-500 font-mono text-xs">
        <Terminal className="w-8 h-8 text-slate-700 mb-2 animate-pulse" />
        <p>No contract compiled yet.</p>
        <p className="text-[11px] text-slate-600 mt-1">
          Click "Compile & Run" in the editor above to build bytecode & execute functions.
        </p>
      </div>
    );
  }

  const contractNames = Object.keys(compilation.contracts);
  const primaryContract = contractNames.length > 0 ? compilation.contracts[contractNames[0]] : null;
  const publicFunctions = primaryContract
    ? primaryContract.abi.filter((item) => item.type === "function")
    : [];

  const handleRun = () => {
    const fnName = selectedFunc || (publicFunctions.length > 0 ? publicFunctions[0].name! : "");
    if (!fnName) return;

    const parsedArgs = funcArgs
      ? funcArgs.split(",").map((s) => {
          const trimmed = s.trim();
          if (!isNaN(Number(trimmed)) && trimmed !== "") return Number(trimmed);
          if (trimmed === "true") return true;
          if (trimmed === "false") return false;
          return trimmed;
        })
      : [];

    onExecuteFunction(fnName, parsedArgs, msgValue);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-lg overflow-hidden font-mono text-xs shadow-xl">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-200">EVM Sandbox Execution Output</span>
        </div>
        <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          Bytecode: {primaryContract ? `${(primaryContract.bytecode.length / 2).toLocaleString()} bytes` : "0 B"}
        </span>
      </div>

      <div className="p-3 border-b border-slate-800 bg-slate-950 space-y-2">
        {compilation.errors.length > 0 && (
          <div className="space-y-1 max-h-36 overflow-y-auto">
            {compilation.errors.map((err, idx) => (
              <div
                key={idx}
                className={`p-2 rounded border text-[11px] whitespace-pre-wrap ${
                  err.severity === "error"
                    ? "bg-rose-950/40 text-rose-300 border-rose-800/50"
                    : "bg-amber-950/30 text-amber-300 border-amber-800/50"
                }`}
              >
                <div className="font-semibold flex items-center gap-1.5 mb-1">
                  {err.severity === "error" ? (
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                  <span>Compiler {err.severity.toUpperCase()}</span>
                </div>
                {err.formattedMessage}
              </div>
            ))}
          </div>
        )}

        {compilation.success && (
          <div className="p-2 bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 rounded text-[11px] flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Compilation successful for '{primaryContract?.contractName}'
            </span>
            <span className="text-[10px] font-mono text-emerald-400/80">solc v0.8.20+commit.a1b79de6</span>
          </div>
        )}
      </div>

      {compilation.success && publicFunctions.length > 0 && (
        <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex flex-wrap gap-2 items-center">
          <select
            value={selectedFunc || (publicFunctions[0]?.name ?? "")}
            onChange={(e) => setSelectedFunc(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-indigo-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-indigo-500"
          >
            {publicFunctions.map((fn, idx) => (
              <option key={idx} value={fn.name}>
                {fn.name}({fn.inputs?.map((i) => i.type).join(", ")})
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Arguments (comma separated)"
            value={funcArgs}
            onChange={(e) => setFuncArgs(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-indigo-500"
          />

          <input
            type="text"
            placeholder="ETH Value (Wei)"
            value={msgValue}
            onChange={(e) => setMsgValue(e.target.value)}
            className="w-28 bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-indigo-500 font-mono"
          />

          <button
            onClick={handleRun}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3 py-1 rounded transition-colors flex items-center space-x-1"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Execute</span>
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {execution ? (
          <div className="space-y-3">
            <div
              className={`p-3 rounded border ${
                execution.success
                  ? "bg-slate-900 border-emerald-500/30"
                  : "bg-rose-950/30 border-rose-800/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold flex items-center gap-1.5 text-sm">
                  {execution.success ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> SUCCESS
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <ShieldAlert className="w-4 h-4" /> REVERTED
                    </span>
                  )}
                </span>
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> Gas Used:{" "}
                  <strong className="text-amber-300">{execution.gasUsed.toLocaleString()}</strong>
                </span>
              </div>

              {execution.revertReason && (
                <div className="mt-2 text-rose-300 bg-rose-950/60 p-2 rounded border border-rose-800/50 text-[11px]">
                  <strong>Revert Reason:</strong> {execution.revertReason}
                </div>
              )}

              {execution.returnValue !== undefined && (
                <div className="mt-2 text-indigo-300 bg-indigo-950/40 p-2 rounded border border-indigo-800/50 text-[11px]">
                  <strong>Return Value:</strong> {JSON.stringify(execution.returnValue)}
                </div>
              )}
            </div>

            {Object.keys(execution.stateChanges).length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded p-3">
                <h4 className="font-semibold text-slate-300 text-xs mb-2 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" /> State / Storage Slot Changes
                </h4>
                <div className="space-y-1">
                  {Object.entries(execution.stateChanges).map(([slot, change], idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-slate-950 p-1.5 rounded border border-slate-800/80 text-[11px]"
                    >
                      <span className="text-slate-400 font-mono">{slot}</span>
                      <span className="text-slate-300 font-mono">
                        <span className="text-rose-400">{JSON.stringify(change.before)}</span>
                        {" → "}
                        <span className="text-emerald-400">{JSON.stringify(change.after)}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded p-3">
              <h4 className="font-semibold text-slate-300 text-xs mb-2">EVM Step-by-Step Execution Trace</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {execution.steps.map((step) => (
                  <div
                    key={step.step}
                    className="p-1.5 bg-slate-950 rounded border border-slate-800/60 text-[11px] space-y-0.5"
                  >
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="font-bold text-indigo-400">
                        Step #{step.step} [{step.action}]
                      </span>
                      {step.gasCost && (
                        <span className="text-amber-400 text-[10px]">+{step.gasCost} gas</span>
                      )}
                    </div>
                    <p className="text-slate-300">{step.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>Select a function above and click 'Execute' to trigger an EVM transaction.</p>
          </div>
        )}
      </div>
    </div>
  );
}
