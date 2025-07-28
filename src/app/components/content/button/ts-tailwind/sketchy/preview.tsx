import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Sketchy({
  children,
  onClick,
  className = "",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`
        bg-white text-black px-4 py-2 rounded-md border border-neutral-300 
        hover:border-black hover:border-2 hover:rounded-none
        hover:shadow-[2px_2px_0px_black]
        hover:-translate-y-1 transform transition-all duration-200 cursor-pointer
        ${className}
      `}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  );
}