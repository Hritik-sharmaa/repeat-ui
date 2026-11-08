"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "relative mx-auto flex max-w-full select-none items-center",
  case: "relative z-20 grid shrink-0 place-items-center rounded-[22px] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.7),inset_0_2px_0_rgba(255,255,255,0.35),inset_0_-4px_0_rgba(0,0,0,0.25)]",
  window:
    "rounded-md px-2 py-1 font-mono text-sm font-bold tabular-nums shadow-[inset_0_2px_5px_rgba(0,0,0,0.6)]",
  lock: "absolute -top-3 left-1/2 h-5 w-9 -translate-x-1/2 cursor-pointer rounded-md border-0 p-0 shadow-[0_2px_4px_rgba(0,0,0,0.4)] outline-none focus-visible:ring-2 focus-visible:ring-white/70",
  lockDot: "absolute top-1 h-3 w-3 rounded-sm",
  slot: "absolute -right-1 top-1/2 h-9 w-2 -translate-y-1/2 rounded-sm bg-black/70",
  track: "relative h-14 min-w-0 flex-1",
  tape: "absolute left-0 top-[10px] h-9 overflow-hidden shadow-[0_6px_10px_-6px_rgba(0,0,0,0.6)]",
  strip: "absolute right-0 top-0 h-full",
  num: "absolute top-1 font-mono text-[11px] font-bold leading-none",
  hook: "absolute top-0 z-10 h-14 w-5 cursor-grab touch-none rounded-r-md border-0 p-0 shadow-[2px_4px_8px_rgba(0,0,0,0.45)] outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-white/70",
};

export interface TapeMeasureProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  width?: number;
  locked?: boolean;
  caseColor?: string;
  tapeColor?: string;
  inkColor?: string;
  className?: string;
}

const CASE = 84;
const HOOK = 20;

