import type { CSSProperties, ReactNode } from "react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-marquee",
  row: "rui-marquee-row",
  track: "rui-marquee-track",
  trackPausable: "rui-marquee-track rui-marquee-pausable",
  item: "rui-marquee-item",
  dot: "rui-marquee-dot",
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
            }
          >
            {row.map((item, i) => (
              <span
                key={i}
                className={C.item}
                style={{ background: cardColor, color: textColor }}
              >
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
