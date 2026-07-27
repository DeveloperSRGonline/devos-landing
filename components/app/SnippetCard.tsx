"use client";

import React, { useState } from "react";
import { Snippet } from "@/types/workspace";
import { Copy, Check, Trash2, Code2 } from "lucide-react";

interface SnippetCardProps {
  snippet: Snippet;
  onDelete: (id: string) => void;
}

const languageColors: Record<string, { bg: string; text: string; border: string }> = {
  TypeScript: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  JavaScript: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  Python: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" },
  Go: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
  Bash: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  Other: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
};

export function SnippetCard({ snippet, onDelete }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const style = languageColors[snippet.language] || languageColors.Other;

  return (
    <div className="group relative rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 p-5 space-y-4 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/5 text-white/50 border border-white/5">
            <Code2 className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-tight">{snippet.title}</h4>
            <span
              className={`inline-flex items-center px-2 py-0.5 mt-0.5 rounded-md text-[10px] font-mono font-medium border ${style.bg} ${style.text} ${style.border}`}
            >
              {snippet.language}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white/60" />
                <span>Copy Code</span>
              </>
            )}
          </button>
          <button
            onClick={() => onDelete(snippet.id)}
            className="opacity-0 group-hover:opacity-100 p-2 rounded-xl hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all"
            title="Delete Snippet"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="relative rounded-xl bg-black/60 border border-white/10 overflow-hidden group-hover:border-white/20 transition-colors shadow-inner">
        {/* Editor Chrome Top Bar */}
        <div className="px-4 py-2 border-b border-white/5 bg-white/[0.02] flex items-center justify-between text-[10px] font-mono text-white/30">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/40" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
            <span className="w-2 h-2 rounded-full bg-green-500/40" />
          </div>
          <span>UTF-8 &bull; {snippet.language}</span>
        </div>

        <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
}