// A slider that's a tape measure. Pull the brass hook to run the tape out: the reading at the case is the value.
// The lock on top holds it there; flick the lock off and the tape whips back into the case with a jolt.
// Arrow keys, Page Up/Down, Home and End work on the hook too.
const TapeMeasure = ({
  value,
  defaultValue = 30,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "cm",
  width = 460,
  locked: startLocked = true,
  caseColor = "#facc15",
  tapeColor = "#fde047",
  inkColor = "#1c1917",
  className = "",
}: TapeMeasureProps) => {
  const still = useReducedMotion();
  const [inner, setInner] = useState(defaultValue);
  const current = Math.min(max, Math.max(min, value ?? inner));
  const [locked, setLocked] = useState(startLocked);
  const trackRef = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState(width - CASE - HOOK);
  const dragRef = useRef<{ x: number; from: number } | null>(null);
  // True while the tape whips home, so the new value doesn't snap it there.
  const whipRef = useRef(false);

  // The track's width sets how many pixels make one unit.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setRoom(Math.max(40, el.clientWidth - HOOK));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const perUnit = room / (max - min);

  // The tape's length follows the value, but runs on its own while it whips home.
  const length = useMotionValue((current - min) * perUnit);
  const jolt = useMotionValue(0);
  const caseRotate = useTransform(jolt, [-1, 1], [-6, 6]);
  const [shown, setShown] = useState(current);
  useMotionValueEvent(length, "change", (px) =>
    setShown(Math.round(min + px / perUnit)),
  );
  useEffect(() => {
    if (!dragRef.current && !whipRef.current)
      length.set((current - min) * perUnit);
  }, [current, min, perUnit, length]);

  const commit = (next: number) => {
    const snapped = Math.min(
      max,
      Math.max(min, Math.round(next / step) * step),
    );
    setInner(snapped);
    onChange?.(snapped);
    return snapped;
  };

  // Unlocked, the spring takes the tape: it speeds up as it goes, then the hook slams into the case.
  const whip = () => {
    if (!still) whipRef.current = true;
    commit(min);
    if (still) return;
    animate(length, 0, {
      duration: 0.12 + (length.get() / room) * 0.28,
      ease: [0.55, 0, 1, 0.45],
      onComplete: () => {
        whipRef.current = false;
        jolt.set(1);
        animate(jolt, 0, { type: "spring", stiffness: 900, damping: 9 });
      },
    });
  };

  const onDown = (e: PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, from: length.get() };
  };
  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const px = Math.max(0, Math.min(room, drag.from + e.clientX - drag.x));
    length.set(px);
    commit(min + px / perUnit);
  };
  const onUp = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    if (locked)
      length.set((commit(min + length.get() / perUnit) - min) * perUnit);
    else whip();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const big = step * Math.max(1, Math.round((max - min) / step / 10));
    const moves: Record<string, number> = {
      ArrowRight: current + step,
      ArrowUp: current + step,
      ArrowLeft: current - step,
      ArrowDown: current - step,
      PageUp: current + big,
      PageDown: current - big,
      Home: min,
      End: max,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    commit(moves[e.key]);
  };

  const toggleLock = () => {
    const next = !locked;
    setLocked(next);
    if (!next && current > min) whip();
  };

  // Ticks every step, longer every 5 and 10; numbers every 10 steps, counted from the hook end as on a real tape.
  const tick = perUnit * step;
  const label = step * 10;
  const numbers = Array.from(
    { length: Math.floor((max - min) / label) + 1 },
    (_, i) => i * label,
  );

  return (
    <div className={`${C.root} ${className}`} style={{ width }}>
      <motion.div
        className={C.case}
        style={{
          width: CASE,
          height: CASE,
          rotate: caseRotate,
          background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${caseColor} 70%, #fff), ${caseColor} 45%, color-mix(in srgb, ${caseColor} 70%, #000))`,
        }}
      >
        <button
          type="button"
          aria-label={locked ? "Unlock the tape" : "Lock the tape"}
          aria-pressed={locked}
          className={C.lock}
          style={{ background: "#27272a" }}
          onClick={toggleLock}
        >
          <motion.span
            className={C.lockDot}
            style={{ background: locked ? "#ef4444" : "#a1a1aa" }}
            animate={{ left: locked ? 4 : 20 }}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
          />
        </button>
        <span
          className={C.window}
          style={{ background: "#14532d", color: "#bbf7d0" }}
        >
          {shown}
          <span style={{ fontSize: 10, opacity: 0.7, marginLeft: 2 }}>
            {unit}
          </span>
        </span>
        <span aria-hidden className={C.slot} />
      </motion.div>

      <div ref={trackRef} className={C.track}>
        <motion.div
          className={C.tape}
          style={{ width: length, background: tapeColor }}
        >
          <div
            className={C.strip}
            style={{
              width: room,
              backgroundImage: [
                `repeating-linear-gradient(to left, ${inkColor} 0 1px, transparent 1px ${tick * 10}px)`,
                `repeating-linear-gradient(to left, ${inkColor} 0 1px, transparent 1px ${tick * 5}px)`,
                `repeating-linear-gradient(to left, ${inkColor} 0 1px, transparent 1px ${tick}px)`,
              ].join(", "),
              backgroundSize: "100% 55%, 100% 38%, 100% 22%",
              backgroundPosition: "right bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            {numbers.map((n) => (
              <span
                key={n}
                className={C.num}
                style={{
                  right: n * perUnit - 1,
                  transform: "translateX(50%)",
                  color: inkColor,
                }}
              >
                {n + min}
              </span>
            ))}
          </div>
        </motion.div>
        {/* The brass hook: drag it to run the tape out. */}
        <motion.button
          type="button"
          role="slider"
          aria-label="Length"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current}
          aria-valuetext={`${current} ${unit}`}
          className={C.hook}
          style={{
            x: length,
            left: -4,
            background: "linear-gradient(90deg, #b45309, #fcd34d 40%, #d97706)",
          }}
          whileTap={{ scaleY: 1.06 }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};

export default TapeMeasure;
