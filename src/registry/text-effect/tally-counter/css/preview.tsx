"use client";

import { AnimatePresence, motion } from "motion/react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-tally",
  tile: "rui-tally-tile",
  digit: "rui-tally-digit",
  seam: "rui-tally-seam",
  separator: "rui-tally-separator",
};

export interface TallyCounterProps {
  value?: number;
  minDigits?: number;
  grouping?: boolean;
  fontSize?: number;
  color?: string;
  tileColor?: string;
  duration?: number;
  className?: string;
}

// A number on split-flap tiles: when it changes, only the digits that changed flip over.
const TallyCounter = ({
  value = 2048,
  minDigits = 4,
  grouping = true,
  fontSize = 48,
  color = "#fafafa",
  tileColor = "#171717",
  duration = 0.6,
  className = "",
}: TallyCounterProps) => {
  const digits = String(Math.max(0, Math.floor(value))).padStart(minDigits, "0");
  // Tiles are keyed by their place from the right, so a tens digit stays the tens tile.
  const chars = [...digits].flatMap((d, i) => {
    const place = digits.length - i;
    const comma = grouping && place % 3 === 0 && i > 0;
    return comma
      ? [
          { sep: true, key: `s${place}`, char: "," },
          { sep: false, key: `d${place}`, char: d },
        ]
      : [{ sep: false, key: `d${place}`, char: d }];
  });

  return (
    <span className={`${C.root} ${className}`} style={{ fontSize, color }} role="img" aria-label={String(value)}>
      {chars.map(({ sep, key, char }) =>
        sep ? (
          <span key={key} aria-hidden className={C.separator}>
            {char}
          </span>
        ) : (
          <span
            key={key}
            aria-hidden
            className={C.tile}
            style={{
              width: fontSize * 0.78,
              height: fontSize * 1.3,
              background: `linear-gradient(to bottom, color-mix(in srgb, ${tileColor}, white 7%) 50%, ${tileColor} 50%)`,
            }}>
            <AnimatePresence initial={false}>
              <motion.span
                key={char}
                className={C.digit}
                style={{ transformOrigin: "50% 50%" }}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={{ duration, ease: [0.3, 0.7, 0.4, 1] }}>
                {char}
              </motion.span>
            </AnimatePresence>
            <span className={C.seam} />
          </span>
        ),
      )}
    </span>
  );
};

export default TallyCounter;
