"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "relative isolate cursor-none touch-pan-y select-none overflow-hidden",
  canvas: "pointer-events-none absolute inset-0 z-10 size-full",
  magnet:
    "pointer-events-none absolute left-0 top-0 z-20 opacity-0 transition-opacity duration-200",
};

export interface IronFilingsProps {
  children?: ReactNode;
  filingColor?: string;
  northColor?: string;
  southColor?: string;
  spacing?: number;
  length?: number;
  reach?: number;
  className?: string;
}

type Filing = { x: number; y: number; a: number; jitter: number };

// The magnet drawn under the pointer, in pixels.
const BAR = { w: 64, h: 18 };

// The area is strewn with iron filings and the pointer is a bar magnet. Filings near it swing round into the
// magnet's field lines, loop from pole to pole, and stay where they were left when it moves on. Click to turn
// the magnet a quarter turn and watch the pattern swing round with it.
const IronFilings = ({
  children,
  filingColor = "#c4c4cc",
  northColor = "#ef4444",
  southColor = "#3b82f6",
  spacing = 13,
  length = 9,
  reach = 150,
  className = "",
}: IronFilingsProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const magnet = magnetRef.current;
    if (!root || !canvas || !magnet) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    let filings: Filing[] = [];
    // A fixed-seed shuffle, so the filings fall the same way every time.
    let seed = 7;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const scatter = () => {
      seed = 7;
      filings = [];
      for (let y = spacing / 2; y < h; y += spacing) {
        for (let x = spacing / 2; x < w; x += spacing) {
          filings.push({
            x: x + (rand() - 0.5) * spacing * 0.8,
            y: y + (rand() - 0.5) * spacing * 0.8,
            a: rand() * Math.PI,
            jitter: 0.75 + rand() * 0.5,
          });
        }
      }
    };
    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      w = root.clientWidth;
      h = root.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scatter();
      wake();
    };

    const pole = { x: 0, y: 0, on: false };
    let turn = 0; // where the magnet is heading, in radians
    let facing = 0; // where it points now, easing towards `turn`
    let frame = 0;

    const local = (e: PointerEvent) => {
      const box = root.getBoundingClientRect();
      return { x: e.clientX - box.left, y: e.clientY - box.top };
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      pole.x = p.x;
      pole.y = p.y;
      pole.on = true;
      magnet.style.opacity = "1";
      wake();
    };
    const onLeave = () => {
      pole.on = false;
      magnet.style.opacity = "0";
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      turn += Math.PI / 2;
      wake();
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);

    const draw = () => {
      frame = 0;
      facing += (turn - facing) * 0.18;
      if (Math.abs(turn - facing) < 0.001) facing = turn;
      const mx = Math.cos(facing);
      const my = Math.sin(facing);
      let moving = facing !== turn;
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.strokeStyle = filingColor;
      for (const f of filings) {
        let strength = 0;
        let px = f.x;
        let py = f.y;
        if (pole.on) {
          const rx = f.x - pole.x;
          const ry = f.y - pole.y;
          const dist = Math.hypot(rx, ry) || 1;
          if (dist < BAR.w * 0.45) continue; // under the magnet
          strength = Math.min(1, (reach / dist) ** 2 * 0.35);
          if (strength > 0.02) {
            // A dipole's field: B ∝ 3(m·n)n − m. Filings line up along it, either way round.
            const nx = rx / dist;
            const ny = ry / dist;
            const dot = mx * nx + my * ny;
            const target = Math.atan2(3 * dot * ny - my, 3 * dot * nx - mx);
            const delta =
              ((((target - f.a) % Math.PI) + Math.PI * 1.5) % Math.PI) -
              Math.PI / 2;
            f.a += delta * Math.min(0.5, strength * 0.6);
            if (Math.abs(delta) > 0.002) moving = true;
            // Close in, the pull drags each filing a little towards the magnet.
            px -= nx * strength * 3;
            py -= ny * strength * 3;
          }
        }
        const half = (length * f.jitter * (0.8 + strength * 0.5)) / 2;
        ctx.globalAlpha = 0.4 + strength * 0.6;
        ctx.lineWidth = 1.2 + strength * 0.6;
        ctx.beginPath();
        ctx.moveTo(px - Math.cos(f.a) * half, py - Math.sin(f.a) * half);
        ctx.lineTo(px + Math.cos(f.a) * half, py + Math.sin(f.a) * half);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      magnet.style.transform = `translate(${pole.x - BAR.w / 2}px, ${pole.y - BAR.h / 2}px) rotate(${facing}rad)`;
      if (moving && pole.on) wake();
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(root);
    return () => {
      observer.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      cancelAnimationFrame(frame);
    };
  }, [filingColor, spacing, length, reach]);

  return (
    <div ref={rootRef} className={`${C.root} ${className}`}>
      {children}
      {/* The filings lie on top of the content, like filings scattered on a sheet of paper. */}
      <canvas ref={canvasRef} aria-hidden className={C.canvas} />
      {/* The bar magnet: north pole red, south pole blue, with a little shine. */}
      <div
        ref={magnetRef}
        aria-hidden
        className={C.magnet}
        style={{ transformOrigin: "50% 50%" }}
      >
        <svg
          width={BAR.w}
          height={BAR.h}
          viewBox={`0 0 ${BAR.w} ${BAR.h}`}
          style={{
            overflow: "visible",
            filter: "drop-shadow(0 4px 5px rgba(0,0,0,0.45))",
          }}
        >
          <rect
            x="0"
            y="0"
            width={BAR.w / 2}
            height={BAR.h}
            rx="4"
            fill={southColor}
          />
          <rect
            x={BAR.w / 2}
            y="0"
            width={BAR.w / 2}
            height={BAR.h}
            rx="4"
            fill={northColor}
          />
          <rect
            x={BAR.w / 2 - 4}
            y="0"
            width="8"
            height={BAR.h}
            fill={northColor}
          />
          <rect
            x="2"
            y="2"
            width={BAR.w - 4}
            height={BAR.h * 0.32}
            rx="3"
            fill="rgba(255,255,255,0.3)"
          />
          <text
            x={BAR.w * 0.75}
            y={BAR.h / 2 + 4}
            fill="#fff"
            fontSize="11"
            fontWeight="800"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            N
          </text>
          <text
            x={BAR.w * 0.25}
            y={BAR.h / 2 + 4}
            fill="#fff"
            fontSize="11"
            fontWeight="800"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            S
          </text>
        </svg>
      </div>
    </div>
  );
};

export default IronFilings;
