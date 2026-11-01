import type { ButtonHTMLAttributes } from "react";

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
      className={`inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap border border-black/10 font-semibold leading-none shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm disabled:pointer-events-none disabled:opacity-50 ${className}`}
      style={{ ...SIZES[size], background: color, color: textColor, borderRadius: radius, ...style }}
      {...rest}>
      {children}
    </button>
  );
};

export default Simple;
