"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./style.css";

export interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export interface SimpleCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  height?: number;
  overlay?: number;
  accentColor?: string;
  showControls?: boolean;
  showProgress?: boolean;
  showThumbnails?: boolean;
  showIndicators?: boolean;
  className?: string;
}

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden>
    <path d={dir === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
  </svg>
);

// A full-bleed hero slider: the image slides in, then the copy rises line by line.
// The progress bar fills over each slide's time on screen.
const SimpleCarousel = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  height = 520,
  overlay = 0.45,
  accentColor = "#ffffff",
  showControls = true,
  showProgress = true,
  showThumbnails = true,
  showIndicators = true,
  className = "",
}: SimpleCarouselProps) => {
  const [[current, direction], setSlide] = useState([0, 1]);
  const [playing, setPlaying] = useState(autoPlay);
  const count = items.length;
  const go = (index: number, dir: number) => setSlide([(index + count) % count, dir]);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setSlide(([i]) => [(i + 1) % count, 1]), autoPlayInterval);
    return () => clearTimeout(timer);
  }, [current, playing, autoPlayInterval, count]);

  const item = items[current];
  const glass = "rui-hero-glass";

  return (
    <div className={`rui-hero ${className}`}>
      {/* Never taller than the screen is wide on phones, so the slide keeps a sensible shape. */}
      <div className="rui-hero-stage" style={{ height: `min(${height}px, 100vw)` }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={item.id}
            src={item.image}
            alt={item.title}
            custom={direction}
            className="rui-hero-image"
            variants={{
              enter: (d: number) => ({ x: `${d * 100}%` }),
              center: { x: 0, scale: 1 },
              exit: (d: number) => ({ x: `${d * -30}%`, scale: 0.95, opacity: 0.4 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </AnimatePresence>
        <div className="rui-hero-shade" style={{ opacity: overlay * 1.6 }} />

        <div className="rui-hero-copy">
          <motion.div key={item.id} initial="hidden" animate="visible" className="rui-hero-text">
            {[
              { el: "p", text: item.subtitle, className: "rui-hero-subtitle", style: { color: accentColor } },
              { el: "h2", text: item.title, className: "rui-hero-title" },
              { el: "p", text: item.description, className: "rui-hero-description" },
            ].map(({ el, text, className, style }, i) => {
              const Line = el === "h2" ? motion.h2 : motion.p;
              return (
                <Line
                  key={el + i}
                  className={className}
                  style={style}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: "easeOut" }}>
                  {text}
                </Line>
              );
            })}
          </motion.div>
          <span className="rui-hero-index">{String(current + 1).padStart(2, "0")}</span>
        </div>

        {showControls && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(current - 1, -1)}
              className={`${glass} rui-hero-prev`}>
              <Chevron dir="left" />
            </button>
            <button type="button" aria-label="Next slide" onClick={() => go(current + 1, 1)} className={`${glass} rui-hero-next`}>
              <Chevron dir="right" />
            </button>
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => !p)}
              className={`${glass} rui-hero-play`}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                <path d={playing ? "M7 5h3v14H7zM14 5h3v14h-3z" : "M8 5v14l11-7z"} />
              </svg>
            </button>
          </>
        )}
      </div>

      {(showIndicators || showProgress || showThumbnails) && (
        <div className="rui-hero-bar">
          {showIndicators && (
            <div className="rui-hero-dots">
              {items.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className="rui-hero-dot"
                  style={{ width: i === current ? 40 : 16, background: i === current ? accentColor : "rgba(255,255,255,0.3)" }}
                />
              ))}
            </div>
          )}
          {showProgress && (
            <div className="rui-hero-progress">
              <motion.div
                key={`${current}-${playing}`}
                className="rui-hero-progress-fill"
                style={{ background: accentColor }}
                initial={{ width: "0%" }}
                animate={{ width: playing ? "100%" : "0%" }}
                transition={{ duration: playing ? autoPlayInterval / 1000 : 0, ease: "linear" }}
              />
            </div>
          )}
          {showThumbnails && (
            <div className="rui-hero-thumbs">
              {items.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  aria-label={`Show ${it.title}`}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className={`rui-hero-thumb ${i === current ? "rui-hero-thumb-active" : ""}`}
                  style={{ boxShadow: i === current ? `0 0 0 2px ${accentColor}` : undefined }}>
                  <img src={it.image} alt="" className="rui-hero-image" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleCarousel;
