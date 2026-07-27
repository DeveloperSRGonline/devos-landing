"use client";

import React from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Search } from "lucide-react";

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useWorkspaceStore();

  if (!isSearchOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm p-4"
      onClick={closeSearch}
    >
      <div 
        className="w-full max-w-xl bg-surface border border-white/10 rounded-2xl p-4 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10 text-white/60">
          <Search className="w-4 h-4 text-accent" />
          <span className="text-sm">Search overlay stub (Phase I)...</span>
        </div>
      </div>
    </div>
  );
}
