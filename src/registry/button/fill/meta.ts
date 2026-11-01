import type { ComponentMeta } from "../../catalog";

export default {
  description: "Color fill animation from left to right",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "2.0.0",
  props: [
    {
      name: "children",
      type: "ReactNode",
      default: "-",
      description: "The button label.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Height, padding and font size. Every Repeat UI button shares this scale.",
      options: ["sm", "md", "lg"],
    },
    {
      name: "color",
      type: "string",
      default: '"#ff7675"',
      description: "Outline, text and fill colour.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#ffffff"',
      description: "Text colour once filled.",
    },
    {
      name: "duration",
      type: "number",
      default: "0.4",
      description: "Fill time in seconds.",
    },
    {
      name: "onClick",
      type: "(event: MouseEvent) => void",
      default: "-",
      description: "Click event handler.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the button.",
    },
  ],
  controls: [
    {
      prop: "children",
      label: "Label",
      type: "text",
      default: "Fill",
    },
    {
      prop: "size",
      type: "select",
      default: "md",
      options: ["sm", "md", "lg"],
    },
    {
      prop: "color",
      label: "Colour",
      type: "color",
      default: "#ff7675",
    },
    {
      prop: "textColor",
      label: "Filled text",
      type: "color",
      default: "#ffffff",
    },
    {
      prop: "duration",
      type: "number",
      default: 0.4,
      min: 0.1,
      max: 1.5,
      step: 0.05,
      unit: "s",
    },
  ],
} satisfies ComponentMeta;
