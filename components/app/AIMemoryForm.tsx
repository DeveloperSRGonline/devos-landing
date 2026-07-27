"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { AIMemory } from "@/types/workspace";

interface AIMemoryFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function AIMemoryForm({ onSuccess, onCancel }: AIMemoryFormProps) {
  const { activeProjectId, addAIMemory } = useWorkspaceStore();
  const [title, setTitle] = useState("");
  const [source, setSource] = useState<AIMemory["source"]>("ChatGPT");
  const [tagsInput, setTagsInput] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !activeProjectId) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

    addAIMemory({
      projectId: activeProjectId,
      title: title.trim(),
      source,
      tags,
      summary: summary.trim(),
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4 mb-6">
      <h3 className="text-sm font-semibold text-white">Save New AI Memory</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/60 mb-1 font-medium">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. JWT Auth Flow Recommendation"
            className="w-full px-3 py-2 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-xs text-white/60 mb-1 font-medium">AI Source</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value as AIMemory["source"])}
            className="w-full px-3 py-2 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
          >
            <option value="ChatGPT">ChatGPT</option>
            <option value="Claude">Claude</option>
            <option value="Gemini">Gemini</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-white/60 mb-1 font-medium">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="e.g. auth, jwt, security"
          className="w-full px-3 py-2 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-xs text-white/60 mb-1 font-medium">Summary / Context</label>
        <textarea
          required
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Paste or write the AI response summary..."
          className="w-full px-3 py-2 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent resize-y"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
        >
          Save Memory
        </button>
      </div>
    </form>
  );
}
