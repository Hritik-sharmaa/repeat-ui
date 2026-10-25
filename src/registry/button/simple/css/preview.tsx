import "./style.css";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

const Simple = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={`simple-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {children}
    </button>
  );
};
export default Simple;
