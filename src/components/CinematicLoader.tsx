"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "velion_loader_seen_v2";

export function CinematicLoader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen) {
      // Use rAF so we don't synchronously setState inside the effect
      const id = requestAnimationFrame(() => setShow(false));
      return () => cancelAnimationFrame(id);
    }
    sessionStorage.setItem(STORAGE_KEY, "1");

    const start = performance.now();
    const total = 1600;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / total) * 100));
      setProgress(pct);
      if (elapsed < total) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setShow(false), 280);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04050a]"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                width: 700,
                height: 700,
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)",
              }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-10 px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[0.65rem] tracking-[0.5em] uppercase text-blue-300/70"
            >
              Velion · Lab
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight max-w-md"
            >
              <span className="silver-text">Бавният мъж</span>
              <br />
              <span className="blue-text">владее.</span>
            </motion.div>

            <div className="w-64 md:w-80">
              <div className="relative h-px w-full bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #93c5fd 100%)",
                    boxShadow: "0 0 14px rgba(59,130,246,0.65)",
                    width: `${progress}%`,
                  }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[0.65rem] font-mono tracking-[0.3em] uppercase text-gray-500">
                <span>Зареждане</span>
                <span>{String(progress).padStart(3, "0")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
