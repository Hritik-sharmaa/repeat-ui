"use client";
import { useState } from "react";

export default function TextShadow({ text }: { text: string }) {
  const [hover, setHover] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <h2
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`uppercase font-bold text-[calc(2rem+5vw)] transition-all duration-300`}
        style={{
          color: "#f6aca2",
          textShadow: hover
            ? `
              3px 3px 0 #f49b90,
              6px 6px 0 #f28b7d,
              9px 9px 0 #f07a6a,
              12px 12px 0 #ee6352
            `
            : "none",
          transform: hover ? "translate(-12px, -12px)" : "translate(0,0)",
        }}
      >
        {text}
      </h2>
    </div>
  );
}
