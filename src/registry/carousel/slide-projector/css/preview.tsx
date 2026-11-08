"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-projector",
  screen: "rui-projector-screen",
  lamp: "rui-projector-lamp",
  slide: "rui-projector-slide",
  vignette: "rui-projector-vignette",
  caption: "rui-projector-caption",
  beam: "rui-projector-beam",
  beamLight: "rui-projector-beamLight",
  speck: "rui-projector-speck",
  body: "rui-projector-body",
  lens: "rui-projector-lens",
  trayWrap: "rui-projector-trayWrap",
  tilt: "rui-projector-tilt",
  tray: "rui-projector-tray",
  hub: "rui-projector-hub",
  slot: "rui-projector-slot",
  thumb: "rui-projector-thumb",
  panel: "rui-projector-panel",
  button: "rui-projector-button",
  counter: "rui-projector-counter",
  knob: "rui-projector-knob",
  live: "rui-projector-live",
};

export interface Slide {
  image: string;
  title: string;
  caption?: string;
}

export interface SlideProjectorProps {
  items: Slide[];
  autoPlay?: boolean;
  interval?: number;
  width?: number;
  lampColor?: string;
  bodyColor?: string;
  screenColor?: string;
  accentColor?: string;
  flicker?: boolean;
  className?: string;
}

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    aria-hidden
  >
    <path d={dir === "left" ? "M15 5 7 12l8 7z" : "m9 5 8 7-8 7z"} />
  </svg>
);

