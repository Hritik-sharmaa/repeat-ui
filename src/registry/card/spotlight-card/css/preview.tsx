"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import "./style.css";

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
      className={`rui-spotlight ${className}`}
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
      <div aria-hidden className="rui-spotlight-light" style={{ background: light }} />
      {borderGlow && (
        <div aria-hidden className="rui-spotlight-border" style={{ borderRadius: radius, background: `${light} border-box` }} />
      )}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="rui-spotlight-arrow"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
      <div className="rui-spotlight-body">
        {icon && (
          <div
            className="rui-spotlight-icon"
            style={{ background: `color-mix(in srgb, ${glowColor} 15%, transparent)`, color: glowColor }}>
            {icon}
          </div>
        )}
        <h3 className="rui-spotlight-title">{title}</h3>
        <p className="rui-spotlight-text">{description}</p>
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
