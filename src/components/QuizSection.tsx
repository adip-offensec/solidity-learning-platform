"use client";

import React, { useState } from "react";
import { QuizQuestion } from "@/types/learning";
import { HelpCircle, CheckCircle2, XCircle, Award, Sparkles, RefreshCw } from "lucide-react";

interface QuizSectionProps {
  questions: QuizQuestion[];
  onCompleteQuiz?: (score: number) => void;
}

export function QuizSection({ questions, onCompleteQuiz }: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    if (onCompleteQuiz) {
      onCompleteQuiz(correctCount);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = questions.reduce((acc, q) => (selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc), 0);
  const scorePercent = Math.round((score / questions.length) * 100);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 space-y-6 shadow-2xl font-sans text-xs">
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            Active Recall & Conceptual Quiz
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Test your deep understanding of EVM & Solidity semantics.</p>
        </div>

        {submitted && (
          <div className="flex items-center gap-2 bg-indigo-950/60 border border-indigo-800 px-3 py-1.5 rounded-lg">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-100 font-mono text-xs">
              Score: {score}/{questions.length} ({scorePercent}%)
            </span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selectedIdx = selectedAnswers[q.id];
          const isCorrect = selectedIdx === q.correctIndex;

          return (
            <div key={q.id} className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 space-y-3">
              <h3 className="font-bold text-slate-200 text-xs flex items-start gap-2">
                <span className="px-2 py-0.5 bg-slate-800 text-indigo-400 font-mono rounded shrink-0">
                  Q{qIdx + 1}
                </span>
                <span>{q.question}</span>
              </h3>

              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500/50";

                  if (selectedIdx === optIdx) {
                    btnStyle = "bg-indigo-600/20 border-indigo-500 text-indigo-200 font-medium";
                  }

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-300 font-medium";
                    } else if (selectedIdx === optIdx && !isCorrect) {
                      btnStyle = "bg-rose-950/50 border-rose-500 text-rose-300";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span className="pr-2">{opt}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {submitted && selectedIdx === optIdx && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`p-3 rounded-lg border text-xs leading-relaxed space-y-1 ${
                    isCorrect
                      ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-200"
                      : "bg-slate-950 border-slate-800 text-slate-300"
                  }`}
                >
                  <p>
                    <strong className="text-indigo-400">Explanation:</strong> {q.explanation}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono pt-1">
                    <strong>Deep-Dive Reasoning:</strong> {q.deepDiveReasoning}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className={`px-5 py-2 font-semibold rounded shadow-md transition-all text-xs flex items-center gap-1.5 ${
              Object.keys(selectedAnswers).length === questions.length
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Submit Quiz Answers</span>
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            <span>Retake Quiz</span>
          </button>
        )}
      </div>
    </div>
  );
}
