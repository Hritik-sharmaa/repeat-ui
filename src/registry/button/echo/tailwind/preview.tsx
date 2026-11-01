"use client";

import { useState, type ButtonHTMLAttributes, type CSSProperties, type MouseEvent } from "react";

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
    <span className="group relative inline-flex" style={{ "--rui-color": color } as CSSProperties}>
      <style>{`
        @keyframes rui-echo {
          from { outline-offset: 0; opacity: 0.9; }
          to { outline-offset: var(--rui-to); opacity: 0; }
        }
      `}</style>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 outline outline-1 outline-offset-0 outline-[var(--rui-color)] transition-all duration-300 ease-out group-hover:opacity-40 group-hover:outline-offset-4"
        style={{ borderRadius: radius }}
      />
      {presses.map((id) =>
        Array.from({ length: echoes }, (_, i) => (
          <span
            key={`${id}-${i}`}
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 outline outline-2 outline-[var(--rui-color)] animate-[rui-echo_0.8s_cubic-bezier(0.2,0.6,0.3,1)_forwards]"
            style={
              {
                borderRadius: radius,
                animationDuration: `${duration}s`,
                animationDelay: `${i * 0.12}s`,
                "--rui-to": `${spread * (i + 1)}px`,
              } as CSSProperties
            }
          />
        )),
      )}
      <button
        type="button"
        onClick={press}
        className={`relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-semibold leading-none shadow-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_var(--rui-color)] active:translate-y-0 active:scale-95 disabled:pointer-events-none disabled:opacity-50 ${className}`}
        style={{ ...SIZES[size], background: color, color: textColor, borderRadius: radius, ...style }}
        {...rest}>
        {children}
      </button>
    </span>
  );
};

export default Echo;
