"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * SmoothScrollProvider
 *
 * Wraps the app in a global Lenis smooth-scroll instance.
 * Using root=true attaches Lenis to the window/document so
 * the native scroll events are intercepted globally.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Controls how quickly the scroll "catches up" to the user's input.
        // Lower = smoother / slower, higher = snappier. 0.1 is the sweet spot.
        lerp: 0.1,
        // Wheel scroll speed multiplier.
        wheelMultiplier: 0.8,
        // Touch scroll speed multiplier.
        touchMultiplier: 1.5,
        // Smoothes out jitter between wheel events.
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
