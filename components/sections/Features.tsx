import React from "react";
import Link from "next/link";
import { features } from "@/data/features";
import { Card } from "@/components/ui/Card";

const tabHashMap: Record<string, string> = {
  "Project Workspaces": "/app",
  "Context-Linked Notes": "/app#notes",
  "AI Chat Memory": "/app#ai-memory",
  "Snippet Library": "/app#snippets",
  "Unified Search": "/app",
  "Learning Tracker": "/app#learning",
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Everything you need to master your dev context
          </h2>
          <p className="text-base sm:text-lg text-muted">
            DevOS unifies your code notes, AI conversations, snippets, and project knowledge into one high-speed workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const linkHref = tabHashMap[feature.title] || "/app";
            return (
              <Card
                key={index}
                className="group hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted text-sm sm:text-base leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </div>
                <div>
                  <Link
                    href={linkHref}
                    className="text-xs text-muted hover:text-accent font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    Try it →
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
