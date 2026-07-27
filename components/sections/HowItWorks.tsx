import React from "react";
import { FolderPlus, FileCode2, SearchCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    stepNumber: "01",
    icon: FolderPlus,
    title: "Create a Workspace",
    description: "Initialize a project space for your repository or learning track in seconds.",
  },
  {
    stepNumber: "02",
    icon: FileCode2,
    title: "Drop in Context",
    description: "Link code files, attach AI chat logs, and write markdown notes side-by-side.",
  },
  {
    stepNumber: "03",
    icon: SearchCheck,
    title: "Search & Resurface",
    description: "Instantly retrieve exact solutions and architectural decisions whenever you need them.",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-surface/20 border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            How DevOS fits into your workflow
          </h2>
          <p className="text-base sm:text-lg text-muted">
            Three simple steps to eliminate context loss and build a personal developer knowledge base.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-surface/50 border border-border/60 rounded-2xl p-8 hover:border-accent/40 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-accent/40 font-mono">
                    {step.stepNumber}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-muted/40">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
