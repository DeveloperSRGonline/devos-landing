import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "accent" | "outline" | "subtle";
}

export const Badge = ({
  className,
  variant = "accent",
  children,
  ...props
}: BadgeProps) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors";

  const variants = {
    accent: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    outline: "border border-slate-700 text-slate-300",
    subtle: "bg-slate-800/80 text-slate-300 border border-slate-700/50",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
