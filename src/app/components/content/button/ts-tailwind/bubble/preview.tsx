"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Bubble = {
  id: number;
  left: number;
  size: number;
  duration: number;
  color: string;
};

export default function Bubble({
  children,
  onClick,
  className = "",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const createBubbles = () => {
    const newBubbles = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 20,
      duration: 2 + Math.random() * 2,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }));
    setBubbles(newBubbles);
  };

  const clearBubbles = () => setBubbles([]);
  return (
    <>
      <style jsx global>{`
        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-150px) scale(0.8);
            opacity: 0;
          }
        }

        .animate-rise {
          animation-name: rise;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
      `}</style>

      <div
        className="relative inline-block"
        onMouseEnter={createBubbles}
        onMouseLeave={clearBubbles}>
        <button
          className={`relative z-10 px-6 py-3 text-white bg-black rounded-md overflow-hidden cursor-pointer ${className}`}
          onClick={onClick}
          {...rest}>
          <span>{children}</span>
        </button>

        <div className="absolute inset-0 pointer-events-none z-0">
          {bubbles.map((bubble) => (
            <span
              key={bubble.id}
              className="absolute bottom-0 rounded-full animate-rise opacity-70"
              style={{
                left: `${bubble.left}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                animationDuration: `${bubble.duration}s`,
                backgroundColor: bubble.color,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
