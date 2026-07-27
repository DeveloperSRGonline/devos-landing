"use client";

import React from "react";
import { faqItems } from "@/data/faq";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { useUIStore } from "@/store/uiStore";
import { HelpCircle } from "lucide-react";

export const FAQ = () => {
  const { openFaqIndex, toggleFaq } = useUIStore();

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have questions about DevOS? Find answers to the most common queries below.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openFaqIndex === index}
              onToggle={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
