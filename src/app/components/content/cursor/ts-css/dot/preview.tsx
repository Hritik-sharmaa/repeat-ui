"use client";

import { useEffect, useRef } from "react";
import "./style.css";

interface CursorProps {
  size?: number;
  smoothness?: number;
}

const DotCursor = ({ size = 10, smoothness = 0.15 }: CursorProps) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * smoothness;
      pos.current.y += (mouse.current.y - pos.current.y) * smoothness;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${
          pos.current.x - size / 2
        }px, ${pos.current.y - size / 2}px, 0)`;
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("mousemove", handleMove);
  }, [smoothness, size]);

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <div
        ref={cursorRef}
        className="dot-cursor"
        style={{
          width: size,
          height: size,
        }}
      />
    </>
  );
};

export default DotCursor;
