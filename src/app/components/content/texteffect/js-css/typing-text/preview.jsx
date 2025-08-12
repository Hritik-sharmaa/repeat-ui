"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TypingText = ({
  text,
  speed = 100,
  character,
  delay = 0,
  deleteSpeed = 30,
  pauseAfterComplete = 1000,
  className = "",
  showLetterAnimation = true,
  onComplete,
  onDeleteComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else {
      setIsTyping(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping || isDeleting) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      if (onComplete) {
        onComplete();
      }

      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
        setCurrentIndex(text.length);
      }, pauseAfterComplete);

      return () => clearTimeout(pauseTimer);
    }
  }, [
    currentIndex,
    text,
    speed,
    isTyping,
    isDeleting,
    onComplete,
    pauseAfterComplete,
  ]);

  useEffect(() => {
    if (!isDeleting) return;

    if (currentIndex > 0) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      }, deleteSpeed);

      return () => clearTimeout(timer);
    } else {
      setIsDeleting(false);

      if (onDeleteComplete) {
        onDeleteComplete();
      }
    }
  }, [currentIndex, isDeleting, deleteSpeed, onDeleteComplete]);

  return (
    <motion.div
      className={`relative font-bold text-4xl ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}>
      <span className="font-mono text-inherit">
        {showLetterAnimation ? (
          <>
            {displayedText.split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  color: "inherit",
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                style={{ display: "inline" }}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.span
              className={`${
                isDeleting
                  ? "text-red-500 dark:text-red-400"
                  : "text-blue-500 dark:text-blue-400"
              }`}
              animate={{
                opacity: [1, 0, 1],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ display: "inline" }}>
              {character ? character : "|"}
            </motion.span>
          </>
        ) : (
          <>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              style={{ display: "inline" }}>
              {displayedText}
            </motion.span>
            <motion.span
              className={`${
                isDeleting
                  ? "text-red-500 dark:text-red-400"
                  : "text-blue-500 dark:text-blue-400"
              }`}
              animate={{
                opacity: [1, 0, 1],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ display: "inline" }}>
              {character ? character : "|"}
            </motion.span>
          </>
        )}
      </span>
    </motion.div>
  );
};

export default TypingText;
