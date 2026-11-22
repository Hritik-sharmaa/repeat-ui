"use client";

import {
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-diecut",
  draggable: "rui-diecut-draggable",
  lift: "rui-diecut-lift",
  slap: "rui-diecut-slap",
  body: "rui-diecut-body",
  svg: "rui-diecut-svg",
};

export interface DieCutProps {
  children?: ReactNode;
  outline?: number;
  outlineColor?: string;
  rotate?: number;
  draggable?: boolean;
  className?: string;
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// A vinyl sticker cut around whatever it wraps: an emoji, a word, a logo, a transparent PNG.
// The white border follows the exact shape. Hover lifts it off the page; drag it anywhere and it
// slaps back down where you let go.
const DieCut = ({
  children = "🔥",
  outline = 6,
  outlineColor = "#ffffff",
  rotate = -6,
  draggable = true,
  className = "",
}: DieCutProps) => {
  const filterId = `rui-diecut-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState(0);
  const [held, setHeld] = useState(false);
  const [hover, setHover] = useState(false);
  const [slaps, setSlaps] = useState(0);
  const drag = useRef<{
    x: number;
    y: number;
    px: number;
    py: number;
    lastX: number;
  } | null>(null);

  const onDown = (e: ReactPointerEvent<HTMLSpanElement>) => {
    if (!draggable || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      px: pos.x,
      py: pos.y,
      lastX: e.clientX,
    };
    setHeld(true);
  };
  const onMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const d = drag.current;
    if (!d) return;
    setPos({ x: d.px + e.clientX - d.x, y: d.py + e.clientY - d.y });
    // Swing in the direction of travel, like a sticker held by one edge.
    setTilt((t) => clamp(t * 0.6 + (e.clientX - d.lastX) * 0.9, -18, 18));
    d.lastX = e.clientX;
  };
  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    setHeld(false);
    setTilt(0);
    setSlaps((n) => n + 1);
  };

  const lifted = held || hover;
  const shadow = held
    ? "drop-shadow(0 18px 14px rgba(0,0,0,.28)) drop-shadow(0 4px 4px rgba(0,0,0,.18))"
    : lifted
      ? "drop-shadow(0 10px 10px rgba(0,0,0,.24)) drop-shadow(0 2px 3px rgba(0,0,0,.18))"
      : "drop-shadow(0 2px 1.5px rgba(0,0,0,.28)) drop-shadow(0 6px 8px rgba(0,0,0,.12))";

  return (
    <span
      className={`${C.root} ${draggable ? C.draggable : ""} ${className}`}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        zIndex: held ? 50 : undefined,
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <svg aria-hidden className={C.svg}>
        <filter
          id={filterId}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          {/* Grow the shape's silhouette, paint it, and lay the original back on top. */}
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius={outline}
            result="grown"
          />
          <feGaussianBlur
            in="grown"
            stdDeviation={Math.min(1, outline / 4)}
            result="soft"
          />
          <feComponentTransfer in="soft" result="edge">
            <feFuncA type="linear" slope="6" intercept="-2" />
          </feComponentTransfer>
          <feFlood floodColor={outlineColor} />
          <feComposite in2="edge" operator="in" result="border" />
          <feMerge>
            <feMergeNode in="border" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
      <span
        className={C.lift}
        style={{
          transform: `rotate(${rotate + tilt}deg) translateY(${lifted ? -4 : 0}px) scale(${held ? 1.08 : lifted ? 1.04 : 1})`,
          filter: shadow,
        }}
      >
        <span
          key={slaps}
          className={`${C.body} ${slaps ? C.slap : ""}`}
          style={{ filter: `url(#${filterId})`, padding: outline }}
        >
          {children}
        </span>
      </span>
    </span>
  );
};

export default DieCut;
