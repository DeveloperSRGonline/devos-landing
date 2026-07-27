"use client";

import React from "react";
import { LearningItem } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/workspaceStore";
import {
  BookOpen,
  GraduationCap,
  FileText,
  Play,
  Book,
  ExternalLink,
  Trash2,
} from "lucide-react";

interface LearningItemCardProps {
  item: LearningItem;
}

export function LearningItemCard({ item }: LearningItemCardProps) {
  const { updateLearningStatus, deleteLearningItem } = useWorkspaceStore();

  const getTypeIcon = (type: LearningItem["type"]) => {
    switch (type) {
      case "Tutorial":
        return <BookOpen className="w-4 h-4 text-blue-400" />;
      case "Course":
        return <GraduationCap className="w-4 h-4 text-purple-400" />;
      case "Docs":
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case "Video":
        return <Play className="w-4 h-4 text-red-400" />;
      case "Book":
        return <Book className="w-4 h-4 text-amber-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleStatusCycle = () => {
    const nextStatusMap: Record<LearningItem["status"], LearningItem["status"]> = {
      todo: "in-progress",
      "in-progress": "done",
      done: "todo",
    };
    updateLearningStatus(item.id, nextStatusMap[item.status]);
  };

  const getStatusBadge = (status: LearningItem["status"]) => {
    switch (status) {
      case "todo":
        return {
          label: "To Start",
          className: "bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20",
        };
      case "in-progress":
        return {
          label: "In Progress",
          className: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20",
        };
      case "done":
        return {
          label: "Done",
          className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
        };
    }
  };

  const statusInfo = getStatusBadge(item.status);

  return (
    <div className="group relative p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-3">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              {getTypeIcon(item.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-accent transition-colors"
                    title="Open Resource URL"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <span className="text-[10px] text-white/40 font-medium">{item.type}</span>
            </div>
          </div>

          <button
            onClick={() => deleteLearningItem(item.id)}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
            title="Delete Resource"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {item.notes && (
          <p className="text-xs text-white/60 leading-relaxed pl-1 border-l-2 border-white/10">
            {item.notes}
          </p>
        )}
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-white/5">
        <button
          onClick={handleStatusCycle}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${statusInfo.className}`}
          title="Click to cycle status: To Start → In Progress → Done"
        >
          {statusInfo.label}
        </button>

        <span className="text-[10px] text-white/30">
          {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>
    </div>
  );
}
