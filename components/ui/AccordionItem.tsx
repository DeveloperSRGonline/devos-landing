"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const AccordionItem = ({
  question,
  answer,
  isOpen,
  onToggle,
  className,
}: AccordionItemProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden transition-colors",
        isOpen && "border-slate-700/80 bg-slate-900/80",
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-slate-100 pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-emerald-400"
          )}
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-6 text-sm leading-relaxed text-slate-400 animate-in fade-in slide-in-from-top-1 duration-200">
          {answer}
        </div>
      )}
    </div>
  );
};
