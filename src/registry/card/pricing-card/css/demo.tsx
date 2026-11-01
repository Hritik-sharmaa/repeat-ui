"use client";

import type { ComponentProps } from "react";
import PricingCard from "./preview";

const features = ["Advanced data analysis", "Priority support", "Unlimited storage"];

// Three tiers. Customizing changes the highlighted middle card; colour and currency apply to all three.
const PricingCardDemo = ({
  plan,
  price,
  billing,
  buttonText,
  isPopular = true,
  ...shared
}: ComponentProps<typeof PricingCard>) => (
  <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
    <PricingCard plan="Basic" price={90} features={features} buttonText="Start with Basic" {...shared} />
    <PricingCard
      plan={plan}
      price={price}
      billing={billing}
      buttonText={buttonText}
      isPopular={isPopular}
      features={features}
      {...shared}
    />
    <PricingCard
      plan="Enterprise"
      price={200}
      billing="Per user/month, billed annually"
      features={features}
      buttonText="Contact sales"
      {...shared}
    />
  </div>
);

export default PricingCardDemo;
