"use client";

import { useEffect, useRef, useState } from "react";

type HeroVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

export function HeroVideo({ src, poster, className = "" }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    // Sync once on mount, deferred so we don't trigger a cascading render
    const id = requestAnimationFrame(() => setReduced(mq.matches));
    mq.addEventListener("change", handler);
    return () => {
      cancelAnimationFrame(id);
      mq.removeEventListener("change", handler);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.pause();
      return;
    }
    // Replay quietly if browser auto-paused on tab return
    const onVisibility = () => {
      if (!document.hidden && el.paused) {
        el.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [reduced]);

  if (reduced) {
    return (
      <div
        className={`${className} bg-cover bg-center`}
        style={{
          backgroundImage: poster ? `url(${poster})` : undefined,
          backgroundColor: "#04050a",
        }}
        aria-hidden
      />
    );
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      aria-hidden
    />
  );
}
