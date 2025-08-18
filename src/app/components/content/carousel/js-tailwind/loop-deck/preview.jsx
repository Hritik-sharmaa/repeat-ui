"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LoopDeck = ({
  items,
  className = "",
  autoPlayInterval = 5000,
}) => {
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

  const goToSlide = (idx) => setCurrentIndex(idx);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className={`relative w-full max-w-4xl mx-auto py-12 ${className}`}>
      <div className="relative flex items-center justify-center h-[500px]">
        <div className="relative w-[320px] h-[420px]">
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            const isPrev =
              idx === (currentIndex - 1 + items.length) % items.length;
            const isNext = idx === (currentIndex + 1) % items.length;
            const isVisible = isActive || isPrev || isNext;

            let zIndex = items.length - Math.abs(idx - currentIndex);
            let translateY = 0;
            let translateX = 0;
            let scale = 1;
            let rotate = 0;
            let opacity = 0.3;

            if (isActive) {
              zIndex = items.length + 1;
              translateY = -20;
              scale = 1.05;
              opacity = 1;
            } else if (isPrev) {
              zIndex = items.length;
              translateX = -40;
              translateY = 10;
              rotate = -8;
              scale = 0.95;
              opacity = 0.7;
            } else if (isNext) {
              zIndex = items.length;
              translateX = 40;
              translateY = 10;
              rotate = 8;
              scale = 0.95;
              opacity = 0.7;
            } else {
              const distance = Math.abs(idx - currentIndex);
              translateY = distance * 4;
              translateX = (Math.random() - 0.5) * 10; 
              scale = 1 - distance * 0.02;
              opacity = Math.max(0.1, 0.5 - distance * 0.1);
            }

            return (
              <div
                key={item.id}
                className={`absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-xl bg-white/5 cursor-pointer transition-all duration-700 ease-out ${
                  isActive ? "ring-4 ring-blue-400/50" : ""
                }`}
                style={{
                  zIndex,
                  transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                  opacity: isVisible ? opacity : 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
                onClick={() => goToSlide(idx)}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {isActive && (
                  <div className="absolute bottom-0 z-20 p-6 text-left w-full">
                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <h2 className="text-xl font-bold text-white mb-2 tracking-wide drop-shadow-lg">
                        {item.title}
                      </h2>
                      <p className="text-sm text-blue-300 mb-1 font-medium">
                        {item.subtitle}
                      </p>
                      <p className="text-xs text-white/80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute top-4 right-4 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-xl">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-xl">
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
          <span className="text-white text-sm font-medium">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-3">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-blue-500 shadow-[0_0_15px_4px_rgba(59,130,246,0.6)] scale-125"
                : "bg-white/30 hover:bg-white/50 border border-white/20"
            }`}
            aria-label={`Go to card ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default LoopDeck;
