import type { ComponentMeta } from "../../catalog";

export default {
  description: "Bubble-like expansion with bounce effect",
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
      default: '"#2563eb"',
      description: "Background colour.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#ffffff"',
      description: "Text colour.",
    },
    {
      name: "count",
      type: "number",
      default: "10",
      description: "Bubbles per hover.",
    },
    {
      name: "rainbow",
      type: "boolean",
      default: "true",
      description: "Give every bubble a random colour.",
    },
    {
      name: "bubbleColor",
      type: "string",
      default: '"#60a5fa"',
      description: "Bubble colour when rainbow is off.",
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
      default: "Hover me!",
    },
    {
      prop: "size",
      type: "select",
      default: "md",
      options: ["sm", "md", "lg"],
    },
    {
      prop: "color",
      label: "Background",
      type: "color",
      default: "#2563eb",
    },
    {
      prop: "textColor",
      label: "Text",
      type: "color",
      default: "#ffffff",
    },
    {
      prop: "count",
      type: "number",
      default: 10,
      min: 1,
      max: 30,
    },
    {
      prop: "rainbow",
      type: "boolean",
      default: true,
    },
    {
      prop: "bubbleColor",
      label: "Bubble",
      type: "color",
      default: "#60a5fa",
    },
  ],
} satisfies ComponentMeta;
