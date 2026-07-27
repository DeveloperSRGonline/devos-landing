"use client";

import React, { useState } from "react";
import { Snippet } from "@/types/workspace";

interface SnippetFormProps {
  onSave: (data: {
    title: string;
    language: Snippet["language"];
    code: string;
  }) => void;
  onCancel: () => void;
}

export function SnippetForm({ onSave, onCancel }: SnippetFormProps) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState<Snippet["language"]>("TypeScript");
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;
    onSave({ title, language, code });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-4"
    >
      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
        New Snippet
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Snippet title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value as Snippet["language"])
            }
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
          >
            <option value="TypeScript" className="bg-surface text-white">TypeScript</option>
            <option value="JavaScript" className="bg-surface text-white">JavaScript</option>
            <option value="Python" className="bg-surface text-white">Python</option>
            <option value="Go" className="bg-surface text-white">Go</option>
            <option value="Bash" className="bg-surface text-white">Bash</option>
            <option value="Other" className="bg-surface text-white">Other</option>
          </select>
        </div>
      </div>

      <textarea
        placeholder="Paste or write code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        rows={6}
        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-accent resize-y"
      />

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:bg-white/5 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-accent text-white hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
        >
          Save Snippet
        </button>
      </div>
    </form>
  );
}
