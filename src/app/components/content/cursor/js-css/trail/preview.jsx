"use client";

import React, { useEffect, useState, useRef } from "react";
import "./style.css";

const TrailCursor = ({ trailLength = 20, trailColor = "#3b82f6" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const updateCursor = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);
    const showCursor = () => setIsVisible(true);

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);
    };
  }, [isVisible]);

  useEffect(() => {
    const smoothFollow = () => {
      setPosition((prev) => {
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;

        const ease = 0.15;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });

      setTrail((prev) => {
        const newTrail = [
          { ...position, id: trailIdRef.current++, life: 1 },
          ...prev.map((p) => ({ ...p, life: Math.max(0, p.life - 0.02) })),
        ].slice(0, trailLength);

        return newTrail.filter((p) => p.life > 0);
      });

      animationFrame.current = requestAnimationFrame(smoothFollow);
    };

    animationFrame.current = requestAnimationFrame(smoothFollow);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [trailLength, position]);

  if (!isVisible) return null;

  const createSmoothPath = () => {
    if (trail.length < 2) return "";

    let path = `M ${trail[0].x} ${trail[0].y}`;
    for (let i = 1; i < trail.length; i++) {
      const curr = trail[i];
      path += ` L ${curr.x} ${curr.y}`;
    }
    return path;
  };

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {trail.length > 1 && (
        <svg className="trail-svg">
          <defs>
            <linearGradient
              id="trailGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%">
              <stop offset="0%" stopColor={trailColor} stopOpacity="0" />
              <stop offset="50%" stopColor={trailColor} stopOpacity="0.5" />
              <stop offset="100%" stopColor={trailColor} stopOpacity="1" />
            </linearGradient>
          </defs>

          <path
            d={createSmoothPath()}
            fill="none"
            stroke="url(#trailGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        </svg>
      )}

      <div
        className="cursor-wrapper"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}>
        <div className="cursor-dot" />
      </div>
    </>
  );
};

export default TrailCursor;
