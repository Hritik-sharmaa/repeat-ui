"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "relative inline-block select-none [perspective:700px] [-webkit-tap-highlight-color:transparent]",
  tilt: "relative size-full transition-transform duration-300 ease-out [transform-style:preserve-3d] drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]",
  edge: "absolute inset-0",
  face: "absolute overflow-hidden",
  foil: "pointer-events-none absolute inset-0 mix-blend-color-dodge [background-size:300%_300%,100%_100%]",
  drift: "animate-[rui-holo-drift_6s_ease-in-out_infinite_alternate]",
  glare:
    "pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300",
  content:
    "relative flex size-full flex-col items-center justify-center text-center font-black leading-none [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]",
};

export interface HoloProps {
  children?: ReactNode;
  shape?: "circle" | "rounded" | "burst";
  size?: number;
  color?: string;
  textColor?: string;
  intensity?: number;
  rotate?: number;
  className?: string;
}

// A starburst as a clip-path, like a "NEW!" price sticker.
const BURST = (() => {
  const points = 16;
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 ? 41 : 50;
    const a = (Math.PI * i) / points - Math.PI / 2;
    pts.push(
      `${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`,
    );
  }
  return `polygon(${pts.join(", ")})`;
})();

const SHAPES = {
  circle: { clipPath: "circle(50% at 50% 50%)" },
  rounded: { clipPath: "inset(0 round 22%)" },
  burst: { clipPath: BURST },
} satisfies Record<string, CSSProperties>;

// The rainbow film, plus fine diagonal ridges that catch the light like real holo vinyl.
const FOIL =
  "repeating-linear-gradient(115deg, #ff6b9d 0%, #ffd36b 6%, #7dffb0 12%, #6bd5ff 18%, #b48cff 24%, #ff6b9d 30%), " +
  "repeating-linear-gradient(45deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 5px)";

// A holographic sticker. The rainbow foil drifts on its own, and under the pointer the sticker tilts
// toward you and the colours slide with it, the way a real holo catches the light.
const Holo = ({
  children = "HOLO",
  shape = "circle",
  size = 180,
  color = "#3f3f46",
  textColor = "#fafafa",
  intensity = 0.8,
  rotate = -8,
  className = "",
}: HoloProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const box = ref.current!.getBoundingClientRect();
    setPointer({
      x: Math.min(1, Math.max(0, (e.clientX - box.left) / box.width)),
      y: Math.min(1, Math.max(0, (e.clientY - box.top) / box.height)),
    });
  };

  const border = Math.max(4, Math.round(size * 0.035));
  const clip = SHAPES[shape];
  const tilt = pointer
    ? `rotate(${rotate}deg) rotateX(${(0.5 - pointer.y) * 24}deg) rotateY(${(pointer.x - 0.5) * 24}deg) scale(1.05)`
    : `rotate(${rotate}deg)`;

  return (
    <div
      ref={ref}
      className={`${C.root} ${className}`}
      style={{ width: size, height: size }}
      onPointerMove={onMove}
      onPointerLeave={() => setPointer(null)}
    >
      <div className={C.tilt} style={{ transform: tilt }}>
        {/* The white vinyl edge around the print. */}
        <div className={C.edge} style={{ ...clip, background: "#fafafa" }} />
        <div
          className={C.face}
          style={{
            ...clip,
            inset: border,
            background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 60%), ${color}`,
          }}
        >
          <div
            className={`${C.foil} ${pointer ? "" : C.drift}`}
            style={{
              backgroundImage: FOIL,
              opacity: intensity,
              backgroundPosition: pointer
                ? `${pointer.x * 100}% ${pointer.y * 100}%, 0 0`
                : undefined,
            }}
          />
          <div
            className={C.glare}
            style={{
              opacity: pointer ? 0.9 : 0,
              background: pointer
                ? `radial-gradient(circle at ${pointer.x * 100}% ${pointer.y * 100}%, rgba(255,255,255,0.9), transparent 45%)`
                : undefined,
            }}
          />
          <div
            className={C.content}
            style={{ color: textColor, fontSize: size * 0.17 }}
          >
            {children}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes rui-holo-drift {
          from { background-position: 0% 0%, 0 0; }
          to { background-position: 100% 100%, 0 0; }
        }
      `}</style>
    </div>
  );
};

export default Holo;
