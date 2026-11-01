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
      className={`group relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border-2 border-[var(--rui-color)] font-semibold uppercase leading-none tracking-wider text-[var(--rui-color)] transition-[color,transform,box-shadow] hover:-translate-y-0.5 hover:text-[var(--rui-text)] hover:shadow-[0_10px_24px_-8px_var(--rui-color)] disabled:pointer-events-none disabled:opacity-50 ${className}`}
      style={{
        ...SIZES[size],
        transitionDuration: `${duration}s`,
        ...({ "--rui-color": color, "--rui-text": textColor } as CSSProperties),
        ...style,
      }}
      {...rest}>
      <span
        aria-hidden
        className="absolute inset-0 -z-10 translate-y-full bg-[var(--rui-color)] transition-transform ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:translate-y-0"
        style={{ transitionDuration: `${duration}s` }}
      />
      {children}
    </button>
  );
};

export default Fill;
