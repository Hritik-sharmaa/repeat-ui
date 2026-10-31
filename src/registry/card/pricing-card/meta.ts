import type { ComponentMeta } from "../../catalog";

export default {
  description: "Elegant pricing plan showcase card",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "1.0.0",
  props: [
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
  ],
} satisfies ComponentMeta;
