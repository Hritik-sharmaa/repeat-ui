import "./style.css";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

export interface SketchyProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  textColor?: string;
  inkColor?: string;
  offset?: number;
}

// Rounded and soft until hovered, then squared off with an ink outline and a hard shadow.
const Sketchy = ({
  children,
  size = "md",
  color = "#ffffff",
  textColor = "#0a0a0a",
  inkColor = "#0a0a0a",
  offset = 4,
  className = "",
  style,
  ...rest
}: SketchyProps) => {
  return (
    <button
      type="button"
      className={`rui-sketchy ${className}`}
      style={{
        ...SIZES[size],
        ...({ "--rui-bg": color, "--rui-fg": textColor, "--rui-ink": inkColor, "--rui-offset": `${offset}px` } as CSSProperties),
        ...style,
      }}
      {...rest}>
      {children}
    </button>
  );
};

export default Sketchy;
