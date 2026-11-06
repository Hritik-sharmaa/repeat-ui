"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from "react";

// The width available inside an element, without its padding.
function contentWidth(el: HTMLElement) {
  const style = getComputedStyle(el);
  return (
    el.clientWidth -
    parseFloat(style.paddingLeft) -
    parseFloat(style.paddingRight)
  );
}

// How far down the crop sits when the photo is taller than the frame: a little above centre keeps faces in.
const FOCUS_Y = 0.35;

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "group relative cursor-pointer touch-pan-y select-none overflow-hidden shadow-2xl",
  canvas: "absolute inset-0 size-full",
  rebuild:
    "absolute right-3 top-3 cursor-pointer rounded-lg border border-white/15 bg-black/60 px-2.5 py-1.5 font-mono text-[11px] font-medium text-white opacity-0 backdrop-blur transition-opacity duration-200 hover:bg-black/80 focus-visible:opacity-100 group-hover:opacity-100",
  count:
    "pointer-events-none absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1.5 font-mono text-[11px] font-medium text-white backdrop-blur",
};

// The colours a box of plastic bricks comes in, rather than every colour a photo has.
const PALETTES = {
  brick:
    "#f4f4f0 #a6a9aa #5b5d5e #1a1c1e #c4281c #7b2e2f #da8540 #f5cd30 #d7c599 #957a55 #6a3e25 #a4bd47 #287f47 #184632 #78906f #008f9b #9fc3e9 #6d9fdc #0d69ab #143044 #a08fc7 #6b327c #e4adc8 #923978"
      .split(" ")
      .map((hex) => parseInt(hex.slice(1), 16)),
  mono: [0xf4f4f0, 0xa6a9aa, 0x5b5d5e, 0x1a1c1e],
};

const SIZES = [
  [4, 2],
  [2, 2],
  [4, 1],
  [3, 1],
  [2, 1],
];

// Shrinks width × height to fit a narrower parent, keeping the shape, so the image is drawn at
// the size it is shown rather than squeezed.
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
    // Measure once now, so a phone never sees a frame of overflow, then follow resizes.
    measure(contentWidth(parent));
    const observer = new ResizeObserver(([entry]) =>
      measure(entry.contentRect.width),
    );
    observer.observe(parent);
    return () => observer.disconnect();
  }, [ref, width]);
  return { w: Math.round(width * scale), h: Math.round(height * scale) };
}

type Brick = {
  col: number;
  row: number;
  cols: number;
  rows: number;
  color: number;
  // 0 at rest, 1 being placed, 2 knocked loose, 3 flying home.
  mode: number;
  start: number;
  back: number;
  lift: number;
  dx: number;
  dy: number;
  spin: number;
  vx: number;
  vy: number;
  vs: number;
  fromX: number;
  fromY: number;
  fromSpin: number;
};

type Scene = {
  build: () => void;
  knock: (x: number, y: number) => void;
  point: (p: { x: number; y: number } | null) => void;
  destroy: () => void;
};

