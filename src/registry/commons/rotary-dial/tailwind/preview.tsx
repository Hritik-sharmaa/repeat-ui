"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "relative mx-auto flex max-w-full select-none flex-col items-center gap-6",
  boxes: "relative flex w-full justify-center gap-2",
  box: "relative grid aspect-[4/5] min-w-0 max-w-12 flex-1 place-items-center rounded-xl border-2 font-mono text-2xl font-bold",
  caret: "block h-6 w-0.5 rounded-full",
  input:
    "absolute inset-0 size-full cursor-text border-0 bg-transparent text-base text-transparent caret-transparent opacity-0 outline-none",
  dial: "relative aspect-square w-full touch-none",
  layer: "pointer-events-none absolute inset-0 size-full",
  hole: "cursor-grab active:cursor-grabbing",
  wheel: "pointer-events-none absolute inset-0",
  hub: "absolute left-1/2 top-1/2 grid size-[32%] cursor-pointer place-items-center rounded-full border-0 p-0 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-default",
  icon: "grid place-items-center",
};

const CENTER = 160;
const RING = 108;
const HOLE = 24;
const STEP = 30;
// The finger stop, in degrees clockwise from twelve o'clock. Each hole sits one more step back from it.
const STOP = 125;

const steps = Array.from({ length: 10 }, (_, i) => i + 1);
const digitOf = (step: number) => String(step % 10);
const polar = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  // Rounded, because the server and browser can disagree on the last digit of a sine.
  const round = (v: number) => Math.round(v * 100) / 100;
  return {
    x: round(CENTER + r * Math.sin(a)),
    y: round(CENTER - r * Math.cos(a)),
  };
};
const holeAt = (step: number) => polar(STOP - step * STEP, RING);

// The spring pulls the wheel home against a governor: it snaps a number along, catches, then snaps again.
const ratchet = (n: number) => (t: number) => {
  const s = t * n;
  const i = Math.floor(s);
  const f = Math.min(1, (s - i) * 1.5);
  return Math.min(1, (i + f * f * (3 - 2 * f)) / n);
};

export interface RotaryDialProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  size?: number;
  returnTime?: number;
  mask?: boolean;
  sound?: boolean;
  wheelColor?: string;
  plateColor?: string;
  inkColor?: string;
  accentColor?: string;
  boxColor?: string;
  textColor?: string;
  className?: string;
}

