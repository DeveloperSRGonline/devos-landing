import React from "react";
import { Code2, GitBranch, FileText, Bot } from "lucide-react";

const tools = [
  { icon: Code2, label: "Code Editors" },
  { icon: GitBranch, label: "Version Control" },
  { icon: FileText, label: "Documentation" },
  { icon: Bot, label: "AI Assistants" },
];

export const TrustStrip: React.FC = () => {
  return (
    <section className="py-12 border-y border-border/50 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-muted mb-6">
          Designed to seamlessly connect with your development ecosystem
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-foreground/70 hover:text-accent transition-colors duration-200"
              >
                <Icon className="w-5 h-5 text-accent" />
                <span className="text-sm sm:text-base font-medium">{tool.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
