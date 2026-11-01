export interface TextShadowProps {
  text?: string;
  color?: string;
  shadowColor?: string;
  depth?: number;
  step?: number;
  fontSize?: number;
  className?: string;
}

// On hover the word lifts off the page, leaving a stack of shadows that blend towards `shadowColor`.
const TextShadow = ({
  text = "Hover me",
  color = "#f6aca2",
  shadowColor = "#ee6352",
  depth = 4,
  step = 3,
  fontSize = 72,
  className = "",
}: TextShadowProps) => {
  const shadow = Array.from({ length: depth }, (_, i) => {
    const offset = (i + 1) * step;
    return `${offset}px ${offset}px 0 color-mix(in srgb, ${color}, ${shadowColor} ${((i + 1) / depth) * 100}%)`;
  }).join(", ");
  return (
    <h2
      className={`m-0 cursor-default font-bold uppercase leading-none transition-all duration-300 hover:[text-shadow:var(--rui-shadow)] hover:[transform:translate(var(--rui-lift),var(--rui-lift))] ${className}`}
      style={{
        color,
        fontSize: `min(${fontSize}px, 16vw)`,
        ["--rui-shadow" as string]: shadow,
        ["--rui-lift" as string]: `${-depth * step}px`,
      }}>
      {text}
    </h2>
  );
};

export default TextShadow;
