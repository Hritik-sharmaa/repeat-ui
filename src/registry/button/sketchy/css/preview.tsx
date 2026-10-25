import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import "./style.css";

const Sketchy = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
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

export default Sketchy;
