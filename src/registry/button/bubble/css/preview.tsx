"use client";

import { useState } from "react";
import "./style.css";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

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
    <span className="rui-bubble-wrap" onMouseEnter={blow} onMouseLeave={() => setBubbles([])}>
      <button
        type="button"
        className={`rui-bubble ${className}`}
        style={{ ...SIZES[size], ...({ "--rui-bg": color, "--rui-fg": textColor } as CSSProperties), ...style }}
        {...rest}>
        {children}
      </button>
      <span aria-hidden className="rui-bubble-area">
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="rui-bubble-dot"
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
