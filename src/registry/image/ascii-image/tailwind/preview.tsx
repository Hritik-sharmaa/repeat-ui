"use client";

import { useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";

// The width available inside an element, without its padding.
function contentWidth(el: HTMLElement) {
  const style = getComputedStyle(el);
  return el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
}

// How far down the crop sits when the photo is taller than the frame: a little above centre keeps faces in.
const FOCUS_Y = 0.35;

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "group relative select-none overflow-hidden shadow-2xl",
  canvas: "absolute inset-0 size-full",
  copy: "absolute right-3 top-3 cursor-pointer rounded-lg border border-white/15 bg-black/60 px-2.5 py-1.5 font-mono text-[11px] font-medium text-white opacity-0 backdrop-blur transition-opacity duration-200 hover:bg-black/80 focus-visible:opacity-100 group-hover:opacity-100",
};

// Monospace glyphs are about this much wider than tall, so cells are sized to match.
const GLYPH_ASPECT = 0.6;

// Shrinks width × height to fit a narrower parent, keeping the shape, so the image is drawn at
// the size it is shown rather than squeezed.
function useFitSize(ref: RefObject<HTMLElement | null>, width: number, height: number) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const measure = (available: number) => setScale(Math.min(1, available / width));
    // Measure once now, so a phone never sees a frame of overflow, then follow resizes.
    measure(contentWidth(parent));
    const observer = new ResizeObserver(([entry]) => measure(entry.contentRect.width));
    observer.observe(parent);
    return () => observer.disconnect();
  }, [ref, width]);
  return { w: Math.round(width * scale), h: Math.round(height * scale) };
}

export interface AsciiImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  columns?: number;
  characters?: string;
  invert?: boolean;
  colorMode?: "mono" | "color";
  color?: string;
  accentColor?: string;
  background?: string;
  contrast?: number;
  lensSize?: number;
  showCopy?: boolean;
  radius?: number;
  className?: string;
}

// A photo rebuilt from text: each cell's brightness picks a character, from sparse to dense.
// Characters near the pointer brighten in the accent colour, and the art can be copied as plain text.
// The image must be same-origin or served with CORS headers.
const AsciiImage = ({
  src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop",
  alt = "",
  width: maxWidth = 420,
  height: maxHeight = 300,
  columns = 90,
  characters = " .:-=+*#%@",
  invert = false,
  colorMode = "mono",
  color = "#d4d4d4",
  accentColor = "#84cc16",
  background = "#0a0a0a",
  contrast = 1.3,
  lensSize = 120,
  showCopy = true,
  radius = 24,
  className = "",
}: AsciiImageProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  // `width` and `height` are the most it takes up; on a narrower screen it shrinks to fit.
  const { w: width, h: height } = useFitSize(rootRef, maxWidth, maxHeight);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // The sampled grid: brightness and colour per cell, kept for redraws as the pointer moves.
  const gridRef = useRef<{ cols: number; rows: number; lum: Float32Array; rgb: Uint8ClampedArray } | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef(0);
  const [copied, setCopied] = useState(false);

  const cellW = width / columns;
  const cellH = cellW / GLYPH_ASPECT;
  const ramp = invert ? [...characters].reverse().join("") : characters;

  const draw = () => {
    const canvas = canvasRef.current;
    const grid = gridRef.current;
    if (!canvas || !grid) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = canvas.width / width;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
    ctx.font = `600 ${cellW / GLYPH_ASPECT}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    ctx.textBaseline = "top";
    const pointer = pointerRef.current;
    const lensR = lensSize / 2;
    for (let y = 0; y < grid.rows; y++) {
      for (let x = 0; x < grid.cols; x++) {
        const i = y * grid.cols + x;
        let level = grid.lum[i] * (ramp.length - 1);
        let near = 0;
        if (pointer && lensR > 0) {
          const d = Math.hypot(x * cellW + cellW / 2 - pointer.x, y * cellH + cellH / 2 - pointer.y);
          near = Math.max(0, 1 - d / lensR);
          level += near * 3;
        }
        const char = ramp[Math.min(ramp.length - 1, Math.round(level))];
        if (char === " ") continue;
        ctx.fillStyle =
          near > 0.15
            ? accentColor
            : colorMode === "color"
              ? `rgb(${grid.rgb[i * 3]},${grid.rgb[i * 3 + 1]},${grid.rgb[i * 3 + 2]})`
              : color;
        ctx.fillText(char, x * cellW, y * cellH);
      }
    }
  };
  // The latest draw, for the image loader and pointer frames to call.
  const drawRef = useRef(draw);
  useEffect(() => {
    drawRef.current = draw;
    draw();
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const cols = columns;
      const rows = Math.max(1, Math.floor(height / (width / columns / GLYPH_ASPECT)));
      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext("2d", { willReadFrequently: true })!;
      // object-fit: cover, by hand, squeezed into one pixel per character cell.
      const scale = Math.max(width / img.width, height / img.height);
      const sw = width / scale;
      const sh = height / scale;
      sctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) * FOCUS_Y, sw, sh, 0, 0, cols, rows);
      let data: Uint8ClampedArray;
      try {
        data = sctx.getImageData(0, 0, cols, rows).data;
      } catch {
        // A cross-origin image without CORS headers can be drawn but not read.
        return;
      }
      const lum = new Float32Array(cols * rows);
      const rgb = new Uint8ClampedArray(cols * rows * 3);
      for (let i = 0; i < lum.length; i++) {
        const [r, g, b] = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
        rgb.set([r, g, b], i * 3);
        lum[i] = Math.min(1, Math.max(0, ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 - 0.5) * contrast + 0.5));
      }
      gridRef.current = { cols, rows, lum, rgb };
      drawRef.current();
    };
    return () => {
      cancelled = true;
    };
  }, [src, width, height, columns, contrast]);

  const point = (e: PointerEvent<HTMLDivElement> | null) => {
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    } else pointerRef.current = null;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => drawRef.current());
  };

  const copy = async () => {
    const grid = gridRef.current;
    if (!grid) return;
    const lines = Array.from({ length: grid.rows }, (_, y) =>
      Array.from({ length: grid.cols }, (_, x) => ramp[Math.round(grid.lum[y * grid.cols + x] * (ramp.length - 1))])
        .join("")
        .trimEnd(),
    );
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      role="img"
      aria-label={alt}
      ref={rootRef}
      className={`${C.root} ${className}`}
      style={{ width, height, borderRadius: radius, background }}
      onPointerMove={(e) => point(e)}
      onPointerLeave={() => point(null)}>
      <canvas ref={canvasRef} aria-hidden className={C.canvas} />
      {showCopy && (
        <button type="button" onClick={copy} className={C.copy}>
          {copied ? "Copied" : "Copy ASCII"}
        </button>
      )}
    </div>
  );
};

export default AsciiImage;
