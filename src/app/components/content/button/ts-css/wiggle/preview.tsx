import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import "./style.css";

export default function Wiggle({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <div className="fancy-button">
      <div className="layer-circle"></div>
      <button
        className={`${className}`}
        onClick={onClick}
        disabled={disabled}
        {...rest}>
        <span className={`button-text`}>{children}</span>
      </button>
    </div>
  );
}
