"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle blue cursor glow that follows the pointer.
 * Disables on touch devices and prefers-reduced-motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const touch = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (touch || reduce) return;

    const el = ref.current;
    if (!el) return;

    let target = { x: -200, y: -200 };
    const current = { x: -200, y: -200 };
    let raf = 0;
    let visible = false;

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate3d(${current.x - 200}px, ${current.y - 200}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const move = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
      if (!visible) {
        el.style.opacity = "1";
        visible = true;
      }
    };

    const leave = () => {
      el.style.opacity = "0";
      visible = false;
    };

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[55] w-[400px] h-[400px] rounded-full transition-opacity duration-500 opacity-0"
      style={{
        background:
          "radial-gradient(circle, rgba(96, 165, 250, 0.18) 0%, rgba(96, 165, 250, 0.05) 30%, transparent 60%)",
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}
