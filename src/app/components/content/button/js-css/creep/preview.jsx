import "./style.css";

const Creep = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}) => {
  return (
    <div className="creepy-container">
      <div className="eyes-layer">
        <div className="eyes">
          <div className="eye">
            <div className="pupil" />
          </div>
          <div className="eye">
            <div className="pupil" />
          </div>
        </div>
      </div>
      <div
        className={`creepy-button ${className}`}
        onClick={onClick}
        {...rest}>
        <span>{children}</span>
      </div>
    </div>
  );
}

export default Creep;
