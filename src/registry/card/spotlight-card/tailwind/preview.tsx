"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

export interface SpotlightCardProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  glowColor?: string;
  background?: string;
  textColor?: string;
  spotlightSize?: number;
  radius?: number;
  borderGlow?: boolean;
  className?: string;
}

// A soft light follows the pointer across the card, and its border lights up where the pointer is nearest.
// The pointer position goes straight into CSS variables, so moving never re-renders React.
const SpotlightCard = ({
  title = "Copy",
  description = "Find a component you like and copy it straight from the page.",
  icon,
  children,
  glowColor = "#fa5f1b",
  background = "#0a0a0a",
  textColor = "#fafafa",
  spotlightSize = 320,
  radius = 24,
  borderGlow = true,
  className = "",
}: SpotlightCardProps) => {
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--rui-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--rui-y", `${e.clientY - rect.top}px`);
  };
  const light = `radial-gradient(var(--rui-size) circle at var(--rui-x) var(--rui-y), var(--rui-glow), transparent 60%)`;

  return (
    <div
      onPointerMove={onPointerMove}
      className={`group relative w-full max-w-72 overflow-hidden border border-white/10 p-6 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_var(--rui-glow)] ${className}`}
      style={
        {
          background,
          color: textColor,
          borderRadius: radius,
          "--rui-glow": glowColor,
          "--rui-size": `${spotlightSize}px`,
          "--rui-x": "50%",
          "--rui-y": "-100%",
        } as CSSProperties
      }>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-[0.15]"
        style={{ background: light }}
      />
      {borderGlow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 border-2 border-transparent opacity-0 transition-opacity duration-300 [mask-composite:exclude] [mask:linear-gradient(#000_0_0)_padding-box,linear-gradient(#000_0_0)] group-hover:opacity-100"
          style={{ borderRadius: radius, background: `${light} border-box` }}
        />
      )}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="absolute right-6 top-6 size-4 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
      <div className="relative">
        {icon && (
          <div
            className="mb-5 grid size-11 place-items-center rounded-xl border border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-6 group-hover:scale-110 [&>svg]:size-5"
            style={{ background: `color-mix(in srgb, ${glowColor} 15%, transparent)`, color: glowColor }}>
            {icon}
          </div>
        )}
        <h3 className="m-0 text-lg font-semibold leading-snug tracking-tight">{title}</h3>
        <p className="mb-0 mt-2 text-sm leading-relaxed opacity-60 transition-opacity duration-300 group-hover:opacity-80">
          {description}
        </p>
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
