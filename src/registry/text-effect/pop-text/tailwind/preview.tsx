"use client";

export interface PopTextProps {
  maintext?: string;
  subText?: string;
  color?: string;
  accentColor?: string;
  fontSize?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

// Each line flips up from below like a pop-up book page, the second one a beat after the first.
const PopText = ({
  maintext = "Copy. Paste.",
  subText = "Repeat.",
  color = "currentColor",
  accentColor = "#eab308",
  fontSize = 72,
  duration = 1.5,
  stagger = 1,
  className = "",
}: PopTextProps) => {
  const pop = (delay: number) => ({
    opacity: 0,
    transform: "rotateX(120deg)",
    transformOrigin: "50% 100%",
    animation: `rui-show 0.01s ${delay}s forwards, rui-pop-word ${duration}s cubic-bezier(0.14, 1.23, 0.33, 1.16) ${delay}s forwards`,
  });
  return (
    <h1
      className={`text-center font-bold leading-none tracking-tight [perspective:500px] ${className}`}
      style={{ fontSize: `min(${fontSize}px, 14vw)` }}>
      <style>{`
        @keyframes rui-pop-word { to { transform: rotateX(0); } }
        @keyframes rui-show { to { opacity: 1; } }
      `}</style>
      <span className="block" style={{ color, ...pop(0) }}>
        {maintext}
      </span>
      <span className="block px-8" style={{ color: accentColor, ...pop(stagger) }}>
        {subText}
      </span>
    </h1>
  );
};

export default PopText;
