"use client";

import React, { useState } from "react";
import { ALL_LESSONS, DOC_COVERAGE_MAP } from "../data/lessons";
import { searchCurriculum } from "../data/curriculum";
import {
  BookOpen,
  Code,
  ShieldAlert,
  Search,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
  Award,
  ExternalLink,
} from "lucide-react";

interface SidebarProps {
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
  completedLessonIds: string[];
}

export function Sidebar({ currentLessonId, onSelectLesson, completedLessonIds }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"curriculum" | "coverage">("curriculum");

  const filteredLessons = searchQuery ? searchCurriculum(searchQuery) : ALL_LESSONS;

  const grouped = filteredLessons.reduce((acc, lesson) => {
    if (!acc[lesson.level]) acc[lesson.level] = [];
    acc[lesson.level].push(lesson);
    return acc;
  }, {} as Record<string, typeof ALL_LESSONS>);

  const totalLessons = ALL_LESSONS.length;
  const progressPercent = Math.round((completedLessonIds.length / totalLessons) * 100);

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-screen select-none">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-500/20">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight flex items-center gap-1.5 text-sm">
              Solidity Master <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded font-mono">v0.8.20</span>
            </h1>
            <p className="text-xs text-slate-400">Interactive EVM Academy</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-950/50 border-b border-slate-800">
        <div className="flex justify-between items-center text-xs mb-1.5">
          <span className="text-slate-400 flex items-center gap-1 font-medium">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            Overall Mastery
          </span>
          <span className="font-mono text-indigo-400 font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex border-b border-slate-800 bg-slate-900/80 p-1 gap-1 text-xs font-medium">
        <button
          onClick={() => setActiveTab("curriculum")}
          className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "curriculum"
              ? "bg-slate-800 text-indigo-400 font-semibold shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Curriculum
        </button>
        <button
          onClick={() => setActiveTab("coverage")}
          className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "coverage"
              ? "bg-slate-800 text-indigo-400 font-semibold shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Doc Map ({DOC_COVERAGE_MAP.length})
        </button>
      </div>

      {activeTab === "curriculum" && (
        <div className="p-3 border-b border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search concepts, opcodes, error types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {activeTab === "curriculum" ? (
          Object.keys(grouped).length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              No matching lessons found for "{searchQuery}".
            </div>
          ) : (
            Object.entries(grouped).map(([level, lessons]) => (
              <div key={level} className="space-y-1">
                <div className="px-2 py-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase flex items-center justify-between">
                  <span>{level}</span>
                  <span className="text-[10px] text-slate-500 font-mono font-normal">
                    {lessons.filter((l) => completedLessonIds.includes(l.id)).length}/{lessons.length}
                  </span>
                </div>

                <div className="space-y-0.5">
                  {lessons.map((lesson) => {
                    const isSelected = lesson.id === currentLessonId;
                    const isDone = completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson.id)}
                        className={`w-full text-left px-2.5 py-2 rounded-md transition-all flex items-start space-x-2 text-xs group ${
                          isSelected
                            ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-medium"
                            : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : lesson.level === "Security Lab" ? (
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                          ) : (
                            <div
                              className={`w-2 h-2 rounded-full ${
                                isSelected ? "bg-indigo-400" : "bg-slate-700 group-hover:bg-slate-500"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="truncate flex items-center justify-between">
                            <span className="truncate">{lesson.title.split(": ")[1] || lesson.title}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 truncate mt-0.5">
                            {lesson.category}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )
        ) : (
          <div className="space-y-2">
            <div className="p-2 bg-indigo-950/40 border border-indigo-500/20 rounded-md text-xs text-indigo-300">
              <p className="font-medium flex items-center gap-1 text-[11px] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Technical Source of Truth
              </p>
              100% of official Solidity documentation mapped directly into interactive exercises & security labs.
            </div>

            <div className="space-y-2 mt-2">
              {DOC_COVERAGE_MAP.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs hover:border-slate-700 transition-colors"
                >
                  <div className="font-medium text-slate-200 flex items-start justify-between gap-1">
                    <span className="text-[11px] leading-tight">{item.section}</span>
                    <a
                      href={item.officialDocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 shrink-0"
                      title="View Official Solidity Documentation"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {item.keyConcepts.map((concept, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700/50"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onSelectLesson(item.coveredInLessonId)}
                    className="mt-2 text-[10px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                  >
                    Jump to Lesson <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
