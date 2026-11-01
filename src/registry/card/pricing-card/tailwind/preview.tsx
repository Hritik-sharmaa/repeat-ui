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
  features = ["Advanced data analysis", "Priority support", "Unlimited storage"],
  buttonText = "Get started",
  isPopular = false,
  accentColor = "#3b82f6",
  onSelect,
  className = "",
}: PricingCardProps) => {
  const tint = `color-mix(in srgb, ${accentColor} 12%, white)`;
  return (
    <div
      className={`flex w-80 flex-col rounded-3xl border-2 bg-white p-7 text-left text-slate-900 transition duration-300 hover:-translate-y-2 ${className}`}
      style={{
        borderColor: isPopular ? accentColor : "#e2e8f0",
        boxShadow: `0 24px 48px -20px color-mix(in srgb, ${isPopular ? accentColor : "#0f172a"} 45%, transparent)`,
      }}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl text-white" style={{ background: accentColor }}>
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
          </span>
          <h3 className="m-0 text-xl font-bold tracking-tight">{plan}</h3>
        </div>
        {isPopular && (
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
            style={{ background: tint, color: accentColor }}>
            Popular
          </span>
        )}
      </div>

      <p className="mt-6 text-5xl font-extrabold leading-none tracking-tight">
        {currency}
        {price}
      </p>
      <p className="mt-2 text-sm text-slate-500">{billing}</p>

      <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-sm font-medium text-slate-700">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span
              className="grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-bold"
              style={{ background: tint, color: accentColor }}>
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        className="mt-8 h-11 w-full cursor-pointer rounded-xl font-semibold transition hover:brightness-110 active:scale-[0.98]"
        style={isPopular ? { background: accentColor, color: "#ffffff" } : { background: tint, color: accentColor }}>
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
