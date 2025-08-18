"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface LoopDeckItem  {
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

const LoopDeck = ({ items, className = "", autoPlayInterval = 5000 }: LoopDeckProps) => {
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
    <div className={`relative w-full max-w-4xl mx-auto py-12 ${className}`}>
      <div className="relative flex items-center justify-center h-[420px]">
        <div className="relative w-[360px] h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl bg-white/5">
          <Image
            src={items[currentIndex].image}
            alt={items[currentIndex].title}
            fill
            className="object-cover scale-105 transition-transform duration-700 hover:scale-110"
            sizes="360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute bottom-0 z-20 p-6 text-left">
            <h2 className="text-2xl font-semibold text-white mb-2 tracking-wide drop-shadow-lg">
              {items[currentIndex].title}
            </h2>
            <p className="text-sm text-blue-300 mb-1 font-medium">
              {items[currentIndex].subtitle}
            </p>
            <p className="text-xs text-white/70">
              {items[currentIndex].description}
            </p>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-blue-500/40 backdrop-blur-md border border-white/20 text-white hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-blue-500/40 backdrop-blur-md border border-white/20 text-white hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-blue-500 shadow-[0_0_15px_4px_rgba(59,130,246,0.6)] scale-125"
                : "bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoopDeck;
