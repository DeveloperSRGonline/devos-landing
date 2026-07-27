// All shared interfaces used across the V2 workspace feature.

export interface Project {
  id: string;
  name: string;
  color: string;
  icon: string;
  createdAt: string;
}

export interface Note {
  id: string;
  projectId: string;
  title: string;
  body: string;
  createdAt: string;
  wordCount: number;
}

export interface Snippet {
  id: string;
  projectId: string;
  title: string;
  language: string;
  code: string;
  createdAt: string;
}

export interface AIMemory {
  id: string;
  projectId: string;
  title: string;
  summary: string;
  tags: string[];
  source: "ChatGPT" | "Claude" | "Gemini" | "Other";
  createdAt: string;
}

export interface LearningItem {
  id: string;
  projectId: string;
  title: string;
  url?: string;
  type: "Tutorial" | "Course" | "Docs" | "Video" | "Book";
  notes: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
}
