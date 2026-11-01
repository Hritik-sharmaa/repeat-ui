import "./style.css";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

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
  return (
    <span
      className="rui-layers"
      style={
        {
          "--rui-bg": color,
          "--rui-fg": textColor,
          "--rui-middle": middleColor,
          "--rui-back": backColor,
          "--rui-ink": borderColor,
        } as CSSProperties
      }>
      <span aria-hidden className="rui-layers-sheet rui-layers-back" />
      <span aria-hidden className="rui-layers-sheet rui-layers-middle" />
      <button type="button" className={`rui-layers-button ${className}`} style={{ ...SIZES[size], ...style }} {...rest}>
        {children}
      </button>
    </span>
  );
};

export default Layers;
