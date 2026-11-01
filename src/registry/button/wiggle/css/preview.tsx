import "./style.css";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

export interface WiggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  fillColor?: string;
  textColor?: string;
  borderColor?: string;
}

// On hover a wave of colour rises through the button and the label wobbles like jelly.
const Wiggle = ({
  children,
  size = "md",
  color = "#facc15",
  fillColor = "#3b82f6",
  textColor = "#0a0a0a",
  borderColor = "#0a0a0a",
  className = "",
  style,
  ...rest
}: WiggleProps) => {
  return (
    <button
      type="button"
      className={`rui-wiggle ${className}`}
      style={{
        ...SIZES[size],
        ...({ "--rui-bg": color, "--rui-fill": fillColor, "--rui-fg": textColor, "--rui-ink": borderColor } as CSSProperties),
        ...style,
      }}
      {...rest}>
      <span className="rui-wiggle-label">{children}</span>
    </button>
  );
};

export default Wiggle;
