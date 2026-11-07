"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-pen",
  canvas: "rui-pen-canvas",
  nib: "rui-pen-nib",
};

export interface FountainPenProps {
  children?: ReactNode;
  inkColor?: string;
  nibColor?: string;
  thickness?: number;
  fadeTime?: number;
  blots?: boolean;
  splatter?: boolean;
  className?: string;
}

type Stroke = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  w: number;
  t: number;
};
type Drop = { x: number; y: number; r: number; t: number };

// How long fresh ink keeps its wet shine, in milliseconds.
const WET = 400;

// Inside this area the pointer becomes a fountain pen that writes in wet ink. Slow strokes lay down more ink than
// fast ones, ink shines until it dries, resting the pen grows a blot, and a click flicks a spatter of drops.
// Old ink fades away after `fadeTime`, so the area stays usable.
const FountainPen = ({
  children,
  inkColor = "#1d3fbf",
  nibColor = "#d4a94a",
  thickness = 5,
  fadeTime = 3000,
  blots = true,
  splatter = true,
  className = "",
}: FountainPenProps) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nibRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const nib = nibRef.current;
    if (!root || !canvas || !nib) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      w = root.clientWidth;
      h = root.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(root);

    const strokes: Stroke[] = [];
    const drops: Drop[] = [];
    let last: { x: number; y: number; t: number; w: number } | null = null;
    let blot: Drop | null = null;
    let still = 0;
    let tilt = 0;
    let frame = 0;

    const local = (e: PointerEvent) => {
      const box = root.getBoundingClientRect();
      return { x: e.clientX - box.left, y: e.clientY - box.top };
    };

    const onMove = (e: PointerEvent) => {
      const events = e.getCoalescedEvents?.() ?? [e];
      for (const ev of events.length ? events : [e]) {
        const p = local(ev);
        const t = ev.timeStamp || performance.now();
        if (last) {
          const d = Math.hypot(p.x - last.x, p.y - last.y);
          if (d < 0.5) continue;
          const speed = d / Math.max(1, t - last.t);
          // Pressure from speed: a slow hand lets more ink flow.
          const target =
            thickness * Math.max(0.3, Math.min(1.2, 1.25 - speed * 0.45));
          const width = last.w * 0.6 + target * 0.4;
          strokes.push({
            x1: last.x,
            y1: last.y,
            x2: p.x,
            y2: p.y,
            w: width,
            t: performance.now(),
          });
          tilt =
            tilt * 0.8 +
            Math.max(-14, Math.min(14, (p.x - last.x) * 0.9)) * 0.2;
          last = { ...p, t, w: width };
        } else last = { ...p, t, w: thickness * 0.6 };
      }
      blot = null;
      still = performance.now();
      nib.style.opacity = "1";
      nib.style.transform = `translate(${last!.x - 12}px, ${last!.y - 56}px) rotate(${32 + tilt}deg)`;
      wake();
    };
    const onLeave = () => {
      last = null;
      blot = null;
      nib.style.opacity = "0";
    };
    const onDown = (e: PointerEvent) => {
      if (!splatter) return;
      const p = local(e);
      const now = performance.now();
      for (let i = 0; i < 14; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() ** 1.6 * thickness * 7;
        drops.push({
          x: p.x + Math.cos(a) * d,
          y: p.y + Math.sin(a) * d,
          r: thickness * (0.15 + Math.random() * 0.45),
          t: now,
        });
      }
      drops.push({ x: p.x, y: p.y, r: thickness * 1.3, t: now });
      wake();
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);

    const fade = (age: number) =>
      fadeTime > 0 ? Math.max(0, 1 - (age / fadeTime) ** 2) : 1;

    const draw = () => {
      frame = 0;
      const now = performance.now();
      // A resting pen bleeds into the paper.
      if (blots && last && now - still > 140) {
        blot ??= { x: last.x, y: last.y, r: last.w * 0.5, t: now };
        blot.r = Math.min(thickness * 1.6, blot.r + 0.06);
        blot.t = now;
      }
      if (blot && !drops.includes(blot)) drops.push(blot);
      if (fadeTime > 0) {
        while (strokes.length && now - strokes[0].t > fadeTime) strokes.shift();
        for (let i = drops.length - 1; i >= 0; i--)
          if (now - drops[i].t > fadeTime) drops.splice(i, 1);
      }
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.fillStyle = ctx.strokeStyle = inkColor;
      for (const s of strokes) {
        const age = now - s.t;
        const wet = Math.max(0, 1 - age / WET);
        ctx.globalAlpha = fade(age);
        ctx.lineWidth = s.w * (1 + wet * 0.2);
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.stroke();
      }
      for (const d of drops) {
        ctx.globalAlpha = fade(now - d.t);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // The wet shine: a thin light line along ink that hasn't dried yet.
      ctx.strokeStyle = "#ffffff";
      for (const s of strokes) {
        const wet = Math.max(0, 1 - (now - s.t) / WET);
        if (!wet) continue;
        ctx.globalAlpha = wet * 0.35;
        ctx.lineWidth = s.w * 0.25;
        ctx.beginPath();
        ctx.moveTo(s.x1 - s.w * 0.15, s.y1 - s.w * 0.15);
        ctx.lineTo(s.x2 - s.w * 0.15, s.y2 - s.w * 0.15);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // Keep drawing only while something changes: ink fading or drying, or a blot still spreading.
      const fading = fadeTime > 0 && (strokes.length > 0 || drops.length > 0);
      const drying =
        strokes.length > 0 && now - strokes[strokes.length - 1].t < WET;
      const spreading = blot !== null && blot.r < thickness * 1.6;
      if (fading || drying || spreading) wake();
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    return () => {
      observer.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      cancelAnimationFrame(frame);
    };
  }, [inkColor, thickness, fadeTime, blots, splatter]);

  const gold = `rui-pen-gold-${uid}`;
  return (
    <div ref={rootRef} className={`${C.root} ${className}`}>
      {children}
      <canvas ref={canvasRef} aria-hidden className={C.canvas} />
      {/* The nib, tip on the pointer, leaning the way the hand moves. */}
      <div
        ref={nibRef}
        aria-hidden
        className={C.nib}
        style={{ transformOrigin: "12px 56px" }}
      >
        <svg
          width="24"
          height="74"
          viewBox="0 0 24 74"
          style={{
            overflow: "visible",
            filter: "drop-shadow(2px 4px 3px rgba(0,0,0,0.3))",
          }}
        >
          <defs>
            <linearGradient id={gold} x1="0" x2="1">
              <stop offset="0" stopColor={nibColor} />
              <stop offset="0.45" stopColor="#fff6dc" />
              <stop offset="1" stopColor={nibColor} />
            </linearGradient>
          </defs>
          <path
            d="M12 56 L3.5 30 Q4 15 12 8 Q20 15 20.5 30 Z"
            fill={`url(#${gold})`}
            stroke="rgba(0,0,0,0.35)"
            strokeWidth="0.6"
          />
          <path d="M12 56 V25" stroke="rgba(0,0,0,0.55)" strokeWidth="0.8" />
          <circle cx="12" cy="23" r="2" fill="rgba(0,0,0,0.6)" />
          <path
            d="M5 30 Q12 34 19 30"
            fill="none"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="0.6"
          />
          <rect x="4" y="-18" width="16" height="27" rx="3" fill="#18181b" />
          <rect x="4" y="5" width="16" height="3" fill={nibColor} />
        </svg>
      </div>
    </div>
  );
};

export default FountainPen;