// The closest colour as the eye sees it, which plain RGB distance gets wrong around reds and greens.
function nearest(r: number, g: number, b: number, palette: number[]) {
  let best = palette[0];
  let bestD = Infinity;
  for (const c of palette) {
    const [pr, pg, pb] = [c >> 16, (c >> 8) & 255, c & 255];
    const mean = (r + pr) / 2;
    const [dr, dg, db] = [r - pr, g - pg, b - pb];
    const d =
      (2 + mean / 256) * dr * dr +
      4 * dg * dg +
      (2 + (255 - mean) / 256) * db * db;
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best;
}

// Turns sampled pixels into one brick colour per stud, spreading the leftover error to the neighbours.
function toColors(
  data: Uint8ClampedArray,
  cols: number,
  rows: number,
  palette: number[] | null,
  dither: number,
  contrast: number,
  saturation: number,
) {
  const px = new Float32Array(cols * rows * 3);
  for (let i = 0; i < cols * rows; i++) {
    const [r, g, b] = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    [r, g, b].forEach((v, c) => {
      px[i * 3 + c] = (lum + (v - lum) * saturation - 127.5) * contrast + 127.5;
    });
  }
  const cells = new Int32Array(cols * rows);
  const spread = (x: number, y: number, c: number, amount: number) => {
    if (x >= 0 && x < cols && y < rows) px[(y * cols + x) * 3 + c] += amount;
  };
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      const [r, g, b] = [0, 1, 2].map((c) =>
        Math.max(0, Math.min(255, px[i * 3 + c])),
      );
      const color = palette
        ? nearest(r, g, b, palette)
        : ((r & 240) << 16) | ((g & 240) << 8) | (b & 240);
      cells[i] = color;
      if (!palette || !dither) continue;
      [color >> 16, (color >> 8) & 255, color & 255].forEach((v, c) => {
        const err = (px[i * 3 + c] - v) * dither;
        spread(x + 1, y, c, (err * 7) / 16);
        spread(x - 1, y + 1, c, (err * 3) / 16);
        spread(x, y + 1, c, (err * 5) / 16);
        spread(x + 1, y + 1, c, err / 16);
      });
    }
  }
  return cells;
}

// Groups studs of one colour into real brick sizes. The sizes are skipped at random so seams don't line up.
function toBricks(
  cells: Int32Array,
  cols: number,
  rows: number,
  merge: boolean,
) {
  const used = new Uint8Array(cols * rows);
  const bricks: Brick[] = [];
  const fits = (x: number, y: number, w: number, h: number, color: number) => {
    if (x + w > cols || y + h > rows) return false;
    for (let b = y; b < y + h; b++) {
      for (let a = x; a < x + w; a++) {
        if (used[b * cols + a] || cells[b * cols + a] !== color) return false;
      }
    }
    return true;
  };
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (used[y * cols + x]) continue;
      const color = cells[y * cols + x];
      const roll = Math.imul(x + 1, 73856093) ^ Math.imul(y + 1, 19349663);
      const size = (merge &&
        SIZES.find(
          ([w, h], i) =>
            ((roll >>> (i * 3 + 4)) & 3) > 0 && fits(x, y, w, h, color),
        )) || [1, 1];
      const [w, h] = size;
      for (let b = y; b < y + h; b++)
        used.fill(1, b * cols + x, b * cols + x + w);
      bricks.push({
        col: x,
        row: y,
        cols: w,
        rows: h,
        color,
        mode: 0,
        start: 0,
        back: 0,
        lift: 0,
        dx: 0,
        dy: 0,
        spin: 0,
        vx: 0,
        vy: 0,
        vs: 0,
        fromX: 0,
        fromY: 0,
        fromSpin: 0,
      });
    }
  }
  return bricks;
}

const shade = (color: number, k: number) => {
  const mix = (v: number) =>
    Math.round(k > 1 ? v + (255 - v) * (k - 1) : v * k);
  return `rgb(${mix(color >> 16)},${mix((color >> 8) & 255)},${mix(color & 255)})`;
};

// One moulded block: a bevelled top, then a round stud on every cell, lit from the top left.
function paintBlock(
  ctx: CanvasRenderingContext2D,
  b: Pick<Brick, "col" | "row" | "cols" | "rows" | "color">,
  cell: number,
) {
  const [x, y, w, h] = [
    b.col * cell,
    b.row * cell,
    b.cols * cell,
    b.rows * cell,
  ];
  const edge = Math.max(0.5, cell * 0.07);
  ctx.fillStyle = shade(b.color, 1);
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = shade(b.color, 1.22);
  ctx.fillRect(x, y, w, edge);
  ctx.fillRect(x, y, edge, h);
  ctx.fillStyle = shade(b.color, 0.68);
  ctx.fillRect(x, y + h - edge, w, edge);
  ctx.fillRect(x + w - edge, y, edge, h);
  if (cell < 3) return;
  const r = cell * 0.3;
  for (let row = 0; row < b.rows; row++) {
    for (let col = 0; col < b.cols; col++) {
      const cx = x + (col + 0.5) * cell;
      const cy = y + (row + 0.5) * cell;
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.beginPath();
      ctx.arc(cx + cell * 0.05, cy + cell * 0.07, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = shade(b.color, 1.08);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = Math.max(0.5, cell * 0.05);
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.8, Math.PI * 1.05, Math.PI * 1.6);
      ctx.stroke();
    }
  }
}

