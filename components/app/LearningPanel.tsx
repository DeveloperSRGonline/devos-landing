"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { LearningItemCard } from "./LearningItemCard";
import { LearningForm } from "./LearningForm";
import { GraduationCap, Plus, CheckCircle2 } from "lucide-react";

export function LearningPanel() {
  const { activeProjectId, learningItems } = useWorkspaceStore();
  const [showForm, setShowForm] = useState(false);

  const projectItems = learningItems.filter((i) => i.projectId === activeProjectId);
  const completedCount = projectItems.filter((i) => i.status === "done").length;
  const totalCount = projectItems.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header & Progress Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-accent" />
            Learning Tracker
          </h3>
          <p className="text-xs text-white/50">
            Track tutorials, documentation, videos, and books for this workspace.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
          >
            <Plus className="w-4 h-4" />
            Add Resource
          </button>
        )}
      </div>

      {/* Completion Progress Bar */}
      {totalCount > 0 && (
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/70 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Progress: {completedCount} of {totalCount} resources completed
            </span>
            <span className="font-semibold text-emerald-400">{completionPercentage}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* New Resource Form */}
      {showForm && (
        <LearningForm
          onSuccess={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Resource Grid / Empty State */}
      {projectItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 rounded-2xl bg-white/[0.02] border border-dashed border-white/10">
          <div className="p-3 rounded-full bg-white/5 text-white/40">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h4 className="text-sm font-semibold text-white">No learning resources yet</h4>
            <p className="text-xs text-white/50">
              Save tutorials, courses, and documentation to build your skills context for this project.
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Resource
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectItems.map((item) => (
            <LearningItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
