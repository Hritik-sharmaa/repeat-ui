import "./style.css";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

export interface FillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  textColor?: string;
  duration?: number;
}

// An outlined pill that fills with its colour from the bottom, with a little overshoot.
const Fill = ({
  children,
  size = "md",
  color = "#ff7675",
  textColor = "#ffffff",
  duration = 0.4,
  className = "",
  style,
  ...rest
}: FillProps) => {
  return (
    <button
      type="button"
      className={`rui-fill ${className}`}
      style={{
        ...SIZES[size],
        ...({ "--rui-color": color, "--rui-text": textColor, "--rui-duration": `${duration}s` } as CSSProperties),
        ...style,
      }}
      {...rest}>
      {children}
    </button>
  );
};

export default Fill;
