"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FolderGit2, 
  Server, 
  Shield, 
  Zap, 
  BookOpen, 
  Code2, 
  Plus, 
  Search, 
  Trash2, 
  ArrowLeft,
  X,
  Layers,
  Sparkles,
  Command,
  ChevronRight,
  User,
  Settings
} from "lucide-react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useUIStore } from "@/store/uiStore";
import { NewProjectModal } from "./NewProjectModal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FolderGit2,
  Server,
  Shield,
  Zap,
  BookOpen,
  Code2,
};

export function AppSidebar() {
  const { 
    projects, 
    activeProjectId, 
    setActiveProject, 
    addProject, 
    deleteProject, 
    openSearch,
    notes,
    snippets,
    aiMemories,
    learningItems
  } = useWorkspaceStore();

  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProject = (data: { name: string; color: string; icon: string }) => {
    addProject(data);
  };

  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (projects.length <= 1) {
      alert("Cannot delete the last remaining project.");
      return;
    }
    if (confirm("Are you sure you want to delete this project and its contents?")) {
      deleteProject(id);
    }
  };

  const handleSelectProject = (id: string) => {
    setActiveProject(id);
    closeMobileMenu();
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-slate-950/95 border-r border-white/10 flex flex-col justify-between h-full select-none shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 backdrop-blur-2xl shadow-2xl shadow-black ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand & Workspace Switcher Header */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-accent/30 ring-1 ring-white/20">
                  D
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white tracking-tight">DevOS</span>
                    <span className="px-1.5 py-0.2 rounded bg-accent/20 border border-accent/30 text-[9px] font-mono font-semibold text-accent">
                      PRO
                    </span>
                  </div>
                  <p className="text-[10px] text-white/40 font-mono">Workspace v2.0</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Link
                  href="/"
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
                  title="Return to Landing Page"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="md:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Global Search Quick Trigger */}
            <button
              onClick={() => {
                openSearch();
                closeMobileMenu();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-accent/40 text-xs text-white/60 hover:text-white hover:bg-white/[0.08] transition-all shadow-inner group"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                <span>Search everything...</span>
              </div>
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-white/50">
                <Command className="w-2.5 h-2.5" />
                <span>K</span>
              </div>
            </button>
          </div>

          {/* Navigation / Projects List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
            {/* Active Projects Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2 text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-accent" />
                  Projects
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-white/5 border border-white/5 font-mono text-white/60">
                  {projects.length}
                </span>
              </div>

              <div className="space-y-1">
                {projects.map((project) => {
                  const IconComponent = iconMap[project.icon] || FolderGit2;
                  const isActive = project.id === activeProjectId;

                  // Count items for this project
                  const projNotesCount = notes.filter((n) => n.projectId === project.id).length;
                  const projSnippetsCount = snippets.filter((s) => s.projectId === project.id).length;
                  const totalItems = projNotesCount + projSnippetsCount;

                  return (
                    <div
                      key={project.id}
                      onClick={() => handleSelectProject(project.id)}
                      className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-accent/20 to-purple-500/10 text-white border border-accent/40 shadow-lg shadow-accent/10"
                          : "text-white/70 hover:bg-white/[0.04] hover:text-white border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border border-white/10 bg-white/5"
                          style={{ color: project.color }}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate font-semibold">{project.name}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-mono text-white/30 group-hover:text-white/60 transition-colors">
                          {totalItems} items
                        </span>
                        <button
                          onClick={(e) => handleDeleteProject(e, project.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 hover:text-red-400 text-white/30 rounded-md transition-all shrink-0 ml-1"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-white/15 text-xs font-medium text-white/60 hover:text-white hover:border-accent/40 hover:bg-accent/5 transition-all mt-3 group"
              >
                <Plus className="w-3.5 h-3.5 text-accent group-hover:rotate-90 transition-transform" />
                <span>Create New Project</span>
              </button>
            </div>

            {/* Overview Stats Widget */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/50 font-medium">Total Context Items</span>
                <Sparkles className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-sm font-bold text-white font-mono">{notes.length}</div>
                  <div className="text-[9px] text-white/40 uppercase tracking-wider">Notes</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-sm font-bold text-white font-mono">{snippets.length}</div>
                  <div className="text-[9px] text-white/40 uppercase tracking-wider">Snippets</div>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile & Footer */}
          <div className="p-3 border-t border-white/10 bg-black/40">
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">Developer Workspace</div>
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Local Sync Ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </>
  );
}


