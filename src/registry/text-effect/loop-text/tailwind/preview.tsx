"use client";

import { useId, useRef, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "relative inline-grid cursor-default select-none place-items-center",
  ring: "col-start-1 row-start-1 overflow-visible",
  center: "col-start-1 row-start-1 grid place-items-center",
};

export interface LoopTextProps {
  text?: string;
  radius?: number;
  fontSize?: number;
  speed?: number;
  hoverSpeed?: number;
  reverse?: boolean;
  color?: string;
  children?: ReactNode;
  className?: string;
}

// Text running round a circle, forever. Hovering speeds it up, and it eases back down when you leave.
const LoopText = ({
  text = "Scroll to explore • Copy • Paste • Repeat • ",
  radius = 72,
  fontSize = 13,
  speed = 14,
  hoverSpeed = 4,
  reverse = false,
  color = "currentColor",
  children,
  className = "",
}: LoopTextProps) => {
  const rotate = useMotionValue(0);
  const hovered = useRef(false);
  const boost = useRef(1);
  // SVG ids must be plain characters for the textPath reference to resolve.
  const pathId = `rui-loop-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  useAnimationFrame((_, delta) => {
    boost.current += ((hovered.current ? hoverSpeed : 1) - boost.current) * 0.06;
    rotate.set(rotate.get() + (reverse ? -1 : 1) * (360 / speed) * (delta / 1000) * boost.current);
  });

  const size = (radius + fontSize) * 2;
  const c = size / 2;
  return (
    <span
      className={`${C.root} ${className}`}
      style={{ width: size, height: size, color }}
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}>
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className={C.ring}
        style={{ rotate }}
        role="img"
        aria-label={text.trim()}>
        <path
          id={pathId}
          fill="none"
          d={`M ${c} ${c} m -${radius} 0 a ${radius} ${radius} 0 1 1 ${radius * 2} 0 a ${radius} ${radius} 0 1 1 -${radius * 2} 0`}
        />
        <text
          fontSize={fontSize}
          fontWeight={600}
          letterSpacing="0.18em"
          fill="currentColor"
          style={{ textTransform: "uppercase" }}>
          {/* Stretched to exactly one lap, so the end meets the start. */}
          <textPath href={`#${pathId}`} textLength={2 * Math.PI * radius} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <span className={C.center}>{children}</span>
    </span>
  );
};

export default LoopText;
