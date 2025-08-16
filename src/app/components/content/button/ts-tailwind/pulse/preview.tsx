"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Pulse({
  children,
  onClick,
  className = "",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <>
      <style jsx>{`
        .pulse-button-tailwind:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(
            circle,
            rgba(0, 255, 136, 0.6) 0%,
            transparent 70%
          );
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.6s ease;
          z-index: 1;
        }

        .pulse-button-tailwind:hover:before {
          width: 300px;
          height: 300px;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.3;
          }
        }
      `}</style>

      <button
        className={`pulse-button-tailwind relative bg-zinc-900 text-white border border-zinc-700 px-4 py-2 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 ml-5 overflow-hidden hover:border-green-400 hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] hover:-translate-y-0.5 ${className}`}
        onClick={onClick}
        {...rest}>
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}
