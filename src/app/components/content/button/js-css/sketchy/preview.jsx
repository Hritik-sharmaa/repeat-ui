import "./style.css";

export default function Sketchy({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}) {
  return (
    <button
      className={`sketchy-button ${className}`}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  );
}
