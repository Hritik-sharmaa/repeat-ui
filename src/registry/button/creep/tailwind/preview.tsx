import type { ButtonHTMLAttributes, CSSProperties } from "react";

// Shared by every Repeat UI button, so they line up side by side.
const SIZES = {
  sm: { height: 36, paddingInline: 16, fontSize: 14 },
  md: { height: 44, paddingInline: 22, fontSize: 15 },
  lg: { height: 52, paddingInline: 28, fontSize: 17 },
};

export interface CreepProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  color?: string;
  textColor?: string;
  backColor?: string;
  eyeColor?: string;
  tilt?: number;
}

// On hover the button tips up from its corner, and a pair of eyes peeks out from underneath.
const Creep = ({
  children,
  size = "md",
  color = "#f44336",
  textColor = "#ffffff",
  backColor = "#0a0a0a",
  eyeColor = "#ffffff",
  tilt = 12,
  className = "",
  style,
  ...rest
}: CreepProps) => {
  return (
    <span className="group relative inline-flex" style={{ fontSize: SIZES[size].fontSize }}>
      <span aria-hidden className="absolute inset-0 overflow-hidden rounded-full" style={{ background: backColor }}>
        <span className="absolute bottom-[0.3em] right-[0.9em] flex gap-[0.3em]">
          {[0, 1].map((eye) => (
            <span key={eye} className="relative size-[1.05em] rounded-full" style={{ background: eyeColor }}>
              <span
                className="absolute left-[0.3em] top-[0.3em] size-[0.45em] rounded-full transition-transform duration-500 group-hover:-translate-x-[0.15em] group-hover:-translate-y-[0.15em]"
                style={{ background: backColor }}
              />
            </span>
          ))}
        </span>
      </span>
      <button
        type="button"
        className={`relative inline-flex origin-bottom-left cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 font-bold leading-none transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:[transform:rotate(calc(var(--rui-tilt)*-1))] disabled:pointer-events-none disabled:opacity-50 ${className}`}
        style={{
          ...SIZES[size],
          background: color,
          color: textColor,
          borderColor: backColor,
          ...({ "--rui-tilt": `${tilt}deg` } as CSSProperties),
          ...style,
        }}
        {...rest}>
        {children}
      </button>
    </span>
  );
};

export default Creep;
