"use client";

import React from "react";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";

export function ProductPreview() {
  return (
    <section id="product-preview" className="py-20 px-4 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          See DevOS in action
        </h2>
        <p className="text-base sm:text-lg text-white/70">
          Everything you build, document, and prompt — unified into a single intelligent workspace.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Decorative Glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent/30 via-purple-500/20 to-accent/30 blur-xl opacity-50" />

        {/* Interactive / Annotated Mockup Container */}
        <div className="relative">
          <DashboardMockup />

          {/* Annotations (Desktop Overlay) */}
          <div className="hidden lg:block">
            {/* Annotation 1: Quick Search */}
            <div className="absolute -top-6 right-8 bg-surface/90 border border-accent/40 rounded-lg p-2.5 shadow-xl backdrop-blur-md max-w-xs text-xs text-white/90 animate-bounce-subtle">
              <span className="font-semibold text-accent block mb-0.5">Instant Context Search</span>
              Query docs, snippets & AI chat histories with ⌘K shortcuts.
            </div>

            {/* Annotation 2: Context Graph Sidebar */}
            <div className="absolute top-1/3 -left-12 bg-surface/90 border border-purple-500/40 rounded-lg p-2.5 shadow-xl backdrop-blur-md max-w-xs text-xs text-white/90">
              <span className="font-semibold text-purple-400 block mb-0.5">Knowledge Graph</span>
              Automatic bi-directional linking between notes and codebase files.
            </div>

            {/* Annotation 3: AI Connected */}
            <div className="absolute -bottom-6 right-12 bg-surface/90 border border-accent/40 rounded-lg p-2.5 shadow-xl backdrop-blur-md max-w-xs text-xs text-white/90">
              <span className="font-semibold text-accent block mb-0.5">AI Synthesis</span>
              Feed contextual project knowledge straight into your LLM prompts.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
