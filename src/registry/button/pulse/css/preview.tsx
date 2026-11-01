import "./style.css";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

export interface PulseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  background?: string;
  textColor?: string;
  speed?: number;
}

// A dark button that glows on hover, with light pulsing out from its centre.
const Pulse = ({
  children,
  size = "md",
  color = "#00ff88",
  background = "#18181b",
  textColor = "#fafafa",
  speed = 1.5,
  className = "",
  style,
  ...rest
}: PulseProps) => {
  return (
    <button
      type="button"
      className={`rui-pulse ${className}`}
      style={{
        ...SIZES[size],
        ...({ "--rui-glow": color, "--rui-bg": background, "--rui-fg": textColor, "--rui-speed": `${speed}s` } as CSSProperties),
        ...style,
      }}
      {...rest}>
      {children}
    </button>
  );
};

export default Pulse;
