"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LiveDemo } from "@/site/ui/LiveDemo";
import { categoryStyle, tintStyle } from "@/site/categoryStyle";
import { cn, formatName, trackPointer } from "@/lib/utils";

// How each category's demos fit a tile. Large components render at full size and shrink to fit
// (and are not interactive in the tile); cursors take over the whole page, so they show text.
const FIT: Record<string, { scale?: number; live?: false }> = {
  button: {},
  card: { scale: 0.6 },
  carousel: { scale: 0.5 },
  "text-effect": { scale: 0.6 },
  grid: { scale: 0.38 },
  commons: { scale: 0.7 },
  cursor: { live: false },
};

export function DemoTile({
  category,
  variants,
  title,
  subtitle,
  href,
  style = "tailwind",
  scale = FIT[category]?.scale,
  showCategory = false,
  size = "md",
  className,
}: {
  category: string;
  // One component, or several small ones side by side.
  variants: string[];
  title: string;
  subtitle?: string;
  href: string;
  style?: string;
  scale?: number;
  // A chip with the category's icon in the corner, for pages that mix categories.
  showCategory?: boolean;
  size?: "sm" | "md";
  className?: string;
}) {
  const live = FIT[category]?.live !== false;
  const { icon: Icon } = categoryStyle(category);
  const demos = variants.map((v) => <LiveDemo key={v} category={category} variant={v} style={style} />);

  return (
    <div
      onPointerMove={trackPointer}
      style={tintStyle(category)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-xl hover:shadow-black/10",
        size === "sm" ? "h-64" : "h-80",
        className
      )}>
      <div aria-hidden className="tint-glow pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div aria-hidden className="bg-dots fade-edges pointer-events-none absolute inset-0 opacity-50" />

      {showCategory && (
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/60 px-2.5 py-1 text-xs text-muted backdrop-blur">
          <Icon className="size-3 text-(--tint)" />
          {formatName(category)}
        </span>
      )}

      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {!live ? (
          <p className="max-w-[16rem] px-6 text-center text-sm text-muted">{subtitle}</p>
        ) : scale ? (
          <div
            inert
            className="pointer-events-none absolute left-1/2 top-1/2 flex items-center justify-center"
            style={{ width: `${100 / scale}%`, height: `${100 / scale}%`, transform: `translate(-50%, -50%) scale(${scale})` }}>
            {demos}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-4 px-6">{demos}</div>
        )}
      </div>

      <div className="relative flex items-center justify-between gap-3 border-t border-line bg-surface/80 px-5 py-3 backdrop-blur">
        <Link
          href={href}
          className={cn(
            "min-w-0 text-sm",
            // A tile without interactive content is clickable everywhere.
            (scale || !live) && "after:absolute after:inset-0 after:content-['']"
          )}>
          <span className="block truncate font-medium">{title}</span>
          {subtitle && live && <span className="block truncate text-xs text-muted">{subtitle}</span>}
        </Link>
        <span
          aria-hidden
          className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-all group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
        </span>
      </div>
    </div>
  );
}
