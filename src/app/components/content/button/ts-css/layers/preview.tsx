import "./style.css";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Layers({
  children,
  onClick,
  className = "",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <div className="button-container">
      <div className="layer layer-3"></div>
      <div className="layer layer-2"></div>
      <button
        className={`layers-button ${className}`}
        onClick={onClick}
        {...rest}>
        <span>{children}</span>
      </button>
    </div>
  );
}
