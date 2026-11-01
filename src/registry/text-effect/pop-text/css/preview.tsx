"use client";

import "./style.css";
import type { CSSProperties } from "react";

export interface PopTextProps {
  maintext?: string;
  subText?: string;
  color?: string;
  accentColor?: string;
  fontSize?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

// Each line flips up from below like a pop-up book page, the second one a beat after the first.
const PopText = ({
  maintext = "Copy. Paste.",
  subText = "Repeat.",
  color = "currentColor",
  accentColor = "#eab308",
  fontSize = 72,
  duration = 1.5,
  stagger = 1,
  className = "",
}: PopTextProps) => {
  return (
    <h1
      className={`rui-pop ${className}`}
      style={{ fontSize: `min(${fontSize}px, 14vw)`, ...({ "--rui-duration": `${duration}s` } as CSSProperties) }}>
      <span className="rui-pop-word" style={{ color }}>
        {maintext}
      </span>
      <span className="rui-pop-word rui-pop-sub" style={{ color: accentColor, animationDelay: `${stagger}s` }}>
        {subText}
      </span>
    </h1>
  );
};

export default PopText;
