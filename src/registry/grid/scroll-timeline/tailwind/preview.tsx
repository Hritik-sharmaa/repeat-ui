"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "relative mx-auto w-full max-w-xl",
  rail: "absolute bottom-2 top-2 w-0.5 overflow-hidden rounded-full",
  progress: "absolute inset-0 origin-top rounded-full",
  list: "relative m-0 flex list-none flex-col p-0",
  item: "relative",
  dot: "absolute top-1 grid size-4 place-items-center rounded-full border-2",
  date: "m-0 font-mono text-xs uppercase tracking-wider",
  title: "m-0 mt-1.5 text-lg font-semibold tracking-tight",
  text: "m-0 mt-1 text-sm leading-relaxed opacity-60",
};

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
}

export interface ScrollTimelineProps {
  items: TimelineItem[];
  accentColor?: string;
  lineColor?: string;
  dotColor?: string;
  gap?: number;
  className?: string;
}

// A timeline whose line draws itself as you scroll, lighting each milestone as the line reaches it.
const ScrollTimeline = ({
  items,
  accentColor = "#fa5f1b",
  lineColor = "rgba(255, 255, 255, 0.12)",
  dotColor = "#0a0a0a",
  gap = 48,
  className = "",
}: ScrollTimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className={`${C.root} ${className}`}>
      <div className={C.rail} style={{ left: 7, background: lineColor }}>
        <motion.div className={C.progress} style={{ scaleY, background: accentColor }} />
      </div>
      <ol className={C.list} style={{ gap }}>
        {items.map((item) => (
          <motion.li
            key={item.title}
            className={C.item}
            style={{ paddingLeft: 40 }}
            initial="idle"
            whileInView="lit"
            viewport={{ margin: "0px 0px -40% 0px", amount: "all" }}
            variants={{ idle: { opacity: 0.35, x: -6 }, lit: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}>
            <motion.span
              aria-hidden
              className={C.dot}
              style={{ left: 0, borderColor: accentColor }}
              variants={{
                idle: { backgroundColor: dotColor, scale: 0.8, boxShadow: `0 0 0 0 ${accentColor}00` },
                lit: { backgroundColor: accentColor, scale: 1, boxShadow: `0 0 16px 2px ${accentColor}66` },
              }}
            />
            <p className={C.date} style={{ color: accentColor }}>
              {item.date}
            </p>
            <h3 className={C.title}>{item.title}</h3>
            {item.description && <p className={C.text}>{item.description}</p>}
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

export default ScrollTimeline;
