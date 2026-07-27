"use client";

import React from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { NotesPanel } from "./NoteEditor";
import { SnippetsPanel } from "./SnippetsPanel";
import { AIMemoryPanel } from "./AIMemoryPanel";
import { LearningPanel } from "./LearningPanel";
import { FileText, Code2, Cpu, GraduationCap } from "lucide-react";

export function WorkspaceView() {
  const { activeTab, setActiveTab } = useWorkspaceStore();

  const tabs = [
    { id: "notes", label: "Notes", icon: FileText },
    { id: "snippets", label: "Snippets", icon: Code2 },
    { id: "ai-memory", label: "AI Memory", icon: Cpu },
    { id: "learning", label: "Learning", icon: GraduationCap },
  ] as const;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Workspace Header Nav Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-surface/90 border border-white/10 rounded-2xl shadow-inner backdrop-blur-md">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-white shadow-lg shadow-accent/25 ring-1 ring-white/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-white/40"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Card Container */}
      <div className="p-6 md:p-8 rounded-2xl bg-surface/60 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/60 min-h-[520px] relative overflow-hidden">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {activeTab === "notes" && <NotesPanel />}
          {activeTab === "snippets" && <SnippetsPanel />}
          {activeTab === "ai-memory" && <AIMemoryPanel />}
          {activeTab === "learning" && <LearningPanel />}
        </div>
      </div>
    </div>
  );
}

