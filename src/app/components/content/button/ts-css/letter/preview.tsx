import "./style.css";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Letter({
  children,
  onClick,
  className = "",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`letter-button ${className}`}
      onClick={onClick}
      {...rest}>
      {typeof children === "string"
        ? children.split("").map((char: string, index: number) => (
            <span
              key={index}
              className="letter"
              style={{ animationDelay: `${index * 0.05}s` }}>
              {char}
            </span>
          ))
        : children}
    </button>
  );
}
