import "./style.css";

const Sketchy = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={`sketchy-button ${className}`}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  );
}

export default Sketchy;