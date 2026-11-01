import "./style.css";
import type { CSSProperties } from "react";

const DIRECTIONS = { down: [0, 1], up: [0, -1], left: [-1, 0], right: [1, 0], diagonal: [1, 1] };

export interface EchoTextProps {
  text?: string;
  copies?: number;
  offset?: number;
  direction?: keyof typeof DIRECTIONS;
  color?: string;
  echoColor?: string;
  fontSize?: number;
  always?: boolean;
  className?: string;
}

// The word, repeated: outlined copies fan out behind it on hover, fading as they go,
// while the word itself lifts a touch the other way.
const EchoText = ({
  text = "Repeat",
  copies = 5,
  offset = 10,
  direction = "down",
  color = "currentColor",
  echoColor = "#fa5f1b",
  fontSize = 96,
  always = false,
  className = "",
}: EchoTextProps) => {
  const [dx, dy] = DIRECTIONS[direction];
  return (
    <span
      className={`rui-echo-text ${always ? "rui-echo-text-open" : ""} ${className}`}
      style={
        {
          fontSize: `min(${fontSize}px, 18vw)`,
          "--rui-lift-x": `${-dx * 3}px`,
          "--rui-lift-y": `${-dy * 3}px`,
        } as CSSProperties
      }
      aria-label={text}>
      {Array.from({ length: copies }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className="rui-echo-text-copy"
          style={
            {
              zIndex: copies - i,
              opacity: 1 - (i + 1) / (copies + 1),
              WebkitTextStroke: `1.5px ${echoColor}`,
              transitionDelay: `${i * 40}ms`,
              "--rui-x": `${dx * offset * (i + 1)}px`,
              "--rui-y": `${dy * offset * (i + 1)}px`,
            } as CSSProperties
          }>
          {text}
        </span>
      ))}
      <span aria-hidden className="rui-echo-text-front" style={{ color, zIndex: copies + 1 }}>
        {text}
      </span>
    </span>
  );
};

export default EchoText;
