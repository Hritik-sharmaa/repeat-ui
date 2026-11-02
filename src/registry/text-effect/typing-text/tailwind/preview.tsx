"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export interface TypingTextProps {
  text?: string;
  speed?: number;
  delay?: number;
  character?: string;
  deleteSpeed?: number;
  pauseAfterComplete?: number;
  className?: string;
  showLetterAnimation?: boolean;
  cursorColor?: string;
  deleteColor?: string;
  fontSize?: number;
  onComplete?: () => void;
  onDeleteComplete?: () => void;
}

// Types the text out, pauses, deletes it, and starts again, with a blinking cursor.
const TypingText = ({
  text = "",
  speed = 80,
  character = "_",
  delay = 0,
  deleteSpeed = 30,
  pauseAfterComplete = 1000,
  className = "",
  showLetterAnimation = true,
  cursorColor = "#3b82f6",
  deleteColor = "#ef4444",
  fontSize = 36,
  onComplete,
  onDeleteComplete,
}: TypingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const displayedText = text.slice(0, currentIndex);

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping || isDeleting) return;
    if (currentIndex < text.length) {
      const timer = setTimeout(() => setCurrentIndex((i) => i + 1), speed);
      return () => clearTimeout(timer);
    }
    onComplete?.();
    const timer = setTimeout(() => {
      setIsDeleting(true);
      setCurrentIndex(text.length);
    }, pauseAfterComplete);
    return () => clearTimeout(timer);
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
    const timer = setTimeout(() => {
      const next = Math.max(currentIndex - 1, 0);
      setCurrentIndex(next);
      if (next === 0) {
        setIsDeleting(false);
        onDeleteComplete?.();
      }
    }, deleteSpeed);
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, deleteSpeed, onDeleteComplete]);

  return (
    <motion.div
      className={`relative font-mono font-bold ${className}`}
      style={{ fontSize }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {showLetterAnimation
        ? [...displayedText].map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {char}
            </motion.span>
          ))
        : displayedText}
      <motion.span
        style={{ color: isDeleting ? deleteColor : cursorColor }}
        animate={{ opacity: [1, 0, 1], scale: [1, 0.8, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {character}
      </motion.span>
    </motion.div>
  );
};

export default TypingText;
