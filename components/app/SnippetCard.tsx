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

/**
 * Lightweight syntax highlighter for dark mode code blocks
 */
function renderHighlightedCode(code: string, language: string) {
  const lines = code.split("\n");

  return lines.map((line, lineIdx) => {
    // Match comments starting with // or #
    const commentMatch = line.match(/^(\s*)(\/\/.*|#.*)$/);
    if (commentMatch) {
      return (
        <div key={lineIdx} className="table-row">
          <span className="table-cell pr-4 text-right text-white/20 select-none text-[11px] font-mono w-8">
            {lineIdx + 1}
          </span>
          <span className="table-cell italic text-slate-500 font-mono">
            {commentMatch[1]}
            {commentMatch[2]}
          </span>
        </div>
      );
    }

    // Tokenize line using regex matcher for keywords, strings, types, functions, numbers
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let keyCounter = 0;

    const regex =
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\/\/.+|\b(?:const|let|var|function|async|await|return|if|else|import|export|from|default|type|interface|class|def|for|in|of|try|catch|new|null|undefined|true|false|fn|struct|package)\b|\b[A-Z][a-zA-Z0-9_]*\b|\b\d+\b|\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\())/g;

    let match;
    let lastIndex = 0;

    while ((match = regex.exec(line)) !== null) {
      const matchText = match[0];
      const matchIndex = match.index;

      // Plain text before token
      if (matchIndex > lastIndex) {
        tokens.push(
          <span key={keyCounter++} className="text-slate-300">
            {line.slice(lastIndex, matchIndex)}
          </span>
        );
      }

      // Syntax color classification
      if (/^["'`]/.test(matchText)) {
        // String literal -> Emerald green
        tokens.push(
          <span key={keyCounter++} className="text-emerald-400 font-mono">
            {matchText}
          </span>
        );
      } else if (
        /^(const|let|var|function|async|await|return|if|else|import|export|from|default|type|interface|class|def|for|in|of|try|catch|new|fn|struct|package)$/.test(
          matchText
        )
      ) {
        // Reserved keywords -> Purple / Magenta
        tokens.push(
          <span key={keyCounter++} className="text-purple-400 font-semibold font-mono">
            {matchText}
          </span>
        );
      } else if (/^(true|false|null|undefined)$/.test(matchText)) {
        // Booleans & nulls -> Amber/Orange
        tokens.push(
          <span key={keyCounter++} className="text-amber-400 font-mono">
            {matchText}
          </span>
        );
      } else if (/^\d+$/.test(matchText)) {
        // Numbers -> Orange/Amber
        tokens.push(
          <span key={keyCounter++} className="text-amber-300 font-mono">
            {matchText}
          </span>
        );
      } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(matchText)) {
        // Types / Classes -> Cyan
        tokens.push(
          <span key={keyCounter++} className="text-cyan-400 font-medium font-mono">
            {matchText}
          </span>
        );
      } else {
        // Function invocation -> Soft Blue
        tokens.push(
          <span key={keyCounter++} className="text-blue-300 font-mono">
            {matchText}
          </span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      tokens.push(
        <span key={keyCounter++} className="text-slate-300">
          {line.slice(lastIndex)}
        </span>
      );
    }

    return (
      <div key={lineIdx} className="table-row hover:bg-white/[0.02]">
        <span className="table-cell pr-4 text-right text-white/20 select-none text-[11px] font-mono w-8">
          {lineIdx + 1}
        </span>
        <span className="table-cell font-mono">{tokens.length > 0 ? tokens : line || " "}</span>
      </div>
    );
  });
}

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

      <div className="relative rounded-xl bg-slate-950/80 border border-white/10 overflow-hidden group-hover:border-white/20 transition-colors shadow-inner">
        {/* Editor Chrome Top Bar */}
        <div className="px-4 py-2 border-b border-white/5 bg-white/[0.02] flex items-center justify-between text-[10px] font-mono text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
          </div>
          <span className="font-mono text-white/50">{snippet.language} &bull; UTF-8</span>
        </div>

        <div className="p-4 text-xs font-mono overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-white/10 table w-full">
          {renderHighlightedCode(snippet.code, snippet.language)}
        </div>
      </div>
    </div>
  );
}


