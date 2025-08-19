"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

const Rotation = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <>
      <style jsx>{`
        .rotation-button {
          border: none !important;
        }

        .rotation-button:before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: conic-gradient(
            from 0deg,
            transparent,
            #00ff88,
            #00ccff,
            #ff00ff,
            #ffaa00,
            #00ff88,
            transparent
          );
          border-radius: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: rotate 3s linear infinite;
          animation-play-state: paused;
          z-index: 0;
        }

        .rotation-button:after {
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          background: #1f2937; /* Same as bg-gray-800 */
          border-radius: 6px;
          z-index: 1;
        }

        .rotation-button:hover:before {
          opacity: 1;
          animation-play-state: running;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <button
        className={`rotation-button relative bg-gray-800 text-white px-4 py-2 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 overflow-hidden hover:-translate-y-0.5 ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...rest}>
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}
export default Rotation;
