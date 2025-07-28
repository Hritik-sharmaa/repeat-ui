import "./style.css";

export default function Layers({ children, onClick, className = "", ...rest }) {
  return (
    <div class="button-container">
      <div class="layer layer-3"></div>
      <div class="layer layer-2"></div>
      <button
        className={`layers-button ${className}`}
        onClick={onClick}
        {...rest}>
        <span>{children}</span>
      </button>
    </div>
  );
}
