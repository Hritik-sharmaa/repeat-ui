"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LiveDemo } from "@/site/ui/LiveDemo";
import { FIT } from "@/site/ui/DemoTile";
import { tintStyle } from "@/site/categoryStyle";
import { useFlavor } from "@/lib/use-flavor";
import { formatName } from "@/lib/utils";

export interface PeekTarget {
  category: string;
  name: string;
  description?: string;
  top: number;
}

// A live preview card beside the desktop sidebar, for the component name being hovered.
// It waits a moment before showing, so moving the pointer down the list doesn't flash cards.
export function Peek({ hovered }: { hovered: PeekTarget | null }) {
  const style = useFlavor().split("-")[1];
  const [target, setTarget] = useState<PeekTarget | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => setTarget(hovered), hovered ? 250 : 0);
    return () => clearTimeout(timer);
  }, [hovered]);
  return (
    <AnimatePresence>
      {target && (
        <motion.div
          key={`${target.category}-${target.name}`}
          aria-hidden
          initial={{ opacity: 0, x: -10, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -6, scale: 0.98, transition: { duration: 0.12 } }}
          transition={{ type: "spring", stiffness: 500, damping: 34 }}
          className="pointer-events-none fixed left-[calc(16rem+12px)] z-50 w-72 overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/20"
          style={{ top: target.top, ...tintStyle(target.category) }}>
          <div className="tint-glow absolute inset-0" />
          <div className="bg-dots fade-edges absolute inset-0 opacity-50" />
          <PeekPreview category={target.category} name={target.name} description={target.description} style={style} />
          <div className="relative border-t border-line bg-surface/80 px-4 py-2.5 backdrop-blur">
            <p className="text-sm font-medium">{formatName(target.name)}</p>
            {target.description && <p className="truncate text-xs text-muted">{target.description}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PeekPreview({ category, name, description, style }: { category: string; name: string; description?: string; style: string }) {
  const fit = FIT[category] ?? {};
  if (fit.live === false) {
    return <p className="relative grid h-44 place-items-center px-6 text-center text-sm text-muted">{description}</p>;
  }
  // The card is smaller than a tile, so shrink a little more than the tile does.
  const scale = (fit.scale ?? 1) * 0.75;
  return (
    <div inert className="relative h-44 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 flex items-center justify-center"
        style={{ width: `${100 / scale}%`, height: `${100 / scale}%`, transform: `translate(-50%, -50%) scale(${scale})` }}>
        <LiveDemo category={category} variant={name} style={style} />
      </div>
    </div>
  );
}
