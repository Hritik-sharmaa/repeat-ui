import "./style.css";

const Simple = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}) => {
  return (
    <button className={`simple-button ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Simple;
