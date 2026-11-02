"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { AnimatePresence, animate, motion, useMotionValue, type AnimationPlaybackControls } from "motion/react";
import "./style.css";

// The width available inside an element, without its padding.
function contentWidth(el: HTMLElement) {
  const style = getComputedStyle(el);
  return el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
}

// Every class name in one place; the styles live in style.css.
const C = {
  fit: "rui-peel-fit",
  root: "rui-peel",
  content: "rui-peel-content",
  seal: "rui-peel-seal",
  front: "rui-peel-front",
  sheen: "rui-peel-sheen",
  face: "rui-peel-face",
  label: "rui-peel-label",
  sublabel: "rui-peel-sublabel",
  tab: "rui-peel-tab",
  arrow: "rui-peel-arrow",
  layer: "rui-peel-layer",
  paper: "rui-peel-layer rui-peel-paper",
  reseal: "rui-peel-reseal",
};

type Corner = "bottom-right" | "bottom-left" | "top-right" | "top-left";
// Far enough to stand in for "forever" when drawing a half-plane as a polygon.
const FAR = 10000;

export interface PeelSealProps {
  children?: ReactNode;
  width?: number;
  height?: number;
  corner?: Corner;
  label?: string;
  sublabel?: string;
  pullText?: string;
  color?: string;
  backColor?: string;
  textColor?: string;
  accentColor?: string;
  radius?: number;
  threshold?: number;
  hint?: boolean;
  resealable?: boolean;
  onPeel?: () => void;
  className?: string;
}

