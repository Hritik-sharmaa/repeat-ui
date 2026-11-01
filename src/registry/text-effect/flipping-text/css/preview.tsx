"use client";

import { motion } from "motion/react";
import "./style.css";

type SocialPlatform = "linkedin" | "instagram" | "facebook";

const PLATFORMS: Record<SocialPlatform, { color: string; paths: string[] }> = {
  linkedin: {
    color: "#0077B5",
    paths: [
      "M7.25 9.25V17H5V9.25H7.25ZM6.125 8.125C6.66484 8.125 7.125 7.66484 7.125 7.125C7.125 6.58516 6.66484 6.125 6.125 6.125C5.58516 6.125 5.125 6.58516 5.125 7.125C5.125 7.66484 5.58516 8.125 6.125 8.125Z",
      "M13.5 17V12.875C13.5 11.7734 14.3984 10.875 15.5 10.875C16.6016 10.875 17.5 11.7734 17.5 12.875V17H19.75V12.875C19.75 10.5312 17.8438 8.625 15.5 8.625C14.3672 8.625 13.3516 9.19141 12.75 10.0625V9.25H10.5V17H13.5Z",
    ],
  },
  instagram: {
    color: "#E4405F",
    paths: [
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    ],
  },
  facebook: {
    color: "#1877F2",
    paths: [
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    ],
  },
};

// A tile that floods with the platform's colour when the whole component is hovered.
const SocialIcon = ({ platform }: { platform: SocialPlatform }) => {
  const { color, paths } = PLATFORMS[platform];
  return (
    <span className="rui-flip-icon">
      <svg viewBox="0 0 24 24" className="rui-flip-glyph">
        {paths.map((d) => (
          <path key={d} d={d} fill="#4b5563" />
        ))}
      </svg>
      <motion.span
        className="rui-flip-flood"
        style={{ background: color }}
        variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
        transition={{ duration: 0.4, ease: "easeOut" }}>
        <svg viewBox="0 0 24 24">
          {paths.map((d) => (
            <path key={d} d={d} fill="#ffffff" />
          ))}
        </svg>
      </motion.span>
    </span>
  );
};

export interface FlippingTextProps {
  text?: string;
  socialPlatforms?: SocialPlatform[];
  layout?: "text-left" | "text-right";
  color?: string;
  fontSize?: number;
  duration?: number;
  className?: string;
}

// Hovering spins the word a full turn on its horizontal axis while the icons fill with colour.
const FlippingText = ({
  text = "Follow along",
  socialPlatforms = ["linkedin", "instagram", "facebook"],
  layout = "text-left",
  color = "currentColor",
  fontSize = 48,
  duration = 0.8,
  className = "",
}: FlippingTextProps) => {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      className={`rui-flip ${layout === "text-right" ? "rui-flip-reverse" : ""} ${className}`}>
      <motion.span
        className="rui-flip-word"
        style={{ color, fontSize }}
        variants={{ rest: { rotateX: 0 }, hover: { rotateX: 360 } }}
        transition={{ duration, ease: "easeInOut" }}>
        {text}
      </motion.span>
      <span className="rui-flip-icons">
        {socialPlatforms.map((platform) => (
          <SocialIcon key={platform} platform={platform} />
        ))}
      </span>
    </motion.div>
  );
};

export default FlippingText;
