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
    <>
      <style>{`
        @keyframes rui-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.25); opacity: 0.25; }
        }
      `}</style>
      <button
        type="button"
        className={`group relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[10px] border border-white/10 font-semibold leading-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--rui-glow)] hover:shadow-[0_0_24px_-4px_var(--rui-glow)] disabled:pointer-events-none disabled:opacity-50 ${className}`}
        style={{
          ...SIZES[size],
          background,
          color: textColor,
          ...({ "--rui-glow": color } as CSSProperties),
          ...style,
        }}
        {...rest}>
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 aspect-square w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--rui-glow)_0%,transparent_70%)] opacity-60 transition-[width] duration-500 group-hover:w-[160%] group-hover:animate-[rui-pulse_1.5s_ease-in-out_infinite]"
          style={{ animationDuration: `${speed}s` }}
        />
        {children}
      </button>
    </>
  );
};

export default Pulse;
