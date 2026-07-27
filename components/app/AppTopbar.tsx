"use client";

import React from "react";
import { 
  FolderGit2, 
  Server, 
  Shield, 
  Zap, 
  BookOpen, 
  Code2, 
  Search 
} from "lucide-react";
import { useWorkspaceStore } from "@/store/workspaceStore";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FolderGit2,
  Server,
  Shield,
  Zap,
  BookOpen,
  Code2,
};

export function AppTopbar() {
  const { projects, activeProjectId, openSearch } = useWorkspaceStore();

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];
  const IconComponent = activeProject ? iconMap[activeProject.icon] || FolderGit2 : FolderGit2;

  return (
    <header className="h-14 bg-surface/80 border-b border-white/10 px-6 flex items-center justify-between shrink-0">
      {/* Left: Active Project Info */}
      <div className="flex items-center gap-3">
        {activeProject ? (
          <>
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 border border-white/10"
              style={{ color: activeProject.color }}
            >
              <IconComponent className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm text-white">
              {activeProject.name}
            </span>
          </>
        ) : (
          <span className="text-sm text-white/50">Select a project</span>
        )}
      </div>

      {/* Right: Search Pill */}
      <button
        onClick={openSearch}
        className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-accent/40 text-xs text-white/60 hover:text-white transition-all shadow-sm"
      >
        <Search className="w-3.5 h-3.5 text-accent" />
        <span>⌘ K Search...</span>
      </button>
    </header>
  );
}
