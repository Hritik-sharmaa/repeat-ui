"use client";

import { useState } from "react";
import { motion } from "motion/react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "inline-flex cursor-pointer select-none items-center gap-3",
  track:
    "relative shrink-0 cursor-pointer rounded-full border-0 p-0 shadow-inner transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50",
  knob: "absolute rounded-full shadow-md",
  label: "text-sm font-medium",
};

export interface LiquidToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  width?: number;
  height?: number;
  onColor?: string;
  offColor?: string;
  knobColor?: string;
  disabled?: boolean;
  className?: string;
}

// A switch whose knob stretches like a drop of water as it slides across, then settles round again.
const LiquidToggle = ({
  checked,
  defaultChecked = false,
  onChange,
  label = "Notifications",
  width = 60,
  height = 34,
  onColor = "#fa5f1b",
  offColor = "#3f3f46",
  knobColor = "#ffffff",
  disabled = false,
  className = "",
}: LiquidToggleProps) => {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;
  const pad = 4;
  const knob = height - pad * 2;
  const travel = width - knob - pad * 2;

  return (
    <label className={`${C.root} ${className}`}>
      <motion.button
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={() => {
          setInner(!on);
          onChange?.(!on);
        }}
        whileTap={{ scale: 0.94 }}
        className={C.track}
        style={{ width, height, background: on ? onColor : offColor }}
      >
        <motion.span
          className={C.knob}
          style={{ top: pad, height: knob, background: knobColor }}
          initial={false}
          // Named states, so the stretch replays on every toggle (unchanged keyframes would not).
          variants={{
            on: {
              left: pad + travel,
              width: [knob, knob + travel * 0.5, knob],
            },
            off: { left: pad, width: [knob, knob + travel * 0.5, knob] },
          }}
          animate={on ? "on" : "off"}
          transition={{
            left: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
            width: { duration: 0.45, times: [0, 0.45, 1] },
          }}
        />
      </motion.button>
      {label && <span className={C.label}>{label}</span>}
    </label>
  );
};

export default LiquidToggle;
