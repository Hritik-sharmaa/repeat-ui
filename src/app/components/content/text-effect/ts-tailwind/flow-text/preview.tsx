"use client";
import { useRef, useEffect, useState, useMemo, FC, PointerEvent } from "react";

interface FlatTextProps {
  text?: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  interactive?: boolean;
  separator?: string;
}

const FlatText: FC<FlatTextProps> = ({
  text = "",
  speed = 2,
  direction = "left",
  className,
  interactive = true,
  separator = " • ",
}) => {
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [textWidth, setTextWidth] = useState(0);

  const offsetRef = useRef(0);
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const velRef = useRef(0);
  const dirRef = useRef(direction);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (measureRef.current && text) {
      const newWidth = measureRef.current.getBoundingClientRect().width;
      setTextWidth(newWidth);
      offsetRef.current = 0;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(0px)`;
      }
    }
  }, [text]);

  const repeatedText = useMemo(() => {
    if (!textWidth || !text) return text;
    const repeatCount = Math.ceil(window.innerWidth / textWidth) + 3;
    return Array(repeatCount).fill(text).join(separator);
  }, [text, textWidth, separator]);

  useEffect(() => {
    if (!textWidth) return;

    const animate = () => {
      if (!dragRef.current && trackRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        offsetRef.current += delta;

        const wrapPoint = textWidth + 20;
        if (offsetRef.current <= -wrapPoint) {
          offsetRef.current += wrapPoint;
        }
        if (offsetRef.current > 0) {
          offsetRef.current -= wrapPoint;
        }

        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [textWidth, speed]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current || !trackRef.current) return;

    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    offsetRef.current += dx;

    trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  return (
    <div
      className={`overflow-hidden w-full flex items-center ${className ?? ""}`}
      style={{
        cursor: interactive ? (dragRef.current ? "grabbing" : "grab") : "auto",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}>
      <span
        ref={measureRef}
        className="opacity-0 pointer-events-none absolute whitespace-nowrap text-3xl font-bold"
        aria-hidden="true">
        {text}
      </span>

      <div
        ref={trackRef}
        className="whitespace-nowrap text-3xl font-bold"
        style={{
          willChange: "transform",
        }}>
        {repeatedText}
      </div>
    </div>
  );
};

export default FlatText;
