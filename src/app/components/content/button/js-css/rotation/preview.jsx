import "./style.css";

export default function Rotation({
  children,
  onClick,
  className = "",
  ...rest
}) {
  return (
    <button className={`rotation-button ${className}`} onClick={onClick} {...rest}>
      <span>{children}</span>
    </button>
  );
}
