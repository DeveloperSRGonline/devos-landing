"use client";

import { useEffect, useRef, useCallback } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, [role='button'], [data-cursor-hover]";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Everything lives in refs — zero React re-renders during animation
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  // dot also lerps (just much faster) so it feels slightly magnetic, not robotically instant
  const dot     = useRef({ x: -200, y: -200 });

  const targetScale  = useRef(1);   // what scale we want
  const currentScale = useRef(1);   // what scale we're currently at (lerped)

  const visible = useRef(false);
  const rafId   = useRef(0);

  // Normalised lerp — frame-rate independent
  // factor = strength per second (0–1). We convert to per-frame using deltaTime.
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const dotEl  = dotRef.current;
    const ringEl = ringRef.current;
    if (!dotEl || !ringEl) return;

    const mx = mouse.current.x;
    const my = mouse.current.y;

    // Dot: very fast lerp — feels snappy but not robotic
    dot.current.x = lerp(dot.current.x, mx, 0.55);
    dot.current.y = lerp(dot.current.y, my, 0.55);

    // Ring: slow lerp — the trailing "ghost" feel
    ring.current.x = lerp(ring.current.x, mx, 0.09);
    ring.current.y = lerp(ring.current.y, my, 0.09);

    // Scale: lerped entirely in JS — no CSS transition fighting us
    currentScale.current = lerp(currentScale.current, targetScale.current, 0.1);

    // Write transforms once per frame (single reflow)
    dotEl.style.transform  = `translate3d(${dot.current.x}px,${dot.current.y}px,0) translate(-50%,-50%)`;
    ringEl.style.transform = `translate3d(${ring.current.x}px,${ring.current.y}px,0) translate(-50%,-50%) scale(${currentScale.current})`;

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch-only devices — no cursor needed
    if (window.matchMedia("(hover: none)").matches) return;

    const dotEl  = dotRef.current;
    const ringEl = ringRef.current;
    if (!dotEl || !ringEl) return;

    // Kill the OS cursor
    document.documentElement.style.cursor = "none";

    const show = () => {
      dotEl.style.opacity  = "1";
      ringEl.style.opacity = "1";
    };
    const hide = () => {
      dotEl.style.opacity  = "0";
      ringEl.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (!visible.current) {
        // Teleport everything on first appearance so nothing slides in from off-screen
        dot.current  = { x: e.clientX, y: e.clientY };
        ring.current = { x: e.clientX, y: e.clientY };
        visible.current = true;
        show();
      }
    };

    const onOver = (e: MouseEvent) => {
      const isInteractive = !!(e.target as Element).closest(INTERACTIVE_SELECTOR);
      targetScale.current = isInteractive ? 1.85 : 1;
      if (isInteractive) {
        ringEl.classList.add("cursor-hover");
      } else {
        ringEl.classList.remove("cursor-hover");
      }
    };

    document.addEventListener("mousemove",  onMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", () => { if (visible.current) show(); });
    document.addEventListener("mouseover",  onOver, { passive: true });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", () => { if (visible.current) show(); });
      document.removeEventListener("mouseover",  onOver);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  );
}
