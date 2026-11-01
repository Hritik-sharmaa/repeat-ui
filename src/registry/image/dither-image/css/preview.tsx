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

type Algorithm = "floyd-steinberg" | "atkinson" | "bayer" | "threshold";

// A 4×4 ordered-dither matrix, as thresholds between 0 and 1.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// Turns brightness (0 to 1 per pixel) into on/off pixels. Error diffusion pushes each pixel's
// rounding error onto its neighbours, so tones survive as patterns of dots.
function dither(lum: Float32Array, w: number, h: number, algorithm: Algorithm, threshold: number) {
  const out = new Uint8Array(w * h);
  const spread = (x: number, y: number, amount: number) => {
    if (x >= 0 && x < w && y < h) lum[y * w + x] += amount;
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (algorithm === "bayer") {
        out[i] = lum[i] > BAYER[(y % 4) * 4 + (x % 4)] + (threshold - 0.5) ? 1 : 0;
        continue;
      }
      out[i] = lum[i] > threshold ? 1 : 0;
      const err = lum[i] - out[i];
      if (algorithm === "floyd-steinberg") {
        spread(x + 1, y, (err * 7) / 16);
        spread(x - 1, y + 1, (err * 3) / 16);
        spread(x, y + 1, (err * 5) / 16);
        spread(x + 1, y + 1, err / 16);
      } else if (algorithm === "atkinson") {
        for (const [dx, dy] of [
          [1, 0],
          [2, 0],
          [-1, 1],
          [0, 1],
          [1, 1],
          [0, 2],
        ])
          spread(x + dx, y + dy, err / 8);
      }
    }
  }
  return out;
}

// Any CSS colour as [r, g, b], read back from a 1×1 canvas.
function toRgb(color: string) {
  const ctx = document.createElement("canvas").getContext("2d")!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  return ctx.getImageData(0, 0, 1, 1).data;
}

export interface DitherImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  algorithm?: Algorithm;
  pixelSize?: number;
  threshold?: number;
  contrast?: number;
  darkColor?: string;
  lightColor?: string;
  lensSize?: number;
  radius?: number;
  className?: string;
}

// A photo redrawn in two colours, one dot at a time, like an old Mac screen or a newspaper print.
// Hovering opens a lens onto the original. The image must be same-origin or served with CORS headers.
const DitherImage = ({
  src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop",
  alt = "",
  width = 420,
  height = 300,
  algorithm = "floyd-steinberg",
  pixelSize = 3,
  threshold = 0.5,
  contrast = 1.2,
  darkColor = "#0a0a0a",
  lightColor = "#84cc16",
  lensSize = 80,
  radius = 24,
  className = "",
}: DitherImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lensRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const w = Math.max(1, Math.round(width / pixelSize));
      const h = Math.max(1, Math.round(height / pixelSize));
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      // object-fit: cover, by hand: crop the source to the output's shape.
      const scale = Math.max(width / img.width, height / img.height);
      const sw = width / scale;
      const sh = height / scale;
      ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) * FOCUS_Y, sw, sh, 0, 0, w, h);
      let pixels: ImageData;
      try {
        pixels = ctx.getImageData(0, 0, w, h);
      } catch {
        // A cross-origin image without CORS headers can be drawn but not read; leave it undithered.
        return;
      }
      const lum = new Float32Array(w * h);
      for (let i = 0; i < lum.length; i++) {
        const [r, g, b] = [pixels.data[i * 4], pixels.data[i * 4 + 1], pixels.data[i * 4 + 2]];
        lum[i] = Math.min(1, Math.max(0, ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 - 0.5) * contrast + 0.5));
      }
      const bits = dither(lum, w, h, algorithm, threshold);
      const [dark, light] = [toRgb(darkColor), toRgb(lightColor)];
      for (let i = 0; i < bits.length; i++) {
        const c = bits[i] ? light : dark;
        pixels.data.set([c[0], c[1], c[2], 255], i * 4);
      }
      ctx.putImageData(pixels, 0, 0);
    };
    return () => {
      cancelled = true;
    };
  }, [src, width, height, algorithm, pixelSize, threshold, contrast, darkColor, lightColor]);

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
