"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "relative cursor-crosshair touch-none select-none overflow-hidden shadow-2xl",
  base: "pointer-events-none absolute inset-0 size-full object-cover",
  canvas: "pointer-events-none absolute inset-0 size-full",
  hint: "pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-opacity duration-500",
};

const FILTERS = { grayscale: "grayscale(1) contrast(1.1)", blur: "blur(10px) saturate(0.6)", dim: "brightness(0.3)" };

export interface InkRevealProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  brushSize?: number;
  mode?: keyof typeof FILTERS;
  fade?: boolean;
  fadeSpeed?: number;
  radius?: number;
  hint?: string;
  className?: string;
}

// The image starts muted; dragging the pointer paints the real colours in with a soft brush.
// With `fade`, the paint slowly dries back to the muted image.
const InkReveal = ({
  src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop",
  alt = "",
  width = 420,
  height = 300,
  brushSize = 70,
  mode = "grayscale",
  fade = true,
  fadeSpeed = 0.015,
  radius = 24,
  hint = "Move to reveal",
  className = "",
}: InkRevealProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  // Where the brush has been, kept off screen as a soft white mask.
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => (imageRef.current = img);
    return () => {
      img.onload = null;
    };
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const mask = document.createElement("canvas");
    mask.width = canvas.width;
    mask.height = canvas.height;
    maskRef.current = mask;
    const ctx = canvas.getContext("2d")!;
    const mctx = mask.getContext("2d")!;

    let frame = 0;
    const tick = () => {
      if (fade) {
        mctx.globalCompositeOperation = "destination-out";
        mctx.fillStyle = `rgba(0,0,0,${fadeSpeed})`;
        mctx.fillRect(0, 0, mask.width, mask.height);
        mctx.globalCompositeOperation = "source-over";
      }
      const img = imageRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (img) {
        // object-fit: cover, by hand.
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(mask, 0, 0);
        ctx.globalCompositeOperation = "source-over";
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [width, height, fade, fadeSpeed]);

  const paint = (e: PointerEvent<HTMLDivElement>) => {
    const mask = maskRef.current;
    if (!mask) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dpr = mask.width / rect.width;
    const point = { x: (e.clientX - rect.left) * dpr, y: (e.clientY - rect.top) * dpr };
    const from = lastRef.current ?? point;
    const r = (brushSize / 2) * dpr;
    const mctx = mask.getContext("2d")!;
    // Dabs along the path from the last point, so fast strokes stay continuous.
    const steps = Math.max(1, Math.ceil(Math.hypot(point.x - from.x, point.y - from.y) / (r / 4)));
    for (let i = 1; i <= steps; i++) {
      const x = from.x + ((point.x - from.x) * i) / steps;
      const y = from.y + ((point.y - from.y) * i) / steps;
      const dab = mctx.createRadialGradient(x, y, 0, x, y, r);
      dab.addColorStop(0, "rgba(255,255,255,0.9)");
      dab.addColorStop(1, "rgba(255,255,255,0)");
      mctx.fillStyle = dab;
      mctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    lastRef.current = point;
    if (!touched) setTouched(true);
  };

  return (
    <div
      className={`${C.root} ${className}`}
      style={{ width, height, borderRadius: radius }}
      onPointerMove={paint}
      onPointerLeave={() => (lastRef.current = null)}>
      <img src={src} alt={alt} draggable={false} className={C.base} style={{ filter: FILTERS[mode] }} />
      <canvas ref={canvasRef} aria-hidden className={C.canvas} />
      {hint && (
        <span className={C.hint} style={{ opacity: touched ? 0 : 1 }}>
          {hint}
        </span>
      )}
    </div>
  );
};

export default InkReveal;
