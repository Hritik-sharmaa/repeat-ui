"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
} from "react";
import "./style.css";

// The width available inside an element, without its padding.
function contentWidth(el: HTMLElement) {
  const style = getComputedStyle(el);
  return el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
}

// Every class name in one place; the styles live in style.css.
const C = {
  fit: "rui-match-fit",
  root: "rui-match",
  ambient: "rui-match-ambient",
  words: "rui-match-words",
  layer: "rui-match-layer",
  box: "rui-match-box",
  striker: "rui-match-striker",
  scratch: "rui-match-scratch",
  label: "rui-match-label",
  boxLabel: "rui-match-box-label",
  boxSmall: "rui-match-box-small",
  drawer: "rui-match-drawer",
  drawerHead: "rui-match-drawer-head",
  match: "rui-match-stick",
  char: "rui-match-char",
  head: "rui-match-head",
  flame: "rui-match-flame",
  flameSize: "rui-match-flame-size",
  flameBody: "rui-match-flame-body",
  halo: "rui-match-halo",
  spark: "rui-match-spark",
  smoke: "rui-match-smoke",
  hint: "rui-match-hint",
};

type Phase = "idle" | "lit" | "out";

export interface MatchlightProps {
  text?: string;
  fontSize?: number;
  width?: number;
  height?: number;
  lightRadius?: number;
  burnTime?: number;
  lightColor?: string;
  textColor?: string;
  background?: string;
  boxColor?: string;
  boxLabel?: string;
  hiddenOpacity?: number;
  onIgnite?: () => void;
  onBurnOut?: () => void;
  className?: string;
}

const STICK = 112;
const ANGLE = 35;

type Parts = {
  root: RefObject<HTMLDivElement | null>;
  match: RefObject<HTMLButtonElement | null>;
  flame: RefObject<HTMLDivElement | null>;
};

const matchTransform = (x: number, y: number) => `translate(${x}px, ${y - 3.5}px) rotate(${ANGLE}deg)`;
const flameTransform = (x: number, y: number) => `translate(${x - 14}px, ${y - 44}px)`;

// Moves the match and its flame, and points the light at the flame, straight on the DOM.
function moveTo(parts: Parts, x: number, y: number) {
  if (parts.match.current) parts.match.current.style.transform = matchTransform(x, y);
  if (parts.flame.current) parts.flame.current.style.transform = flameTransform(x, y);
  parts.root.current?.style.setProperty("--rui-fx", `${x}px`);
  parts.root.current?.style.setProperty("--rui-fy", `${y - 16}px`);
}

function setLight(root: RefObject<HTMLDivElement | null>, radius: number, alpha: number) {
  root.current?.style.setProperty("--rui-r", `${radius}px`);
  root.current?.style.setProperty("--rui-a", `${alpha}`);
}

// The matchbox sits in the bottom-left corner; the top band of it is the striker.
const boxFor = (height: number) => ({ x: 28, y: height - 28 - 76, w: 132, h: 76 });
const restFor = (height: number) => {
  const box = boxFor(height);
  return { x: box.x + box.w + 30, y: box.y + 16 };
};

