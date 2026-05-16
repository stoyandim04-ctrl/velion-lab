"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useTilt — mouse-tracking 3D tilt for a card.
 * Returns ref + inline style values you spread on the element.
 */
export function useTilt({ intensity = 8 }: { intensity?: number } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px)");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let target = { rx: 0, ry: 0 };
    const current = { rx: 0, ry: 0 };

    const animate = () => {
      current.rx += (target.rx - current.rx) * 0.12;
      current.ry += (target.ry - current.ry) * 0.12;
      setTransform(
        `perspective(1000px) rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg)`,
      );
      raf = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      target = { rx: -py * intensity, ry: px * intensity };
    };

    const onLeave = () => {
      target = { rx: 0, ry: 0 };
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return { ref, style: { transform, transformStyle: "preserve-3d" as const } };
}

/**
 * useReveal — adds .is-visible to the element when it enters viewport.
 * Simple IntersectionObserver wrapper, no external dependency.
 */
export function useReveal({ threshold = 0.2, once = true }: { threshold?: number; once?: boolean } = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return ref;
}
