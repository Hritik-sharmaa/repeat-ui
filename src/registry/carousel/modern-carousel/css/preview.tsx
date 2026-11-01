"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion } from "motion/react";
import "./style.css";

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

  const navButton = "rui-flow-nav";

  return (
    <div
      className={`rui-flow-carousel ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div
        className="rui-flow-stage"
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
              className="rui-flow-card"
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
              <img src={item.image} alt={item.title} draggable={false} className="rui-flow-image" />
              <div className="rui-flow-shade" />
              <div className="rui-flow-content">
                <h2 className="rui-flow-title">{item.title}</h2>
                <p className="rui-flow-subtitle" style={{ color: accentColor }}>
                  {item.subtitle}
                </p>
                <p className="rui-flow-description">{item.description}</p>
              </div>
            </motion.div>
          );
        })}

        <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className={`${navButton} rui-flow-prev`}>
          <Chevron dir="left" />
        </button>
        <button type="button" aria-label="Next slide" onClick={() => go(1)} className={`${navButton} rui-flow-next`}>
          <Chevron dir="right" />
        </button>
      </div>

      <div className="rui-flow-bar">
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
          className="rui-flow-play"
          style={{ background: accentColor }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
            <path d={playing ? "M7 5h3v14H7zM14 5h3v14h-3z" : "M8 5v14l11-7z"} />
          </svg>
        </button>
        <div className="rui-flow-dots">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="rui-flow-dot"
              style={{ width: idx === current ? 28 : 10, background: idx === current ? accentColor : "rgba(128,128,128,0.4)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernCarousel;
