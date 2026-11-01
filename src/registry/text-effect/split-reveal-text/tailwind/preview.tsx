export interface SplitRevealTextProps {
  outerText?: string;
  innerText?: string;
  color?: string;
  bandColor?: string;
  bandTextColor?: string;
  gap?: number;
  fontSize?: number;
  className?: string;
}

// Hovering splits the word down the middle, and a band of text slides into the gap.
const SplitRevealText = ({
  outerText = "Hover",
  innerText = "Hello there",
  color = "#fb923c",
  bandColor = "#a3e635",
  bandTextColor = "#0a0a0a",
  gap = 18,
  fontSize = 96,
  className = "",
}: SplitRevealTextProps) => {
  const half = "pointer-events-none absolute inset-0 transition-transform duration-500";
  return (
    <h2
      className={`group relative m-0 inline-block cursor-default font-bold uppercase leading-none text-transparent ${className}`}
      style={{ fontSize: `min(${fontSize}px, 18vw)` }}>
      {outerText}
      <span
        aria-hidden
        className={`${half} group-hover:-translate-y-[var(--rui-gap)]`}
        style={{ color, clipPath: "inset(0 0 50% 0)", ["--rui-gap" as string]: `${gap}px` }}>
        {outerText}
      </span>
      <span
        aria-hidden
        className={`${half} group-hover:translate-y-[var(--rui-gap)]`}
        style={{ color, clipPath: "inset(50% 0 0 0)", ["--rui-gap" as string]: `${gap}px` }}>
        {outerText}
      </span>
      <span
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 scale-y-0 py-1 text-center text-[15px] font-medium normal-case tracking-[0.5em] transition-transform duration-500 group-hover:scale-y-100"
        style={{ background: bandColor, color: bandTextColor }}>
        {innerText}
      </span>
    </h2>
  );
};

export default SplitRevealText;
