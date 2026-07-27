"use client";

import React from "react";
import { 
  FolderGit2, 
  Server, 
  Shield, 
  Zap, 
  BookOpen, 
  Code2, 
  Search,
  Menu
} from "lucide-react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useUIStore } from "@/store/uiStore";

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
  const { toggleMobileMenu } = useUIStore();

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];
  const IconComponent = activeProject ? iconMap[activeProject.icon] || FolderGit2 : FolderGit2;

  return (
    <header className="h-14 bg-surface/80 border-b border-white/10 px-4 md:px-6 flex items-center justify-between shrink-0">
      {/* Left: Hamburger button (mobile) + Active Project Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {activeProject ? (
          <>
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 border border-white/10"
              style={{ color: activeProject.color }}
            >
              <IconComponent className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm text-white truncate max-w-[140px] sm:max-w-none">
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
        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-accent/40 text-xs text-white/60 hover:text-white transition-all shadow-sm"
      >
        <Search className="w-3.5 h-3.5 text-accent" />
        <span className="hidden sm:inline">⌘ K Search...</span>
        <span className="sm:hidden">Search</span>
      </button>
    </header>
  );
}

