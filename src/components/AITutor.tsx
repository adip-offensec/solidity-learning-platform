"use client";

import React, { useState } from "react";
import { Lesson } from "@/types/learning";
import { CompilationResult, ExecutionResult } from "@/types/execution";
import { TutorMessage, generateTutorResponse, explainCodeLineByLine } from "@/lib/aiTutor";
import { Bot, Send, Sparkles, HelpCircle, Shield, Lightbulb, Code } from "lucide-react";

interface AITutorProps {
  lesson: Lesson;
  userCode: string;
  compilation: CompilationResult | null;
  execution: ExecutionResult | null;
}

export function AITutor({ lesson, userCode, compilation, execution }: AITutorProps) {
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: "init",
      sender: "tutor",
      text: `👋 Hi! I am your AI Solidity Tutor for ${lesson.title}.\n\nI can explain code, break down compiler errors, explain EVM gas usage, or give hints for your exercises!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: TutorMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const tutorReply = generateTutorResponse(q, {
      lesson,
      userCode,
      compilation,
      execution,
    });

    setMessages((prev) => [...prev, userMsg, tutorReply]);
    if (!textToSend) setInputQuery("");
  };

  const handleLineBreakdown = () => {
    const breakdownText = explainCodeLineByLine(userCode);
    const tutorMsg: TutorMessage = {
      id: `breakdown-${Date.now()}`,
      sender: "tutor",
      text: breakdownText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, tutorMsg]);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
      <div className="bg-slate-900 border-b border-slate-800 p-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-indigo-600 rounded-md text-white shadow-md shadow-indigo-500/20">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
              AI Solidity Tutor
            </h3>
            <p className="text-[10px] text-slate-400">Context: {lesson.title.split(":")[1] || lesson.title}</p>
          </div>
        </div>

        <button
          onClick={handleLineBreakdown}
          className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 rounded transition-colors flex items-center space-x-1 font-mono text-[11px]"
        >
          <Code className="w-3.5 h-3.5 text-indigo-400" />
          <span>Explain Code</span>
        </button>
      </div>

      <div className="p-2 bg-slate-900/60 border-b border-slate-800 flex flex-wrap gap-1.5 text-[11px]">
        <button
          onClick={() => handleSend("Give me a hint")}
          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/80 flex items-center gap-1 transition-colors"
        >
          <Lightbulb className="w-3 h-3 text-amber-400" />
          <span>Hint</span>
        </button>

        <button
          onClick={() => handleSend("Explain like I'm a beginner")}
          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/80 flex items-center gap-1 transition-colors"
        >
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>Beginner View</span>
        </button>

        <button
          onClick={() => handleSend("Why is this wrong?")}
          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/80 flex items-center gap-1 transition-colors"
        >
          <HelpCircle className="w-3 h-3 text-rose-400" />
          <span>Debug Errors</span>
        </button>

        <button
          onClick={() => handleSend("How could this be attacked?")}
          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/80 flex items-center gap-1 transition-colors"
        >
          <Shield className="w-3 h-3 text-emerald-400" />
          <span>Security Risk</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[88%] p-3 rounded-lg leading-relaxed whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                  : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[9px] text-slate-500 mt-1 font-mono">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Ask AI Tutor..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={() => handleSend()}
          className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
