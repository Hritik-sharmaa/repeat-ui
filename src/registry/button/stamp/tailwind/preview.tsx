"use client";

import { useState, type ButtonHTMLAttributes, type MouseEvent } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "relative inline-flex",
  slot: "pointer-events-none absolute left-1/2 top-1/2 z-0",
  stamp:
    "block whitespace-nowrap rounded-md border-2 px-3 py-1 text-sm font-black uppercase leading-none tracking-[0.2em] opacity-0 animate-[rui-stamp_1.6s_ease-out_forwards]",
  button:
    "relative z-10 inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-semibold leading-none shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
};

type Stamp = { id: number; x: number; y: number; rotate: number };

export interface StampProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  textColor?: string;
  stampText?: string;
  stampColor?: string;
  maxStamps?: number;
  duration?: number;
  radius?: number;
}

// Each press thumps a rubber stamp down near the button; press again and they pile up, each at its own angle.
const Stamp = ({
  children,
  size = "md",
  color = "#fafafa",
  textColor = "#0a0a0a",
  stampText = "Approved",
  stampColor = "#e11d48",
  maxStamps = 6,
  duration = 1.6,
  radius = 10,
  className = "",
  style,
  onClick,
  ...rest
}: StampProps) => {
  const [stamps, setStamps] = useState<Stamp[]>([]);

  const press = (e: MouseEvent<HTMLButtonElement>) => {
    const stamp = {
      id: e.timeStamp,
      x: (Math.random() - 0.5) * 140,
      // Above or below the button, so it never hides the stamp completely.
      y: (Math.random() < 0.5 ? -1 : 1) * (28 + Math.random() * 22),
      rotate: (Math.random() - 0.5) * 32,
    };
    setStamps((s) => [...s, stamp].slice(-maxStamps));
    setTimeout(() => setStamps((s) => s.filter((x) => x.id !== stamp.id)), duration * 1000);
    onClick?.(e);
  };

  return (
    <span className={C.root}>
      <style>{`
        @keyframes rui-stamp {
          0% { transform: scale(1.8); opacity: 0; }
          12% { transform: scale(0.94); opacity: 0.95; }
          20% { transform: scale(1); }
          70% { opacity: 0.85; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
      {stamps.map((s) => (
        <span
          key={s.id}
          aria-hidden
          className={C.slot}
          style={{ transform: `translate(-50%, -50%) translate(${s.x}px, ${s.y}px) rotate(${s.rotate}deg)` }}>
          <span className={C.stamp} style={{ color: stampColor, borderColor: stampColor, animationDuration: `${duration}s` }}>
            {stampText}
          </span>
        </span>
      ))}
      <button
        type="button"
        onClick={press}
        className={`${C.button} ${className}`}
        style={{ ...SIZES[size], background: color, color: textColor, borderRadius: radius, ...style }}
        {...rest}>
        {children}
      </button>
    </span>
  );
};

export default Stamp;
