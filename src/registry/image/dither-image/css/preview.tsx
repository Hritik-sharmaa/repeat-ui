"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import "./style.css";

// How far down the crop sits when the photo is taller than the frame: a little above centre keeps faces in.
const FOCUS_Y = 0.35;

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-dither",
  canvas: "rui-dither-canvas",
  lens: "rui-dither-lens",
};

type Algorithm = "floyd-steinberg" | "atkinson" | "bayer" | "noise" | "threshold";

// An 8×8 ordered-dither matrix, as thresholds between 0 and 1.
const BAYER = (() => {
  const m = [0, 2, 3, 1];
  const grid: number[] = [];
  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 8; x++) {
      let v = 0;
      for (let bit = 0; bit < 3; bit++) v = v * 4 + m[(((y >> bit) & 1) << 1) | ((x >> bit) & 1)];
      grid.push((v + 0.5) / 64);
    }
  return grid;
})();

// Interleaved gradient noise: an ordered pattern with no visible grid, close to blue noise.
const noise = (x: number, y: number) => (52.9829189 * ((0.06711056 * x + 0.00583715 * y) % 1)) % 1;

// sRGB to linear light and back. Dithering in linear light keeps mid-tones the right brightness.
const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);

// Spreads each pixel's rounding error onto the neighbours ahead of it. Rows run alternately
// left-to-right and right-to-left (serpentine), which avoids diagonal "worm" streaks.
const KERNELS = {
  "floyd-steinberg": [
    [1, 0, 7 / 16],
    [-1, 1, 3 / 16],
    [0, 1, 5 / 16],
    [1, 1, 1 / 16],
  ],
  // Atkinson passes on only 6/8 of the error, for the crisp, high-contrast early-Mac look.
  atkinson: [
    [1, 0, 1 / 8],
    [2, 0, 1 / 8],
    [-1, 1, 1 / 8],
    [0, 1, 1 / 8],
    [1, 1, 1 / 8],
    [0, 2, 1 / 8],
  ],
};

// Brightness (0 to 1, linear) per cell in, palette level per cell out.
function dither(lum: Float32Array, w: number, h: number, algorithm: Algorithm, levels: number) {
  const out = new Uint8Array(w * h);
  const steps = levels - 1;
  const quantize = (v: number) => Math.min(steps, Math.max(0, Math.round(v * steps)));
  for (let y = 0; y < h; y++) {
    const reverse = y % 2 === 1;
    for (let k = 0; k < w; k++) {
      const x = reverse ? w - 1 - k : k;
      const i = y * w + x;
      if (algorithm === "bayer" || algorithm === "noise") {
        const t = algorithm === "bayer" ? BAYER[(y % 8) * 8 + (x % 8)] : noise(x, y);
        out[i] = quantize(lum[i] + (t - 0.5) / steps);
        continue;
      }
      out[i] = quantize(lum[i]);
      if (algorithm === "threshold") continue;
      const err = lum[i] - out[i] / steps;
      for (const [dx, dy, share] of KERNELS[algorithm]) {
        const nx = x + (reverse ? -dx : dx);
        const ny = y + dy;
        if (nx >= 0 && nx < w && ny < h) lum[ny * w + nx] += err * share;
      }
    }
  }
  return out;
}

// Any CSS colour as linear [r, g, b], read back from a 1×1 canvas.
function toLinearRgb(color: string) {
  const ctx = document.createElement("canvas").getContext("2d")!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  return [...ctx.getImageData(0, 0, 1, 1).data.slice(0, 3)].map((c) => toLinear(c / 255));
}

export interface DitherImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  algorithm?: Algorithm;
  pixelSize?: number;
  levels?: number;
  brightness?: number;
  contrast?: number;
  sharpen?: number;
  darkColor?: string;
  lightColor?: string;
  reveal?: boolean;
  lensSize?: number;
  radius?: number;
  className?: string;
}

