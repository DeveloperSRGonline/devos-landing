"use client";

import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * SmoothScrollProvider
 *
 * Wraps landing page routes in Lenis smooth-scroll.
 * Excludes /app route so nested scroll containers (notes, snippets, sidebar)
 * scroll natively with the mouse wheel without Lenis interference.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // If in the interactive web app workspace (/app), bypass global Lenis root smooth scroll
  if (pathname?.startsWith("/app")) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

