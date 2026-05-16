"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  glare?: boolean;
};

function GlareLayer({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const glareX = useTransform(mx, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(my, [-0.5, 0.5], [10, 90]);
  const background = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(147,197,253,0.32), transparent 55%)`,
  );
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
      style={{ background }}
    />
  );
}

export function TiltCard({
  children,
  className = "",
  intensity = 8,
  scale = 1.015,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 200,
    damping: 22,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={`group relative ${className}`}
    >
      <div style={{ transform: "translateZ(0)" }} className="relative h-full">
        {children}
      </div>
      {glare && <GlareLayer mx={mx} my={my} />}
    </motion.div>
  );
}
