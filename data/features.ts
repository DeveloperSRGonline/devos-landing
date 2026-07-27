import {
  FolderGit2,
  FileText,
  Bot,
  Code2,
  Search,
  GraduationCap,
  LucideIcon,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: FolderGit2,
    title: "Project Workspaces",
    description:
      "Organize notes, code snippets, documentation, and resources grouped by specific projects or repositories.",
  },
  {
    icon: FileText,
    title: "Context-Linked Notes",
    description:
      "Attach notes directly to relevant code files, functions, or external documentation for seamless reference.",
  },
  {
    icon: Bot,
    title: "AI Chat Memory",
    description:
      "Save useful AI chat responses and key technical insights directly to your project workspace.",
  },
  {
    icon: Code2,
    title: "Snippet Library",
    description:
      "Store, search, and reuse code snippets across all your active development projects effortlessly.",
  },
  {
    icon: Search,
    title: "Unified Search",
    description:
      "Instantly search across your notes, snippets, AI logs, and project metadata from one command palette.",
  },
  {
    icon: GraduationCap,
    title: "Learning Tracker",
    description:
      "Keep track of new concepts, frameworks, and techniques learned during daily development workflows.",
  },
];
