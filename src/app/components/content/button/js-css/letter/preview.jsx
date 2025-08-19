import "./style.css";

const Letter = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ...rest
}) => {
  return (
    <button className={`letter-button ${className}`} onClick={onClick} {...rest}>
      {children.split("").map((char, index) => (
        <span
          key={index}
          className="letter"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char}
        </span>
      ))}
    </button>
  );
}

export default Letter;
