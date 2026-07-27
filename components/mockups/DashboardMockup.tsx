"use client";

import React from "react";
import { 
  FileText, 
  Code2, 
  MessageSquare, 
  Search, 
  Sparkles, 
  FolderGit2, 
  Cpu, 
  Layers 
} from "lucide-react";

export function DashboardMockup() {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-surface/80 p-4 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs font-mono text-white/50">devos // workspace</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/60">
          <Search className="w-3.5 h-3.5" />
          <span>Quick search (⌘K)</span>
        </div>
      </div>

      {/* Main Grid: Sidebar & Content */}
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar Mock */}
        <div className="col-span-4 space-y-3 hidden sm:block">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-2">Projects</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-accent/20 border border-accent/40 text-xs text-white font-medium">
              <FolderGit2 className="w-3.5 h-3.5 text-accent" />
              <span>devos-core</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-xs text-white/70 transition-colors">
              <FolderGit2 className="w-3.5 h-3.5 text-white/40" />
              <span>api-gateway</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-xs text-white/70 transition-colors">
              <FolderGit2 className="w-3.5 h-3.5 text-white/40" />
              <span>auth-service</span>
            </div>
          </div>

          <div className="pt-2 text-xs font-semibold text-white/40 uppercase tracking-wider px-2">Context graph</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-xs text-white/70">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span>Linked Nodes (14)</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-xs text-white/70">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Index (Active)</span>
            </div>
          </div>
        </div>

        {/* Content Area Mock */}
        <div className="col-span-12 sm:col-span-8 space-y-3">
          {/* Linked item cards */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Architecture Spec - Auth Flow</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">Doc</span>
            </div>
            <p className="text-xs text-white/60 line-clamp-2">
              OAuth2 authentication flow integrating JWT tokens with automatic session refresh handling...
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>middleware/auth.ts</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Snippet</span>
            </div>
            <div className="p-2 rounded bg-black/40 font-mono text-[11px] text-white/80 overflow-x-auto">
              <code>export async function verifyToken(req: Request) &#123; ... &#125;</code>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-accent/10 border border-accent/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>AI Context Synthesis</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-accent/20 text-accent font-mono">AI Connected</span>
            </div>
            <p className="text-xs text-white/80">
              Linked auth spec and middleware implementation ready for query processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
