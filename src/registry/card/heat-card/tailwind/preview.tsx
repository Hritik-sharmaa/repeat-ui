"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "relative isolate select-none overflow-hidden touch-pan-y shadow-2xl",
  canvas: "absolute inset-0 size-full",
  content: "pointer-events-none relative z-10 size-full",
};

export interface HeatCardProps {
  children?: ReactNode;
  secret?: string;
  width?: number;
  height?: number;
  palette?: "mood" | "thermal" | "ember";
  warmth?: number;
  memory?: number;
  radius?: number;
  className?: string;
}

// Colour stops from cold to hot.
const PALETTES = {
  mood: [
    "#120d24",
    "#1e1b4b",
    "#0f766e",
    "#16a34a",
    "#eab308",
    "#f97316",
    "#db2777",
  ],
  thermal: [
    "#05030f",
    "#1e1b8a",
    "#7c3aed",
    "#db2777",
    "#f97316",
    "#facc15",
    "#fffbeb",
  ],
  ember: [
    "#0c0a09",
    "#292524",
    "#7f1d1d",
    "#dc2626",
    "#f97316",
    "#fbbf24",
    "#fef3c7",
  ],
};

// The heat grid is coarse on purpose: drawn up to full size, the browser smooths it into soft blooms.
const CELL = 8;

// The width available inside an element, without its padding.
function contentWidth(el: HTMLElement) {
  const style = getComputedStyle(el);
  return (
    el.clientWidth -
    parseFloat(style.paddingLeft) -
    parseFloat(style.paddingRight)
  );
}

// Shrinks width × height to fit a narrower parent, keeping the shape.
function useFitSize(
  ref: RefObject<HTMLElement | null>,
  width: number,
  height: number,
) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const measure = (available: number) =>
      setScale(Math.min(1, available / width));
    measure(contentWidth(parent));
    const observer = new ResizeObserver(([entry]) =>
      measure(entry.contentRect.width),
    );
    observer.observe(parent);
    return () => observer.disconnect();
  }, [ref, width]);
  return { w: Math.round(width * scale), h: Math.round(height * scale) };
}

const rgb = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

