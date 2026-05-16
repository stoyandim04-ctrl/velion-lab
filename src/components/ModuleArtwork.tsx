"use client";

import { motion } from "framer-motion";

type ArtworkProps = {
  moduleId: string;
  className?: string;
  intensity?: "subtle" | "full";
};

const palette = {
  deep: "#0f1d4a",
  mid: "#1d4ed8",
  bright: "#3b82f6",
  glow: "#60a5fa",
  pale: "#93c5fd",
  silver: "#d4d4d8",
};

function GradientStops({ id, from, to }: { id: string; from: string; to: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor={from} />
      <stop offset="100%" stopColor={to} />
    </linearGradient>
  );
}

function ArtworkI() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full">
      <defs>
        <radialGradient id="m1-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={palette.mid} stopOpacity="0.5" />
          <stop offset="100%" stopColor="#04050a" stopOpacity="0" />
        </radialGradient>
        <GradientStops id="m1-ring" from={palette.pale} to={palette.deep} />
      </defs>
      <rect width="400" height="240" fill="url(#m1-bg)" />
      {Array.from({ length: 7 }).map((_, i) => (
        <circle
          key={i}
          cx="200"
          cy="120"
          r={18 + i * 14}
          fill="none"
          stroke="url(#m1-ring)"
          strokeOpacity={0.08 + (7 - i) * 0.07}
          strokeWidth="1"
        />
      ))}
      <circle cx="200" cy="120" r="6" fill={palette.glow} opacity="0.9" />
      <circle cx="200" cy="120" r="12" fill={palette.glow} opacity="0.15" />
    </svg>
  );
}

function ArtworkII() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full">
      <defs>
        <linearGradient id="m2-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={palette.deep} stopOpacity="0" />
          <stop offset="50%" stopColor={palette.bright} stopOpacity="0.8" />
          <stop offset="100%" stopColor={palette.deep} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="m2-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={palette.deep} stopOpacity="0.4" />
          <stop offset="100%" stopColor="#04050a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="url(#m2-bg)" />
      {Array.from({ length: 22 }).map((_, i) => {
        const amp = 32 + Math.sin(i * 0.4) * 18;
        const y = 120 + Math.sin(i * 0.6) * amp;
        return (
          <line
            key={i}
            x1={20 + i * 17}
            y1={120 - (y - 120)}
            x2={20 + i * 17}
            y2={y}
            stroke="url(#m2-wave)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity={0.4 + (i / 22) * 0.5}
          />
        );
      })}
    </svg>
  );
}

function ArtworkIII() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full">
      <defs>
        <radialGradient id="m3-pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.glow} stopOpacity="0.7" />
          <stop offset="60%" stopColor={palette.mid} stopOpacity="0.15" />
          <stop offset="100%" stopColor="#04050a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="m3-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={palette.pale} stopOpacity="0" />
          <stop offset="50%" stopColor={palette.pale} stopOpacity="0.9" />
          <stop offset="100%" stopColor={palette.pale} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#m3-pulse)" />
      <path
        d="M 0 120 L 80 120 L 100 60 L 130 180 L 170 100 L 200 140 L 230 80 L 260 130 L 300 120 L 400 120"
        fill="none"
        stroke="url(#m3-line)"
        strokeWidth="1.6"
      />
      <path
        d="M 0 120 L 80 120 L 100 60 L 130 180 L 170 100 L 200 140 L 230 80 L 260 130 L 300 120 L 400 120"
        fill="none"
        stroke={palette.glow}
        strokeWidth="2.6"
        strokeOpacity="0.35"
        filter="blur(2px)"
      />
    </svg>
  );
}

function ArtworkIV() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full">
      <defs>
        <radialGradient id="m4-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={palette.mid} stopOpacity="0.3" />
          <stop offset="100%" stopColor="#04050a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="m4-node" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.pale} />
          <stop offset="100%" stopColor={palette.mid} />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#m4-bg)" />
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 8 }).map((__, col) => {
          const x = 50 + col * 42;
          const y = 30 + row * 42;
          const opacity = 0.15 + Math.random() * 0.35;
          return (
            <g key={`${row}-${col}`}>
              <circle cx={x} cy={y} r="2" fill={palette.glow} opacity={opacity} />
              {col < 7 && row === 2 && (
                <line x1={x} y1={y} x2={x + 42} y2={y} stroke={palette.glow} strokeOpacity={0.4} strokeWidth="0.6" />
              )}
            </g>
          );
        }),
      )}
      <line x1="50" y1="114" x2="344" y2="114" stroke="url(#m4-node)" strokeOpacity="0.8" strokeWidth="1.4" />
      <circle cx="200" cy="114" r="5" fill="url(#m4-node)" />
      <circle cx="200" cy="114" r="14" fill={palette.glow} opacity="0.12" />
    </svg>
  );
}

