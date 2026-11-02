"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
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
  fold: "rui-peel-fold",
  flap: "rui-peel-flap",
  reseal: "rui-peel-reseal",
};

export interface PeelSealProps {
  children?: ReactNode;
  width?: number;
  height?: number;
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

// A tamper seal, like the sticker on the back of a new box. Drag it sideways and it folds back over
// itself, showing its paper back, until it comes away and reveals what is underneath.
const PeelSeal = ({
  children,
  width = 340,
  height = 200,
  label = "Sealed",
  sublabel = "Pull the tab to open",
  pullText = "Pull",
  color = "#f4f4f2",
  backColor = "#dcdad3",
  textColor = "#18181b",
  accentColor = "#fa5f1b",
  radius = 18,
  threshold = 0.55,
  hint = true,
  resealable = true,
  onPeel,
  className = "",
}: PeelSealProps) => {
  const [peeled, setPeeled] = useState(false);
  // How far the seal has been pulled back from its right edge, in pixels.
  const pull = useMotionValue(0);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const hintRef = useRef<AnimationPlaybackControls | null>(null);

  // The fold sits `pull` from the right edge; the flap is the peeled strip, mirrored to its left.
  const frontClip = useMotionTemplate`inset(0 ${pull}px 0 0)`;
  const foldRight = pull;
  const flapLeft = useTransform(pull, (p) => width - 2 * p);
  const flapOpacity = useTransform(pull, (p) => (p > 0.5 ? 1 : 0));

  // Every few seconds the corner lifts a little, to say "pull me".
  useEffect(() => {
    if (!hint || peeled) return;
    hintRef.current = animate(pull, [0, 16, 0], {
      duration: 1.3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 2.2,
      delay: 0.8,
    });
    return () => hintRef.current?.stop();
  }, [hint, peeled, pull]);

  const stopHint = () => {
    hintRef.current?.stop();
    hintRef.current = null;
  };

  const finish = () => {
    stopHint();
    animate(pull, width, { duration: 0.35, ease: [0.4, 0, 0.2, 1] }).then(() => {
      setPeeled(true);
      onPeel?.();
    });
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    stopHint();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, start: pull.get() };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    pull.set(Math.min(width, Math.max(0, drag.current.start + (drag.current.x - e.clientX))));
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    if (pull.get() > width * threshold) finish();
    else animate(pull, 0, { type: "spring", stiffness: 380, damping: 26 });
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      finish();
    }
  };

  const tabWidth = Math.min(64, width * 0.2);

  return (
    <div className={`${C.root} ${className}`} style={{ width, height }}>
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
            exit={{ x: -60, y: 24, rotate: -10, opacity: 0, transition: { duration: 0.45, ease: "easeIn" } }}>
            {/* The part still stuck down: everything left of the fold. */}
            <motion.div
              className={C.front}
              style={{ clipPath: frontClip, background: color, color: textColor, borderRadius: radius }}>
              <div className={C.sheen} style={{ opacity: 0.5 }} />
              <div className={C.face} style={{ right: tabWidth }}>
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
              <div
                className={C.tab}
                style={{ width: tabWidth, borderColor: `color-mix(in srgb, ${textColor} 25%, transparent)`, color: accentColor }}>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={C.arrow}
                  aria-hidden>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {pullText}
              </div>
            </motion.div>
            {/* The shadow the lifted strip casts onto the part still stuck down. */}
            <motion.div className={C.fold} style={{ right: foldRight, opacity: flapOpacity }} />
            {/* The peeled strip, folded back: its paper side, shaded darkest where it bends. */}
            <motion.div
              className={C.flap}
              style={{
                left: flapLeft,
                width: pull,
                opacity: flapOpacity,
                borderRadius: `${radius}px 0 0 ${radius}px`,
                // Shading over a solid base, so nothing under the flap shows through.
                background: `linear-gradient(to left, rgba(0,0,0,0.22) 0%, rgba(255,255,255,0.55) 6%, transparent 22%, transparent 85%, rgba(0,0,0,0.07) 100%), ${backColor}`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {peeled && resealable && (
        <button
          type="button"
          className={C.reseal}
          onClick={() => {
            pull.set(0);
            setPeeled(false);
          }}>
          Reseal
        </button>
      )}
    </div>
  );
};

export default PeelSeal;
