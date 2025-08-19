import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

const Layers = ({
  children,
  onClick,
  className = "",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <div className="relative inline-block group w-[160px] h-[60px]">
      <div className="absolute w-[160px] h-[60px] bg-blue-500 border-[3px] border-black rounded-full opacity-0 transition-all duration-300 ease-in-out pointer-events-none top-[8px] left-[8px] group-hover:opacity-100 group-hover:top-[12px] group-hover:left-[12px] z-0" />
      <div className="absolute w-[160px] h-[60px] bg-teal-400 border-[3px] border-black rounded-full opacity-0 transition-all duration-300 ease-in-out pointer-events-none top-[4px] left-[4px] group-hover:opacity-100 group-hover:top-[6px] group-hover:left-[6px] z-10" />
      <button
        className={`relative z-20 w-[160px] h-[60px] bg-yellow-400 border-[3px] border-black rounded-full font-bold transition-transform duration-300 ease-in-out group-hover:-translate-x-1 group-hover:-translate-y-1 ${className}`}
        onClick={onClick}
        {...rest}>
        <span>{children}</span>
      </button>
    </div>
  );
}

export default Layers;