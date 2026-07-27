"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { SnippetCard } from "./SnippetCard";
import { SnippetForm } from "./SnippetForm";
import { Plus, Code2 } from "lucide-react";

export function SnippetsPanel() {
  const { snippets, activeProjectId, addSnippet, deleteSnippet } =
    useWorkspaceStore();
  const [showForm, setShowForm] = useState(false);

  const projectSnippets = snippets.filter(
    (s) => s.projectId === activeProjectId
  );

  const handleSave = (data: {
    title: string;
    language: any;
    code: string;
  }) => {
    if (!activeProjectId) return;
    addSnippet({
      projectId: activeProjectId,
      ...data,
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80">
          Snippets ({projectSnippets.length})
        </h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent text-white hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
          >
            <Plus className="w-3.5 h-3.5" /> New Snippet
          </button>
        )}
      </div>

      {showForm && (
        <SnippetForm
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {projectSnippets.length === 0 && !showForm ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/10 rounded-xl">
          <Code2 className="w-10 h-10 text-white/20 mb-3" />
          <p className="text-sm text-white/60 mb-1">No snippets yet</p>
          <p className="text-xs text-white/40 mb-4">
            Save reusable code snippets linked to this project.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> New Snippet
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {projectSnippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onDelete={deleteSnippet}
            />
          ))}
        </div>
      )}
    </div>
  );
}
