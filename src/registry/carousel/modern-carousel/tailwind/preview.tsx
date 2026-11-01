"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion } from "motion/react";

export interface ModernCarouselItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export interface ModernCarouselProps {
  items: ModernCarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  accentColor?: string;
  spacing?: number;
  angle?: number;
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden>
    <path d={dir === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
  </svg>
);

// A cover-flow: cards turn away in 3D on either side of the current one. Swipe, click or use the arrows.
const ModernCarousel = ({
  items,
  autoPlay = true,
  autoPlayInterval = 4000,
  accentColor = "#60a5fa",
  spacing = 140,
  angle = 25,
  cardWidth = 340,
  cardHeight = 420,
  className = "",
}: ModernCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const [hovered, setHovered] = useState(false);
  const dragStart = useRef<number | null>(null);
  const count = items.length;
  const go = (step: number) => setCurrent((i) => (i + step + count) % count);

  useEffect(() => {
    if (!playing || hovered) return;
    const timer = setTimeout(() => setCurrent((i) => (i + 1) % count), autoPlayInterval);
    return () => clearTimeout(timer);
  }, [current, playing, hovered, autoPlayInterval, count]);

  const onPointerUp = (e: PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 30) go(dx > 0 ? -1 : 1);
  };

  const navButton =
    "absolute top-1/2 z-20 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/25 bg-black/40 text-white shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-black/60";

  return (
    <div
      className={`mx-auto flex w-full max-w-4xl flex-col items-center gap-6 py-10 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div
        className="relative w-full touch-pan-y select-none [perspective:1200px]"
        style={{ height: cardHeight }}
        onPointerDown={(e) => (dragStart.current = e.clientX)}
        onPointerUp={onPointerUp}
        onPointerLeave={() => (dragStart.current = null)}>
        {items.map((item, idx) => {
          let rel = (idx - current + count) % count;
          if (rel > count / 2) rel -= count;
          const distance = Math.abs(rel);
          const active = rel === 0;
          return (
            <motion.div
              key={item.id}
              onClick={() => setCurrent(idx)}
              className="absolute left-1/2 top-0 cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl"
              style={{
                width: cardWidth,
                height: cardHeight,
                marginLeft: -cardWidth / 2,
                zIndex: 10 - distance,
                pointerEvents: distance > 2 ? "none" : "auto",
                boxShadow: active ? `0 0 0 3px ${accentColor}, 0 30px 60px -20px rgba(0,0,0,0.6)` : undefined,
              }}
              initial={false}
              animate={{
                x: rel * spacing,
                rotateY: -rel * angle,
                scale: 1 - Math.min(distance, 2) * 0.12,
                opacity: distance > 2 ? 0 : 1 - distance * 0.3,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}>
              <img src={item.image} alt={item.title} draggable={false} className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                <p className="mt-1 font-semibold" style={{ color: accentColor }}>
                  {item.subtitle}
                </p>
                <p className="mt-1 text-sm text-white/80">{item.description}</p>
              </div>
            </motion.div>
          );
        })}

        <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className={`${navButton} left-2`}>
          <Chevron dir="left" />
        </button>
        <button type="button" aria-label="Next slide" onClick={() => go(1)} className={`${navButton} right-2`}>
          <Chevron dir="right" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
          className="grid size-9 cursor-pointer place-items-center rounded-full text-white shadow-lg transition hover:scale-110"
          style={{ background: accentColor }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
            <path d={playing ? "M7 5h3v14H7zM14 5h3v14h-3z" : "M8 5v14l11-7z"} />
          </svg>
        </button>
        <div className="flex gap-2">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="h-2.5 cursor-pointer rounded-full transition-all duration-300"
              style={{ width: idx === current ? 28 : 10, background: idx === current ? accentColor : "rgba(128,128,128,0.4)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernCarousel;
