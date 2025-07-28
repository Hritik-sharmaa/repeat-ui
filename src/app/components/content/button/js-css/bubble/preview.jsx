"use client";

import { useState } from "react";
import "./style.css";

export default function Bubble({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}) {
  const [bubbles, setBubbles] = useState([]);

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
