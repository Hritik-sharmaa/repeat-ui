import "./style.css";

const Layers = ({ children, onClick, className = "", ...rest }) => {
  return (
    <div className="button-container">
      <div className="layer layer-3"></div>
      <div className="layer layer-2"></div>
      <button
        className={`layers-button ${className}`}
        onClick={onClick}
        {...rest}>
        <span>{children}</span>
      </button>
    </div>
  );
}

export default Layers;
