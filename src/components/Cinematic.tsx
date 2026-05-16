"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * <ParallaxLayer speed={0.4}> — translates Y in proportion to page scroll.
 * Negative speed = moves down with scroll; positive = moves up.
 */
export function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * <Counter to={24} /> — animates from 0 → to when scrolled into view.
 */
export function Counter({
  to,
  suffix = "",
  duration = 1.6,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`ticker-digit ${className}`}>
      {val}
      {suffix}
    </span>
  );
}

/**
 * GSAP ScrollTrigger reveal — fades + lifts children when entering view.
 * Stagger across direct .reveal children if `stagger` provided.
 */
export function ScrollReveal({
  children,
  stagger = 0.12,
  className = "",
}: {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = ref.current;
    const targets = root.querySelectorAll<HTMLElement>(".reveal");

    if (reduce) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const trig = ScrollTrigger.batch(Array.from(targets), {
      start: "top 85%",
      onEnter: (els) =>
        gsap.to(els, {
          duration: 0,
          stagger: { each: stagger, from: "start" },
          onStart: () => {
            els.forEach((el, i) => {
              setTimeout(() => el.classList.add("is-visible"), i * stagger * 1000);
            });
          },
        }),
      once: true,
    });

    return () => {
      trig.forEach((t) => t.kill());
    };
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Mouse-tracking parallax inside a container — for hero cards.
 */
export function MouseParallax({
  children,
  strength = 12,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 80, damping: 18 });
  const y = useSpring(0, { stiffness: 80, damping: 18 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left - r.width / 2) / r.width;
      const py = (e.clientY - r.top - r.height / 2) / r.height;
      x.set(px * strength);
      y.set(py * strength);
    };
    const leave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", handle);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength, x, y]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ x, y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Scroll progress indicator across the very top of the viewport.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
    >
      <div
        className="h-full w-full"
        style={{
          background: "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #93c5fd 100%)",
          boxShadow: "0 0 14px rgba(59,130,246,0.7)",
        }}
      />
    </motion.div>
  );
}
