import "./style.css";

const PricingCard = ({
  plan,
  price,
  billing,
  features = [],
  buttonText,
  isPopular,
}) => {
  const planClass = plan.toLowerCase();

  return (
    <div className={`pricing-card ${planClass}`}>
      <div className="card-header">
        <div className="plan-icon">
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
        <h3>{plan}</h3>
        {isPopular && <span className="popular-badge">Most Popular</span>}
      </div>
      <div className="price">${price}</div>
      <p className="billing">{billing}</p>
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <span className="check">✔</span> {feature}
          </div>
        ))}
      </div>
      <button className="upgrade-btn">{buttonText}</button>
    </div>
  );
};

export default PricingCard;
