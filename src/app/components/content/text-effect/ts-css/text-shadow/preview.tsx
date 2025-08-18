"use client";
import { useState } from "react";
import "./style.css";

const TextShadow = ({ text, className }: { text: string; className?: string }) => {
  const [, setHover] = useState(false);

  return (
    <div className={`text-shadow-container ${className}`}>
      <h2
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="text-shadow-element">
        {text}
      </h2>
    </div>
  );
}

export default TextShadow;