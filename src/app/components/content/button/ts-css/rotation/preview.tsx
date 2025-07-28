
import "./style.css";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Rotation({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`rotation-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      <span>{children}</span>
    </button>
  );
}
