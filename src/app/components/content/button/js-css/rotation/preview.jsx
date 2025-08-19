import "./style.css";

const Rotation = ({
  children,
  onClick,
  className = "",
  ...rest
}) => {
  return (
    <button className={`rotation-button ${className}`} onClick={onClick} {...rest}>
      <span>{children}</span>
    </button>
  );
}

export default Rotation;