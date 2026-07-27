"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Context Operating System for Developers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Your development knowledge, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">finally connected.</span>
            </h1>

            <p className="text-lg text-white/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              DevOS unifies your specs, code snippets, architectural decisions, and AI conversations into a single structured context graph. Stop repeating context to your tools.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/app" className="w-full sm:w-auto">
                <Button size="lg" className="w-full flex items-center justify-center gap-2">
                  <span>Start Building Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => scrollToSection("how-it-works")}
              >
                See How It Works
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 text-xs text-white/50 pt-2">
              <span>✓ No credit card required</span>
              <span>✓ 14-day free trial on Pro</span>
              <span>✓ Open Source core</span>
            </div>
          </div>

          {/* Right Column - Dashboard Visual */}
          <div className="lg:col-span-6">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
