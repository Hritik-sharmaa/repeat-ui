import "./style.css";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Simple({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`pulse-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {children}
    </button>
  );
}