function layer(
  w: number,
  h: number,
  dpr: number,
  paint: (ctx: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  paint(ctx);
  return canvas;
}

const PLACE_MS = 340;
const HOME_MS = 480;
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeBack = (t: number) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;

type SceneOptions = {
  canvas: HTMLCanvasElement;
  bricks: Brick[];
  gridRows: number;
  cell: number;
  w: number;
  h: number;
  dpr: number;
  plate: HTMLCanvasElement;
  sheet: HTMLCanvasElement;
  buildTime: number;
  lensSize: number;
  breakRadius: number;
};

// Draws the plate and bricks, and runs a frame loop only while something is moving.
function createScene(o: SceneOptions): Scene {
  const {
    canvas,
    bricks,
    gridRows,
    cell,
    w,
    h,
    dpr,
    plate,
    sheet,
    buildTime,
    lensSize,
    breakRadius,
  } = o;
  const ctx = canvas.getContext("2d")!;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const maxLift = Math.max(3, cell * 0.7);
  let frame = 0;
  let last = 0;
  let pointer: { x: number; y: number } | null = null;

  const blit = (
    b: Brick,
    x: number,
    y: number,
    scale = 1,
    spin = 0,
    alpha = 1,
  ) => {
    const [bw, bh] = [b.cols * cell, b.rows * cell];
    const [sx, sy] = [b.col * cell * dpr, b.row * cell * dpr];
    if (scale === 1 && !spin && alpha === 1) {
      ctx.drawImage(sheet, sx, sy, bw * dpr, bh * dpr, x, y, bw, bh);
      return;
    }
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x + bw / 2, y + bh / 2);
    ctx.rotate(spin);
    ctx.scale(scale, scale);
    ctx.drawImage(sheet, sx, sy, bw * dpr, bh * dpr, -bw / 2, -bh / 2, bw, bh);
    ctx.restore();
  };

  const render = (now: number) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(plate, 0, 0, w, h);
    const moving = bricks.some((b) => b.mode !== 0);
    if (moving) {
      for (const b of bricks)
        if (b.mode === 0) blit(b, b.col * cell, b.row * cell);
    } else ctx.drawImage(sheet, 0, 0, w, h);
    // Raised bricks sit over their neighbours, each with a soft shadow on the bricks below.
    for (const b of bricks) {
      if (!b.lift) continue;
      const [x, y, bw, bh] = [
        b.col * cell,
        b.row * cell,
        b.cols * cell,
        b.rows * cell,
      ];
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(x + b.lift * 0.5, y + b.lift * 0.7, bw, bh);
      blit(b, x - b.lift * 0.3, y - b.lift, 1 + b.lift / 90);
    }
    for (const b of bricks) {
      const [x, y] = [b.col * cell, b.row * cell];
      if (b.mode === 1) {
        const t = (now - b.start) / PLACE_MS;
        if (t <= 0) continue;
        const e = easeOut(Math.min(1, t));
        blit(
          b,
          x,
          y - cell * 5 * (1 - e),
          1.2 - 0.2 * e,
          0,
          Math.min(1, t * 3),
        );
      } else if (b.mode > 1) blit(b, x + b.dx, y + b.dy, 1.06, b.spin);
    }
  };

  const tick = (now: number) => {
    const dt = Math.min(0.032, (now - last) / 1000);
    last = now;
    let active = false;
    for (const b of bricks) {
      if (b.mode === 1) {
        if (now - b.start >= PLACE_MS) b.mode = 0;
        else active = true;
      } else if (b.mode === 2) {
        active = true;
        b.vy += 1900 * dt;
        b.dx += b.vx * dt;
        b.dy += b.vy * dt;
        b.spin += b.vs * dt;
        const floor = h - (b.row + b.rows) * cell;
        if (b.dy > floor) {
          b.dy = floor;
          b.vy *= -0.32;
          b.vx *= 0.7;
          b.vs *= 0.6;
        }
        if (now >= b.back) {
          b.mode = 3;
          b.start = now;
          [b.fromX, b.fromY, b.fromSpin] = [b.dx, b.dy, b.spin];
        }
      } else if (b.mode === 3) {
        active = true;
        const t = Math.min(1, (now - b.start) / HOME_MS);
        const e = easeBack(t);
        b.dx = b.fromX * (1 - e);
        b.dy = b.fromY * (1 - e);
        b.spin = b.fromSpin * (1 - e);
        if (t === 1) {
          b.mode = 0;
          b.dx = b.dy = b.spin = 0;
        }
      }
      let target = 0;
      if (pointer && lensSize > 0 && b.mode === 0) {
        const d = Math.hypot(
          (b.col + b.cols / 2) * cell - pointer.x,
          (b.row + b.rows / 2) * cell - pointer.y,
        );
        target = Math.max(0, 1 - d / (lensSize / 2)) ** 1.5 * maxLift;
      }
      b.lift += (target - b.lift) * Math.min(1, dt * 20);
      if (Math.abs(target - b.lift) < 0.03) b.lift = target;
      else active = true;
    }
    render(now);
    frame = active ? requestAnimationFrame(tick) : 0;
  };

  const wake = () => {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  render(0);
  return {
    // Rows go down from the bottom up, each brick a moment apart, the way you'd build it by hand.
    build() {
      if (still) return;
      const now = performance.now();
      for (const b of bricks) {
        const rise = (gridRows - 1 - b.row) / Math.max(1, gridRows - 1);
        b.mode = 1;
        b.start = now + (rise * 0.8 + Math.random() * 0.2) * buildTime;
        b.dx = b.dy = b.spin = b.lift = 0;
      }
      wake();
    },
    // Everything within reach flies away from the blow, falls to the bottom, then snaps back into place.
    knock(x, y) {
      if (still || !breakRadius) return;
      const now = performance.now();
      for (const b of bricks) {
        if (b.mode === 1) continue;
        const ax = (b.col + b.cols / 2) * cell + b.dx - x;
        const ay = (b.row + b.rows / 2) * cell + b.dy - y;
        const d = Math.hypot(ax, ay);
        if (d > breakRadius) continue;
        const force = (1 - d / breakRadius) * 520 + 180;
        const unit = d || 1;
        b.mode = 2;
        b.vx = (ax / unit) * force + (Math.random() - 0.5) * 160;
        b.vy = (ay / unit) * force - 320 - Math.random() * 220;
        b.vs = (Math.random() - 0.5) * 16;
        b.back = now + 900 + d * 2 + Math.random() * 300;
        b.lift = 0;
      }
      wake();
    },
    point(p) {
      pointer = p;
      wake();
    },
    destroy() {
      cancelAnimationFrame(frame);
    },
  };
}

