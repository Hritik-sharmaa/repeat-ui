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
    <div
      className={`relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl ${className}`}>
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
              animate="visible"
              exit="exit"
              className="absolute inset-0">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                className="object-cover dark:opacity-50 opacity-80"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 flex items-center justify-between p-12">
          <motion.div
            key={`content-${currentIndex}`}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-white z-10">
            <motion.p
              className="text-lg font-light mb-2 tracking-wide opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.4 }}>
              {currentItem.subtitle}
            </motion.p>
            <motion.h1
              className="text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}>
              {currentItem.title}
            </motion.h1>
            <motion.p
              className="text-xl font-light max-w-md leading-relaxed opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.6 }}>
              {currentItem.description}
            </motion.p>
          </motion.div>

          <motion.div
            className="text-white text-right z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}>
            <div className="text-6xl font-thin mb-4">
              {String(currentIndex + 1).padStart(2, "0")}
            </div>
          </motion.div>
        </div>

        {showControls && (
          <>
            <button
              onClick={prevSlide}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {showControls && (
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300">
            {isAutoPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </button>
        )}
      </div>

      {(showIndicators || showProgress || showThumbnails) && (
        <div className="dark:bg-white/5 bg-black/30 p-6">
          {showProgress ? (
            <div className="flex items-center justify-between">
              {showIndicators && (
                <div className="flex space-x-3">
                  {items.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className="group relative">
                      <div
                        className={`w-12 h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? "dark:bg-white"
                            : "dark:bg-white/30 dark:hover:bg-white/50 bg-black/40"
                        }`}
                      />
                      {index === currentIndex && (
                        <motion.div
                          className="absolute inset-0 bg-white rounded-full"
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

              <div className="flex-1 mx-8">
                <div className="w-full bg-white/20 rounded-full h-1">
                  <motion.div
                    className="bg-white h-1 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${((currentIndex + 1) / items.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {showThumbnails && (
                <div className="flex space-x-2">
                  {items.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => goToSlide(index)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                        index === currentIndex
                          ? "ring-2 ring-white scale-110"
                          : "opacity-60 hover:opacity-80"
                      }`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-8">
              {showIndicators && (
                <div className="flex space-x-3">
                  {items.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className="group relative">
                      <div
                        className={`w-12 h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? "bg-white"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                      {index === currentIndex && (
                        <motion.div
                          className="absolute inset-0 bg-white rounded-full"
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
                <div className="flex space-x-2">
                  {items.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => goToSlide(index)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                        index === currentIndex
                          ? "ring-2 ring-white scale-110"
                          : "opacity-60 hover:opacity-80"
                      }`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
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
