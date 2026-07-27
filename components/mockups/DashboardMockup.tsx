"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Code2, 
  MessageSquare, 
  Search, 
  Sparkles, 
  FolderGit2, 
  Cpu, 
  Layers,
  Copy,
  Check
} from "lucide-react";
import { seedProjects, seedNotes, seedSnippets, seedAIMemories } from "@/data/demo";

interface DashboardMockupProps {
  interactive?: boolean;
}

export function DashboardMockup({ interactive = false }: DashboardMockupProps) {
  const [activeProjectId, setActiveProjectId] = useState<string>("p1");
  const [copied, setCopied] = useState(false);

  const activeProject = seedProjects.find((p) => p.id === activeProjectId) || seedProjects[0];

  const handleCopy = () => {
    if (seedSnippets[0]?.code) {
      navigator.clipboard.writeText(seedSnippets[0].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div aria-hidden={!interactive} className="w-full rounded-2xl border border-white/10 bg-surface/80 p-4 shadow-2xl backdrop-blur-md overflow-hidden select-none relative">

      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs font-mono text-white/50">
            devos // {interactive ? activeProject.name : "workspace"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {interactive && (
            <span className="px-2 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-[10px] text-accent font-medium">
              Live Demo
            </span>
          )}
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/60">
            <Search className="w-3.5 h-3.5" />
            <span>Quick search (⌘K)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar & Content */}
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar Mock */}
        <div className="col-span-4 space-y-3 hidden sm:block">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-2">Projects</div>
          <div className="space-y-1">
            {seedProjects.map((project) => {
              const isActive = interactive ? project.id === activeProjectId : project.id === "p1";
              return (
                <div
                  key={project.id}
                  onClick={() => interactive && setActiveProjectId(project.id)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    interactive ? "cursor-pointer" : ""
                  } ${
                    isActive
                      ? "bg-accent/20 border border-accent/40 text-white"
                      : "hover:bg-white/5 text-white/70 border border-transparent"
                  }`}
                >
                  <FolderGit2 className={`w-3.5 h-3.5 ${isActive ? "text-accent" : "text-white/40"}`} />
                  <span className="truncate">{project.name}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-xs font-semibold text-white/40 uppercase tracking-wider px-2">Context graph</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-xs text-white/70">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span>Linked Nodes ({activeProjectId === "p1" ? "14" : activeProjectId === "p2" ? "8" : "5"})</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-xs text-white/70">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Index (Active)</span>
            </div>
          </div>
        </div>

        {/* Content Area Mock */}
        <div className="col-span-12 sm:col-span-8 space-y-3 transition-opacity duration-200">
          {activeProjectId === "p1" && (
            <>
              {/* View 1: Note / Doc card */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>{seedNotes[0].title}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                    {seedNotes[0].wordCount} words
                  </span>
                </div>
                <p className="text-xs text-white/60 line-clamp-2">
                  {seedNotes[0].body}
                </p>
              </div>

              {/* Snippet card */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span>{seedSnippets[0].title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                      {seedSnippets[0].language}
                    </span>
                    {interactive && (
                      <button
                        onClick={handleCopy}
                        className="text-[10px] flex items-center gap-1 text-white/60 hover:text-white transition-colors"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-2 rounded bg-black/40 font-mono text-[11px] text-white/80 overflow-x-auto">
                  <code>{seedSnippets[0].code.slice(0, 75)}...</code>
                </div>
              </div>

              {/* AI Memory card */}
              <div className="p-3 rounded-xl bg-accent/10 border border-accent/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>{seedAIMemories[0].title}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-accent/20 text-accent font-mono">
                    {seedAIMemories[0].source}
                  </span>
                </div>
                <p className="text-xs text-white/80 line-clamp-2">
                  {seedAIMemories[0].summary}
                </p>
              </div>
            </>
          )}

          {activeProjectId === "p2" && (
            <>
              {/* View 2: Snippet Card focus */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span>{seedSnippets[2].title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                      {seedSnippets[2].language}
                    </span>
                    {interactive && (
                      <button
                        onClick={handleCopy}
                        className="text-[10px] flex items-center gap-1 text-white/60 hover:text-white transition-colors"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-2 rounded bg-black/40 font-mono text-[11px] text-white/80 overflow-x-auto">
                  <code>{seedSnippets[2].code}</code>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Gateway Routing Specs</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                    Docs
                  </span>
                </div>
                <p className="text-xs text-white/60">
                  Reverse proxy routing rules and upstream service endpoint declarations.
                </p>
              </div>
            </>
          )}

          {activeProjectId === "p3" && (
            <>
              {/* View 3: AI Memory focus */}
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>OAuth2 & OIDC Security Model</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                    ChatGPT
                  </span>
                </div>
                <p className="text-xs text-white/80">
                  Token rotation policy and scopes mapping for multi-tenant microservices access control.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Security Audit Checklist</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                    54 words
                  </span>
                </div>
                <p className="text-xs text-white/60">
                  CSRF protection, SameSite cookie headers, and rate limiting verification steps.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

