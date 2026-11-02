"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-tabs",
  highlight: "rui-tabs-highlight",
  tab: "rui-tabs-tab",
};

export interface MorphTabsProps {
  tabs?: string[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
  accentColor?: string;
  background?: string;
  textColor?: string;
  activeTextColor?: string;
  stretch?: number;
  className?: string;
}

// The highlight's leading edge jumps to the new tab first and its trailing edge follows,
// so it stretches across like elastic instead of sliding.
const MorphTabs = ({
  tabs = ["Overview", "Components", "Pricing", "Docs"],
  defaultIndex = 0,
  onChange,
  accentColor = "#fa5f1b",
  background = "#171717",
  textColor = "#a3a3a3",
  activeTextColor = "#ffffff",
  stretch = 0.12,
  className = "",
}: MorphTabsProps) => {
  const [active, setActive] = useState(defaultIndex);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const placed = useRef(false);
  const left = useMotionValue(0);
  const right = useMotionValue(0);
  const width = useTransform(() => right.get() - left.get());

  useEffect(() => {
    const el = tabRefs.current[active];
    if (!el) return;
    const l = el.offsetLeft;
    const r = l + el.offsetWidth;
    // The first placement is instant; after that the edges move one after the other.
    if (!placed.current) {
      left.set(l);
      right.set(r);
      placed.current = true;
      return;
    }
    const spring = { type: "spring", stiffness: 380, damping: 30 } as const;
    const toRight = l > left.get();
    const lead = animate(toRight ? right : left, toRight ? r : l, spring);
    const trail = animate(toRight ? left : right, toRight ? l : r, {
      ...spring,
      delay: stretch,
    });
    return () => {
      lead.stop();
      trail.stop();
    };
  }, [active, stretch, left, right]);

  return (
    <div
      role="tablist"
      className={`${C.root} ${className}`}
      style={{ background }}
    >
      <motion.span
        aria-hidden
        className={C.highlight}
        style={{ left, width, background: accentColor }}
      />
      {tabs.map((tab, i) => (
        <button
          key={tab}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          type="button"
          role="tab"
          aria-selected={i === active}
          onClick={() => {
            setActive(i);
            onChange?.(i);
          }}
          className={C.tab}
          style={{ color: i === active ? activeTextColor : textColor }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default MorphTabs;
