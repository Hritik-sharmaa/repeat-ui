"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-timeline",
  rail: "rui-timeline-rail",
  progress: "rui-timeline-progress",
  list: "rui-timeline-list",
  item: "rui-timeline-item",
  dot: "rui-timeline-dot",
  date: "rui-timeline-date",
  title: "rui-timeline-title",
  text: "rui-timeline-text",
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className={`${C.root} ${className}`}>
      <div className={C.rail} style={{ left: 7, background: lineColor }}>
        <motion.div
          className={C.progress}
          style={{ scaleY, background: accentColor }}
        />
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
            variants={{
              idle: { opacity: 0.35, x: -6 },
              lit: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.span
              aria-hidden
              className={C.dot}
              style={{ left: 0, borderColor: accentColor }}
              variants={{
                idle: {
                  backgroundColor: dotColor,
                  scale: 0.8,
                  boxShadow: `0 0 0 0 ${accentColor}00`,
                },
                lit: {
                  backgroundColor: accentColor,
                  scale: 1,
                  boxShadow: `0 0 16px 2px ${accentColor}66`,
                },
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
