import "./style.css";

export default function Fill({
  children,
  onClick,
  className = "",
  ...rest
}) {
  return (
    <button className={`fill-button ${className}`} onClick={onClick} {...rest}>
      <span>{children}</span>
    </button>
  );
}
