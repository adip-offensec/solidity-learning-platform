"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, CheckCircle, AlertCircle, FileCode } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  onCompile: () => void;
  onReset: () => void;
  isCompiling: boolean;
  filename?: string;
  hasErrors?: boolean;
}

export function CodeEditor({
  code,
  onChange,
  onCompile,
  onReset,
  isCompiling,
  filename = "Contract.sol",
  hasErrors = false,
}: CodeEditorProps) {
  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono text-slate-300 font-medium">{filename}</span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
            Solidity ^0.8.20
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onReset}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors flex items-center space-x-1"
            title="Reset code to original starter code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={onCompile}
            disabled={isCompiling}
            className={`px-3 py-1 text-xs font-medium rounded shadow-md transition-all flex items-center space-x-1.5 ${
              isCompiling
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20 active:scale-95"
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isCompiling ? "animate-spin" : ""}`} />
            <span>{isCompiling ? "Compiling..." : "Compile & Run"}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 relative min-h-[350px]">
        <Editor
          height="100%"
          defaultLanguage="solidity"
          language="solidity"
          theme="vs-dark"
          value={code}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: "on",
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>

      <div className="bg-slate-900/90 border-t border-slate-800 px-3 py-1.5 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center space-x-2">
          {hasErrors ? (
            <span className="text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Compilation failed
            </span>
          ) : (
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Ready for EVM Compilation
            </span>
          )}
        </div>
        <span className="text-slate-500">UTF-8 | EVM Target: Shanghai</span>
      </div>
    </div>
  );
}
