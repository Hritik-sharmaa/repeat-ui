"use client";

import { useEffect, useRef } from "react";
import "./style.css";

export interface DotCursorProps {
  size?: number;
  color?: string;
  smoothness?: number;
  hoverScale?: number;
  blend?: boolean;
  hideCursor?: boolean;
}

// A dot that glides after the pointer and swells over links and buttons.
const DotCursor = ({
  size = 24,
  color = "#ffffff",
  smoothness = 0.15,
  hoverScale = 2.5,
  blend = true,
  hideCursor = false,
}: DotCursorProps) => {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let scale = 1;
    let target = 1;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      target = (e.target as Element | null)?.closest?.("a, button, [role='button'], input, label") ? hoverScale : 1;
    };
    window.addEventListener("mousemove", onMove);

    let frame = 0;
    const tick = () => {
      pos.x += (mouse.x - pos.x) * smoothness;
      pos.y += (mouse.y - pos.y) * smoothness;
      scale += (target - scale) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0) scale(${scale})`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [size, smoothness, hoverScale]);

  return (
    <>
      {hideCursor && <style>{`body, body * { cursor: none !important; }`}</style>}
      <div
        ref={dotRef}
        aria-hidden
        className={`rui-dot-cursor ${blend ? "rui-dot-cursor-blend" : ""}`}
        style={{ width: size, height: size, background: color }}
      />
    </>
  );
};

export default DotCursor;
