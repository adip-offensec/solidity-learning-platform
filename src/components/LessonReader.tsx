"use client";

import React, { useState } from "react";
import { Lesson } from "../types/learning";
import { DataLocationsDiagram, ExecutionFlowDiagram } from "./VisualDiagrams";
import {
  BookOpen,
  Code2,
  Cpu,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Sparkles,
} from "lucide-react";

interface LessonReaderProps {
  lesson: Lesson;
  onNextLesson?: () => void;
  isCompleted?: boolean;
  onMarkComplete?: () => void;
}

export function LessonReader({
  lesson,
  onNextLesson,
  isCompleted = false,
  onMarkComplete,
}: LessonReaderProps) {
  const [activeTab, setActiveTab] = useState<"beginner" | "developer" | "evm" | "execution" | "mistakes">(
    "beginner"
  );

  return (
    <article className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
      <header className="bg-slate-900 border-b border-slate-800 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-indigo-600/30 text-indigo-300 border border-indigo-500/30">
              {lesson.level}
            </span>
            <span className="text-xs text-slate-400 font-mono">{lesson.category}</span>
          </div>

          <a
            href={lesson.docRef.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 font-medium group"
          >
            <span>{lesson.docRef.title}</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <h1 className="text-xl font-bold text-white tracking-tight">{lesson.title}</h1>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{lesson.summary}</p>
      </header>

      <div className="flex border-b border-slate-800 bg-slate-900/50 p-1 gap-1 text-xs font-medium">
        <button
          onClick={() => setActiveTab("beginner")}
          className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-1.5 transition-colors ${
            activeTab === "beginner"
              ? "bg-slate-800 text-indigo-400 font-semibold shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Level 1: Beginner</span>
        </button>

        <button
          onClick={() => setActiveTab("developer")}
          className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-1.5 transition-colors ${
            activeTab === "developer"
              ? "bg-slate-800 text-indigo-400 font-semibold shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Level 2: Developer</span>
        </button>

        <button
          onClick={() => setActiveTab("evm")}
          className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-1.5 transition-colors ${
            activeTab === "evm"
              ? "bg-slate-800 text-indigo-400 font-semibold shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Level 3: EVM Internals</span>
        </button>

        <button
          onClick={() => setActiveTab("execution")}
          className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-1.5 transition-colors ${
            activeTab === "execution"
              ? "bg-slate-800 text-indigo-400 font-semibold shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Trace Step-by-Step</span>
        </button>

        <button
          onClick={() => setActiveTab("mistakes")}
          className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-1.5 transition-colors ${
            activeTab === "mistakes"
              ? "bg-slate-800 text-indigo-400 font-semibold shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Common Mistakes</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
        {activeTab === "beginner" && (
          <section className="space-y-4">
            <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-lg text-slate-200 leading-relaxed whitespace-pre-wrap">
              {lesson.beginnerExplanation}
            </div>

            {lesson.id === "level-4-data-locations-evm" && <DataLocationsDiagram />}
            {lesson.id === "level-0-blockchain-evm" && <ExecutionFlowDiagram />}
          </section>
        )}

        {activeTab === "developer" && (
          <section className="space-y-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
              {lesson.developerExplanation}
            </div>
          </section>
        )}

        {activeTab === "evm" && (
          <section className="space-y-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-mono text-xs leading-relaxed whitespace-pre-wrap">
              {lesson.evmExplanation}
            </div>
            <DataLocationsDiagram />
          </section>
        )}

        {activeTab === "execution" && (
          <section className="space-y-3">
            <h3 className="font-bold text-slate-200 text-sm">EVM Transaction Life Cycle Trace</h3>
            <div className="space-y-2">
              {lesson.stepByStepExecution.map((step) => (
                <div
                  key={step.step}
                  className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1 font-mono text-xs"
                >
                  <div className="flex items-center justify-between text-indigo-400 font-bold">
                    <span>
                      Step #{step.step}: {step.title}
                    </span>
                    {step.evmDetail && (
                      <span className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                        {step.evmDetail}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 font-sans">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "mistakes" && (
          <section className="space-y-3">
            {lesson.commonMistakes.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                <h4 className="font-bold text-rose-400 flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Mistake: {item.mistake}
                </h4>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-400">Why it happens:</strong> {item.whyItHappens}
                </p>
                <div className="p-2 bg-emerald-950/30 border border-emerald-800/40 rounded text-xs text-emerald-300">
                  <strong>How to fix:</strong> {item.howToFix}
                </div>
              </div>
            ))}
          </section>
        )}

        {lesson.securityNotes && lesson.securityNotes.length > 0 && (
          <section className="mt-6 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Integrated Security Warning
            </h3>

            <div className="space-y-3">
              {lesson.securityNotes.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-rose-950/20 border border-rose-900/50 rounded-lg space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-rose-300">
                    <span>{sec.vulnerability}</span>
                    <span className="px-2 py-0.5 text-[10px] bg-rose-900/60 text-rose-200 rounded uppercase">
                      {sec.riskLevel} Risk
                    </span>
                  </div>

                  <p className="text-slate-300 leading-relaxed">{sec.explanation}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                    <div className="p-2 bg-slate-950 rounded border border-rose-900/40 text-rose-300">
                      <div className="text-[10px] text-rose-400/80 mb-1 font-sans font-semibold">Vulnerable Pattern</div>
                      <code>{sec.vulnerablePattern}</code>
                    </div>

                    <div className="p-2 bg-slate-950 rounded border border-emerald-900/40 text-emerald-300">
                      <div className="text-[10px] text-emerald-400/80 mb-1 font-sans font-semibold">Secure Fixed Pattern</div>
                      <code>{sec.fixedPattern}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer className="bg-slate-900 border-t border-slate-800 p-4 flex items-center justify-between">
        {onMarkComplete && (
          <button
            onClick={onMarkComplete}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors flex items-center space-x-1.5 ${
              isCompleted
                ? "bg-emerald-950/60 text-emerald-300 border-emerald-800"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
            }`}
          >
            <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? "text-emerald-400" : "text-slate-400"}`} />
            <span>{isCompleted ? "Lesson Completed" : "Mark as Complete"}</span>
          </button>
        )}

        {onNextLesson && (
          <button
            onClick={onNextLesson}
            className="px-4 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded shadow-md shadow-indigo-500/20 transition-all flex items-center space-x-1 ml-auto"
          >
            <span>Next Lesson</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </footer>
    </article>
  );
}
