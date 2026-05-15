// Анимирана 3D DNA спирала — Velion Lab signature visual

type Props = {
  className?: string;
  height?: number;
};

export function DnaHelix({ className = "", height = 600 }: Props) {
  // Generate the helix dots
  const dots = 30;
  const items = Array.from({ length: dots }, (_, i) => {
    const t = i / (dots - 1);
    const angle = i * 25 * (Math.PI / 180);
    const y = t * 100; // percent down
    const x1 = 50 + Math.sin(angle) * 35;
    const x2 = 50 + Math.sin(angle + Math.PI) * 35;
    const depth1 = Math.cos(angle); // -1 to 1
    const depth2 = Math.cos(angle + Math.PI);
    return { i, y, x1, x2, depth1, depth2, angle };
  });

  return (
    <div
      className={`relative dna-container ${className}`}
      style={{ height: `${height}px`, perspective: "1000px" }}
    >
      <div className="dna-helix absolute inset-0">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="dnaGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="strandA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="strandB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>

          {/* Rungs */}
          {items.map(({ i, y, x1, x2, depth1 }) => (
            <line
              key={`r-${i}`}
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke={`rgba(96, 165, 250, ${0.15 + (depth1 + 1) * 0.15})`}
              strokeWidth="0.3"
            />
          ))}

          {/* Strand A — front when depth1 > 0 */}
          {items.map(({ i, y, x1, depth1 }) => (
            <circle
              key={`a-${i}`}
              cx={x1}
              cy={y}
              r={0.8 + Math.max(0, depth1) * 0.7}
              fill="url(#strandA)"
              opacity={0.5 + Math.max(0, depth1) * 0.5}
              filter="url(#dnaGlow)"
            />
          ))}

          {/* Strand B */}
          {items.map(({ i, y, x2, depth2 }) => (
            <circle
              key={`b-${i}`}
              cx={x2}
              cy={y}
              r={0.8 + Math.max(0, depth2) * 0.7}
              fill="url(#strandB)"
              opacity={0.5 + Math.max(0, depth2) * 0.5}
              filter="url(#dnaGlow)"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
