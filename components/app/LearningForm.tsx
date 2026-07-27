"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { LearningItem } from "@/types/workspace";

interface LearningFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function LearningForm({ onSuccess, onCancel }: LearningFormProps) {
  const { activeProjectId, addLearningItem } = useWorkspaceStore();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<LearningItem["type"]>("Tutorial");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<LearningItem["status"]>("todo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !activeProjectId) return;

    addLearningItem({
      projectId: activeProjectId,
      title: title.trim(),
      url: url.trim() || undefined,
      type,
      notes: notes.trim(),
      status,
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4 mb-6">
      <h3 className="text-sm font-semibold text-white">Add Learning Resource</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/60 mb-1 font-medium">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Next.js App Router Masterclass"
            className="w-full px-3 py-2 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-xs text-white/60 mb-1 font-medium">Resource URL (optional)</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/60 mb-1 font-medium">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as LearningItem["type"])}
            className="w-full px-3 py-2 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
          >
            <option value="Tutorial">Tutorial</option>
            <option value="Course">Course</option>
            <option value="Docs">Docs</option>
            <option value="Video">Video</option>
            <option value="Book">Book</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-white/60 mb-1 font-medium">Initial Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as LearningItem["status"])}
            className="w-full px-3 py-2 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
          >
            <option value="todo">To Start</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-white/60 mb-1 font-medium">Notes (optional)</label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Key keypoints, prerequisites, or progress notes..."
          className="w-full px-3 py-2 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent resize-none"
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
          Add Resource
        </button>
      </div>
    </form>
  );
}
