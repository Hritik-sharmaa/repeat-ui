"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const ModernCarousel = ({
  items,
  autoPlay = true,
  autoPlayInterval = 4000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragging, setDragging] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isAutoPlaying, autoPlayInterval, items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handlePointerDown = (e) => {
    setDragStartX(e.clientX);
    setDragging(true);
    e.preventDefault();
  };

  const handlePointerMove = (e) => {
    if (!dragging || dragStartX === null) return;
    e.preventDefault();
  };

  const handlePointerUp = (e) => {
    if (!dragging || dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    setDragging(false);
    setDragStartX(null);
    e.preventDefault();
  };

  const handlePointerLeave = () => {
    if (dragging) {
      setDragging(false);
      setDragStartX(null);
    }
  };

  return (
    <div
      className={`relative w-full max-w-4xl mx-auto py-12 ${className}`}
      style={{ perspective: "1200px" }}>
      <div
        className="relative h-[420px] flex items-center justify-center select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        style={{
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "none",
        }}>
        <AnimatePresence mode="wait">
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            const isPrev =
              idx === (currentIndex - 1 + items.length) % items.length;
            const isNext = idx === (currentIndex + 1) % items.length;
            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: isActive ? 1 : 0.5,
                  scale: isActive ? 1 : 0.8,
                  x: isPrev ? -120 : isNext ? 120 : 0,
                  zIndex: isActive ? 2 : 1,
                  rotateY: isActive ? 0 : isPrev ? 20 : isNext ? -20 : 0,
                }}
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  scale: isActive ? 1 : 0.8,
                  x: isPrev ? -120 : isNext ? 120 : 0,
                  zIndex: isActive ? 2 : 1,
                  rotateY: isActive ? 0 : isPrev ? 20 : isNext ? -20 : 0,
                }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.7, type: "spring" }}
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[420px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-white/80 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col justify-end cursor-pointer ${
                  isActive ? "ring-4 ring-blue-400" : ""
                }`}
                style={{ zIndex: isActive ? 2 : 1 }}
                onClick={() => goToSlide(idx)}>
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-80"
                    sizes="340px"
                  />
                </div>
                <div className="relative z-10 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    {item.title}
                  </h2>
                  <p className="text-md text-blue-200 mb-1 font-semibold">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-white/80 mb-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute -left-40 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
          <span className="text-xl font-bold">
            <ChevronLeft />
          </span>
        </button>

        <button
          onClick={nextSlide}
          className="absolute -right-40 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
          <span className="text-xl font-bold">
            <ChevronRight />
          </span>
        </button>

        <button
          onClick={() => setIsAutoPlaying((v) => !v)}
          className="absolute bottom-4 right-1/2 translate-x-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-blue-500 text-blue-600 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300">
          {isAutoPlaying ? (
            <span className="font-bold">
              <Pause />
            </span>
          ) : (
            <span className="font-bold">
              <Play />
            </span>
          )}
        </button>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-blue-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ModernCarousel;
