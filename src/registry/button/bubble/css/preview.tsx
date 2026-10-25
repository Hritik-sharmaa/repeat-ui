"use client";

import { useState } from "react";
import "./style.css";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Bubble = {
  id: number;
  left: number;
  size: number;
  duration: number;
  color: string;
};

const Bubble = ({
  children,
  onClick,
  className = "",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
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

  const clearBubbles = () => {
    setBubbles([]);
  };
  return (
    <div
      className="bubble-button-container"
      onMouseEnter={createBubbles}
      onMouseLeave={clearBubbles}>
      <button
        className={`bubble-button ${className}`}
        onClick={onClick}
        {...rest}>
        <span>{children}</span>
      </button>
      <div className="bubble-area">
        {bubbles.map((bubble) => (
          <span
            key={bubble.id}
            className="bubble"
            style={{
              left: `${bubble.left}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDuration: `${bubble.duration}s`,
              backgroundColor: bubble.color,
            }}></span>
        ))}
      </div>
    </div>
  );
}

export default Bubble;