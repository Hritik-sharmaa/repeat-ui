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
      className={`inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-black/15 font-semibold leading-none transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:rounded-[2px] hover:border-[var(--rui-ink)] hover:shadow-[inset_0_0_0_1px_var(--rui-ink),var(--rui-offset)_var(--rui-offset)_0_var(--rui-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none disabled:pointer-events-none disabled:opacity-50 ${className}`}
      style={{
        ...SIZES[size],
        background: color,
        color: textColor,
        ...({ "--rui-ink": inkColor, "--rui-offset": `${offset}px` } as CSSProperties),
        ...style,
      }}
      {...rest}>
      {children}
    </button>
  );
};

export default Sketchy;
