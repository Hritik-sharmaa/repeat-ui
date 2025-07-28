import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import "./style.css";

export default function Sketchy({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`sketchy-button
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {children}
    </button>
  );
}
