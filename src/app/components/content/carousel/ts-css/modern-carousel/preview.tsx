"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import "./style.css";

export interface ModernCarouselItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

interface ModernCarouselProps {
  items: ModernCarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const ModernCarousel = ({
  items,
  autoPlay = true,
  autoPlayInterval = 4000,
  className = "",
}: ModernCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isAutoPlaying, autoPlayInterval, items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartX(e.clientX);
    setDragging(true);
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || dragStartX === null) return;
    e.preventDefault();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
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
    <div className={`modern-carousel ${className}`}>
      <div
        className={`modern-carousel__container ${
          dragging
            ? "modern-carousel__container--grabbing"
            : "modern-carousel__container--grab"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}>
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
                className={`modern-carousel__slide ${
                  isActive ? "modern-carousel__slide--active" : ""
                }`}
                style={{ zIndex: isActive ? 2 : 1 }}
                onClick={() => goToSlide(idx)}>
                <div className="modern-carousel__image-container">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="modern-carousel__image"
                    sizes="340px"
                  />
                </div>
                <div className="modern-carousel__content">
                  <h2 className="modern-carousel__title">{item.title}</h2>
                  <p className="modern-carousel__subtitle">{item.subtitle}</p>
                  <p className="modern-carousel__description">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="modern-carousel__nav-button modern-carousel__nav-button--prev">
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="modern-carousel__nav-button modern-carousel__nav-button--next">
          <ChevronRight />
        </button>

        <button
          onClick={() => setIsAutoPlaying((v) => !v)}
          className="modern-carousel__play-button">
          {isAutoPlaying ? <Pause /> : <Play />}
        </button>
      </div>

      <div className="modern-carousel__indicators">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`modern-carousel__indicator ${
              idx === currentIndex ? "modern-carousel__indicator--active" : ""
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ModernCarousel;
