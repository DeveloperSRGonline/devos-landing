"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import {
  Search,
  FileText,
  Code2,
  Brain,
  GraduationCap,
  X,
  CornerDownLeft,
} from "lucide-react";

interface SearchResultItem {
  id: string;
  projectId: string;
  type: "notes" | "snippets" | "ai-memory" | "learning";
  title: string;
  snippet: string;
}

const PLACEHOLDERS = [
  "Try 'JWT middleware'...",
  "Try 'architecture'...",
  "Try 'Zustand'...",
  "Try 'rate limiting'...",
];

export function SearchOverlay() {
  const {
    isSearchOpen,
    closeSearch,
    searchQuery,
    setSearchQuery,
    projects,
    notes,
    snippets,
    aiMemories,
    learningItems,
    setActiveProject,
    setActiveTab,
  } = useWorkspaceStore();

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotating placeholder
  useEffect(() => {
    if (!isSearchOpen) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isSearchOpen]);

  // Focus input on mount/open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
      setSelectedIndex(0);
    }
  }, [isSearchOpen, setSearchQuery]);

  if (!isSearchOpen) return null;

  // Real-time filtering logic
  const query = searchQuery.trim().toLowerCase();

  const matchedNotes: SearchResultItem[] = query
    ? notes
        .filter(
          (n) =>
            n.title.toLowerCase().includes(query) ||
            n.body.toLowerCase().includes(query)
        )
        .map((n) => ({
          id: n.id,
          projectId: n.projectId,
          type: "notes",
          title: n.title,
          snippet: n.body.slice(0, 60),
        }))
    : [];

  const matchedSnippets: SearchResultItem[] = query
    ? snippets
        .filter(
          (s) =>
            s.title.toLowerCase().includes(query) ||
            s.code.toLowerCase().includes(query)
        )
        .map((s) => ({
          id: s.id,
          projectId: s.projectId,
          type: "snippets",
          title: s.title,
          snippet: s.code.slice(0, 60),
        }))
    : [];

  const matchedMemories: SearchResultItem[] = query
    ? aiMemories
        .filter(
          (m) =>
            m.title.toLowerCase().includes(query) ||
            m.summary.toLowerCase().includes(query)
        )
        .map((m) => ({
          id: m.id,
          projectId: m.projectId,
          type: "ai-memory",
          title: m.title,
          snippet: m.summary.slice(0, 60),
        }))
    : [];

  const matchedLearning: SearchResultItem[] = query
    ? learningItems
        .filter(
          (l) =>
            l.title.toLowerCase().includes(query) ||
            (l.notes && l.notes.toLowerCase().includes(query))
        )
        .map((l) => ({
          id: l.id,
          projectId: l.projectId,
          type: "learning",
          title: l.title,
          snippet: l.notes || l.type,
        }))
    : [];

  const flatResults: SearchResultItem[] = [
    ...matchedNotes,
    ...matchedSnippets,
    ...matchedMemories,
    ...matchedLearning,
  ];

  const handleSelectResult = (result: SearchResultItem) => {
    setActiveProject(result.projectId);
    setActiveTab(result.type);
    closeSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeSearch();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (flatResults.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % flatResults.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flatResults.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatResults[selectedIndex]) {
        handleSelectResult(flatResults[selectedIndex]);
      }
    }
  };

  const getProjectName = (projectId: string) => {
    const proj = projects.find((p) => p.id === projectId);
    return proj ? proj.name : "Project";
  };

  const getTypeIcon = (type: SearchResultItem["type"]) => {
    switch (type) {
      case "notes":
        return <FileText className="w-4 h-4 text-blue-400" />;
      case "snippets":
        return <Code2 className="w-4 h-4 text-amber-400" />;
      case "ai-memory":
        return <Brain className="w-4 h-4 text-purple-400" />;
      case "learning":
        return <GraduationCap className="w-4 h-4 text-emerald-400" />;
    }
  };

  let globalIndexCounter = 0;

  const renderGroup = (
    label: string,
    items: SearchResultItem[]
  ) => {
    if (items.length === 0) return null;

    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
          <span>{label}</span>
          <span className="px-1.5 py-0.2 rounded bg-white/10 text-white/70 text-[10px]">
            {items.length}
          </span>
        </div>
        {items.map((item) => {
          const currentIndex = globalIndexCounter++;
          const isSelected = currentIndex === selectedIndex;

          return (
            <button
              key={item.id}
              onClick={() => handleSelectResult(item)}
              onMouseEnter={() => setSelectedIndex(currentIndex)}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                isSelected
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "hover:bg-white/5 text-white/80"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected ? "bg-white/20 text-white" : "bg-white/5"
                  }`}
                >
                  {getTypeIcon(item.type)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold truncate">{item.title}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {getProjectName(item.projectId)}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isSelected ? "text-white/80" : "text-white/40"
                    }`}
                  >
                    {item.snippet}
                  </p>
                </div>
              </div>

              {isSelected && <CornerDownLeft className="w-4 h-4 shrink-0 text-white/80" />}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
      onClick={closeSearch}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-surface border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-white/40 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={PLACEHOLDERS[placeholderIndex]}
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-white/30"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 rounded-lg hover:bg-white/10 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] text-white/30 px-2 py-0.5 rounded border border-white/10">
              ESC to exit
            </span>
          )}
        </div>

        {/* Search Results Area */}
        <div className="p-3 overflow-y-auto space-y-4 min-h-[160px]">
          {!query ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
              <Search className="w-8 h-8 text-white/20" />
              <p className="text-xs text-white/40">
                Search across notes, snippets, AI memories, and learning resources
              </p>
            </div>
          ) : flatResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
              <p className="text-xs text-white/40">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <>
              {renderGroup("Notes", matchedNotes)}
              {renderGroup("Snippets", matchedSnippets)}
              {renderGroup("AI Memory", matchedMemories)}
              {renderGroup("Learning", matchedLearning)}
            </>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-black/20 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          {flatResults.length > 0 && (
            <span>{flatResults.length} result(s) found</span>
          )}
        </div>
      </div>
    </div>
  );
}
