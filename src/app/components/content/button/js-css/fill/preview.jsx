import "./style.css";

const Fill = ({
  children,
  onClick,
  className = "",
  ...rest
}) => {
  return (
    <button className={`fill-button ${className}`} onClick={onClick} {...rest}>
      <span>{children}</span>
    </button>
  );
};

export default Fill;