import type { ComponentMeta } from "../../catalog";

export default {
  description: "Elegant pricing plan showcase card",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "2.0.0",
  props: [
    {
      name: "plan",
      type: "string",
      default: '"Premium"',
      description: "Plan name.",
    },
    {
      name: "price",
      type: "number | string",
      default: "120",
      description: "Price, without the currency.",
    },
    {
      name: "currency",
      type: "string",
      default: '"$"',
      description: "Shown before the price.",
    },
    {
      name: "billing",
      type: "string",
      default: '"Per user/month, billed monthly"',
      description: "The line under the price.",
    },
    {
      name: "features",
      type: "string[]",
      default: "3 sample features",
      description: "Listed with check marks.",
    },
    {
      name: "buttonText",
      type: "string",
      default: '"Get started"',
      description: "Button label.",
    },
    {
      name: "isPopular",
      type: "boolean",
      default: "true",
      description: "Outline the card and fill its button in the accent colour.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#3b82f6"',
      description: "Icon, check marks, badge and button colour.",
    },
    {
      name: "onSelect",
      type: "() => void",
      default: "-",
      description: "Called when the button is pressed.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the root element.",
    },
  ],
  controls: [
    {
      prop: "plan",
      type: "text",
      default: "Premium",
    },
    {
      prop: "price",
      type: "number",
      default: 120,
      min: 0,
      max: 999,
    },
    {
      prop: "currency",
      type: "text",
      default: "$",
    },
    {
      prop: "billing",
      type: "text",
      default: "Per user/month, billed monthly",
    },
    {
      prop: "buttonText",
      label: "Button",
      type: "text",
      default: "Get started",
    },
    {
      prop: "isPopular",
      label: "Highlighted",
      type: "boolean",
      default: true,
    },
    {
      prop: "accentColor",
      label: "Accent",
      type: "color",
      default: "#3b82f6",
    },
  ],
} satisfies ComponentMeta;
