"use client";

import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import "./style.css";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-magnetic",
  body: "rui-magnetic-body",
  button: "rui-magnetic-button",
  label: "rui-magnetic-label",
};

export interface MagneticProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  textColor?: string;
  strength?: number;
  radius?: number;
}

// The button leans toward the pointer and its label leans further, so the two layers part like parallax.
const Magnetic = ({
  children,
  size = "md",
  color = "#fafafa",
  textColor = "#0a0a0a",
  strength = 0.35,
  radius = 999,
  className = "",
  style,
  ...rest
}: MagneticProps) => {
  const spring = { stiffness: 220, damping: 15, mass: 0.4 };
  const bodyX = useMotionValue(0);
  const bodyY = useMotionValue(0);
  const labelX = useMotionValue(0);
  const labelY = useMotionValue(0);
  const x = useSpring(bodyX, spring);
  const y = useSpring(bodyY, spring);
  const lx = useSpring(labelX, spring);
  const ly = useSpring(labelY, spring);

  const pull = (e: MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    bodyX.set(dx * strength);
    bodyY.set(dy * strength);
    labelX.set(dx * strength * 0.6);
    labelY.set(dy * strength * 0.6);
  };
  const release = () => [bodyX, bodyY, labelX, labelY].forEach((v) => v.set(0));

  return (
    <span className={C.root} onMouseMove={pull} onMouseLeave={release}>
      <motion.span className={C.body} style={{ x, y }}>
        <button
          type="button"
          className={`${C.button} ${className}`}
          style={{ ...SIZES[size], background: color, color: textColor, borderRadius: radius, ...style }}
          {...rest}>
          <motion.span className={C.label} style={{ x: lx, y: ly }}>
            {children}
          </motion.span>
        </button>
      </motion.span>
    </span>
  );
};

export default Magnetic;
