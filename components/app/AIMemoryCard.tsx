"use client";

import React, { useState } from "react";
import { AIMemory } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Badge } from "@/components/ui/Badge";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface AIMemoryCardProps {
  memory: AIMemory;
  onTagClick?: (tag: string) => void;
}

export function AIMemoryCard({ memory, onTagClick }: AIMemoryCardProps) {
  const { deleteAIMemory } = useWorkspaceStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const getSourceBadgeColor = (source: AIMemory["source"]) => {
    switch (source) {
      case "ChatGPT":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Claude":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Gemini":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Other":
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const isLongText = memory.summary.length > 100;
  const displayText = isExpanded || !isLongText
    ? memory.summary
    : memory.summary.slice(0, 100) + "…";

  const formattedDate = new Date(memory.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-4">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-wrap mb-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getSourceBadgeColor(memory.source)}`}>
              {memory.source}
            </span>
            <h4 className="text-sm font-semibold text-white tracking-wide">{memory.title}</h4>
          </div>
          <button
            onClick={() => deleteAIMemory(memory.id)}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
            title="Delete Memory"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Summary Body */}
        <p className="text-xs text-white/70 leading-relaxed whitespace-pre-wrap mt-1">
          {displayText}
        </p>

        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:underline"
          >
            {isExpanded ? (
              <>
                Collapse <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                View Full <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Footer Tags & Date */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 flex-wrap text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          {memory.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick?.(tag)}
              className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
        <span className="text-[10px] text-white/40">{formattedDate}</span>
      </div>
    </div>
  );
}