function ArtworkV() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full">
      <defs>
        <radialGradient id="m5-mind" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={palette.deep} stopOpacity="0.5" />
          <stop offset="100%" stopColor="#04050a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="m5-ray" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={palette.pale} stopOpacity="0.7" />
          <stop offset="100%" stopColor={palette.pale} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#m5-mind)" />
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI;
        const x1 = 200;
        const y1 = 240;
        const x2 = 200 - Math.cos(angle) * 220;
        const y2 = 240 - Math.sin(angle) * 220;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#m5-ray)"
            strokeWidth="0.8"
            opacity={0.4}
          />
        );
      })}
      <circle cx="200" cy="240" r="40" fill={palette.glow} opacity="0.5" filter="blur(20px)" />
      <circle cx="200" cy="240" r="6" fill={palette.pale} />
    </svg>
  );
}

function ArtworkVI() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full">
      <defs>
        <radialGradient id="m6-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={palette.deep} stopOpacity="0.45" />
          <stop offset="100%" stopColor="#04050a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="m6-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.pale} stopOpacity="0.7" />
          <stop offset="80%" stopColor={palette.mid} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="m6-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={palette.pale} stopOpacity="0" />
          <stop offset="50%" stopColor={palette.pale} stopOpacity="0.7" />
          <stop offset="100%" stopColor={palette.pale} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#m6-bg)" />
      <circle cx="140" cy="120" r="60" fill="url(#m6-sun)" />
      <circle cx="260" cy="120" r="60" fill="url(#m6-sun)" />
      <path d="M 80 120 Q 200 30 320 120" stroke="url(#m6-arc)" strokeWidth="1.4" fill="none" />
      <path d="M 80 120 Q 200 210 320 120" stroke="url(#m6-arc)" strokeWidth="1.4" fill="none" />
      <circle cx="140" cy="120" r="2.5" fill={palette.pale} />
      <circle cx="260" cy="120" r="2.5" fill={palette.pale} />
    </svg>
  );
}

function ArtworkVII() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full">
      <defs>
        <radialGradient id="m7-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={palette.mid} stopOpacity="0.35" />
          <stop offset="100%" stopColor="#04050a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="m7-pillar" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={palette.pale} stopOpacity="0" />
          <stop offset="50%" stopColor={palette.pale} stopOpacity="0.9" />
          <stop offset="100%" stopColor={palette.pale} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#m7-bg)" />
      {[120, 180, 200, 220, 280].map((x, i) => {
        const h = 110 + Math.abs(2 - i) * -20;
        return (
          <line
            key={x}
            x1={x}
            y1={120 - h / 2}
            x2={x}
            y2={120 + h / 2}
            stroke="url(#m7-pillar)"
            strokeWidth={i === 2 ? 2 : 1.2}
            opacity={i === 2 ? 1 : 0.5}
          />
        );
      })}
      <circle cx="200" cy="120" r="40" fill={palette.glow} opacity="0.18" filter="blur(20px)" />
      <line x1="60" y1="180" x2="340" y2="180" stroke={palette.glow} strokeOpacity="0.25" />
    </svg>
  );
}

function ArtworkVIII() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full">
      <defs>
        <radialGradient id="m8-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={palette.deep} stopOpacity="0.4" />
          <stop offset="100%" stopColor="#04050a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="m8-spiral" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.pale} stopOpacity="0.8" />
          <stop offset="100%" stopColor={palette.mid} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#m8-bg)" />
      {Array.from({ length: 40 }).map((_, i) => {
        const t = i / 40;
        const angle = t * Math.PI * 5;
        const radius = 14 + t * 90;
        const x = 200 + Math.cos(angle) * radius;
        const y = 120 + Math.sin(angle) * radius * 0.55;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={1 + (1 - t) * 2.5}
            fill={palette.glow}
            opacity={0.15 + t * 0.7}
          />
        );
      })}
      <circle cx="200" cy="120" r="5" fill={palette.pale} />
      <circle cx="200" cy="120" r="14" fill={palette.glow} opacity="0.18" />
    </svg>
  );
}

const artworks: Record<string, () => React.ReactElement> = {
  "1": ArtworkI,
  "2": ArtworkII,
  "3": ArtworkIII,
  "4": ArtworkIV,
  "5": ArtworkV,
  "6": ArtworkVI,
  "7": ArtworkVII,
  "8": ArtworkVIII,
};

export function ModuleArtwork({ moduleId, className = "", intensity = "full" }: ArtworkProps) {
  const Picked = artworks[moduleId] ?? ArtworkI;
  const opacity = intensity === "subtle" ? 0.55 : 1;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0">
        <Picked />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(4,5,10,0.6)_100%)]" />
    </motion.div>
  );
}
