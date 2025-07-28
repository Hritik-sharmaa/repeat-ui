import "./style.css";

export default function Pulse({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}) {
  return (
    <button className={`pulse-button ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
