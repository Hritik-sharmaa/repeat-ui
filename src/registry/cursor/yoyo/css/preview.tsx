"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-yoyo",
  layer: "rui-yoyo-layer",
};

export interface YoyoProps {
  children?: ReactNode;
  color?: string;
  stringColor?: string;
  size?: number;
  stringLength?: number;
  throwLength?: number;
  className?: string;
}

const GRAVITY = 2400; // px/s²
const THROW_MS = 260;
const SLEEP_MS = 420;
const REEL_MS = 380;

// Inside this area a yo-yo hangs from the pointer on its string and swings as you move. Click to throw it: it
// spins down to the end of the string, sleeps there a moment, then climbs back up. The string winding and
// unwinding is what turns it, as on a real one.
const Yoyo = ({
  children,
  color = "#ef4444",
  stringColor = "#e5e5e5",
  size = 40,
  stringLength = 80,
  throwLength = 220,
  className = "",
}: YoyoProps) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const stringRef = useRef<SVGLineElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const spinRef = useRef<SVGGElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    if (!root || !svg) return;
    const r = size / 2;
    const hand = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const prev = { x: 0, y: 0 };
    let length = stringLength;
    let angle = 0;
    let spin = 0;
    let throwAt = -1;
    let inside = false;
    let frame = 0;
    let last = 0;

    const local = (e: PointerEvent) => {
      const box = root.getBoundingClientRect();
      return { x: e.clientX - box.left, y: e.clientY - box.top };
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      hand.x = p.x;
      hand.y = p.y;
      if (!inside) {
        // Arrive hanging straight down, at rest.
        inside = true;
        pos.x = prev.x = p.x;
        pos.y = prev.y = p.y + length;
        svg.style.opacity = "1";
      }
      wake();
    };
    const onLeave = () => {
      inside = false;
      svg.style.opacity = "0";
    };
    const onDown = (e: PointerEvent) => {
      if (throwAt >= 0) return;
      onMove(e);
      throwAt = performance.now();
      wake();
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);

    // How long the string is a given time into a throw: out fast, a sleep at the bottom, then reeled back in.
    const throwLengthAt = (t: number) => {
      if (t < THROW_MS)
        return (
          stringLength +
          (throwLength - stringLength) * (1 - (1 - t / THROW_MS) ** 2)
        );
      if (t < THROW_MS + SLEEP_MS) return throwLength;
      const u = Math.min(1, (t - THROW_MS - SLEEP_MS) / REEL_MS);
      return throwLength + (stringLength - throwLength) * u * u * (3 - 2 * u);
    };

    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min(0.033, (now - (last || now)) / 1000) || 1 / 60;
      last = now;
      let busy = false;
      if (throwAt >= 0) {
        const t = now - throwAt;
        const next = throwLengthAt(t);
        // Unwinding string turns the yo-yo; at the bottom it keeps sleeping at the speed it had, and winding back up
        // it turns the same way, as a real one does.
        if (t < THROW_MS + SLEEP_MS && t >= THROW_MS) spin = Math.max(spin, 18);
        else spin = Math.abs(next - length) / r / dt;
        length = next;
        if (t >= THROW_MS + SLEEP_MS + REEL_MS) {
          throwAt = -1;
          length = stringLength;
        }
        busy = true;
      }
      // Verlet: carry on moving, fall, then the string pulls it back when taut.
      const vx = (pos.x - prev.x) * 0.995;
      const vy = (pos.y - prev.y) * 0.995;
      prev.x = pos.x;
      prev.y = pos.y;
      pos.x += vx;
      pos.y += vy + GRAVITY * dt * dt;
      const dx = pos.x - hand.x;
      const dy = pos.y - hand.y;
      const d = Math.hypot(dx, dy) || 1;
      if (d > length || throwAt >= 0) {
        pos.x = hand.x + (dx / d) * length;
        pos.y = hand.y + (dy / d) * length;
      }
      if (throwAt < 0) spin *= 0.92;
      angle += spin * dt;
      busy ||= Math.hypot(vx, vy) > 0.05 || Math.abs(spin) > 0.05;

      stringRef.current?.setAttribute("x1", String(hand.x));
      stringRef.current?.setAttribute("y1", String(hand.y));
      stringRef.current?.setAttribute("x2", String(pos.x));
      stringRef.current?.setAttribute("y2", String(pos.y));
      ringRef.current?.setAttribute("cx", String(hand.x));
      ringRef.current?.setAttribute("cy", String(hand.y));
      bodyRef.current?.setAttribute(
        "transform",
        `translate(${pos.x} ${pos.y})`,
      );
      spinRef.current?.setAttribute(
        "transform",
        `rotate(${(angle * 180) / Math.PI})`,
      );
      if (busy && inside) wake();
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      cancelAnimationFrame(frame);
    };
  }, [size, stringLength, throwLength]);

  const r = size / 2;
  const shine = `rui-yoyo-shine-${uid}`;
  return (
    <div ref={rootRef} className={`${C.root} ${className}`}>
      {children}
      <svg ref={svgRef} aria-hidden className={C.layer}>
        <defs>
          <radialGradient id={shine} cx="35%" cy="30%" r="75%">
            <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="1" stopColor="#000" stopOpacity="0.35" />
          </radialGradient>
        </defs>
        <line
          ref={stringRef}
          stroke={stringColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* The finger loop the string hangs from. */}
        <circle
          ref={ringRef}
          r="7"
          fill="none"
          stroke={stringColor}
          strokeWidth="2"
        />
        <g
          ref={bodyRef}
          style={{ filter: "drop-shadow(0 6px 6px rgba(0,0,0,0.35))" }}
        >
          <circle r={r} fill={color} />
          <g ref={spinRef}>
            {/* A printed swirl and spokes, so the spin shows. */}
            {[0, 120, 240].map((a) => (
              <path
                key={a}
                d={`M0 0 Q${r * 0.55} ${-r * 0.2} ${r * 0.62} ${-r * 0.62}`}
                transform={`rotate(${a})`}
                fill="none"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth={Math.max(1.5, r * 0.12)}
                strokeLinecap="round"
              />
            ))}
          </g>
          <circle
            r={r * 0.82}
            fill="none"
            stroke="rgba(0,0,0,0.25)"
            strokeWidth={Math.max(1, r * 0.06)}
          />
          <circle
            r={r * 0.2}
            fill="#f5f5f5"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="1"
          />
          <circle r={r} fill={`url(#${shine})`} />
        </g>
      </svg>
    </div>
  );
};

export default Yoyo;
