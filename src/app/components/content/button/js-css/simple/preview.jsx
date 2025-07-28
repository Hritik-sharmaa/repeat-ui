import "./style.css";

export default function Simple({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}) {
  return (
    <button className={`simple-button ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
