"use client";

import React, { useState } from "react";
import { Snippet } from "@/types/workspace";
import { Copy, Check, Trash2 } from "lucide-react";

interface SnippetCardProps {
  snippet: Snippet;
  onDelete: (id: string) => void;
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  JavaScript: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Python: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Go: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Bash: "bg-gray-500/10 text-gray-300 border-gray-500/20",
  Other: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export function SnippetCard({ snippet, onDelete }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const badgeStyle =
    languageColors[snippet.language] || languageColors.Other;

  return (
    <div className="group relative rounded-xl bg-black/20 border border-white/10 p-4 space-y-3 hover:border-accent/40 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-white">{snippet.title}</h4>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-medium border ${badgeStyle}`}
          >
            {snippet.language}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-white/80 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            onClick={() => onDelete(snippet.id)}
            className="opacity-0 group-hover:opacity-100 p-1.5 text-white/40 hover:text-red-400 rounded transition-all"
            title="Delete Snippet"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <pre className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-white/90 overflow-x-auto leading-relaxed">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
