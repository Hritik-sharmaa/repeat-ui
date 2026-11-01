import "./style.css";
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
    <span
      className="rui-creep"
      style={
        {
          fontSize: SIZES[size].fontSize,
          "--rui-bg": color,
          "--rui-fg": textColor,
          "--rui-back": backColor,
          "--rui-eye": eyeColor,
          "--rui-tilt": `${tilt}deg`,
        } as CSSProperties
      }>
      <span aria-hidden className="rui-creep-back">
        <span className="rui-creep-eyes">
          <span className="rui-creep-eye">
            <span className="rui-creep-pupil" />
          </span>
          <span className="rui-creep-eye">
            <span className="rui-creep-pupil" />
          </span>
        </span>
      </span>
      <button type="button" className={`rui-creep-button ${className}`} style={{ ...SIZES[size], ...style }} {...rest}>
        {children}
      </button>
    </span>
  );
};

export default Creep;
