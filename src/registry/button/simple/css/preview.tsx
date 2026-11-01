import "./style.css";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

export interface SimpleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  textColor?: string;
  radius?: number;
}

const Simple = ({
  children,
  size = "md",
  color = "#ffffff",
  textColor = "#0a0a0a",
  radius = 10,
  className = "",
  style,
  ...rest
}: SimpleProps) => {
  return (
    <button
      type="button"
      className={`rui-simple ${className}`}
      style={{
        ...SIZES[size],
        ...({ "--rui-bg": color, "--rui-fg": textColor, "--rui-radius": `${radius}px` } as CSSProperties),
        ...style,
      }}
      {...rest}>
      {children}
    </button>
  );
};

export default Simple;
