"use client";

import React, { useState, useEffect } from "react";
import { ALL_LESSONS } from "../data/lessons";
import { getLessonById } from "../data/curriculum";
import { compileSolidityClient } from "../lib/compilerClient";
import { ContractSimulator } from "../lib/simulator";
import { CompilationResult, ExecutionResult } from "../types/execution";
import { loadUserProgress, saveUserProgress, UserProgress } from "../lib/progress";

import { Sidebar } from "../components/Sidebar";
import { LessonReader } from "../components/LessonReader";
import { CodeEditor } from "../components/CodeEditor";
import { ExecutionConsole } from "../components/Console";
import { AITutor } from "../components/AITutor";
import { ExerciseRunner } from "../components/ExerciseRunner";
import { QuizSection } from "../components/QuizSection";
import { SecurityAuditLab } from "../components/SecurityAuditLab";

import { BookOpen, Code, HelpCircle, ShieldAlert } from "lucide-react";

export default function Home() {
  const [currentLessonId, setCurrentLessonId] = useState<string>("level-0-blockchain-evm");
  const currentLesson = getLessonById(currentLessonId) || ALL_LESSONS[0];

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"lesson" | "exercise" | "quiz" | "security">("lesson");
  const [userCode, setUserCode] = useState<string>(currentLesson.codeExample.code);

  const [compilation, setCompilation] = useState<CompilationResult | null>(null);
  const [execution, setExecution] = useState<ExecutionResult | null>(null);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [simulator, setSimulator] = useState<ContractSimulator | null>(null);

  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    solvedExercises: [],
    quizScores: {},
    userCodeStorage: {},
  });

  useEffect(() => {
    const loaded = loadUserProgress();
    setProgress(loaded);
  }, []);

  useEffect(() => {
    const savedCode = progress.userCodeStorage[currentLessonId];
    if (savedCode) {
      setUserCode(savedCode);
    } else {
      setUserCode(
        activeWorkspaceTab === "exercise"
          ? currentLesson.exercise.starterCode
          : currentLesson.codeExample.code
      );
    }
    setCompilation(null);
    setExecution(null);
    setSimulator(null);
  }, [currentLessonId, activeWorkspaceTab]);

  const handleCodeChange = (val: string | undefined) => {
    const newCode = val || "";
    setUserCode(newCode);

    const updated = {
      ...progress,
      userCodeStorage: {
        ...progress.userCodeStorage,
        [currentLessonId]: newCode,
      },
    };
    setProgress(updated);
    saveUserProgress(updated);
  };

  const handleCompile = async () => {
    setIsCompiling(true);
    const result = await compileSolidityClient(userCode, currentLesson.codeExample.filename);
    setCompilation(result);
    setExecution(null);

    if (result.success) {
      const contractNames = Object.keys(result.contracts);
      if (contractNames.length > 0) {
        const sim = new ContractSimulator(result.contracts[contractNames[0]]);
        setSimulator(sim);
      }
    }
    setIsCompiling(false);
  };

  const handleResetCode = () => {
    const defaultCode =
      activeWorkspaceTab === "exercise"
        ? currentLesson.exercise.starterCode
        : currentLesson.codeExample.code;
    setUserCode(defaultCode);
    setCompilation(null);
    setExecution(null);
  };

  const handleExecuteFunction = (functionName: string, args: any[], valueWei: string) => {
    if (!compilation || !compilation.success) return;

    const contractNames = Object.keys(compilation.contracts);
    if (contractNames.length === 0) return;

    const sim = simulator || new ContractSimulator(compilation.contracts[contractNames[0]]);
    const execRes = sim.executeFunction(userCode, functionName, args, valueWei);
    setExecution(execRes);
    setSimulator(sim);
  };

  const handleMarkLessonComplete = () => {
    if (!progress.completedLessons.includes(currentLessonId)) {
      const updated = {
        ...progress,
        completedLessons: [...progress.completedLessons, currentLessonId],
      };
      setProgress(updated);
      saveUserProgress(updated);
    }
  };

  const handleNextLesson = () => {
    handleMarkLessonComplete();
    const currentIdx = ALL_LESSONS.findIndex((l) => l.id === currentLessonId);
    if (currentIdx >= 0 && currentIdx < ALL_LESSONS.length - 1) {
      setCurrentLessonId(ALL_LESSONS[currentIdx + 1].id);
      setActiveWorkspaceTab("lesson");
    }
  };

  const handleSolveExercise = () => {
    if (!progress.solvedExercises.includes(currentLesson.exercise.id)) {
      const updated = {
        ...progress,
        solvedExercises: [...progress.solvedExercises, currentLesson.exercise.id],
      };
      setProgress(updated);
      saveUserProgress(updated);
    }
  };

  const handleCompleteQuiz = (score: number) => {
    const updated = {
      ...progress,
      quizScores: {
        ...progress.quizScores,
        [currentLessonId]: score,
      },
    };
    setProgress(updated);
    saveUserProgress(updated);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Sidebar
        currentLessonId={currentLessonId}
        onSelectLesson={(id) => {
          setCurrentLessonId(id);
          setActiveWorkspaceTab("lesson");
        }}
        completedLessonIds={progress.completedLessons}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded bg-indigo-600/30 text-indigo-300 border border-indigo-500/30">
              {currentLesson.level}
            </span>
            <h2 className="text-sm font-bold text-slate-100">{currentLesson.title}</h2>
          </div>

          <div className="flex border border-slate-800 rounded-lg p-1 bg-slate-950 gap-1 text-xs font-medium">
            <button
              onClick={() => setActiveWorkspaceTab("lesson")}
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition-colors ${
                activeWorkspaceTab === "lesson"
                  ? "bg-indigo-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lesson Material</span>
            </button>

            <button
              onClick={() => setActiveWorkspaceTab("exercise")}
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition-colors ${
                activeWorkspaceTab === "exercise"
                  ? "bg-indigo-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Practice Exercise</span>
            </button>

            <button
              onClick={() => setActiveWorkspaceTab("quiz")}
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition-colors ${
                activeWorkspaceTab === "quiz"
                  ? "bg-indigo-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Quiz ({currentLesson.quiz.length})</span>
            </button>

            {currentLesson.level === "Security Lab" && (
              <button
                onClick={() => setActiveWorkspaceTab("security")}
                className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition-colors ${
                  activeWorkspaceTab === "security"
                    ? "bg-rose-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-300" />
                <span>Security Audit Lab</span>
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 p-4 gap-4 overflow-hidden">
          <div className="lg:col-span-6 h-full overflow-hidden flex flex-col">
            {activeWorkspaceTab === "lesson" && (
              <LessonReader
                lesson={currentLesson}
                onNextLesson={handleNextLesson}
                isCompleted={progress.completedLessons.includes(currentLessonId)}
                onMarkComplete={handleMarkLessonComplete}
              />
            )}

            {activeWorkspaceTab === "exercise" && (
              <div className="h-full overflow-y-auto">
                <ExerciseRunner
                  exercise={currentLesson.exercise}
                  userCode={userCode}
                  compilation={compilation}
                  execution={execution}
                  onSolveExercise={handleSolveExercise}
                />
              </div>
            )}

            {activeWorkspaceTab === "quiz" && (
              <div className="h-full overflow-y-auto">
                <QuizSection
                  questions={currentLesson.quiz}
                  onCompleteQuiz={handleCompleteQuiz}
                />
              </div>
            )}

            {activeWorkspaceTab === "security" && (
              <div className="h-full overflow-y-auto">
                <SecurityAuditLab />
              </div>
            )}
          </div>

          <div className="lg:col-span-6 h-full grid grid-rows-12 gap-3 overflow-hidden">
            <div className="row-span-6 min-h-0">
              <CodeEditor
                code={userCode}
                onChange={handleCodeChange}
                onCompile={handleCompile}
                onReset={handleResetCode}
                isCompiling={isCompiling}
                filename={currentLesson.codeExample.filename}
                hasErrors={compilation !== null && !compilation.success}
              />
            </div>

            <div className="row-span-6 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-3">
              <ExecutionConsole
                compilation={compilation}
                execution={execution}
                onExecuteFunction={handleExecuteFunction}
              />

              <AITutor
                lesson={currentLesson}
                userCode={userCode}
                compilation={compilation}
                execution={execution}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
