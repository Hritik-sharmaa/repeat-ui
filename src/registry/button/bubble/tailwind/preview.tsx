"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

type Bubble = { id: number; left: number; size: number; duration: number; color: string };

export interface BubbleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  textColor?: string;
  count?: number;
  rainbow?: boolean;
  bubbleColor?: string;
}

// Hovering blows a handful of bubbles up out of the button.
const Bubble = ({
  children,
  size = "md",
  color = "#2563eb",
  textColor = "#ffffff",
  count = 10,
  rainbow = true,
  bubbleColor = "#60a5fa",
  className = "",
  style,
  ...rest
}: BubbleProps) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const blow = () =>
    setBubbles(
      Array.from({ length: count }, (_, id) => ({
        id,
        left: Math.random() * 100,
        size: 8 + Math.random() * 16,
        duration: 1.6 + Math.random() * 1.6,
        color: rainbow ? `hsl(${Math.random() * 360}, 80%, 65%)` : bubbleColor,
      })),
    );

  return (
    <span className="relative inline-flex" onMouseEnter={blow} onMouseLeave={() => setBubbles([])}>
      <style>{`
        @keyframes rui-rise {
          from { transform: translateY(0) scale(1); opacity: 0.8; }
          to { transform: translateY(-120px) scale(0.6); opacity: 0; }
        }
      `}</style>
      <button
        type="button"
        className={`relative z-10 inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-semibold leading-none transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 disabled:pointer-events-none disabled:opacity-50 ${className}`}
        style={{ ...SIZES[size], background: color, color: textColor, ...style }}
        {...rest}>
        {children}
      </button>
      <span aria-hidden className="pointer-events-none absolute inset-0">
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="absolute bottom-1/2 -translate-x-1/2 rounded-full animate-[rui-rise_2s_ease-out_forwards]"
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              background: b.color,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </span>
    </span>
  );
};

export default Bubble;
