"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// The Repeat UI mark: the sheet-music "repeat" sign (thick bar, thin bar, two dots) on a 256 grid.
// Bars take the text colour, dots take the accent. One-colour use: set `mono`.
// The same geometry is in src/app/icon.svg (favicon), public/logo-tile.svg (the same tile, for
// the 3D card demo) and public/logo.svg; keep them in sync.
const BARS = [
  { x: 40, width: 56 },
  { x: 120, width: 24 },
] as const;
const DOTS = [100, 156] as const;

export function LogoMark({
  className,
  animate = false,
  mono = false,
}: {
  className?: string;
  // Plays the "beat" intro: bars rise, then the dots land.
  animate?: boolean;
  mono?: boolean;
}) {
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <svg viewBox="0 0 256 256" aria-hidden className={cn("shrink-0", className)}>
      {BARS.map((bar, i) => (
        <motion.rect
          key={bar.x}
          x={bar.x}
          y={40}
          width={bar.width}
          height={176}
          rx={12}
          fill="currentColor"
          style={{ transformBox: "fill-box", originY: 1 }}
          initial={animate ? { scaleY: 0 } : false}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: i * 0.08, ease }}
        />
      ))}
      {DOTS.map((cy, i) => (
        <motion.circle
          key={cy}
          cx={194}
          cy={cy}
          r={22}
          className={mono ? undefined : "text-accent"}
          fill="currentColor"
          style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}
          initial={animate ? { scale: 0 } : false}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.35 + i * 0.12 }}
        />
      ))}
    </svg>
  );
}

export function Logo({ className, animate }: { className?: string; animate?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="size-6" animate={animate} />
      <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight">Repeat UI</span>
    </span>
  );
}