// A tamper seal, like the sticker on the back of a new box. Drag its corner and it folds back along a
// diagonal crease, showing its paper back, until it comes away and reveals what is underneath.
const PeelSeal = ({
  children,
  width = 340,
  height = 200,
  corner = "bottom-right",
  label = "Sealed",
  sublabel = "Peel from the corner to open",
  pullText = "Pull",
  color = "#f4f4f2",
  backColor = "#dcdad3",
  textColor = "#18181b",
  accentColor = "#fa5f1b",
  radius = 18,
  threshold = 0.45,
  hint = true,
  resealable = true,
  onPeel,
  className = "",
}: PeelSealProps) => {
  const [peeled, setPeeled] = useState(false);
  const fitRef = useRef<HTMLDivElement>(null);
  // How much the seal is shrunk to fit its container, from 0 to 1.
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);

  // Shrink to fit narrow containers, like a phone screen.
  useEffect(() => {
    const parent = fitRef.current?.parentElement;
    if (!parent) return;
    const measure = (available: number) => {
      scaleRef.current = Math.min(1, available / width);
      setScale(scaleRef.current);
    };
    // Measure once now, so a phone never sees a frame of overflow, then follow resizes.
    measure(contentWidth(parent));
    const observer = new ResizeObserver(([entry]) => measure(entry.contentRect.width));
    observer.observe(parent);
    return () => observer.disconnect();
  }, [width]);
  const ids = useId().replace(/[^a-zA-Z0-9]/g, "");
  // The corner being peeled, and the point it has been pulled to.
  const right = corner.endsWith("right");
  const bottom = corner.startsWith("bottom");
  const qx = right ? width : 0;
  const qy = bottom ? height : 0;
  const px = useMotionValue(qx);
  const py = useMotionValue(qy);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const hintRef = useRef<AnimationPlaybackControls[]>([]);
  const frontRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<SVGSVGElement>(null);
  const paperRef = useRef<SVGSVGElement>(null);

  // Redraws the fold whenever the pulled point moves. Everything is set straight on the DOM,
  // so dragging never re-renders React.
  useEffect(() => {
    const paint = () => {
      const front = frontRef.current;
      const shadow = shadowRef.current;
      const paper = paperRef.current;
      if (!front || !shadow || !paper) return;
      const dx = qx - px.get();
      const dy = qy - py.get();
      const len = Math.hypot(dx, dy);
      if (len < 0.5) {
        front.style.clipPath = "none";
        shadow.style.visibility = paper.style.visibility = "hidden";
        return;
      }
      // The crease is the line halfway between the corner and the pulled point, square to the pull.
      const n = [dx / len, dy / len];
      const u = [-n[1], n[0]];
      const m = [(qx + px.get()) / 2, (qy + py.get()) / 2];
      const at = (s: number, t: number) => [m[0] + u[0] * s + n[0] * t, m[1] + u[1] * s + n[1] * t];
      const poly = (pts: number[][], unit = "") => pts.map(([x, y]) => `${x}${unit} ${y}${unit}`).join(unit ? ", " : " ");
      const line = (gradient: Element, from: number[], to: number[]) =>
        [from[0], from[1], to[0], to[1]].forEach((v, i) => gradient.setAttribute(["x1", "y1", "x2", "y2"][i], `${v}`));

      // The part still stuck down: everything on the far side of the crease from the corner.
      front.style.clipPath = `polygon(${poly([at(-FAR, 0), at(FAR, 0), at(FAR, -FAR), at(-FAR, -FAR)], "px")})`;
      // A soft shadow along the crease, on the stuck-down side.
      shadow.querySelector("polygon")!.setAttribute("points", poly([at(-FAR, 0), at(FAR, 0), at(FAR, -28), at(-FAR, -28)]));
      line(shadow.querySelector("linearGradient")!, m, at(0, -28));

      // The lifted part, mirrored across the crease, so its back faces up.
      paper
        .querySelector("clipPath polygon")!
        .setAttribute("points", poly([at(-FAR, 0), at(FAR, 0), at(FAR, FAR), at(-FAR, FAR)]));
      const dot = m[0] * n[0] + m[1] * n[1];
      const [a, b, d] = [1 - 2 * n[0] * n[0], -2 * n[0] * n[1], 1 - 2 * n[1] * n[1]];
      paper.querySelector("g")!.setAttribute("transform", `matrix(${a} ${b} ${b} ${d} ${2 * dot * n[0]} ${2 * dot * n[1]})`);
      line(paper.querySelector("linearGradient")!, m, at(0, len / 2));
      shadow.style.visibility = paper.style.visibility = "visible";
    };
    paint();
    const unsubscribe = [px.on("change", paint), py.on("change", paint)];
    return () => unsubscribe.forEach((stop) => stop());
  }, [qx, qy, px, py, peeled]);

  // Back to the corner whenever the size or corner changes.
  useEffect(() => {
    px.set(qx);
    py.set(qy);
  }, [qx, qy, px, py]);

  // Every few seconds the corner lifts a little, to say "pull me".
  useEffect(() => {
    if (!hint || peeled) return;
    const lift = (v: typeof px, from: number, toward: number) =>
      animate(v, [from, from + toward * 18, from], {
        duration: 1.4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2.2,
        delay: 0.8,
      });
    hintRef.current = [lift(px, qx, right ? -1 : 1), lift(py, qy, bottom ? -1 : 1)];
    return () => hintRef.current.forEach((c) => c.stop());
  }, [hint, peeled, qx, qy, right, bottom, px, py]);

  const stopHint = () => {
    hintRef.current.forEach((c) => c.stop());
    hintRef.current = [];
  };

  // Folds it all the way over the opposite corner, then lets it go.
  const finish = () => {
    stopHint();
    const ease = { duration: 0.45, ease: [0.4, 0, 0.2, 1] } as const;
    animate(px, 2 * (width - qx) - qx, ease);
    animate(py, 2 * (height - qy) - qy, ease).then(() => {
      setPeeled(true);
      onPeel?.();
    });
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    stopHint();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, px: px.get(), py: py.get() };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start) return;
    // The corner follows the pointer, but only inward: it can't be pulled out past its own edges.
    // Pointer movement in the seal's own pixels, however much it is shrunk.
    const x = start.px + (e.clientX - start.x) / scaleRef.current;
    const y = start.py + (e.clientY - start.y) / scaleRef.current;
    px.set(right ? Math.min(qx, Math.max(-width, x)) : Math.max(qx, Math.min(2 * width, x)));
    py.set(bottom ? Math.min(qy, Math.max(-height, y)) : Math.max(qy, Math.min(2 * height, y)));
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    const pulled = Math.hypot(qx - px.get(), qy - py.get()) / Math.hypot(width, height);
    if (pulled > threshold) return finish();
    const spring = { type: "spring", stiffness: 320, damping: 24 } as const;
    animate(px, qx, spring);
    animate(py, qy, spring);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      finish();
    }
  };

  // The pull tab sits in the peeling corner, its arrow pointing the way to pull.
  const tabPlace = { [bottom ? "bottom" : "top"]: 14, [right ? "right" : "left"]: 16 };
  const arrowFlip = `scale(${right ? 1 : -1}, ${bottom ? 1 : -1})`;

  return (
    <div ref={fitRef} className={`${C.fit} ${className}`} style={{ width: width * scale, height: height * scale }}>
      <div className={C.root} style={{ width, height, transform: scale < 1 ? `scale(${scale})` : undefined }}>
        <div className={C.content} style={{ borderRadius: radius }}>
          {children}
        </div>

        <AnimatePresence>
          {!peeled && (
            <motion.div
              key="seal"
              role="button"
              tabIndex={0}
              aria-label={`${label}. Peel off to open`}
              className={C.seal}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onKeyDown={onKeyDown}
              exit={{ opacity: 0, scale: 0.92, y: -16, rotate: right ? -6 : 6, transition: { duration: 0.4, ease: "easeIn" } }}>
              <div ref={frontRef} className={C.front} style={{ background: color, color: textColor, borderRadius: radius }}>
                <div className={C.sheen} />
                <div className={C.face}>
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden>
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <p className={C.label}>{label}</p>
                  <p className={C.sublabel}>{sublabel}</p>
                </div>
                <span className={C.tab} style={{ ...tabPlace, color: accentColor, flexDirection: right ? "row" : "row-reverse" }}>
                  {pullText}
                  <span style={{ transform: arrowFlip }}>
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={C.arrow}
                      aria-hidden>
                      <path d="M17 17 7 7M7 15V7h8" />
                    </svg>
                  </span>
                </span>
              </div>

              {/* The shadow the lifted flap casts along the crease. */}
              <svg ref={shadowRef} aria-hidden className={C.layer} style={{ visibility: "hidden" }}>
                <defs>
                  <linearGradient id={`${ids}band`} gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#000" stopOpacity="0.22" />
                    <stop offset="1" stopColor="#000" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id={`${ids}shape`}>
                    <rect width={width} height={height} rx={radius} />
                  </clipPath>
                </defs>
                <polygon fill={`url(#${ids}band)`} clipPath={`url(#${ids}shape)`} />
              </svg>

              {/* The flap: the lifted part of the seal mirrored across the crease, its rounded corner intact. */}
              <svg ref={paperRef} aria-hidden className={C.paper} style={{ visibility: "hidden" }}>
                <defs>
                  <clipPath id={`${ids}lifted`}>
                    <polygon />
                  </clipPath>
                  <linearGradient id={`${ids}shade`} gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#000" stopOpacity="0.28" />
                    <stop offset="0.06" stopColor="#fff" stopOpacity="0.55" />
                    <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
                    <stop offset="1" stopColor="#000" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                <g>
                  <g clipPath={`url(#${ids}lifted)`}>
                    <rect width={width} height={height} rx={radius} fill={backColor} />
                    <rect width={width} height={height} rx={radius} fill={`url(#${ids}shade)`} />
                  </g>
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {peeled && resealable && (
          <button
            type="button"
            className={C.reseal}
            onClick={() => {
              px.set(qx);
              py.set(qy);
              setPeeled(false);
            }}>
            Reseal
          </button>
        )}
      </div>
    </div>
  );
};

export default PeelSeal;
