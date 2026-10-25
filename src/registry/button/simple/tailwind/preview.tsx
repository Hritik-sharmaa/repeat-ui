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
      className={`bg-white text-black px-4 py-2 rounded-md border border-neutral-300 hover:-translate-y-1 transform transition duration-200 hover:shadow-md cursor-pointer ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {children}
    </button>
  );
}

export default Simple;