"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { AIMemoryCard } from "./AIMemoryCard";
import { AIMemoryForm } from "./AIMemoryForm";
import { Brain, Plus, Filter } from "lucide-react";

export function AIMemoryPanel() {
  const { activeProjectId, aiMemories } = useWorkspaceStore();
  const [showForm, setShowForm] = useState(false);
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);

  const projectMemories = aiMemories.filter((m) => m.projectId === activeProjectId);

  // Extract unique tags for current project
  const allTags = Array.from(
    new Set(projectMemories.flatMap((m) => m.tags))
  );

  const filteredMemories = activeTagFilter
    ? projectMemories.filter((m) => m.tags.includes(activeTagFilter))
    : projectMemories;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-accent" />
            AI Chat Memory
          </h3>
          <p className="text-xs text-white/50">
            Save and organize helpful AI responses, code reviews, and discussions.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
          >
            <Plus className="w-4 h-4" />
            Save AI Memory
          </button>
        )}
      </div>

      {/* New Memory Form */}
      {showForm && (
        <AIMemoryForm
          onSuccess={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-white/5">
          <span className="text-xs text-white/40 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by tag:
          </span>
          <button
            onClick={() => setActiveTagFilter(null)}
            className={`text-[11px] px-2.5 py-1 rounded-lg transition-all font-medium ${
              activeTagFilter === null
                ? "bg-accent text-white"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => {
            const isActive = activeTagFilter === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTagFilter(isActive ? null : tag)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-all font-medium ${
                  isActive
                    ? "bg-accent text-white"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      )}

      {/* Content List / Empty State */}
      {filteredMemories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 rounded-2xl bg-white/[0.02] border border-dashed border-white/10">
          <div className="p-3 rounded-full bg-white/5 text-white/40">
            <Brain className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h4 className="text-sm font-semibold text-white">
              {activeTagFilter ? `No memories tagged #${activeTagFilter}` : "No AI memories saved yet"}
            </h4>
            <p className="text-xs text-white/50">
              {activeTagFilter
                ? "Try selecting a different tag filter or add a new memory."
                : "Keep track of solutions, prompt outputs, and architecture advice from ChatGPT, Claude, or Gemini."}
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Save AI Memory
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMemories.map((memory) => (
            <AIMemoryCard
              key={memory.id}
              memory={memory}
              onTagClick={(tag) => setActiveTagFilter(activeTagFilter === tag ? null : tag)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