// A photo redrawn as dots in a few tones, like an early Mac screen or a newspaper print. It scans in
// line by line, and hovering opens a lens onto the original. The image must be same-origin or served
// with CORS headers.
const DitherImage = ({
  src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop",
  alt = "",
  width = 420,
  height = 300,
  algorithm = "atkinson",
  pixelSize = 2,
  levels = 2,
  brightness = 0,
  contrast = 1.15,
  sharpen = 0.5,
  darkColor = "#141414",
  lightColor = "#ece8dc",
  reveal = true,
  lensSize = 90,
  radius = 24,
  className = "",
}: DitherImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lensRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let frame = 0;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      // One dot is a whole number of device pixels, so dots never blur or vary in size.
      const dpr = window.devicePixelRatio || 1;
      const dot = Math.max(1, Math.round(pixelSize * dpr));
      const w = Math.ceil((width * dpr) / dot);
      const h = Math.ceil((height * dpr) / dot);

      const sample = document.createElement("canvas");
      sample.width = w;
      sample.height = h;
      const sctx = sample.getContext("2d", { willReadFrequently: true })!;
      // object-fit: cover, by hand: crop the source to the frame's shape.
      const scale = Math.max(width / img.width, height / img.height);
      const sw = width / scale;
      const sh = height / scale;
      sctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) * FOCUS_Y, sw, sh, 0, 0, w, h);
      let pixels: ImageData;
      try {
        pixels = sctx.getImageData(0, 0, w, h);
      } catch {
        // A cross-origin image without CORS headers can be drawn but not read; leave it undithered.
        return;
      }

      // Linear brightness per dot, with contrast and brightness applied in perceptual space.
      const base = new Float32Array(w * h);
      for (let i = 0; i < base.length; i++) {
        const [r, g, b] = [0, 1, 2].map((c) => toLinear(pixels.data[i * 4 + c] / 255));
        const perceived = toSrgb(0.2126 * r + 0.7152 * g + 0.0722 * b);
        base[i] = toLinear(Math.min(1, Math.max(0, (perceived - 0.5) * contrast + 0.5 + brightness)));
      }
      // Unsharp mask: push each dot away from its neighbours' average, so edges survive the dots.
      const lum = new Float32Array(base);
      if (sharpen > 0)
        for (let y = 1; y < h - 1; y++)
          for (let x = 1; x < w - 1; x++) {
            const i = y * w + x;
            const blur = (base[i - 1] + base[i + 1] + base[i - w] + base[i + w]) / 4;
            lum[i] = Math.min(1, Math.max(0, base[i] + (base[i] - blur) * sharpen * 2));
          }

      const tones = Math.min(4, Math.max(2, Math.round(levels)));
      const level = dither(lum, w, h, algorithm, tones);
      // Palette steps evenly in linear light between the two colours.
      const [dark, light] = [toLinearRgb(darkColor), toLinearRgb(lightColor)];
      const palette = Array.from({ length: tones }, (_, k) =>
        [0, 1, 2].map((c) => Math.round(toSrgb(dark[c] + ((light[c] - dark[c]) * k) / (tones - 1)) * 255)),
      );
      for (let i = 0; i < level.length; i++) pixels.data.set([...palette[level[i]], 255], i * 4);
      sctx.putImageData(pixels, 0, 0);

      canvas.width = w * dot;
      canvas.height = h * dot;
      canvas.style.width = `${(w * dot) / dpr}px`;
      canvas.style.height = `${(h * dot) / dpr}px`;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = false;
      if (!reveal) return ctx.drawImage(sample, 0, 0, w * dot, h * dot);
      // Scan in from the top, a few rows per frame.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const start = performance.now();
      const step = (now: number) => {
        const rows = Math.min(h, Math.ceil((h * (now - start)) / 700));
        ctx.drawImage(sample, 0, 0, w, rows, 0, 0, w * dot, rows * dot);
        if (rows < h) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [src, width, height, algorithm, pixelSize, levels, brightness, contrast, sharpen, darkColor, lightColor, reveal]);

  // The lens is a clip-path on the original photo; moving it never re-renders React.
  const moveLens = (e: PointerEvent<HTMLDivElement>, open: boolean) => {
    const lens = lensRef.current;
    if (!lens) return;
    const rect = e.currentTarget.getBoundingClientRect();
    lens.style.clipPath = `circle(${open ? lensSize / 2 : 0}px at ${e.clientX - rect.left}px ${e.clientY - rect.top}px)`;
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={`${C.root} ${className}`}
      style={{ width, height, borderRadius: radius, background: darkColor }}
      onPointerMove={(e) => lensSize > 0 && moveLens(e, true)}
      onPointerLeave={(e) => moveLens(e, false)}>
      <canvas ref={canvasRef} aria-hidden className={C.canvas} />
      <img
        ref={lensRef}
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        className={C.lens}
        style={{ clipPath: "circle(0px at 50% 50%)", objectPosition: `50% ${FOCUS_Y * 100}%` }}
      />
    </div>
  );
};

export default DitherImage;
