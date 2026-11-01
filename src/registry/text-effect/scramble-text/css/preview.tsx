"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";

export interface ScrambleTextProps {
  text?: string;
  trigger?: "hover" | "mount" | "loop";
  speed?: number;
  characters?: string;
  interval?: number;
  color?: string;
  scrambleColor?: string;
  fontSize?: number;
  mono?: boolean;
  className?: string;
}

type Glyph = { char: string; done: boolean };

// Letters flicker through random characters, then lock into place from left to right,
// each one easing from the scramble colour back to the text colour as it settles.
const ScrambleText = ({
  text = "Copy. Paste. Repeat.",
  trigger = "hover",
  speed = 40,
  characters = "!<>-_/[]{}=+*^?#ABCXYZ0123456789",
  interval = 3000,
  color = "currentColor",
  scrambleColor = "#fa5f1b",
  fontSize = 40,
  mono = true,
  className = "",
}: ScrambleTextProps) => {
  // null while at rest, so the server and first render show the plain text.
  const [glyphs, setGlyphs] = useState<Glyph[] | null>(null);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const scramble = useCallback(() => {
    clearInterval(timer.current);
    let frame = 0;
    timer.current = setInterval(() => {
      frame++;
      // Two frames of noise per letter before it settles.
      const settled = Math.floor(frame / 2);
      if (settled >= text.length) {
        clearInterval(timer.current);
        setGlyphs(null);
        return;
      }
      setGlyphs(
        [...text].map((char, i) =>
          i < settled || char === " "
            ? { char, done: true }
            : { char: characters[Math.floor(Math.random() * characters.length)], done: false },
        ),
      );
    }, speed);
  }, [text, speed, characters]);

  useEffect(() => {
    if (trigger === "mount") scramble();
    const loop = trigger === "loop" ? setInterval(scramble, interval) : undefined;
    if (trigger === "loop") scramble();
    return () => {
      clearInterval(loop);
      clearInterval(timer.current);
    };
  }, [trigger, scramble, interval]);

  return (
    <span
      aria-label={text}
      onMouseEnter={trigger === "hover" ? scramble : undefined}
      className={`rui-scramble ${mono ? "rui-scramble-mono" : ""} ${className}`}
      style={{ color, fontSize }}>
      {(glyphs ?? [...text].map((char) => ({ char, done: true }))).map((g, i) => (
        <span
          key={i}
          aria-hidden
          className="rui-scramble-glyph"
          style={g.done ? undefined : { color: scrambleColor, opacity: 0.85 }}>
          {g.char === " " ? " " : g.char}
        </span>
      ))}
    </span>
  );
};

export default ScrambleText;
