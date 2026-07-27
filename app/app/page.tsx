"use client";

import React, { useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { 
  seedProjects, 
  seedNotes, 
  seedSnippets, 
  seedAIMemories, 
  seedLearningItems 
} from "@/data/demo";
import { WorkspaceView } from "@/components/app/WorkspaceView";
import { SearchOverlay } from "@/components/app/SearchOverlay";

export default function AppPage() {
  const store = useWorkspaceStore();

  useEffect(() => {
    // 1. Hydrate seed data if projects array is empty
    if (store.projects.length === 0) {
      useWorkspaceStore.setState({
        projects: seedProjects,
        notes: seedNotes,
        snippets: seedSnippets,
        aiMemories: seedAIMemories,
        learningItems: seedLearningItems,
        activeProjectId: "p1",
      });
    }

    // 2. Handle URL hash tab routing
    const hash = window.location.hash.replace("#", "");
    const validTabs = ["notes", "snippets", "ai-memory", "learning"] as const;
    if (validTabs.includes(hash as any)) {
      store.setActiveTab(hash as any);
    }

    // 3. Register global keyboard listener for Cmd+K / Ctrl+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        store.openSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <WorkspaceView />
      {store.isSearchOpen && <SearchOverlay />}
    </>
  );
}
