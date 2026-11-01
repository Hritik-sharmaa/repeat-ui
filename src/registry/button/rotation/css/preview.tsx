import "./style.css";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

export interface RotationProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  colors?: string[];
  background?: string;
  textColor?: string;
  speed?: number;
  borderWidth?: number;
  alwaysOn?: boolean;
}

// A gradient border that spins around the button on hover, or all the time with `alwaysOn`.
const Rotation = ({
  children,
  size = "md",
  colors = ["#00ff88", "#00ccff", "#ff00ff", "#ffaa00"],
  background = "#1f2937",
  textColor = "#ffffff",
  speed = 3,
  borderWidth = 2,
  alwaysOn = false,
  className = "",
  style,
  ...rest
}: RotationProps) => {
  return (
    <button
      type="button"
      className={`rui-rotation ${alwaysOn ? "rui-rotation-on" : ""} ${className}`}
      style={{
        ...SIZES[size],
        ...({
          "--rui-gradient": `conic-gradient(from 0deg, transparent, ${colors.join(", ")}, ${colors[0]}, transparent)`,
          "--rui-bg": background,
          "--rui-fg": textColor,
          "--rui-speed": `${speed}s`,
          "--rui-border": `${borderWidth}px`,
          "--rui-inner": `${Math.max(10 - borderWidth, 2)}px`,
        } as CSSProperties),
        ...style,
      }}
      {...rest}>
      {children}
    </button>
  );
};

export default Rotation;
