const SimpleButton = ({
  children = "Simple",
  className = "",
  onClick,
  ...rest
}) => {
  return (
    <button
      className={`bg-white text-black px-4 py-2 rounded-md border border-neutral-300 hover:-translate-y-1 transform transition duration-200 hover:shadow-md cursor-pointer ${className}`}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  );
}

export default SimpleButton;
