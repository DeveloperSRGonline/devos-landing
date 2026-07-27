"use client";

import React from "react";
import { pricingPlans } from "@/data/pricing";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Simple, transparent pricing
        </h2>
        <p className="text-base sm:text-lg text-white/70">
          Choose the plan that best fits your workflow. Start free, upgrade when you need to.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "flex flex-col justify-between p-8 relative transition-all duration-300",
              plan.isPopular
                ? "border-accent/50 bg-surface/90 lg:scale-105 shadow-accent/10 shadow-2xl z-10"
                : "border-white/10 bg-surface/50"
            )}
          >
            <div>
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="accent">Most Popular</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-white/60 min-h-[32px]">{plan.tagline}</p>
              </div>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-white/50 font-medium">/ month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant={plan.isPopular ? "primary" : "secondary"}
              className="w-full"
            >
              {plan.ctaLabel}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
