import type { CSSProperties, ReactNode } from "react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "flex w-full flex-col overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]",
  row: "group flex w-max",
  track: "flex shrink-0 animate-[rui-marquee_40s_linear_infinite]",
  trackPausable: "flex shrink-0 animate-[rui-marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]",
  item: "flex shrink-0 items-center gap-2.5 rounded-2xl border border-white/10 px-5 py-3.5 text-sm font-medium shadow-sm transition-colors duration-300 hover:border-white/25",
  dot: "size-1.5 shrink-0 rounded-full",
};

export interface MarqueeGridProps {
  items?: ReactNode[];
  rows?: number;
  speed?: number;
  gap?: number;
  pauseOnHover?: boolean;
  cardColor?: string;
  textColor?: string;
  accentColor?: string;
  className?: string;
}

// Rows of cards drifting sideways forever, each row the other way and at its own pace.
// Hovering a row stops it, so a card can be read or clicked.
const MarqueeGrid = ({
  items = [
    "Buttons",
    "Cards",
    "Carousels",
    "Text effects",
    "Grids",
    "Cursors",
    "Docks",
    "Toggles",
    "Tabs",
    "Palettes",
    "Timelines",
    "Galleries",
  ],
  rows = 3,
  speed = 40,
  gap = 12,
  pauseOnHover = true,
  cardColor = "#171717",
  textColor = "#e5e5e5",
  accentColor = "#fa5f1b",
  className = "",
}: MarqueeGridProps) => {
  return (
    <div className={`${C.root} ${className}`} style={{ gap }}>
      <style>{`@keyframes rui-marquee { to { transform: translateX(-100%); } }`}</style>
      {Array.from({ length: rows }, (_, r) => {
        // Start each row at a different item, so rows never line up.
        const row = items.map((_, i) => items[(i + r * 3) % items.length]);
        const track = (copy: number) => (
          <div
            key={copy}
            aria-hidden={copy > 0 || undefined}
            className={pauseOnHover ? C.trackPausable : C.track}
            style={
              {
                gap,
                paddingRight: gap,
                animationDuration: `${speed * (1 + r * 0.25)}s`,
                animationDirection: r % 2 ? "reverse" : "normal",
              } as CSSProperties
            }>
            {row.map((item, i) => (
              <span key={i} className={C.item} style={{ background: cardColor, color: textColor }}>
                <span className={C.dot} style={{ background: accentColor }} />
                {item}
              </span>
            ))}
          </div>
        );
        return (
          <div key={r} className={C.row}>
            {track(0)}
            {track(1)}
          </div>
        );
      })}
    </div>
  );
};

export default MarqueeGrid;
