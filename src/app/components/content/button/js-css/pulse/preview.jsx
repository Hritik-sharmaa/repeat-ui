import "./style.css";
const Pulse = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}) => {
  return (
    <button className={`pulse-button ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Pulse;
