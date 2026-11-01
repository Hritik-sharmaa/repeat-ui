"use client";

import { useEffect, useState } from "react";
import "./style.css";

export interface LoopDeckItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export interface LoopDeckProps {
  items: LoopDeckItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  accentColor?: string;
  cardWidth?: number;
  cardHeight?: number;
  spread?: number;
  tilt?: number;
  showCounter?: boolean;
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

// A stack of cards: the current one lifts to the front, its neighbours fan out to either side.
const LoopDeck = ({
  items,
  autoPlay = true,
  autoPlayInterval = 3000,
  accentColor = "#60a5fa",
  cardWidth = 320,
  cardHeight = 420,
  spread = 48,
  tilt = 8,
  showCounter = true,
  className = "",
}: LoopDeckProps) => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const count = items.length;
  const go = (step: number) => setCurrent((i) => (i + step + count) % count);

  useEffect(() => {
    if (!autoPlay || hovered) return;
    const timer = setTimeout(() => setCurrent((i) => (i + 1) % count), autoPlayInterval);
    return () => clearTimeout(timer);
  }, [current, autoPlay, hovered, autoPlayInterval, count]);

  const navButton = "rui-deck-nav";

  return (
    <div className={`rui-deck ${className}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="rui-deck-stage" style={{ height: cardHeight + 60 }}>
        <div className="rui-deck-pile" style={{ width: cardWidth, height: cardHeight }}>
          {items.map((item, idx) => {
            // Signed distance from the current card, the short way round the loop.
            let rel = (idx - current + count) % count;
            if (rel > count / 2) rel -= count;
            const near = Math.abs(rel) <= 1;
            const active = rel === 0;
            return (
              <div
                key={item.id}
                onClick={() => setCurrent(idx)}
                className="rui-deck-card"
                style={{
                  zIndex: count - Math.abs(rel),
                  opacity: active ? 1 : near ? 0.75 : 0,
                  pointerEvents: near ? "auto" : "none",
                  transform: active
                    ? "translateY(-16px) scale(1.04)"
                    : `translateX(${near ? rel * spread : 0}px) translateY(${near ? 10 : 18}px) rotate(${near ? rel * tilt : 0}deg) scale(${near ? 0.94 : 0.88})`,
                  boxShadow: active ? `0 0 0 3px ${accentColor}, 0 30px 60px -20px rgba(0,0,0,0.6)` : undefined,
                }}>
                <img src={item.image} alt={item.title} className="rui-deck-image" />
                <div className="rui-deck-shade" />
                <span className="rui-deck-number">{idx + 1}</span>
                <div className={`rui-deck-content ${active ? "rui-deck-content-active" : ""}`}>
                  <h2 className="rui-deck-title">{item.title}</h2>
                  <p className="rui-deck-subtitle" style={{ color: accentColor }}>
                    {item.subtitle}
                  </p>
                  <p className="rui-deck-description">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button type="button" aria-label="Previous card" onClick={() => go(-1)} className={`${navButton} rui-deck-prev`}>
          <Chevron dir="left" />
        </button>
        <button type="button" aria-label="Next card" onClick={() => go(1)} className={`${navButton} rui-deck-next`}>
          <Chevron dir="right" />
        </button>

        {showCounter && (
          <span className="rui-deck-counter">
            {current + 1} / {count}
          </span>
        )}
      </div>

      <div className="rui-deck-dots">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Go to card ${idx + 1}`}
            className="rui-deck-dot"
            style={{
              width: idx === current ? 28 : 10,
              background: idx === current ? accentColor : "rgba(255,255,255,0.3)",
              boxShadow: idx === current ? `0 0 14px ${accentColor}` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoopDeck;
