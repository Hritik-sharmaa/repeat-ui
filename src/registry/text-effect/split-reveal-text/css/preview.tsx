import "./style.css";
import type { CSSProperties } from "react";

export interface SplitRevealTextProps {
  outerText?: string;
  innerText?: string;
  color?: string;
  bandColor?: string;
  bandTextColor?: string;
  gap?: number;
  fontSize?: number;
  className?: string;
}

// Hovering splits the word down the middle, and a band of text slides into the gap.
const SplitRevealText = ({
  outerText = "Hover",
  innerText = "Hello there",
  color = "#fb923c",
  bandColor = "#a3e635",
  bandTextColor = "#0a0a0a",
  gap = 18,
  fontSize = 96,
  className = "",
}: SplitRevealTextProps) => {
  return (
    <h2
      className={`rui-split ${className}`}
      style={
        {
          fontSize: `min(${fontSize}px, 18vw)`,
          "--rui-color": color,
          "--rui-band": bandColor,
          "--rui-band-text": bandTextColor,
          "--rui-gap": `${gap}px`,
        } as CSSProperties
      }>
      {outerText}
      <span aria-hidden className="rui-split-half rui-split-top">
        {outerText}
      </span>
      <span aria-hidden className="rui-split-half rui-split-bottom">
        {outerText}
      </span>
      <span className="rui-split-band">{innerText}</span>
    </h2>
  );
};

export default SplitRevealText;
