"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./style.css";

const LoopDeck = ({
  items,
  className = "",
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

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
    <div className={`loop-deck ${className}`}>
      <div className="loop-deck__container">
        <div className="loop-deck__deck">
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
                className={`loop-deck__card ${
                  isActive ? "loop-deck__card--active" : ""
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
                  className="loop-deck__card-image"
                  sizes="320px"
                />
                <div className="loop-deck__card-gradient" />

                {isActive && (
                  <div className="loop-deck__card-content">
                    <div className="loop-deck__card-content-box">
                      <h2 className="loop-deck__card-title">{item.title}</h2>
                      <p className="loop-deck__card-subtitle">
                        {item.subtitle}
                      </p>
                      <p className="loop-deck__card-description">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}

                <div className="loop-deck__card-number">
                  <span className="loop-deck__card-number-text">{idx + 1}</span>
                </div>
              </div>
            );
          })}
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

        <div className="loop-deck__counter">
          <span className="loop-deck__counter-text">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      <div className="loop-deck__indicators">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`loop-deck__indicator ${
              idx === currentIndex ? "loop-deck__indicator--active" : ""
            }`}
            aria-label={`Go to card ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoopDeck;
