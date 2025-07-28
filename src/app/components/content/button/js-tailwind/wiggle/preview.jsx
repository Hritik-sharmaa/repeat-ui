"use client";

import { useState } from "react";

export default function Wiggle({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-[200px] h-[60px] bg-yellow-400 text-black border-4 border-black rounded-full font-bold text-[20px] flex justify-center items-center overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute w-[200px] h-[200px] bg-blue-500 rounded-t-full bottom-[-200px] z-0 transition-all duration-500 group-hover:bottom-0" />
      <button
        className={`relative z-10 transition-transform duration-500 origin-center ${
          hovered ? "animate-bounce-middle" : ""
        } ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>

      <style jsx>{`
        @keyframes bounce-middle {
          0% {
            transform: scale(1, 1) rotate(0deg);
          }
          20% {
            transform: scale(1.2, 0.8) rotate(-4deg);
          }
          40% {
            transform: scale(0.9, 1.1) rotate(4deg);
          }
          60% {
            transform: scale(1.05, 0.95) rotate(-2deg);
          }
          80% {
            transform: scale(0.98, 1.02) rotate(2deg);
          }
          100% {
            transform: scale(1, 1) rotate(0deg);
          }
        }

        .animate-bounce-middle {
          animation: bounce-middle 1s ease forwards;
        }
      `}</style>
    </div>
  );
}
