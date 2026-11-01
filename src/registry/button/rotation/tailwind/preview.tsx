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
  const gradient = `conic-gradient(from 0deg, transparent, ${colors.join(", ")}, ${colors[0]}, transparent)`;
  return (
    <>
      <style>{`
        @keyframes rui-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
      <button
        type="button"
        className={`group relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[10px] font-semibold leading-none transition-transform duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 ${className}`}
        style={{ ...SIZES[size], background: "rgba(255,255,255,0.12)", color: textColor, ...style }}
        {...rest}>
        <span
          aria-hidden
          className={`absolute left-1/2 top-1/2 -z-20 aspect-square w-[max(200%,200px)] animate-[rui-rotate_3s_linear_infinite] transition-opacity duration-300 ${
            alwaysOn
              ? "opacity-100"
              : "opacity-0 [animation-play-state:paused] group-hover:opacity-100 group-hover:[animation-play-state:running]"
          }`}
          style={{ background: gradient, animationDuration: `${speed}s` }}
        />
        <span
          aria-hidden
          className="absolute -z-10 rounded-[var(--rui-inner)]"
          style={{
            inset: borderWidth,
            background,
            ...({ "--rui-inner": `${Math.max(10 - borderWidth, 2)}px` } as CSSProperties),
          }}
        />
        {children}
      </button>
    </>
  );
};

export default Rotation;