// A dark room and a box of matches. Strike the match across the box and carry the flame over the
// dark to read what is written there, a few letters at a time. It burns down, goes out with a wisp of
// smoke, and a fresh match takes its place.
const Matchlight = ({
  text = "Some things are only seen up close",
  fontSize = 34,
  width = 460,
  height = 360,
  lightRadius = 150,
  burnTime = 9,
  lightColor = "#ffa94d",
  textColor = "#fff1d6",
  background = "#0b0908",
  boxColor = "#b4332a",
  boxLabel = "Repeat",
  hiddenOpacity = 0.035,
  onIgnite,
  onBurnOut,
  className = "",
}: MatchlightProps) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; dx: number; dy: number }[]>([]);
  const [smoke, setSmoke] = useState<{ id: number; x: number; y: number } | null>(null);
  // Marks left on the striker, one per strike, so the box wears in as you repeat.
  const [scratches, setScratches] = useState<{ id: number; x: number; w: number; r: number }[]>([]);
  const fitRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  // How much the scene is shrunk to fit its container, from 0 to 1.
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const matchRef = useRef<HTMLButtonElement>(null);
  const charRef = useRef<HTMLSpanElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const flameSizeRef = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef<Phase>("idle");
  const head = useRef(restFor(height));
  const callbacks = useRef({ onIgnite, onBurnOut });
  const ids = useId().replace(/[^a-zA-Z0-9]/g, "");
  const parts: Parts = { root: rootRef, match: matchRef, flame: flameRef };

  useEffect(() => {
    callbacks.current = { onIgnite, onBurnOut };
  });
  const drag = useRef<{ dx: number; dy: number; lastX: number; lastT: number } | null>(null);

  const box = boxFor(height);
  const rest = restFor(height);

  // Shrink to fit narrow containers, like a phone screen.
  useEffect(() => {
    const parent = fitRef.current?.parentElement;
    if (!parent) return;
    const fit = (available: number) => {
      scaleRef.current = Math.min(1, available / width);
      setScale(scaleRef.current);
    };
    // Measure once now, so a phone never sees a frame of overflow, then follow resizes.
    fit(contentWidth(parent));
    const observer = new ResizeObserver(([entry]) => fit(entry.contentRect.width));
    observer.observe(parent);
    return () => observer.disconnect();
  }, [width]);

  // Back to rest whenever the size changes.
  useEffect(() => {
    if (phaseRef.current !== "idle") return;
    head.current = restFor(height);
    moveTo({ root: rootRef, match: matchRef, flame: flameRef }, head.current.x, head.current.y);
  }, [width, height]);

  const ignite = () => {
    if (phaseRef.current !== "idle") return;
    phaseRef.current = "lit";
    setPhase("lit");
    const { x, y } = head.current;
    setSparks(
      Array.from({ length: 12 }, (_, i) => {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.4;
        const speed = 20 + Math.random() * 40;
        return { id: Date.now() + i, x, y, dx: Math.cos(angle) * speed, dy: Math.sin(angle) * speed };
      }),
    );
    setTimeout(() => setSparks([]), 700);
    setScratches((list) =>
      [...list, { id: Date.now(), x: 6 + Math.random() * 90, w: 18 + Math.random() * 26, r: (Math.random() - 0.5) * 10 }].slice(
        -12,
      ),
    );
    callbacks.current.onIgnite?.();
  };

  // While lit: the flame flickers, the light breathes with it, and the stick chars down.
  useEffect(() => {
    if (phase !== "lit") return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = now - start;
      const progress = Math.min(1, t / (burnTime * 1000));
      // A few out-of-step waves plus a little noise reads as a living flame.
      const flicker = 0.9 + 0.05 * Math.sin(t / 47) + 0.04 * Math.sin(t / 113 + 1) + Math.random() * 0.04;
      // Bright at first strike, steadier after, fading as the match burns low.
      const flare = t < 300 ? 1.25 - t / 1200 : 1;
      setLight(rootRef, lightRadius * flicker * flare * (1 - 0.4 * progress), 1);
      if (charRef.current) charRef.current.style.width = `${10 + progress * 70}%`;
      if (flameSizeRef.current)
        flameSizeRef.current.style.transform = `scale(${(1 - 0.35 * progress) * (0.95 + flicker * 0.08)})`;
      if (progress < 1) frame = requestAnimationFrame(tick);
      else {
        phaseRef.current = "out";
        setPhase("out");
        setSmoke({ id: now, ...head.current });
        callbacks.current.onBurnOut?.();
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, burnTime, lightRadius]);

  // Burnt out: the light dies away, then a fresh match is laid back beside the box.
  useEffect(() => {
    if (phase !== "out") return;
    const start = performance.now();
    const from = lightRadius * 0.6;
    let frame = 0;
    const fade = (now: number) => {
      const k = Math.min(1, (now - start) / 900);
      setLight(rootRef, from * (1 - k * 0.5), 1 - k);
      if (k < 1) frame = requestAnimationFrame(fade);
    };
    frame = requestAnimationFrame(fade);
    const reset = setTimeout(() => {
      const match = matchRef.current;
      if (match) match.style.transition = "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";
      head.current = restFor(height);
      moveTo({ root: rootRef, match: matchRef, flame: flameRef }, head.current.x, head.current.y);
      if (charRef.current) charRef.current.style.width = "0%";
      if (flameSizeRef.current) flameSizeRef.current.style.transform = "";
      setTimeout(() => {
        if (match) match.style.transition = "";
      }, 650);
      phaseRef.current = "idle";
      setPhase("idle");
      setSmoke(null);
    }, 2000);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(reset);
    };
  }, [phase, lightRadius, height]);

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (phaseRef.current === "out") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    // Pointer positions in the scene's own pixels, however much it is shrunk.
    const rect = rootRef.current!.getBoundingClientRect();
    const k = scaleRef.current;
    drag.current = {
      dx: (e.clientX - rect.left) / k - head.current.x,
      dy: (e.clientY - rect.top) / k - head.current.y,
      lastX: e.clientX,
      lastT: e.timeStamp,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    const rect = rootRef.current!.getBoundingClientRect();
    const k = scaleRef.current;
    const x = Math.min(width - 12, Math.max(12, (e.clientX - rect.left) / k - d.dx));
    const y = Math.min(height - 12, Math.max(40, (e.clientY - rect.top) / k - d.dy));
    // A strike: the head dragged briskly along the striker band.
    const speed = Math.abs(e.clientX - d.lastX) / k / Math.max(1, e.timeStamp - d.lastT);
    const onStriker = x > box.x - 6 && x < box.x + box.w + 6 && y > box.y - 8 && y < box.y + 22;
    if (onStriker && speed > 0.35) ignite();
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    head.current = { x, y };
    moveTo(parts, x, y);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ignite();
    }
  };

  const lit = phase === "lit";
  const hint = phase === "idle" ? "Strike the match on the box" : lit ? "Carry the flame to read" : "";
  const light = `radial-gradient(circle at var(--rui-fx) var(--rui-fy), ${textColor} 0, ${textColor} calc(var(--rui-r) * 0.3), color-mix(in srgb, ${textColor} 45%, transparent) calc(var(--rui-r) * 0.65), transparent var(--rui-r))`;

  return (
    <div ref={fitRef} className={`${C.fit} ${className}`} style={{ width: width * scale, height: height * scale }}>
      <div
        ref={rootRef}
        className={C.root}
        style={{
          width,
          height,
          background,
          borderRadius: 24,
          transform: scale < 1 ? `scale(${scale})` : undefined,
          // The light starts off, aimed at the match at rest; after that it is moved on the DOM.
          ...({ "--rui-r": "0px", "--rui-a": 0, "--rui-fx": `${rest.x}px`, "--rui-fy": `${rest.y - 16}px` } as CSSProperties),
        }}>
        {/* Warm light thrown around the flame. */}
        <div
          aria-hidden
          className={C.ambient}
          style={{
            opacity: "var(--rui-a)",
            background: `radial-gradient(circle at var(--rui-fx) var(--rui-fy), color-mix(in srgb, ${lightColor} 26%, transparent), color-mix(in srgb, ${lightColor} 7%, transparent) calc(var(--rui-r) * 0.7), transparent calc(var(--rui-r) * 1.4))`,
          }}
        />

        {/* The words: almost nothing in the dark, and lit only where the flame is near. */}
        <div className={C.words}>
          <p
            className={C.layer}
            style={{
              fontSize,
              paddingBottom: box.h,
              color: `color-mix(in srgb, ${textColor} ${hiddenOpacity * 100}%, ${background})`,
            }}>
            {text}
          </p>
          <p
            aria-hidden
            className={C.layer}
            style={{
              fontSize,
              paddingBottom: box.h,
              color: "transparent",
              backgroundImage: light,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              filter: `drop-shadow(0 0 10px color-mix(in srgb, ${lightColor} 45%, transparent))`,
              opacity: "var(--rui-a)",
            }}>
            {text}
          </p>
        </div>

        {/* The drawer, pulled out a little, with match heads showing. */}
        <div
          aria-hidden
          className={C.drawer}
          style={{
            left: box.x + box.w - 6,
            top: box.y + 20,
            height: box.h - 28,
            background: "linear-gradient(90deg, #b99d6c, #e8d6ad)",
          }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={C.drawerHead}
              style={{ background: "radial-gradient(circle at 35% 35%, #ef6b4a, #9f1d12)" }}
            />
          ))}
        </div>

        <div
          aria-hidden
          className={C.box}
          style={{
            left: box.x,
            top: box.y,
            width: box.w,
            height: box.h,
            background: `linear-gradient(to bottom, color-mix(in srgb, ${boxColor}, white 10%), ${boxColor} 35%, color-mix(in srgb, ${boxColor}, black 28%))`,
          }}>
          {/* The striker: gritty, and scored by every match struck on it. */}
          <div
            className={C.striker}
            style={{ background: "repeating-radial-gradient(circle at 30% 40%, #3b2416 0 1px, #5a3a24 1px 2px), #4a2f1d" }}>
            {scratches.map((s) => (
              <span key={s.id} className={C.scratch} style={{ left: s.x, width: s.w, transform: `rotate(${s.r}deg)` }} />
            ))}
          </div>
          <div
            className={C.label}
            style={{ background: "#f4e8d0", borderColor: `color-mix(in srgb, ${boxColor} 55%, #f4e8d0)`, color: boxColor }}>
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden>
              <path d="M12 2c1.5 3.5 6 6.5 6 11.5a6 6 0 0 1-12 0C6 10 8 8 9 6c.5 2 1.5 3 2.5 3.5C11.5 7 11 4.5 12 2Z" />
            </svg>
            <span className={C.boxLabel}>{boxLabel}</span>
            <span className={C.boxSmall}>Safety matches</span>
          </div>
        </div>

        {/* The match: a wooden stick, its head red until it has burnt. */}
        <button
          ref={matchRef}
          type="button"
          aria-label={lit ? "Lit match: drag to move the light" : "Match: drag the head across the box to strike it"}
          className={C.match}
          style={{ width: STICK, transform: matchTransform(rest.x, rest.y), background: "linear-gradient(#e8c48a, #c99a5b)" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
          onKeyDown={onKeyDown}>
          <span
            ref={charRef}
            className={C.char}
            style={{ width: "0%", background: "linear-gradient(90deg, #0c0a09, #3f2a1a 70%, transparent)" }}
          />
          <span
            className={C.head}
            style={{ background: phase === "idle" ? "radial-gradient(circle at 35% 35%, #ef6b4a, #9f1d12)" : "#1c1410" }}
          />
        </button>

        {/* The flame: always pointing up, wherever the match is held. */}
        <div
          ref={flameRef}
          aria-hidden
          className={C.flame}
          style={{ transform: flameTransform(rest.x, rest.y), opacity: lit ? 1 : 0 }}>
          <span ref={flameSizeRef} className={C.flameSize}>
            <span
              className={C.halo}
              style={{
                background: `radial-gradient(circle, color-mix(in srgb, ${lightColor} 45%, transparent), transparent 65%)`,
              }}
            />
            <svg className={C.flameBody} width="28" height="44" viewBox="0 0 28 44">
              <defs>
                <radialGradient id={`${ids}outer`} cx="50%" cy="72%" r="60%">
                  <stop offset="0" stopColor="#fff3c4" />
                  <stop offset="0.45" stopColor={lightColor} />
                  <stop offset="1" stopColor="#d9480f" stopOpacity="0" />
                </radialGradient>
                <radialGradient id={`${ids}core`} cx="50%" cy="75%" r="50%">
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#ffe8a3" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path d="M14 2 C 19 13, 24 21, 24 29 A 10 10 0 0 1 4 29 C 4 21, 9 13, 14 2 Z" fill={`url(#${ids}outer)`} />
              <path d="M14 16 C 16 22, 18 26, 18 31 A 4 4 0 0 1 10 31 C 10 26, 12 22, 14 16 Z" fill={`url(#${ids}core)`} />
              <ellipse cx="14" cy="38" rx="3.5" ry="2.5" fill="#3b82f6" opacity="0.55" />
            </svg>
          </span>
        </div>

        {sparks.map((s) => (
          <span
            key={s.id}
            aria-hidden
            className={C.spark}
            style={{
              left: s.x,
              top: s.y,
              background: "#ffd27a",
              boxShadow: "0 0 4px #ffb347",
              ...({ "--rui-dx": `${s.dx}px`, "--rui-dy": `${s.dy}px` } as CSSProperties),
            }}
          />
        ))}

        {smoke && (
          <svg
            key={smoke.id}
            aria-hidden
            className={C.smoke}
            style={{ left: smoke.x - 10, top: smoke.y - 70 }}
            width="20"
            height="70"
            viewBox="0 0 20 70">
            <path
              d="M10 68 C 2 55, 18 45, 10 32 C 3 21, 16 12, 9 2"
              stroke="#a8a29e"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        )}

        <p className={C.hint} style={{ color: textColor, opacity: hint ? 0.3 : 0 }}>
          {hint || " "}
        </p>
      </div>
    </div>
  );
};

export default Matchlight;
