import "./style.css";

export default function Wiggle({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}) {

  return (
    <div className="fancy-button">
      <div className="layer-circle"></div>
      <button
        className={`${className}`}
        onClick={onClick}
        disabled={disabled}
        {...rest}>
        <span className={`button-text`}>
          {children}
        </span>
      </button>
    </div>
  );
}