// A slide projector: photos sit in a round tray that clunks round one notch per slide, and the slide in the gate
// is thrown onto the screen through the lamp, coming into focus as it lands. Use the buttons, the arrow keys, or
// click a slide in the tray.
const SlideProjector = ({
  items,
  autoPlay = false,
  interval = 4000,
  width = 560,
  lampColor = "#ffd9a0",
  bodyColor = "#2b2724",
  screenColor = "#e8e3d6",
  accentColor = "#f59e0b",
  flicker = true,
  className = "",
}: SlideProjectorProps) => {
  // `turn` counts notches without wrapping, so going past the last slide clunks on to the first rather than
  // spinning the tray all the way back.
  const [turn, setTurn] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;
  const index = ((turn % count) + count) % count;
  const slots = Math.max(count, 8);
  const step = 360 / slots;
  const go = (delta: number) => setTurn((t) => t + delta);
  const jump = (to: number) => {
    let delta = (to - index + count) % count;
    if (delta > count / 2) delta -= count;
    go(delta);
  };

  useEffect(() => {
    if (!autoPlay || paused || count < 2) return;
    const timer = setTimeout(() => go(1), interval);
    return () => clearTimeout(timer);
  }, [autoPlay, paused, interval, count, turn]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else return;
    e.preventDefault();
  };

  const item = items[index];
  // Lighter (k > 0) or darker (k < 0) versions of the body colour, by k percent.
  const shade = (k: number) =>
    `color-mix(in srgb, ${bodyColor} ${100 - Math.abs(k)}%, ${k > 0 ? "#fff" : "#000"})`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Slides"
      tabIndex={0}
      className={`${C.root} ${className}`}
      style={{ width }}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* The screen. Between slides it shows the bare lamp; the new slide lands blurred and over-bright, then focuses. */}
      <div className={C.screen} style={{ background: screenColor }}>
        <motion.div
          className={C.lamp}
          style={{
            background: `radial-gradient(circle at 50% 50%, #fffaf0, ${lampColor} 70%)`,
          }}
          animate={
            flicker ? { opacity: [1, 0.94, 1, 0.97, 1] } : { opacity: 1 }
          }
          transition={
            flicker
              ? { duration: 0.6, repeat: Infinity, repeatType: "mirror" }
              : { duration: 0.2 }
          }
        />
        <AnimatePresence initial={false}>
          <motion.img
            key={turn}
            src={item.image}
            alt={item.title}
            draggable={false}
            className={C.slide}
            initial={{
              opacity: 0,
              scale: 1.03,
              y: -6,
              filter: "blur(10px) brightness(1.7)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px) brightness(1)",
              transition: { duration: 0.55, delay: 0.28, ease: "easeOut" },
            }}
            exit={{ opacity: 0, transition: { duration: 0.14 } }}
          />
        </AnimatePresence>
        {/* The lamp's hotspot: warm, bright in the middle and falling off to the corners. */}
        <motion.div
          className={C.vignette}
          style={{
            background: `radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(0,0,0,0.38)), linear-gradient(${lampColor}33, ${lampColor}33)`,
            mixBlendMode: "multiply",
          }}
          animate={flicker ? { opacity: [1, 0.9, 1] } : { opacity: 1 }}
          transition={
            flicker
              ? { duration: 0.35, repeat: Infinity, repeatType: "mirror" }
              : { duration: 0.2 }
          }
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={turn}
            className={C.caption}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            {item.caption ?? item.title}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* The beam from the lens up to the screen, with dust turning in it. */}
      <div className={C.beam}>
        <div
          className={C.beamLight}
          style={{
            clipPath: "polygon(46% 100%, 54% 100%, 96% 0, 4% 0)",
            background: `linear-gradient(to top, ${lampColor}55, ${lampColor}0d)`,
          }}
        />
        {[18, 34, 52, 67, 81].map((x, i) => (
          <motion.span
            key={x}
            className={C.speck}
            style={{ left: `${x}%`, opacity: 0.35 }}
            animate={{
              y: [56, 4, 56],
              x: [0, i % 2 ? 6 : -6, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      <div
        className={C.body}
        style={{
          background: `linear-gradient(180deg, ${shade(8)}, ${bodyColor} 30%, ${shade(-25)})`,
        }}
      >
        <div
          className={C.lens}
          style={{
            background: `radial-gradient(circle, ${lampColor} 20%, #1a1a1a 60%)`,
            borderColor: "#111",
          }}
        />

        {/* The tray, seen from above at an angle. The current slide's slot is empty: that slide is in the gate. */}
        <div className={C.trayWrap}>
          <div className={C.tilt}>
            <motion.div
              className={C.tray}
              style={{
                background: `radial-gradient(circle, ${shade(-35)} 28%, ${shade(12)} 30%, ${shade(-10)} 70%, ${shade(-40)})`,
              }}
              animate={{ rotate: -turn * step }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
            >
              {Array.from({ length: slots }, (_, s) => {
                const slide = s < count ? items[s] : null;
                const here = s === index;
                return (
                  <button
                    key={s}
                    type="button"
                    aria-label={slide ? `Show ${slide.title}` : "Empty slot"}
                    disabled={!slide}
                    tabIndex={-1}
                    className={C.slot}
                    style={{
                      transform: `translate(-50%, -50%) rotate(${s * step}deg) translateY(-155%)`,
                      background:
                        slide && !here ? "#f4efe2" : "rgba(0,0,0,0.55)",
                      padding: slide && !here ? 2 : 0,
                    }}
                    onClick={() => slide && jump(s)}
                  >
                    {slide && !here && (
                      <img
                        src={slide.image}
                        alt=""
                        draggable={false}
                        className={C.thumb}
                      />
                    )}
                  </button>
                );
              })}
              <div
                className={C.hub}
                style={{
                  background: `radial-gradient(circle at 35% 30%, ${shade(25)}, ${shade(-30)})`,
                }}
              />
            </motion.div>
          </div>
        </div>

        <div className={C.panel}>
          <motion.button
            type="button"
            aria-label="Previous slide"
            className={C.button}
            style={{ background: shade(14), color: "#f5f5f4" }}
            whileTap={{ y: 2, scale: 0.94 }}
            onClick={() => go(-1)}
          >
            <Arrow dir="left" />
          </motion.button>
          <div
            className={C.counter}
            style={{
              background: "#120f0c",
              color: accentColor,
              textShadow: `0 0 8px ${accentColor}`,
            }}
          >
            {String(index + 1).padStart(2, "0")}
            <span style={{ opacity: 0.4 }}>
              /{String(count).padStart(2, "0")}
            </span>
          </div>
          {/* The focus knob turns a little with every slide. */}
          <motion.div
            aria-hidden
            className={C.knob}
            style={{
              background: `repeating-conic-gradient(${shade(20)} 0 10deg, ${shade(-20)} 10deg 20deg)`,
            }}
            animate={{ rotate: turn * 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
          />
          <motion.button
            type="button"
            aria-label="Next slide"
            className={C.button}
            style={{ background: shade(14), color: "#f5f5f4" }}
            whileTap={{ y: 2, scale: 0.94 }}
            onClick={() => go(1)}
          >
            <Arrow dir="right" />
          </motion.button>
        </div>
      </div>
      <p aria-live="polite" className={C.live}>
        Slide {index + 1} of {count}: {item.title}
      </p>
    </div>
  );
};

export default SlideProjector;
