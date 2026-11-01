import type { ButtonHTMLAttributes } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

export interface LayersProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  textColor?: string;
  middleColor?: string;
  backColor?: string;
  borderColor?: string;
}

// Two coloured copies fan out behind the button on hover, like a stack of stickers.
const Layers = ({
  children,
  size = "md",
  color = "#facc15",
  textColor = "#0a0a0a",
  middleColor = "#2dd4bf",
  backColor = "#3b82f6",
  borderColor = "#0a0a0a",
  className = "",
  style,
  ...rest
}: LayersProps) => {
  const layer =
    "pointer-events-none absolute inset-0 rounded-full border-2 opacity-0 transition-all duration-300 group-hover:opacity-100";
  return (
    <span className="group relative inline-flex">
      <span
        aria-hidden
        className={`${layer} group-hover:translate-x-3 group-hover:translate-y-3`}
        style={{ background: backColor, borderColor }}
      />
      <span
        aria-hidden
        className={`${layer} group-hover:translate-x-1.5 group-hover:translate-y-1.5`}
        style={{ background: middleColor, borderColor }}
      />
      <button
        type="button"
        className={`relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 font-bold leading-none transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 active:translate-x-0 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 ${className}`}
        style={{ ...SIZES[size], background: color, color: textColor, borderColor, ...style }}
        {...rest}>
        {children}
      </button>
    </span>
  );
};

export default Layers;