// A card coated in thermochromic paint, like a mood ring. The pointer warms it: heat blooms, spreads, then cools
// back to dark. Press and hold to leave a whole handprint. A hidden message shows only where the card is warm.
const HeatCard = ({
  children,
  secret = "You found it.",
  width: maxWidth = 420,
  height: maxHeight = 260,
  palette = "mood",
  warmth = 1,
  memory = 2.5,
  radius = 24,
  className = "",
}: HeatCardProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { w, h } = useFitSize(rootRef, maxWidth, maxHeight);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d")!;
    const cols = Math.ceil(w / CELL);
    const rows = Math.ceil(h / CELL);
    let heat = new Float32Array(cols * rows);
    let next = new Float32Array(cols * rows);

    // Small canvases at grid size: the colours, and the heat as alpha for revealing the message.
    const colour = document.createElement("canvas");
    colour.width = cols;
    colour.height = rows;
    const cctx = colour.getContext("2d")!;
    const colourData = cctx.createImageData(cols, rows);
    const reveal = document.createElement("canvas");
    reveal.width = cols;
    reveal.height = rows;
    const rctx = reveal.getContext("2d")!;
    const revealData = rctx.createImageData(cols, rows);

    // The message, printed once at full size, then cut down to the warm parts each frame.
    const message = document.createElement("canvas");
    message.width = canvas.width;
    message.height = canvas.height;
    const mctx = message.getContext("2d")!;
    mctx.scale(dpr, dpr);
    mctx.fillStyle = "#fff";
    mctx.textAlign = "center";
    mctx.textBaseline = "middle";
    mctx.font = `800 ${Math.round(h * 0.16)}px ui-sans-serif, system-ui, sans-serif`;
    mctx.fillText(secret, w / 2, h / 2, w * 0.86);
    const masked = document.createElement("canvas");
    masked.width = canvas.width;
    masked.height = canvas.height;
    const kctx = masked.getContext("2d")!;

    // The palette as a 256-step lookup.
    const stops = PALETTES[palette].map(rgb);
    const lut = new Uint8ClampedArray(256 * 3);
    for (let i = 0; i < 256; i++) {
      const t = (i / 255) * (stops.length - 1);
      const a = Math.floor(t);
      const b = Math.min(stops.length - 1, a + 1);
      const f = t - a;
      for (let c = 0; c < 3; c++)
        lut[i * 3 + c] = stops[a][c] + (stops[b][c] - stops[a][c]) * f;
    }

    let pointer: { x: number; y: number; down: boolean } | null = null;
    let frame = 0;
    let last = 0;

    // Heat laid down as a soft round spot; a press lays down a palm and five fingers.
    const spot = (x: number, y: number, r: number, amount: number) => {
      const gx = x / CELL;
      const gy = y / CELL;
      const gr = r / CELL;
      for (
        let j = Math.max(0, Math.floor(gy - gr));
        j <= Math.min(rows - 1, Math.ceil(gy + gr));
        j++
      ) {
        for (
          let i = Math.max(0, Math.floor(gx - gr));
          i <= Math.min(cols - 1, Math.ceil(gx + gr));
          i++
        ) {
          const d = Math.hypot(i - gx, j - gy) / gr;
          if (d < 1)
            heat[j * cols + i] = Math.min(
              1.2,
              heat[j * cols + i] + amount * (1 - d * d),
            );
        }
      }
    };
    const hand = (x: number, y: number, amount: number) => {
      const u = Math.min(w, h) / 260;
      spot(x, y + 14 * u, 34 * u, amount);
      [
        [-30, -38, 11],
        [-12, -52, 11],
        [7, -54, 11],
        [25, -46, 10],
        [42, -8, 10],
      ].forEach(([dx, dy, r]) => {
        spot(x + dx * u, y + dy * u, r * u, amount * 0.9);
        spot(x + dx * 0.75 * u, y + dy * 0.75 * u, r * u, amount * 0.9);
      });
    };

    const local = (e: PointerEvent) => {
      const box = root.getBoundingClientRect();
      return {
        x: ((e.clientX - box.left) / box.width) * w,
        y: ((e.clientY - box.top) / box.height) * h,
      };
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      pointer = { ...p, down: pointer?.down ?? false };
      wake();
    };
    const onDown = (e: PointerEvent) => {
      pointer = { ...local(e), down: true };
      wake();
    };
    const onUp = () => {
      if (pointer) pointer.down = false;
    };
    const onLeave = () => {
      pointer = null;
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointerleave", onLeave);

    const draw = (now: number) => {
      frame = 0;
      const dt = Math.min(0.05, (now - (last || now)) / 1000) || 1 / 60;
      last = now;
      if (pointer) {
        if (pointer.down) hand(pointer.x, pointer.y, 4 * warmth * dt);
        else
          spot(pointer.x, pointer.y, Math.min(w, h) * 0.17, 2.4 * warmth * dt);
      }
      // Heat spreads to its neighbours and leaks away; `memory` is roughly how many seconds it lingers.
      const keep = Math.exp(-dt / Math.max(0.2, memory));
      let total = 0;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const l = heat[i > 0 ? k - 1 : k];
          const r = heat[i < cols - 1 ? k + 1 : k];
          const u = heat[j > 0 ? k - cols : k];
          const d = heat[j < rows - 1 ? k + cols : k];
          const v = (heat[k] * 0.84 + (l + r + u + d) * 0.04) * keep;
          next[k] = v < 0.002 ? 0 : v;
          total += next[k];
        }
      }
      [heat, next] = [next, heat];

      for (let k = 0; k < heat.length; k++) {
        const t = Math.min(1, heat[k]);
        const li = Math.round(t * 255) * 3;
        colourData.data.set([lut[li], lut[li + 1], lut[li + 2], 255], k * 4);
        revealData.data[k * 4 + 3] = Math.round(
          Math.max(0, Math.min(1, (t - 0.35) * 2.2)) * 255,
        );
      }
      cctx.putImageData(colourData, 0, 0);
      rctx.putImageData(revealData, 0, 0);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(colour, 0, 0, canvas.width, canvas.height);
      // The message, kept only where the reveal canvas is opaque.
      kctx.globalCompositeOperation = "source-over";
      kctx.clearRect(0, 0, masked.width, masked.height);
      kctx.drawImage(message, 0, 0);
      kctx.globalCompositeOperation = "destination-in";
      kctx.imageSmoothingEnabled = true;
      kctx.drawImage(reveal, 0, 0, masked.width, masked.height);
      ctx.globalAlpha = 0.92;
      ctx.drawImage(masked, 0, 0);
      ctx.globalAlpha = 1;
      if (total > 0.01 || pointer) wake();
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    for (let k = 0; k < revealData.data.length; k += 4)
      revealData.data.set([255, 255, 255, 0], k);
    wake();

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [w, h, secret, palette, warmth, memory]);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={`A heat-sensitive card. Hidden message: ${secret}`}
      className={`${C.root} ${className}`}
      style={{
        width: w,
        height: h,
        borderRadius: radius,
        background: PALETTES[palette][0],
      }}
    >
      <canvas ref={canvasRef} aria-hidden className={C.canvas} />
      {children && <div className={C.content}>{children}</div>}
    </div>
  );
};

export default HeatCard;
