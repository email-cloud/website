const CATEGORY_STYLE: Record<
  string,
  { from: string; to: string; accent: string; shape: "bottle" | "wine" | "can" | "box" | "leaf" }
> = {
  wine: { from: "#5b0e2d", to: "#8a1538", accent: "#f4c95d", shape: "wine" },
  "whiskey-bourbon": { from: "#6b3410", to: "#a15a1f", accent: "#f4c95d", shape: "bottle" },
  vodka: { from: "#1e3a5f", to: "#3a6ea5", accent: "#eaf4ff", shape: "bottle" },
  "tequila-mezcal": { from: "#7a3b12", to: "#c17a2f", accent: "#ffe3b0", shape: "bottle" },
  rum: { from: "#4a2a12", to: "#8a5a24", accent: "#ffd98e", shape: "bottle" },
  gin: { from: "#0f4a3c", to: "#1f7a5f", accent: "#d8f4ea", shape: "bottle" },
  "brandy-cognac": { from: "#5a2410", to: "#8a4a1f", accent: "#f4c95d", shape: "bottle" },
  "liqueurs-cordials": { from: "#4a1050", to: "#7a2a80", accent: "#f4c9e8", shape: "bottle" },
  beer: { from: "#8a5a10", to: "#c4901f", accent: "#fff3d0", shape: "can" },
  "seltzers-rtd": { from: "#0e6b6b", to: "#1fa5a5", accent: "#e0fbfb", shape: "can" },
  "mixers-non-alcoholic": { from: "#0e4a7a", to: "#2f7ec7", accent: "#e0f2ff", shape: "can" },
  "snacks-munchies": { from: "#a14a10", to: "#d47a1f", accent: "#fff0d0", shape: "box" },
  "party-bar-supplies": { from: "#1a1a3a", to: "#3a3a6a", accent: "#e0e0ff", shape: "box" },
  tobacco: { from: "#2a2a2a", to: "#4a4a4a", accent: "#e0e0e0", shape: "box" },
  "specialty-more": { from: "#3a2a4a", to: "#6a4a8a", accent: "#f0e0ff", shape: "leaf" },
};

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function Shape({
  shape,
  accent,
  seed,
}: {
  shape: string;
  accent: string;
  seed: number;
}) {
  const tilt = (seed % 7) - 3; // -3..3 deg
  const common = { fill: accent, opacity: 0.92 };
  if (shape === "wine") {
    return (
      <g transform={`translate(100,100) rotate(${tilt})`}>
        <path
          d="M -6 -60 L 6 -60 L 10 -30 C 24 -18 24 20 12 34 L 12 58 L 22 58 L 22 64 L -22 64 L -22 58 L -12 58 L -12 34 C -24 20 -24 -18 -10 -30 Z"
          {...common}
        />
        <rect x="-7" y="-66" width="14" height="8" rx="2" fill={accent} opacity="0.7" />
      </g>
    );
  }
  if (shape === "bottle") {
    return (
      <g transform={`translate(100,100) rotate(${tilt})`}>
        <path
          d="M -9 -58 L 9 -58 L 9 -38 L 17 -24 L 17 56 C 17 61 12 64 8 64 L -8 64 C -12 64 -17 61 -17 56 L -17 -24 L -9 -38 Z"
          {...common}
        />
        <rect x="-9" y="-66" width="18" height="10" rx="2" fill={accent} opacity="0.75" />
        <rect x="-15" y="-6" width="30" height="26" rx="2" fill="#00000022" />
      </g>
    );
  }
  if (shape === "can") {
    return (
      <g transform={`translate(100,100) rotate(${tilt})`}>
        <rect x="-20" y="-56" width="40" height="112" rx="10" {...common} />
        <rect x="-20" y="-56" width="40" height="14" rx="7" fill={accent} opacity="0.6" />
        <ellipse cx="0" cy="-56" rx="20" ry="6" fill={accent} opacity="0.5" />
      </g>
    );
  }
  if (shape === "box") {
    return (
      <g transform={`translate(100,100) rotate(${tilt})`}>
        <rect x="-34" y="-40" width="68" height="80" rx="6" {...common} />
        <rect x="-34" y="-40" width="68" height="18" rx="6" fill={accent} opacity="0.55" />
      </g>
    );
  }
  return (
    <g transform={`translate(100,100) rotate(${tilt})`}>
      <circle r="42" {...common} />
    </g>
  );
}

export default function BottleArt({
  category,
  name,
  className,
}: {
  category: string;
  name: string;
  className?: string;
}) {
  const style = CATEGORY_STYLE[category] ?? CATEGORY_STYLE["specialty-more"];
  const seed = hashStr(name);
  const gradId = `g-${category}`;
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={name}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={style.from} />
          <stop offset="100%" stopColor={style.to} />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${gradId})`} />
      <circle cx="100" cy="100" r="88" fill="#ffffff" opacity="0.04" />
      <Shape shape={style.shape} accent={style.accent} seed={seed} />
      <text
        x="14"
        y="188"
        fontFamily="Georgia, serif"
        fontSize="16"
        fill="#ffffff"
        opacity="0.35"
      >
        {initial}
      </text>
    </svg>
  );
}
