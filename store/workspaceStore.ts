import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Project,
  Note,
  Snippet,
  AIMemory,
  LearningItem,
} from "@/types/workspace";

interface WorkspaceStore {
  // Projects
  projects: Project[];
  activeProjectId: string | null;
  setActiveProject: (id: string) => void;
  addProject: (data: { name: string; color: string; icon: string }) => void;
  updateProject: (id: string, data: Partial<Omit<Project, "id" | "createdAt">>) => void;
  deleteProject: (id: string) => void;

  // Tabs
  activeTab: "notes" | "snippets" | "ai-memory" | "learning";
  setActiveTab: (tab: "notes" | "snippets" | "ai-memory" | "learning") => void;

  // Notes
  notes: Note[];
  addNote: (data: { projectId: string; title: string; body: string }) => void;
  updateNote: (id: string, data: Partial<Omit<Note, "id" | "projectId" | "createdAt">>) => void;
  deleteNote: (id: string) => void;

  // Snippets
  snippets: Snippet[];
  addSnippet: (data: { projectId: string; title: string; language: string; code: string }) => void;
  deleteSnippet: (id: string) => void;

  // AI Memories
  aiMemories: AIMemory[];
  addAIMemory: (data: { projectId: string; title: string; summary: string; tags: string[]; source: AIMemory["source"] }) => void;
  deleteAIMemory: (id: string) => void;

  // Learning Items
  learningItems: LearningItem[];
  addLearningItem: (data: { projectId: string; title: string; url?: string; type: LearningItem["type"]; notes: string; status: LearningItem["status"] }) => void;
  updateLearningStatus: (id: string, status: LearningItem["status"]) => void;
  deleteLearningItem: (id: string) => void;

  // Search
  searchQuery: string;
  isSearchOpen: boolean;
  setSearchQuery: (query: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
}

const generateId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString();

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      // Projects
      projects: [],
      activeProjectId: null,
      setActiveProject: (id) => set({ activeProjectId: id }),
      addProject: ({ name, color, icon }) =>
        set((state) => {
          const newProject: Project = {
            id: generateId(),
            name,
            color,
            icon,
            createdAt: new Date().toISOString(),
          };
          return {
            projects: [...state.projects, newProject],
            activeProjectId: newProject.id,
          };
        }),
      updateProject: (id, data) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        })),
      deleteProject: (id) =>
        set((state) => {
          const remaining = state.projects.filter((p) => p.id !== id);
          const newActiveId =
            state.activeProjectId === id
              ? remaining[0]?.id ?? null
              : state.activeProjectId;
          return {
            projects: remaining,
            activeProjectId: newActiveId,
          };
        }),

      // Tabs
      activeTab: "notes",
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Notes
      notes: [],
      addNote: ({ projectId, title, body }) =>
        set((state) => {
          const wordCount =
            body.trim() === "" ? 0 : body.trim().split(/\s+/).length;
          const newNote: Note = {
            id: generateId(),
            projectId,
            title,
            body,
            createdAt: new Date().toISOString(),
            wordCount,
          };
          return { notes: [...state.notes, newNote] };
        }),
      updateNote: (id, data) =>
        set((state) => ({
          notes: state.notes.map((n) => {
            if (n.id !== id) return n;
            const body = data.body !== undefined ? data.body : n.body;
            const wordCount =
              body.trim() === "" ? 0 : body.trim().split(/\s+/).length;
            return { ...n, ...data, wordCount };
          }),
        })),
      deleteNote: (id) =>
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),

      // Snippets
      snippets: [],
      addSnippet: ({ projectId, title, language, code }) =>
        set((state) => {
          const newSnippet: Snippet = {
            id: generateId(),
            projectId,
            title,
            language,
            code,
            createdAt: new Date().toISOString(),
          };
          return { snippets: [...state.snippets, newSnippet] };
        }),
      deleteSnippet: (id) =>
        set((state) => ({
          snippets: state.snippets.filter((s) => s.id !== id),
        })),

      // AI Memories
      aiMemories: [],
      addAIMemory: ({ projectId, title, summary, tags, source }) =>
        set((state) => {
          const newMemory: AIMemory = {
            id: generateId(),
            projectId,
            title,
            summary,
            tags,
            source,
            createdAt: new Date().toISOString(),
          };
          return { aiMemories: [...state.aiMemories, newMemory] };
        }),
      deleteAIMemory: (id) =>
        set((state) => ({
          aiMemories: state.aiMemories.filter((m) => m.id !== id),
        })),

      // Learning Items
      learningItems: [],
      addLearningItem: ({ projectId, title, url, type, notes, status }) =>
        set((state) => {
          const newItem: LearningItem = {
            id: generateId(),
            projectId,
            title,
            url,
            type,
            notes,
            status,
            createdAt: new Date().toISOString(),
          };
          return { learningItems: [...state.learningItems, newItem] };
        }),
      updateLearningStatus: (id, status) =>
        set((state) => ({
          learningItems: state.learningItems.map((item) =>
            item.id === id ? { ...item, status } : item
          ),
        })),
      deleteLearningItem: (id) =>
        set((state) => ({
          learningItems: state.learningItems.filter((item) => item.id !== id),
        })),

      // Search
      searchQuery: "",
      isSearchOpen: false,
      setSearchQuery: (query) => set({ searchQuery: query }),
      openSearch: () => set({ isSearchOpen: true, searchQuery: "" }),
      closeSearch: () => set({ isSearchOpen: false, searchQuery: "" }),
    }),
    {
      name: "devos-workspace",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