// A one-time code input you dial. Hook a number and drag it round to the stop, or just tap it, and the wheel
// clicks back home as the digit lands. Typing and pasting work too, and the dial spins along.
const RotaryDial = ({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  size = 300,
  returnTime = 70,
  mask = false,
  sound = false,
  wheelColor = "#1d1d20",
  plateColor = "#efe6d3",
  inkColor = "#1d1d20",
  accentColor = "#e5483b",
  boxColor = "#18181b",
  textColor = "#fafafa",
  className = "",
}: RotaryDialProps) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const still = useReducedMotion();
  const [inner, setInner] = useState(defaultValue);
  const code = (value ?? inner).slice(0, length);
  const complete = code.length === length;
  const [held, setHeld] = useState(0);
  const [focused, setFocused] = useState(false);

  const dialRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    step: number;
    last: number;
    moved: number;
    stopped: boolean;
  } | null>(null);
  const spinRef = useRef<AnimationPlaybackControls | null>(null);
  const busyRef = useRef(false);
  const notchRef = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);

  const rotate = useMotionValue(0);
  const stopKick = useMotionValue(0);
  const pulse = useMotionValue(0);
  const hubScale = useTransform(pulse, [0, 1], [1, 1.035]);

  useEffect(() => () => spinRef.current?.stop(), []);

  const click = (pitch: number) => {
    if (!sound) return;
    const ctx = (audioRef.current ??= new AudioContext());
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = pitch;
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.02);
  };

  // Every number the wheel passes gives one click, felt through the hub and, on phones, the hand.
  useMotionValueEvent(rotate, "change", (v) => {
    const notch = Math.floor((v + 1) / STEP);
    if (notch === notchRef.current) return;
    notchRef.current = notch;
    pulse.set(1);
    animate(pulse, 0, { duration: 0.09, ease: "easeOut" });
    click(1500);
    navigator.vibrate?.(4);
  });

  const update = (next: string) => {
    const prev = code;
    setInner(next);
    onChange?.(next);
    if (next.length === length && prev.length < length) onComplete?.(next);
  };

  const hitStop = () => {
    click(700);
    navigator.vibrate?.(12);
    stopKick.set(2.5);
    animate(stopKick, 0, { type: "spring", stiffness: 700, damping: 12 });
  };

  const goHome = (step: number) => {
    const n = Math.max(1, rotate.get() / STEP);
    busyRef.current = true;
    spinRef.current = animate(rotate, 0, {
      duration: (n * returnTime) / 1000,
      ease: ratchet(Math.ceil(n)),
      onComplete: () => {
        busyRef.current = false;
        setHeld((h) => (h === step ? 0 : h));
      },
    });
  };

  // Tapped or typed numbers spin round on their own, so the dial always shows what was entered.
  const autoDial = (step: number) => {
    if (still || busyRef.current) return;
    busyRef.current = true;
    setHeld(step);
    spinRef.current = animate(rotate, step * STEP, {
      duration: 0.1 + step * 0.03,
      ease: "easeInOut",
      onComplete: () => {
        hitStop();
        goHome(step);
      },
    });
  };

  const angle = (e: PointerEvent) => {
    const box = dialRef.current!.getBoundingClientRect();
    const dx = e.clientX - (box.left + box.width / 2);
    const dy = e.clientY - (box.top + box.height / 2);
    return {
      deg: (Math.atan2(dx, -dy) * 180) / Math.PI,
      far: Math.hypot(dx, dy) / box.width,
    };
  };

  const onHoleDown = (e: PointerEvent, step: number) => {
    if (busyRef.current) return;
    e.preventDefault();
    dialRef.current!.setPointerCapture(e.pointerId);
    dragRef.current = { step, last: angle(e).deg, moved: 0, stopped: false };
    setHeld(step);
    click(1000);
  };

  const onDrag = (e: PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const { deg, far } = angle(e);
    // Too near the middle, the angle jumps about with every small movement.
    if (far < 0.1) return;
    const delta = ((deg - drag.last + 540) % 360) - 180;
    drag.last = deg;
    drag.moved += Math.abs(delta);
    const max = drag.step * STEP;
    const next = Math.max(0, Math.min(max, rotate.get() + delta));
    rotate.set(next);
    if (next >= max - 0.5 && !drag.stopped) {
      drag.stopped = true;
      hitStop();
    } else if (next < max - STEP / 2) drag.stopped = false;
  };

  const onRelease = () => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    const char = digitOf(drag.step);
    if (drag.moved < 6) {
      setHeld(0);
      if (!complete) update(code + char);
      autoDial(drag.step);
      return;
    }
    if (drag.stopped && !complete) update(code + char);
    goHome(drag.step);
  };

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.replace(/\D/g, "").slice(0, length);
    if (next === code) return;
    update(next);
    if (next.length > code.length)
      autoDial(Number(next[next.length - 1]) || 10);
  };

  const body = `rui-dial-wheel-${uid}`;
  const shine = `rui-dial-shine-${uid}`;
  const metal = `rui-dial-metal-${uid}`;
  const stopFrom = polar(STOP, 98);
  const stopTo = polar(STOP, 154);

  return (
    <div className={`${C.root} ${className}`} style={{ width: size }}>
      <div className={C.boxes}>
        {Array.from({ length }, (_, i) => {
          const active =
            focused && i === Math.min(code.length, length - 1) && !complete;
          return (
            <motion.div
              key={i}
              className={C.box}
              style={{
                color: textColor,
                background: boxColor,
                borderColor:
                  complete || active ? accentColor : "rgba(255,255,255,0.1)",
                transition: "border-color 200ms",
              }}
              animate={complete ? { y: [0, -7, 0] } : { y: 0 }}
              transition={{
                duration: 0.4,
                delay: complete ? i * 0.05 : 0,
                ease: "easeOut",
              }}
            >
              <AnimatePresence mode="popLayout">
                {code[i] && (
                  <motion.span
                    key={code[i]}
                    initial={{ opacity: 0, y: 12, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.6,
                      transition: { duration: 0.12 },
                    }}
                    transition={{ type: "spring", stiffness: 520, damping: 22 }}
                  >
                    {mask ? "•" : code[i]}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && !code[i] && (
                <motion.span
                  className={C.caret}
                  style={{ background: accentColor }}
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          );
        })}
        <input
          className={C.input}
          value={code}
          onChange={onType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          maxLength={length}
          aria-label={`${length}-digit code`}
        />
      </div>

      <div
        ref={dialRef}
        className={C.dial}
        onPointerMove={onDrag}
        onPointerUp={onRelease}
        onPointerCancel={onRelease}
      >
        {/* The plate. Its numbers stay still and show through the holes in the wheel. */}
        <svg aria-hidden viewBox="0 0 320 320" className={C.layer}>
          <circle cx={CENTER} cy={CENTER} r="159" fill={plateColor} />
          <circle
            cx={CENTER}
            cy={CENTER}
            r="158.5"
            fill="none"
            stroke="rgba(0,0,0,0.35)"
          />
          {steps.map((step) => {
            const { x, y } = holeAt(step);
            return (
              <text
                key={step}
                x={x}
                y={y}
                fill={inkColor}
                fontSize="23"
                fontWeight="800"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {digitOf(step)}
              </text>
            );
          })}
        </svg>

        {/* The wheel. */}
        <motion.div className={C.wheel} style={{ rotate }}>
          <svg aria-hidden viewBox="0 0 320 320" className={C.layer}>
            <defs>
              <mask id={body}>
                <rect width="320" height="320" fill="#fff" />
                {steps.map((step) => {
                  const { x, y } = holeAt(step);
                  return (
                    <circle key={step} cx={x} cy={y} r={HOLE} fill="#000" />
                  );
                })}
              </mask>
            </defs>
            <circle
              cx={CENTER}
              cy={CENTER}
              r="146"
              fill={wheelColor}
              mask={`url(#${body})`}
            />
            {steps.map((step) => {
              const { x, y } = holeAt(step);
              const on = held === step;
              return (
                <g key={step}>
                  <circle
                    cx={x}
                    cy={y}
                    r={HOLE}
                    fill={
                      on
                        ? `color-mix(in srgb, ${accentColor} 22%, transparent)`
                        : "transparent"
                    }
                    stroke={on ? accentColor : "rgba(0,0,0,0.55)"}
                    strokeWidth={on ? 2.5 : 1.5}
                  />
                  <circle
                    className={C.hole}
                    cx={x}
                    cy={y}
                    r={HOLE + 2}
                    fill="transparent"
                    pointerEvents="all"
                    onPointerDown={(e) => onHoleDown(e, step)}
                  />
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Light stays put while the wheel turns: gloss on the rim and round the hub, then the chrome stop. */}
        <svg aria-hidden viewBox="0 0 320 320" className={C.layer}>
          <defs>
            <linearGradient id={shine} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="0.45" stopColor="#fff" stopOpacity="0.03" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.18" />
            </linearGradient>
            <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f5f5f7" />
              <stop offset="0.5" stopColor="#8e8e93" />
              <stop offset="1" stopColor="#d6d6da" />
            </linearGradient>
          </defs>
          <circle
            cx={CENTER}
            cy={CENTER}
            r="144.5"
            fill="none"
            stroke={`url(#${shine})`}
            strokeWidth="3"
          />
          <circle
            cx={CENTER}
            cy={CENTER}
            r="78"
            fill="none"
            stroke={`url(#${shine})`}
            strokeWidth="2"
          />
        </svg>
        <motion.div className={C.wheel} style={{ rotate: stopKick }}>
          <svg aria-hidden viewBox="0 0 320 320" className={C.layer}>
            <line
              x1={stopFrom.x}
              y1={stopFrom.y + 3}
              x2={stopTo.x}
              y2={stopTo.y + 3}
              stroke="rgba(0,0,0,0.4)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <line
              x1={stopFrom.x}
              y1={stopFrom.y}
              x2={stopTo.x}
              y2={stopTo.y}
              stroke={`url(#${metal})`}
              strokeWidth="11"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* The hub takes the last digit back off, or clears the whole code once it's full. */}
        <motion.button
          type="button"
          className={C.hub}
          aria-label={complete ? "Clear code" : "Delete last digit"}
          disabled={!code}
          style={{
            background: plateColor,
            color: inkColor,
            scale: hubScale,
            x: "-50%",
            y: "-50%",
          }}
          whileTap={{ scale: 0.94 }}
          onClick={() => update(complete ? "" : code.slice(0, -1))}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={complete ? "done" : "back"}
              className={C.icon}
              style={{
                color: complete ? accentColor : inkColor,
                opacity: code ? 1 : 0.35,
              }}
              initial={{ scale: 0.4, rotate: -40, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: code ? 1 : 0.35 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 24 }}
            >
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {complete ? (
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                ) : (
                  <path d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6-7zM12.5 9.5l5 5M17.5 9.5l-5 5" />
                )}
              </svg>
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default RotaryDial;
