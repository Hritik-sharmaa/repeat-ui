import type { ButtonHTMLAttributes } from "react";

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
    <>
      <style>{`
        @keyframes rui-wiggle {
          20% { transform: scale(1.2, 0.8) rotate(-4deg); }
          40% { transform: scale(0.9, 1.1) rotate(4deg); }
          60% { transform: scale(1.05, 0.95) rotate(-2deg); }
          80% { transform: scale(0.98, 1.02) rotate(2deg); }
        }
      `}</style>
      <button
        type="button"
        className={`group relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border-2 font-bold leading-none disabled:pointer-events-none disabled:opacity-50 ${className}`}
        style={{ ...SIZES[size], background: color, color: textColor, borderColor, ...style }}
        {...rest}>
        <span
          aria-hidden
          className="absolute left-1/2 top-0 -z-10 aspect-square w-[140%] -translate-x-1/2 translate-y-full rounded-full transition-transform duration-500 ease-out group-hover:-translate-y-[30%]"
          style={{ background: fillColor }}
        />
        <span className="inline-flex items-center gap-2 group-hover:animate-[rui-wiggle_0.9s_ease]">{children}</span>
      </button>
    </>
  );
};

export default Wiggle;
