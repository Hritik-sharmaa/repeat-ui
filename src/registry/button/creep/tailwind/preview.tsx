import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

const Creep = ({
  children,
  onClick,
  className = "",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <div className="relative w-[300px] h-[100px] mx-auto my-[100px] group">
      <div className="absolute inset-0 bg-black rounded-full border-4 border-black overflow-hidden z-0">
        <div className="absolute bottom-[15px] right-[20px] flex gap-[10px]">
          <div className="w-[25px] h-[25px] bg-white rounded-full relative">
            <div className="w-[10px] h-[10px] bg-black rounded-full absolute top-[7px] left-[7px]" />
          </div>
          <div className="w-[25px] h-[25px] bg-white rounded-full relative">
            <div className="w-[10px] h-[10px] bg-black rounded-full absolute top-[7px] left-[7px]" />
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`absolute inset-0 bg-red-600 border-4 border-black rounded-full flex items-center justify-center text-white text-[1.8rem] font-bold cursor-pointer z-10 origin-bottom-left transition-transform duration-400 ease-in-out group-hover:-rotate-8 ${className}`}
        onClick={onClick}
        {...rest}>
        <span>{children}</span>
      </button>
    </div>
  );
}

export default Creep;