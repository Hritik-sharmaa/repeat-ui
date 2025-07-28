import React from "react";
import PricingCard from "./preview";
import { MdDescription } from "react-icons/md";

const propData = [
  {
    name: "plan",
    type: "string",
    default: "-",
    description: "Got 3 type of plan Basic | Premium | Enterprise",
  },
  {
    name: "price",
    type: "number | string",
    default: "-",
    description: "Price of the plan",
  },
  {
    name: "billing",
    type: "string",
    default: "-",
    description: "Description of the plan",
  },
  {
    name: "features",
    type: "string[]",
    default: "-",
    description: "Array of string to diaply the features of each card",
  },
  {
    name: "buttonText",
    type: "string",
    default: "-",
    description: "Text for the button",
  },
  {
    name: "isPopular",
    type: "boolean",
    default: "-",
    description: "Boolean value for the popular badge",
  },
];

const PricingCardDemo = () => {
  const features = [
    "Advance data analysis",
    "Priority support",
    "Unlimited storage",
  ];
  return (
    <div className="flex gap-20">
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

export { propData };
export default PricingCardDemo;
