"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import "./style.css";

export interface FlowTextProps {
  text?: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  interactive?: boolean;
  separator?: string;
  color?: string;
  background?: string;
  fontSize?: number;
  rotate?: number;
}

// An endless ribbon of text. Drag it to scrub; let go and it carries on the way you threw it.
const FlowText = ({
  text = "",
  speed = 2,
  direction = "left",
  className = "",
  interactive = true,
  separator = " • ",
  color = "#0a0a0a",
  background = "#60a5fa",
  fontSize = 30,
  rotate = 0,
}: FlowTextProps) => {
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  // The width of one text + separator: the track loops by exactly this much.
  const [period, setPeriod] = useState(0);
  const offsetRef = useRef(0);
  const dragRef = useRef(false);
  // dragRef is for the animation loop; this re-renders for the cursor.
  const [isDragging, setIsDragging] = useState(false);
  const lastXRef = useRef(0);
  const velRef = useRef(0);
  const dirRef = useRef(direction);

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (!measureRef.current || !text) return;
    setPeriod(measureRef.current.getBoundingClientRect().width);
  }, [text, separator, fontSize]);

  const repeated = useMemo(() => {
    if (!period) return text;
    return Array(Math.ceil(window.innerWidth / period) + 3)
      .fill(text + separator)
      .join("");
  }, [text, period, separator]);

  useEffect(() => {
    if (!period) return;
    let frame = 0;
    const tick = () => {
      if (!dragRef.current && trackRef.current) {
        offsetRef.current += dirRef.current === "right" ? speed : -speed;
        if (offsetRef.current <= -period) offsetRef.current += period;
        if (offsetRef.current > 0) offsetRef.current -= period;
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [period, speed]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    setIsDragging(true);
    lastXRef.current = e.clientX;
    velRef.current = 0;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragRef.current || !trackRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    offsetRef.current += dx;
    trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
  };

  const endDrag = () => {
    if (!dragRef.current) return;
    dragRef.current = false;
    setIsDragging(false);
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  return (
    <div
      className={`rui-flow ${className}`}
      style={{
        color,
        background,
        fontSize,
        transform: `rotate(${rotate}deg)`,
        cursor: interactive ? (isDragging ? "grabbing" : "grab") : "auto",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}>
      <span ref={measureRef} aria-hidden className="rui-flow-measure">
        {text + separator}
      </span>
      <div ref={trackRef} className="rui-flow-track">
        {repeated}
      </div>
    </div>
  );
};

export default FlowText;
