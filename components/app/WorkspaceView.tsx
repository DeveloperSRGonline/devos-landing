"use client";

import React from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { NotesPanel } from "./NoteEditor";
import { SnippetsPanel } from "./SnippetsPanel";
import { AIMemoryPanel } from "./AIMemoryPanel";
import { LearningPanel } from "./LearningPanel";

export function WorkspaceView() {
  const { activeTab, setActiveTab } = useWorkspaceStore();

  return (
    <div className="space-y-6">
      {/* Workspace Navigation Tabs Header */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        {(["notes", "snippets", "ai-memory", "learning"] as const).map((tab) => {
          const isActive = activeTab === tab;
          const labels: Record<typeof tab, string> = {
            notes: "Notes",
            snippets: "Snippets",
            "ai-memory": "AI Memory",
            learning: "Learning",
          };

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="p-6 rounded-2xl bg-surface/50 border border-white/10 min-h-[400px]">
        {activeTab === "notes" && <NotesPanel />}
        {activeTab === "snippets" && <SnippetsPanel />}
        {activeTab === "ai-memory" && <AIMemoryPanel />}
        {activeTab === "learning" && <LearningPanel />}
      </div>
    </div>
  );
}
