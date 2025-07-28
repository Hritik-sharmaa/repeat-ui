const PricingCard = ({
  plan,
  price,
  billing,
  features = [],
  buttonText,
  isPopular,
}) => {
  const planClass = plan.toLowerCase();

  const planStyles = {
    basic: {
      cardBg: "bg-gradient-to-br from-white to-slate-200",
      border: "border-slate-300",
      iconBg: "bg-gradient-to-br from-gray-500 to-gray-600",
    },
    premium: {
      cardBg: "bg-gradient-to-br from-white to-slate-50",
      border: "border-blue-500",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    enterprise: {
      cardBg: "bg-gradient-to-br from-orange-50 to-orange-200",
      border: "border-orange-400",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
  };

  const currentStyle = planStyles[planClass] || planStyles.premium;

  return (
    <div
      className={`
      w-80 border-2 ${currentStyle.border} rounded-3xl py-8 px-5 
      ${currentStyle.cardBg} text-center 
      shadow-xl font-sans transition-all duration-400 ease-out 
      relative overflow-hidden
      hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-slate-300
    `}>
      <div className="flex items-center justify-center gap-3 mb-4 relative">
        <div
          className={`
          ${currentStyle.iconBg} text-white p-3 rounded-full text-lg font-bold 
          shadow-lg transition-all duration-300 ease-in-out
        `}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-zap-icon lucide-zap">
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 m-0 tracking-tight">
          {plan}
        </h3>
        {isPopular && (
          <span className="bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xs py-1.5 px-1.5 rounded-2xl uppercase tracking-wider shadow-md ml-6">
            Most Popular
          </span>
        )}
      </div>

      <div className="text-5xl font-extrabold my-5 mb-2 bg-gradient-to-br from-slate-800 to-blue-500 bg-clip-text text-transparent leading-none tracking-tight">
        ${price}
      </div>

      <p className="text-base text-slate-500 mb-7 font-medium leading-relaxed">
        {billing}
      </p>

      <div className="text-left mb-8 px-1">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-base my-3 flex items-center gap-3 text-gray-700 font-medium leading-relaxed transition-all duration-200 ease-in-out hover:text-gray-800 hover:translate-x-1">
            <span className="text-emerald-500 font-bold text-base bg-emerald-50 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 transition-all duration-200 ease-in-out hover:bg-emerald-500 hover:text-white hover:scale-110">
              ✔
            </span>
            {feature}
          </div>
        ))}
      </div>

      <button
        className="
        bg-gradient-to-br from-blue-500 to-blue-700 text-white border-none 
        py-4 px-8 rounded-xl text-base font-semibold cursor-pointer 
        transition-all duration-300 ease-out w-full tracking-wide 
        shadow-lg relative overflow-hidden
        hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-800 
        hover:-translate-y-0.5 hover:shadow-xl
        active:translate-y-0 active:shadow-lg
        before:content-[''] before:absolute before:top-0 before:-left-full 
        before:w-full before:h-full before:bg-gradient-to-r 
        before:from-transparent before:via-white/20 before:to-transparent 
        before:transition-all before:duration-500
        hover:before:left-full
      ">
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
