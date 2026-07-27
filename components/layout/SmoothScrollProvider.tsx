"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * SmoothScrollProvider
 *
 * Wraps the landing page in Lenis smooth-scroll for a silky smooth scrolling experience.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
