"use client";

import React, { useState } from "react";
import { Exercise } from "@/types/learning";
import { CompilationResult, ExecutionResult } from "@/types/execution";
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  Eye,
  Award,
  ChevronRight,
} from "lucide-react";

interface ExerciseRunnerProps {
  exercise: Exercise;
  userCode: string;
  compilation: CompilationResult | null;
  execution: ExecutionResult | null;
  onSolveExercise: () => void;
}

export function ExerciseRunner({
  exercise,
  userCode,
  compilation,
  execution,
  onSolveExercise,
}: ExerciseRunnerProps) {
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [gradeResult, setGradeResult] = useState<{
    passed: boolean;
    feedback: string[];
  } | null>(null);

  const handleRevealNextHint = () => {
    if (hintLevel < 3) {
      setHintLevel((prev) => prev + 1);
    }
  };

  const handleGradeCode = () => {
    const feedback: string[] = [];
    let passed = true;

    if (!compilation || !compilation.success) {
      setGradeResult({
        passed: false,
        feedback: ["❌ Contract fails to compile. Fix compiler errors before submitting."],
      });
      return;
    }

    for (const tc of exercise.testCases) {
      if (tc.checkCodePattern) {
        for (const pattern of tc.checkCodePattern) {
          if (!pattern.test(userCode)) {
            passed = false;
            feedback.push(`❌ ${tc.description}: Missing required Solidity code pattern.`);
          } else {
            feedback.push(`✅ ${tc.description}: Passed code pattern check.`);
          }
        }
      } else if (tc.targetFunction) {
        if (execution && execution.functionName === tc.targetFunction) {
          if (tc.expectedRevert && execution.success) {
            passed = false;
            feedback.push(`❌ ${tc.description}: Expected function call to revert, but it succeeded.`);
          } else if (!tc.expectedRevert && !execution.success) {
            passed = false;
            feedback.push(`❌ ${tc.description}: Function call failed or reverted.`);
          } else if (tc.expectedReturn !== undefined && execution.returnValue !== tc.expectedReturn) {
            passed = false;
            feedback.push(`❌ ${tc.description}: Return value mismatch. Got ${JSON.stringify(execution.returnValue)}, expected ${JSON.stringify(tc.expectedReturn)}.`);
          } else {
            feedback.push(`✅ ${tc.description}: Function executed as expected.`);
          }
        } else {
          feedback.push(`ℹ️ ${tc.description}: Execute function '${tc.targetFunction}' in console to verify runtime behavior.`);
        }
      }
    }

    if (passed) {
      onSolveExercise();
    }

    setGradeResult({ passed, feedback });
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 space-y-5 shadow-2xl font-sans text-xs">
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Practice Exercise: {exercise.type.toUpperCase()}
          </span>
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            +100 Mastery XP
          </span>
        </div>
        <h2 className="text-base font-bold text-white mb-1.5">{exercise.title}</h2>
        <p className="text-slate-300 leading-relaxed text-xs">{exercise.prompt}</p>
      </div>

      {gradeResult && (
        <div
          className={`p-4 rounded-lg border space-y-2 ${
            gradeResult.passed
              ? "bg-emerald-950/30 border-emerald-800/50 text-emerald-200"
              : "bg-rose-950/30 border-rose-800/50 text-rose-200"
          }`}
        >
          <div className="font-bold flex items-center gap-2 text-sm">
            {gradeResult.passed ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" /> Challenge Completed!
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-rose-400">
                <XCircle className="w-5 h-5" /> Solution Needs Fixes
              </span>
            )}
          </div>

          <div className="space-y-1 font-mono text-[11px] pt-1">
            {gradeResult.feedback.map((f, idx) => (
              <p key={idx}>{f}</p>
            ))}
          </div>
        </div>
      )}

      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Progressive Hint System ({hintLevel}/3 Revealed)
          </span>

          {hintLevel < 3 && (
            <button
              onClick={handleRevealNextHint}
              className="text-indigo-400 hover:text-indigo-300 font-medium text-[11px] flex items-center gap-1"
            >
              Reveal Hint #{hintLevel + 1} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {hintLevel >= 1 && (
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded text-slate-300">
            <strong className="text-amber-400 block mb-0.5">Hint 1 (Conceptual):</strong>
            {exercise.hints[0]}
          </div>
        )}

        {hintLevel >= 2 && (
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded text-slate-300">
            <strong className="text-amber-400 block mb-0.5">Hint 2 (Guidance):</strong>
            {exercise.hints[1]}
          </div>
        )}

        {hintLevel >= 3 && (
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded text-slate-300">
            <strong className="text-amber-400 block mb-0.5">Hint 3 (Solidity Feature):</strong>
            {exercise.hints[2]}
          </div>
        )}
      </div>

      <div className="pt-2 flex flex-wrap gap-2 items-center justify-between">
        <button
          onClick={handleGradeCode}
          className="px-4 py-2 font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 text-xs"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Check & Grade Exercise</span>
        </button>

        <button
          onClick={() => setShowSolution(!showSolution)}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded transition-colors flex items-center gap-1.5 text-xs font-mono"
        >
          <Eye className="w-3.5 h-3.5 text-indigo-400" />
          <span>{showSolution ? "Hide Solution" : "Reveal Solution"}</span>
        </button>
      </div>

      {showSolution && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 font-mono">
          <div className="font-bold text-slate-200 text-xs">Official Solution Code:</div>
          <pre className="p-3 bg-slate-950 rounded border border-slate-800 text-emerald-300 overflow-x-auto text-[11px] leading-relaxed">
            {exercise.solutionCode}
          </pre>
          <div className="p-3 bg-slate-950 rounded border border-slate-800 font-sans text-slate-300 text-xs leading-relaxed">
            <strong className="text-indigo-400 block mb-1">Detailed Explanation:</strong>
            {exercise.solutionExplanation}
          </div>
        </div>
      )}
    </div>
  );
}