export interface BrickImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  studs?: number;
  palette?: "brick" | "mono" | "full";
  merge?: boolean;
  dither?: number;
  contrast?: number;
  saturation?: number;
  plateColor?: string;
  buildTime?: number;
  lensSize?: number;
  breakRadius?: number;
  showRebuild?: boolean;
  showCount?: boolean;
  radius?: number;
  className?: string;
}

// A photo rebuilt from plastic bricks on a baseplate: each stud takes the nearest colour from the box, and
// studs of one colour join into bigger bricks. It builds itself row by row, bricks lift under the pointer,
// and a click smashes a hole that puts itself back together. The image must be same-origin or served with CORS headers.
const BrickImage = ({
  src = "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&h=900&fit=crop",
  alt = "",
  width: maxWidth = 480,
  height: maxHeight = 360,
  studs = 56,
  palette = "brick",
  merge = true,
  dither = 0.15,
  contrast = 1.1,
  saturation = 1.25,
  plateColor = "#23262b",
  buildTime = 1800,
  lensSize = 110,
  breakRadius = 80,
  showRebuild = true,
  showCount = true,
  radius = 16,
  className = "",
}: BrickImageProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  // `width` and `height` are the most it takes up; on a narrower screen it shrinks to fit.
  const { w: width, h: height } = useFitSize(rootRef, maxWidth, maxHeight);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  // The photo last built by hand, so changing a setting redraws at once and a new photo builds again.
  const builtRef = useRef("");
  const [loaded, setLoaded] = useState("");
  const [count, setCount] = useState({ bricks: 0, colors: 0 });

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      imageRef.current = img;
      setLoaded(src);
    };
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || loaded !== src) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const cell = width / studs;
    const rows = Math.max(1, Math.ceil(height / cell));
    const sample = document.createElement("canvas");
    sample.width = studs;
    sample.height = rows;
    const sctx = sample.getContext("2d", { willReadFrequently: true })!;
    // object-fit: cover, by hand, squeezed into one pixel per stud.
    const gridH = rows * cell;
    const scale = Math.max(width / img.width, gridH / img.height);
    const sw = width / scale;
    const sh = gridH / scale;
    sctx.drawImage(
      img,
      (img.width - sw) / 2,
      (img.height - sh) * FOCUS_Y,
      sw,
      sh,
      0,
      0,
      studs,
      rows,
    );
    let data: Uint8ClampedArray;
    try {
      data = sctx.getImageData(0, 0, studs, rows).data;
    } catch {
      // A cross-origin image without CORS headers can be drawn but not read.
      return;
    }
    const colors = palette === "full" ? null : PALETTES[palette];
    const cells = toColors(
      data,
      studs,
      rows,
      colors,
      dither,
      contrast,
      saturation,
    );
    const bricks = toBricks(cells, studs, rows, merge);
    const base = parseInt(plateColor.slice(1), 16);
    const plate = layer(width, height, dpr, (ctx) =>
      paintBlock(ctx, { col: 0, row: 0, cols: studs, rows, color: base }, cell),
    );
    const sheet = layer(width, height, dpr, (ctx) =>
      bricks.forEach((b) => paintBlock(ctx, b, cell)),
    );
    const scene = createScene({
      canvas,
      bricks,
      gridRows: rows,
      cell,
      w: width,
      h: height,
      dpr,
      plate,
      sheet,
      buildTime,
      lensSize,
      breakRadius,
    });
    sceneRef.current = scene;
    const tally = () =>
      setCount({ bricks: bricks.length, colors: new Set(cells).size });
    tally();
    if (builtRef.current !== src) {
      builtRef.current = src;
      scene.build();
    }
    return () => scene.destroy();
  }, [
    loaded,
    src,
    width,
    height,
    studs,
    palette,
    merge,
    dither,
    contrast,
    saturation,
    plateColor,
    buildTime,
    lensSize,
    breakRadius,
  ]);

  const place = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <div
      role="img"
      aria-label={alt}
      ref={rootRef}
      className={`${C.root} ${className}`}
      style={{ width, height, borderRadius: radius, background: plateColor }}
      onPointerMove={(e) =>
        e.pointerType === "mouse" && sceneRef.current?.point(place(e))
      }
      onPointerLeave={() => sceneRef.current?.point(null)}
      onPointerDown={(e) => {
        if (e.target !== canvasRef.current) return;
        const { x, y } = place(e);
        sceneRef.current?.knock(x, y);
      }}
    >
      <canvas ref={canvasRef} aria-hidden className={C.canvas} />
      {showCount && count.bricks > 0 && (
        <span className={C.count}>
          {count.bricks.toLocaleString("en-US")} bricks · {count.colors} colours
        </span>
      )}
      {showRebuild && (
        <button
          type="button"
          onClick={() => sceneRef.current?.build()}
          className={C.rebuild}
        >
          Rebuild
        </button>
      )}
    </div>
  );
};

export default BrickImage;
