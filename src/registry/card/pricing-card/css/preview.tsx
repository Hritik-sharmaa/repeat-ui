import "./style.css";
import type { CSSProperties } from "react";

export interface PricingCardProps {
  plan?: string;
  price?: number | string;
  currency?: string;
  billing?: string;
  features?: string[];
  buttonText?: string;
  isPopular?: boolean;
  accentColor?: string;
  onSelect?: () => void;
  className?: string;
}

// A pricing tier. `isPopular` outlines it in the accent colour and fills its button.
const PricingCard = ({
  plan = "Premium",
  price = 120,
  currency = "$",
  billing = "Per user/month, billed monthly",
  features = [
    "Advanced data analysis",
    "Priority support",
    "Unlimited storage",
  ],
  buttonText = "Get started",
  isPopular = false,
  accentColor = "#3b82f6",
  onSelect,
  className = "",
}: PricingCardProps) => {
  return (
    <div
      className={`rui-pricing ${isPopular ? "rui-pricing-popular" : ""} ${className}`}
      style={{ "--rui-accent": accentColor } as CSSProperties}
    >
      <div className="rui-pricing-head">
        <div className="rui-pricing-title">
          <span className="rui-pricing-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
          </span>
          <h3>{plan}</h3>
        </div>
        {isPopular && <span className="rui-pricing-badge">Popular</span>}
      </div>

      <p className="rui-pricing-price">
        {currency}
        {price}
      </p>
      <p className="rui-pricing-billing">{billing}</p>

      <ul className="rui-pricing-features">
        {features.map((feature) => (
          <li key={feature}>
            <span className="rui-pricing-check">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button type="button" onClick={onSelect} className="rui-pricing-button">
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
