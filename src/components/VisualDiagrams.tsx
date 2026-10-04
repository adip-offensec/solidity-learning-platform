"use client";

import React from "react";
import { Layers, Cpu, ArrowDown } from "lucide-react";

export function DataLocationsDiagram() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-xs my-4">
      <h4 className="text-slate-300 font-bold mb-3 flex items-center gap-1.5 text-xs uppercase tracking-wider">
        <Layers className="w-4 h-4 text-indigo-400" /> EVM Data Locations & Gas Economics
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-slate-950 p-3 rounded border border-rose-900/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between font-bold text-rose-400 mb-1">
              <span>STORAGE</span>
              <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800/50 px-1.5 py-0.5 rounded">
                20,000 Gas
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Permanent Key-Value State DB (256-bit slots). Persists forever across transactions.
            </p>
          </div>
          <div className="mt-2 text-[10px] text-rose-400/80 bg-rose-950/40 p-1 rounded border border-rose-900/30">
            Opcode: SSTORE / SLOAD
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded border border-amber-900/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between font-bold text-amber-400 mb-1">
              <span>MEMORY</span>
              <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800/50 px-1.5 py-0.5 rounded">
                3 Gas / Word
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Temporary linear byte array allocated per function call. Discarded after call ends.
            </p>
          </div>
          <div className="mt-2 text-[10px] text-amber-400/80 bg-amber-950/40 p-1 rounded border border-amber-900/30">
            Opcode: MSTORE / MLOAD
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded border border-emerald-900/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between font-bold text-emerald-400 mb-1">
              <span>CALLDATA</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/50 px-1.5 py-0.5 rounded">
                Cheapest
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Immutable, read-only payload byte buffer passed into external calls.
            </p>
          </div>
          <div className="mt-2 text-[10px] text-emerald-400/80 bg-emerald-950/40 p-1 rounded border border-emerald-900/30">
            Opcode: CALLDATALOAD
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded border border-indigo-900/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between font-bold text-indigo-400 mb-1">
              <span>STACK</span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800/50 px-1.5 py-0.5 rounded">
                1024 Slots
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              256-bit word stack for immediate arithmetic & local primitive operations.
            </p>
          </div>
          <div className="mt-2 text-[10px] text-indigo-400/80 bg-indigo-950/40 p-1 rounded border border-indigo-900/30">
            Opcode: PUSH / POP / DUP
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExecutionFlowDiagram() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-xs my-4">
      <h4 className="text-slate-300 font-bold mb-3 flex items-center gap-1.5 text-xs uppercase tracking-wider">
        <Cpu className="w-4 h-4 text-emerald-400" /> Transaction Execution Flow
      </h4>

      <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center text-[11px]">
        <div className="bg-slate-950 p-2.5 rounded border border-slate-800 w-full md:w-auto flex-1">
          <span className="font-bold text-slate-200">1. EOA Tx</span>
          <p className="text-[10px] text-slate-500 mt-0.5">Signed transaction submitted</p>
        </div>
        <ArrowDown className="w-4 h-4 text-indigo-400 md:-rotate-90 shrink-0" />

        <div className="bg-slate-950 p-2.5 rounded border border-slate-800 w-full md:w-auto flex-1">
          <span className="font-bold text-indigo-300">2. Function Selector</span>
          <p className="text-[10px] text-slate-500 mt-0.5">bytes4(keccak256)</p>
        </div>
        <ArrowDown className="w-4 h-4 text-indigo-400 md:-rotate-90 shrink-0" />

        <div className="bg-slate-950 p-2.5 rounded border border-slate-800 w-full md:w-auto flex-1">
          <span className="font-bold text-amber-300">3. EVM Opcodes</span>
          <p className="text-[10px] text-slate-500 mt-0.5">Gas deducted step-by-step</p>
        </div>
        <ArrowDown className="w-4 h-4 text-indigo-400 md:-rotate-90 shrink-0" />

        <div className="bg-slate-950 p-2.5 rounded border border-slate-800 w-full md:w-auto flex-1">
          <span className="font-bold text-emerald-300">4. State Commit</span>
          <p className="text-[10px] text-slate-500 mt-0.5">SSTORE updates state root</p>
        </div>
      </div>
    </div>
  );
}
