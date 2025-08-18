"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./style.css";

export interface LoopDeckItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

interface LoopDeckProps {
  items: LoopDeckItem[];
  className?: string;
  autoPlayInterval?: number;
}

const LoopDeck = ({
  items,
  className = "",
  autoPlayInterval = 5000,
}: LoopDeckProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, items.length, autoPlayInterval]);

  const goToSlide = (idx: number) => setCurrentIndex(idx);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className={`loop-deck ${className}`}>
      <div className="loop-deck__container">
        <div className="loop-deck__slide">
          <Image
            src={items[currentIndex].image}
            alt={items[currentIndex].title}
            fill
            className="loop-deck__image"
            sizes="360px"
          />
          <div className="loop-deck__gradient" />
          <div className="loop-deck__content">
            <h2 className="loop-deck__title">{items[currentIndex].title}</h2>
            <p className="loop-deck__subtitle">
              {items[currentIndex].subtitle}
            </p>
            <p className="loop-deck__description">
              {items[currentIndex].description}
            </p>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="loop-deck__nav-button loop-deck__nav-button--prev">
          <ChevronLeft className="loop-deck__nav-icon" />
        </button>
        <button
          onClick={nextSlide}
          className="loop-deck__nav-button loop-deck__nav-button--next">
          <ChevronRight className="loop-deck__nav-icon" />
        </button>
      </div>

      <div className="loop-deck__indicators">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`loop-deck__indicator ${
              idx === currentIndex ? "loop-deck__indicator--active" : ""
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoopDeck;
