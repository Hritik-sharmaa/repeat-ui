import type { ButtonHTMLAttributes, CSSProperties } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

export interface LetterProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  textColor?: string;
  lift?: number;
  stagger?: number;
}

// On hover, each letter hops up in turn, like a wave running through the label.
const Letter = ({
  children,
  size = "md",
  color = "#7c3aed",
  textColor = "#ffffff",
  lift = 8,
  stagger = 0.05,
  className = "",
  style,
  ...rest
}: LetterProps) => {
  return (
    <>
      <style>{`
        @keyframes rui-letter-hop {
          50% { transform: translateY(calc(var(--rui-lift) * -1)); }
        }
      `}</style>
      <button
        type="button"
        className={`group inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full font-semibold leading-none transition-transform duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 ${className}`}
        style={{
          ...SIZES[size],
          background: color,
          color: textColor,
          ...({ "--rui-lift": `${lift}px` } as CSSProperties),
          ...style,
        }}
        {...rest}>
        {typeof children === "string"
          ? [...children].map((char, i) => (
              <span
                key={i}
                className="inline-block group-hover:animate-[rui-letter-hop_0.6s_ease-in-out]"
                style={{ animationDelay: `${i * stagger}s` }}>
                {char === " " ? " " : char}
              </span>
            ))
          : children}
      </button>
    </>
  );
};

export default Letter;
