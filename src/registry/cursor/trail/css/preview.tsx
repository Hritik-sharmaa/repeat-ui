"use client";

import { useEffect, useRef } from "react";
import "./style.css";

export interface TrailCursorProps {
  trailLength?: number;
  trailColor?: string;
  width?: number;
  dotColor?: string;
  smoothness?: number;
  hideCursor?: boolean;
}

// A dot trailed by a ribbon that tapers and fades. Everything moves through refs, so React renders once.
const TrailCursor = ({
  trailLength = 40,
  trailColor = "#9dff00",
  width = 10,
  dotColor = "currentColor",
  smoothness = 0.15,
  hideCursor = false,
}: TrailCursorProps) => {
  const trailRef = useRef<SVGGElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let points: { x: number; y: number }[] = [];
    let visible = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        // Start from the pointer, not from the corner of the screen.
        pos.x = target.x;
        pos.y = target.y;
        visible = true;
      }
    };
    const onLeave = () => {
      visible = false;
    };
    document.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    let frame = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * smoothness;
      pos.y += (target.y - pos.y) * smoothness;
      points = visible ? [{ x: pos.x, y: pos.y }, ...points].slice(0, trailLength) : points.slice(0, -1);

      // One line per pair of points; lines without a pair collapse to nothing.
      const lines = trailRef.current?.children ?? [];
      for (let i = 0; i < lines.length; i++) {
        const a = points[i] ?? points[points.length - 1] ?? pos;
        const b = points[i + 1] ?? a;
        lines[i].setAttribute("x1", String(a.x));
        lines[i].setAttribute("y1", String(a.y));
        lines[i].setAttribute("x2", String(b.x));
        lines[i].setAttribute("y2", String(b.y));
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = visible ? "1" : "0";
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [trailLength, smoothness]);

  return (
    <>
      {hideCursor && <style>{`body, body * { cursor: none !important; }`}</style>}
      <svg aria-hidden className="rui-trail-svg">
        <g ref={trailRef} stroke={trailColor} strokeLinecap="round">
          {Array.from({ length: Math.max(trailLength - 1, 0) }, (_, i) => {
            const fade = 1 - i / trailLength;
            return <line key={i} strokeWidth={width * fade} strokeOpacity={fade} />;
          })}
        </g>
      </svg>
      <div ref={dotRef} aria-hidden className="rui-trail-dot" style={{ background: dotColor }} />
    </>
  );
};

export default TrailCursor;
