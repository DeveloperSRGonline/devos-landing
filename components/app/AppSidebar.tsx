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
  X
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
    openSearch 
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-surface/95 md:bg-surface/90 border-r border-white/10 flex flex-col justify-between h-full select-none shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Brand Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center font-bold text-xs text-white">
                D
              </div>
              <span className="font-bold text-white tracking-tight">DevOS</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Home</span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="md:hidden p-1 text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-white/40 uppercase tracking-wider px-2">
              <span>Projects</span>
              <span className="text-[10px] font-mono">{projects.length}</span>
            </div>

            <div className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {projects.map((project) => {
                const IconComponent = iconMap[project.icon] || FolderGit2;
                const isActive = project.id === activeProjectId;

                return (
                  <div
                    key={project.id}
                    onClick={() => handleSelectProject(project.id)}
                    className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                      isActive
                        ? "bg-accent/15 text-white border-l-2 border-accent"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      <IconComponent
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? "text-accent" : "text-white/40"
                        }`}
                      />
                      <span className="truncate">{project.name}</span>
                    </div>

                    <button
                      onClick={(e) => handleDeleteProject(e, project.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-white/40 transition-all shrink-0"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-white/15 text-xs text-white/60 hover:text-white hover:border-white/30 transition-all mt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Footer Row */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              openSearch();
              closeMobileMenu();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono text-white/40">
              ⌘K
            </kbd>
          </button>
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

