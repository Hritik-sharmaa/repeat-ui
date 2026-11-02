"use client";

import { useEffect, useRef, useState } from "react";

// The width available inside an element, without its padding.
function contentWidth(el: HTMLElement) {
  const style = getComputedStyle(el);
  return el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
}

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
  cardWidth: maxCardWidth = 320,
  cardHeight: maxCardHeight = 420,
  spread: maxSpread = 48,
  tilt = 8,
  showCounter = true,
  className = "",
}: LoopDeckProps) => {
  const [current, setCurrent] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  // Cards shrink on narrow screens so the whole thing still fits; the props are the most they take up.
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = (available: number) => setK(Math.min(1, (available - 32) / (maxCardWidth + 2 * maxSpread)));
    // Measure once now, so a phone never sees a frame of overflow, then follow resizes.
    measure(contentWidth(el));
    const observer = new ResizeObserver(([entry]) => measure(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [maxCardWidth, maxSpread]);
  const cardWidth = Math.round(maxCardWidth * k);
  const cardHeight = Math.round(maxCardHeight * k);
  const spread = maxSpread * k;
  const [hovered, setHovered] = useState(false);
  const count = items.length;
  const go = (step: number) => setCurrent((i) => (i + step + count) % count);

  useEffect(() => {
    if (!autoPlay || hovered) return;
    const timer = setTimeout(() => setCurrent((i) => (i + 1) % count), autoPlayInterval);
    return () => clearTimeout(timer);
  }, [current, autoPlay, hovered, autoPlayInterval, count]);

  const navButton =
    "absolute top-1/2 z-50 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/25 bg-black/50 text-white shadow-xl backdrop-blur-md transition hover:scale-110 hover:bg-black/70";

  return (
    <div
      ref={rootRef}
      className={`mx-auto flex w-full max-w-4xl flex-col items-center gap-8 py-10 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="relative flex w-full items-center justify-center" style={{ height: cardHeight + 60 }}>
        <div className="relative" style={{ width: cardWidth, height: cardHeight }}>
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
                className="absolute inset-0 cursor-pointer overflow-hidden rounded-2xl border border-white/20 shadow-2xl transition-all duration-700 ease-out"
                style={{
                  zIndex: count - Math.abs(rel),
                  opacity: active ? 1 : near ? 0.75 : 0,
                  pointerEvents: near ? "auto" : "none",
                  transform: active
                    ? "translateY(-16px) scale(1.04)"
                    : `translateX(${near ? rel * spread : 0}px) translateY(${near ? 10 : 18}px) rotate(${near ? rel * tilt : 0}deg) scale(${near ? 0.94 : 0.88})`,
                  boxShadow: active ? `0 0 0 3px ${accentColor}, 0 30px 60px -20px rgba(0,0,0,0.6)` : undefined,
                }}>
                <img src={item.image} alt={item.title} className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <span className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-white/30 bg-black/50 text-sm font-bold text-white backdrop-blur-sm">
                  {idx + 1}
                </span>
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 text-left transition-all duration-500 ${active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                  <h2 className="text-xl font-bold tracking-wide text-white">{item.title}</h2>
                  <p className="mt-1 text-sm font-medium" style={{ color: accentColor }}>
                    {item.subtitle}
                  </p>
                  <p className="mt-1 text-xs text-white/80">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button type="button" aria-label="Previous card" onClick={() => go(-1)} className={`${navButton} left-4`}>
          <Chevron dir="left" />
        </button>
        <button type="button" aria-label="Next card" onClick={() => go(1)} className={`${navButton} right-4`}>
          <Chevron dir="right" />
        </button>

        {showCounter && (
          <span className="absolute left-1/2 top-0 z-40 -translate-x-1/2 rounded-full border border-white/25 bg-black/50 px-4 py-1.5 text-sm font-medium tabular-nums text-white backdrop-blur-sm">
            {current + 1} / {count}
          </span>
        )}
      </div>

      <div className="flex gap-3">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Go to card ${idx + 1}`}
            className="h-2.5 cursor-pointer rounded-full transition-all duration-300"
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
