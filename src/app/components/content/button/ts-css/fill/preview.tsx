import React from "react";
import "./style.css";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Fill({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`fill-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {children}
    </button>
  );
}
