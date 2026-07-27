import { create } from "zustand";

interface UIState {
  isMobileMenuOpen: boolean;
  openFaqIndex: number | null;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleFaq: (index: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  openFaqIndex: null,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleFaq: (index) =>
    set((state) => ({
      openFaqIndex: state.openFaqIndex === index ? null : index,
    })),
}));
