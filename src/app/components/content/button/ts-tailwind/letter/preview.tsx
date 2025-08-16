"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Letter({
  children,
  onClick,
  className = "",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <>
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .hover-float-up:hover .letter {
          animation: floatUp 0.6s forwards;
        }
      `}</style>

      <button
        className={`bg-[#111] text-white border-none rounded-full px-7 py-3 text-[24px] cursor-pointer inline-flex gap-[2px] overflow-hidden relative transition-transform duration-300 ease-in-out hover:-translate-y-1 hover-float-up ${className}`}
        onClick={onClick}
        {...rest}>
        {typeof children === "string"
          ? children.split("").map((char: string, index: number) => (
              <span
                key={index}
                className="letter inline-block transition-transform duration-300 ease-in-out"
                style={{ animationDelay: `${index * 0.05}s` }}>
                {char}
              </span>
            ))
          : children}
      </button>
    </>
  );
}
