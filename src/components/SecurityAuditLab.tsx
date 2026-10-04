"use client";

import React, { useState } from "react";
import { ShieldAlert, Terminal, Lock, CheckCircle2, Bug, FileCode } from "lucide-react";

export function SecurityAuditLab() {
  const [selectedLab, setSelectedLab] = useState<"reentrancy" | "txorigin" | "storage">("reentrancy");
  const [reentrancyState, setReentrancyState] = useState<{
    victimBal: number;
    attackerBal: number;
    logs: string[];
    isExploited: boolean;
  }>({
    victimBal: 10,
    attackerBal: 0,
    logs: [],
    isExploited: false,
  });

  const handleSimulateAttack = () => {
    const logs: string[] = [];
    logs.push("🔥 Attacker triggers withdraw() on VulnerableBank...");
    logs.push("1. Victim checks userBalance[attacker] -> 1 ETH available.");
    logs.push("2. Victim executes low-level CALL to Attacker contract with 1 ETH.");
    logs.push("3. Attacker's fallback() hook intercepts ETH transfer!");
    logs.push("4. Attacker re-enters withdraw() BEFORE victim updates userBalance[attacker] = 0!");
    logs.push("5. Victim checks userBalance[attacker] AGAIN -> STILL 1 ETH!");
    logs.push("6. Recursive execution drains remaining 10 ETH from Bank vault!");

    setReentrancyState({
      victimBal: 0,
      attackerBal: 10,
      logs,
      isExploited: true,
    });
  };

  const handleResetLab = () => {
    setReentrancyState({
      victimBal: 10,
      attackerBal: 0,
      logs: [],
      isExploited: false,
    });
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 space-y-5 shadow-2xl font-sans text-xs">
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-rose-600/20 border border-rose-500/30 rounded-lg text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              Interactive Smart Contract Security Audit Lab
            </h2>
            <p className="text-xs text-slate-400">Simulate real-world exploits & apply secure fix patterns</p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-800 bg-slate-900/60 p-1 gap-1 font-medium">
        <button
          onClick={() => setSelectedLab("reentrancy")}
          className={`flex-1 py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors ${
            selectedLab === "reentrancy"
              ? "bg-rose-950/60 text-rose-300 border border-rose-800/50 font-semibold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Bug className="w-3.5 h-3.5 text-rose-400" /> Reentrancy Attack
        </button>

        <button
          onClick={() => setSelectedLab("txorigin")}
          className={`flex-1 py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors ${
            selectedLab === "txorigin"
              ? "bg-rose-950/60 text-rose-300 border border-rose-800/50 font-semibold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-rose-400" /> tx.origin Phishing
        </button>

        <button
          onClick={() => setSelectedLab("storage")}
          className={`flex-1 py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors ${
            selectedLab === "storage"
              ? "bg-rose-950/60 text-rose-300 border border-rose-800/50 font-semibold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-rose-400" /> Proxy Storage Collision
        </button>
      </div>

      {selectedLab === "reentrancy" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-900 border border-rose-900/40 rounded-lg space-y-2 font-mono">
              <div className="font-bold text-rose-400 flex items-center gap-1.5">
                <FileCode className="w-4 h-4" /> Vulnerable Pattern (Checks-Interactions-Effects)
              </div>
              <pre className="p-2.5 bg-slate-950 rounded text-rose-300 text-[11px] overflow-x-auto leading-relaxed">
{`function withdraw() public {
    uint amount = balances[msg.sender];
    require(amount > 0);

    // VULNERABLE: CALL before state update!
    (bool s, ) = msg.sender.call{value: amount}("");
    require(s);

    balances[msg.sender] = 0; // TOO LATE!
}`}
              </pre>
            </div>

            <div className="p-3.5 bg-slate-900 border border-emerald-900/40 rounded-lg space-y-2 font-mono">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Secure Fix Pattern (CEI or Guard)
              </div>
              <pre className="p-2.5 bg-slate-950 rounded text-emerald-300 text-[11px] overflow-x-auto leading-relaxed">
{`function withdraw() public nonReentrant {
    uint amount = balances[msg.sender];
    require(amount > 0);

    balances[msg.sender] = 0; // STATE FIRST!

    (bool s, ) = msg.sender.call{value: amount}("");
    require(s);
}`}
              </pre>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 font-mono text-xs flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-indigo-400" /> Interactive Reentrancy Exploit Sandbox
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleResetLab}
                  className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 font-mono"
                >
                  Reset Vault
                </button>
                <button
                  onClick={handleSimulateAttack}
                  disabled={reentrancyState.isExploited}
                  className={`px-3 py-1 font-semibold rounded transition-all text-xs font-mono flex items-center gap-1 ${
                    reentrancyState.isExploited
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-500/20"
                  }`}
                >
                  <Bug className="w-3.5 h-3.5" /> Trigger Reentrancy Exploit
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center font-mono">
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px]">Victim Bank Vault Balance</span>
                <p className="text-lg font-bold text-slate-100">{reentrancyState.victimBal} ETH</p>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px]">Attacker Contract Balance</span>
                <p className="text-lg font-bold text-rose-400">{reentrancyState.attackerBal} ETH</p>
              </div>
            </div>

            {reentrancyState.logs.length > 0 && (
              <div className="p-3 bg-slate-950 rounded border border-slate-800/80 font-mono text-[11px] space-y-1">
                <div className="font-bold text-slate-400 mb-1">EVM Execution & Call Frame Log:</div>
                {reentrancyState.logs.map((log, idx) => (
                  <p key={idx} className="text-rose-300 leading-relaxed">{log}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedLab === "txorigin" && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 font-sans">
          <h3 className="font-bold text-slate-200 text-xs">tx.origin Phishing Mechanism</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            When an authorized contract owner calls an attacker's malicious contract, the attacker's contract forwards a call to the target contract. Inside the target contract, <code className="text-amber-400 font-mono">msg.sender</code> is the attacker contract, but <code className="text-rose-400 font-mono">tx.origin</code> is the original victim owner address!
          </p>
          <div className="p-3 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-amber-300">
            <strong>Rule of Thumb:</strong> NEVER use <code className="text-rose-400">tx.origin</code> for access authorization checks. Always use <code className="text-emerald-400">msg.sender</code>.
          </div>
        </div>
      )}

      {selectedLab === "storage" && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 font-sans">
          <h3 className="font-bold text-slate-200 text-xs">Proxy Upgradeability Storage Collision</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Proxy contracts delegate call execution to implementation contracts while retaining state in the Proxy. If variable declarations in implementation contract V2 change storage slot alignment, slot 0 in the Proxy will be overwritten, causing critical contract corruption!
          </p>
        </div>
      )}
    </div>
  );
}
