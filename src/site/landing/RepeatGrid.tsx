"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

// The hero's motion graphic: "Copy. Paste. Repeat." played by tiny UI tiles.
// copy:   the source tile in the middle flashes.
// paste:  copies fly out of it, one ring at a time, until the grid is full.
// repeat: a wave runs through every tile, then they clear for the next round.
export type Phase = "copy" | "paste" | "repeat";

const COLS = 9;
const ROWS = 3;
const SOURCE = { r: 1, c: 4 };

export function RepeatGrid({ phase }: { phase: Phase }) {
  const filled = phase !== "copy";
  return (
    <div aria-hidden className="mx-auto grid w-full max-w-3xl grid-cols-5 gap-2 px-4 sm:grid-cols-9 sm:gap-3">
      {Array.from({ length: ROWS * COLS }, (_, i) => {
        const r = Math.floor(i / COLS);
        const c = i % COLS;
        const isSource = r === SOURCE.r && c === SOURCE.c;
        // Rings out from the source: how many steps away this slot is.
        const d = Math.abs(r - SOURCE.r) + Math.abs(c - SOURCE.c);
        return (
          <div
            key={i}
            className={cn(
              "relative aspect-[4/3] rounded-xl border border-dashed border-line",
              // Five columns on phones: drop the outer two on each side.
              (c < 2 || c > 6) && "max-sm:hidden"
            )}>
            {isSource ? (
              <motion.div
                className="absolute inset-0"
                animate={phase === "copy" ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <Tile source active={phase === "copy"} />
              </motion.div>
            ) : (
              <AnimatePresence>
                {filled && (
                  <motion.div
                    className="absolute inset-0"
                    // Each copy starts at the source and travels out to its slot.
                    initial={{ opacity: 0, scale: 0.5, x: (SOURCE.c - c) * 24, y: (SOURCE.r - r) * 24 }}
                    animate={
                      phase === "repeat"
                        ? { opacity: 1, scale: [1, 1.1, 1], x: 0, y: 0, transition: { delay: d * 0.07, duration: 0.45 } }
                        : { opacity: 1, scale: 1, x: 0, y: 0, transition: { delay: d * 0.06, type: "spring", stiffness: 380, damping: 26 } }
                    }
                    exit={{ opacity: 0, scale: 0.85, transition: { delay: (10 - d) * 0.02, duration: 0.25 } }}>
                    <Tile active={phase === "repeat"} delay={d * 70} />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
}

// A miniature component: two text lines and a button.
function Tile({ source = false, active = false, delay = 0 }: { source?: boolean; active?: boolean; delay?: number }) {
  return (
    <div
      className={cn(
        "flex size-full flex-col justify-between rounded-xl border p-[12%] transition-colors duration-300",
        source ? "border-accent/60 bg-surface shadow-lg shadow-accent/10" : "border-line bg-surface",
        active && "border-accent"
      )}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="space-y-[10%]">
        <div className="h-1 w-3/4 rounded-full bg-fg/20" />
        <div className="h-1 w-1/2 rounded-full bg-fg/10" />
      </div>
      <div className={cn("h-1.5 w-1/2 rounded-full", source || active ? "bg-accent" : "bg-fg/15")} />
    </div>
  );
}
