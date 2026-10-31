import React from "react";
import PricingCard from "./preview";

const PricingCardDemo = () => {
  const features = [
    "Advance data analysis",
    "Priority support",
    "Unlimited storage",
  ];
  return (
    <div className="flex gap-10">
      <PricingCard
        plan="Basic"
        price={90}
        features={features}
        billing="Per user/month, billed monthly"
        buttonText="Upgrade to Basic"
        isPopular={false}
      />
      <PricingCard
        plan="Premium"
        price={120}
        billing="Per user/month, billed monthly"
        features={features}
        buttonText="Upgrade to Premium"
        isPopular={true}
      />
      <PricingCard
        plan="Enterprise"
        price={200}
        billing="Per user/month, billed annually"
        features={features}
        buttonText="Contact Sales"
        isPopular={false}
      />
    </div>
  );
};

export default PricingCardDemo;
