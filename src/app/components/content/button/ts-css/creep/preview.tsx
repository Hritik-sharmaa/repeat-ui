import "./style.css";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Creep({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <div className="creepy-container">
      <div className="eyes-layer">
        <div className="eyes">
          <div className="eye">
            <div className="pupil" />
          </div>
          <div className="eye">
            <div className="pupil" />
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`creepy-button ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...rest}>
        <span>{children}</span>
      </button>
    </div>
  );
}
