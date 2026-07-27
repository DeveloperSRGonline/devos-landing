export interface PricingPlan {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  ctaLabel: string;
  isPopular: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$0",
    tagline: "Perfect for individual developers starting out.",
    features: [
      "Up to 3 active projects",
      "Basic Context-Linked Notes",
      "Standard Snippet Library",
      "Community support",
    ],
    ctaLabel: "Get Started Free",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$12",
    tagline: "For active developers managing multiple complex projects.",
    features: [
      "Unlimited active projects",
      "AI Chat Memory integration",
      "Unified Global Search",
      "Learning Tracker dashboard",
      "Priority customer support",
    ],
    ctaLabel: "Start Pro Trial",
    isPopular: true,
  },
  {
    name: "Team",
    price: "$29",
    tagline: "For small dev teams sharing project knowledge & snippets.",
    features: [
      "Everything in Pro",
      "Shared Team Workspaces",
      "Collaborative Code Snippets",
      "Role-based access permissions",
      "Dedicated onboarding",
    ],
    ctaLabel: "Contact Sales",
    isPopular: false,
  },
];
