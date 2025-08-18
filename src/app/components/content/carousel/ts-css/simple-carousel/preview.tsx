"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";

export interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

interface SimpleCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showProgress?: boolean;
  showThumbnails?: boolean;
  showIndicators?: boolean;
  className?: string;
}

const SimpleCarousel = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showProgress = true,
  showThumbnails = true,
  showIndicators = true,
  className = "",
}: SimpleCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length, autoPlayInterval]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };

  const textVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  const currentItem = items[currentIndex];

  return (
    <div className={`simple-carousel-container ${className}`}>
      <div className="simple-carousel-image-wrapper">
        <div className="simple-carousel-image-bg">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
              animate="visible"
              exit="exit"
              className="simple-carousel-image-motion">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                className="simple-carousel-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="simple-carousel-content-row">
          <motion.div
            key={`content-${currentIndex}`}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="simple-carousel-content">
            <motion.p
              className="simple-carousel-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.4 }}>
              {currentItem.subtitle}
            </motion.p>
            <motion.h1
              className="simple-carousel-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}>
              {currentItem.title}
            </motion.h1>
            <motion.p
              className="simple-carousel-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.6 }}>
              {currentItem.description}
            </motion.p>
          </motion.div>

          <motion.div
            className="simple-carousel-index"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}>
            <div className="simple-carousel-index-number">
              {String(currentIndex + 1).padStart(2, "0")}
            </div>
          </motion.div>
        </div>

        {showControls && (
          <>
            <button
              onClick={prevSlide}
              className="simple-carousel-control simple-carousel-control-left">
              <ChevronLeft className="simple-carousel-control-icon" />
            </button>
            <button
              onClick={nextSlide}
              className="simple-carousel-control simple-carousel-control-right">
              <ChevronRight className="simple-carousel-control-icon" />
            </button>
          </>
        )}

        {showControls && (
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="simple-carousel-autoplay-toggle">
            {isAutoPlaying ? (
              <Pause className="simple-carousel-control-icon" />
            ) : (
              <Play className="simple-carousel-control-icon" />
            )}
          </button>
        )}
      </div>

      {(showIndicators || showProgress || showThumbnails) && (
        <div className="simple-carousel-footer">
          {showProgress ? (
            <div className="simple-carousel-progress-row">
              {showIndicators && (
                <div className="simple-carousel-indicators">
                  {items.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className="simple-carousel-indicator-btn">
                      <div
                        className={`simple-carousel-indicator-bar${
                          index === currentIndex ? " active" : ""
                        }`}
                      />
                      {index === currentIndex && (
                        <motion.div
                          className="simple-carousel-indicator-motion"
                          layoutId="activeIndicator"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="simple-carousel-progress-bar-wrapper">
                <div className="simple-carousel-progress-bar-bg">
                  <motion.div
                    className="simple-carousel-progress-bar"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${((currentIndex + 1) / items.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {showThumbnails && (
                <div className="simple-carousel-thumbnails">
                  {items.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => goToSlide(index)}
                      className={`simple-carousel-thumbnail-btn${
                        index === currentIndex ? " active" : ""
                      }`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="simple-carousel-thumbnail-img"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="simple-carousel-indicators-row">
              {showIndicators && (
                <div className="simple-carousel-indicators">
                  {items.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className="simple-carousel-indicator-btn">
                      <div
                        className={`simple-carousel-indicator-bar${
                          index === currentIndex ? " active" : ""
                        }`}
                      />
                      {index === currentIndex && (
                        <motion.div
                          className="simple-carousel-indicator-motion"
                          layoutId="activeIndicator"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {showThumbnails && (
                <div className="simple-carousel-thumbnails">
                  {items.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => goToSlide(index)}
                      className={`simple-carousel-thumbnail-btn${
                        index === currentIndex ? " active" : ""
                      }`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="simple-carousel-thumbnail-img"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleCarousel;
