"use client";

import { useState, type ButtonHTMLAttributes, type CSSProperties, type MouseEvent } from "react";
import "./style.css";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

export interface EchoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  textColor?: string;
  echoes?: number;
  spread?: number;
  duration?: number;
  radius?: number;
}

// Hovering shows a faint first echo; every press sends outlines rippling outward, one after another.
const Echo = ({
  children,
  size = "md",
  color = "#fa5f1b",
  textColor = "#ffffff",
  echoes = 3,
  spread = 16,
  duration = 0.8,
  radius = 12,
  className = "",
  style,
  onClick,
  ...rest
}: EchoProps) => {
  // One entry per press still on screen; each press draws its own set of echoes.
  const [presses, setPresses] = useState<number[]>([]);

  const press = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.timeStamp;
    setPresses((p) => [...p, id]);
    setTimeout(() => setPresses((p) => p.filter((x) => x !== id)), (duration + echoes * 0.12) * 1000);
    onClick?.(e);
  };

  return (
    <span
      className="rui-echo"
      style={{ "--rui-color": color, "--rui-radius": `${radius}px`, "--rui-duration": `${duration}s` } as CSSProperties}>
      <span aria-hidden className="rui-echo-hint" />
      {presses.map((id) =>
        Array.from({ length: echoes }, (_, i) => (
          <span
            key={`${id}-${i}`}
            aria-hidden
            className="rui-echo-ring"
            style={{ animationDelay: `${i * 0.12}s`, "--rui-to": `${spread * (i + 1)}px` } as CSSProperties}
          />
        )),
      )}
      <button
        type="button"
        onClick={press}
        className={`rui-echo-button ${className}`}
        style={{ ...SIZES[size], color: textColor, ...style }}
        {...rest}>
        {children}
      </button>
    </span>
  );
};

export default Echo;
