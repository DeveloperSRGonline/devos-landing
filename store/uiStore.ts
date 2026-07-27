import { create } from "zustand";

interface UIState {
  isMobileMenuOpen: boolean;
  openFaqIndex: number | null;
  billingPeriod: "monthly" | "yearly";
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleFaq: (index: number) => void;
  toggleBillingPeriod: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  openFaqIndex: null,
  billingPeriod: "monthly",
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleFaq: (index) =>
    set((state) => ({
      openFaqIndex: state.openFaqIndex === index ? null : index,
    })),
  toggleBillingPeriod: () =>
    set((state) => ({
      billingPeriod: state.billingPeriod === "monthly" ? "yearly" : "monthly",
    })),
}));
