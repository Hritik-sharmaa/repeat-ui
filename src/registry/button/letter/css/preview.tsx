import "./style.css";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

export interface LetterProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  textColor?: string;
  lift?: number;
  stagger?: number;
}

// On hover, each letter hops up in turn, like a wave running through the label.
const Letter = ({
  children,
  size = "md",
  color = "#7c3aed",
  textColor = "#ffffff",
  lift = 8,
  stagger = 0.05,
  className = "",
  style,
  ...rest
}: LetterProps) => {
  return (
    <button
      type="button"
      className={`rui-letter ${className}`}
      style={{
        ...SIZES[size],
        ...({ "--rui-bg": color, "--rui-fg": textColor, "--rui-lift": `${lift}px` } as CSSProperties),
        ...style,
      }}
      {...rest}>
      {typeof children === "string"
        ? [...children].map((char, i) => (
            <span key={i} className="rui-letter-char" style={{ animationDelay: `${i * stagger}s` }}>
              {char === " " ? " " : char}
            </span>
          ))
        : children}
    </button>
  );
};

export default Letter;
