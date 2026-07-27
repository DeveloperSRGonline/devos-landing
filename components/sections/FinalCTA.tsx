import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section id="cta" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl shadow-emerald-950/20">
          {/* Subtle gradient glow inside */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to transform your workflow?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight mb-6">
              Build smarter. Keep your knowledge connected.
            </h2>

            <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
              Join thousands of developers using DevOS to unify notes, code snippets, and AI memory into a single powerful workspace.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto gap-2 group">
                <span>Get Started for Free</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Schedule Demo
              </Button>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
