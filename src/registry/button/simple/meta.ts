import type { ComponentMeta } from "../../catalog";

export default {
  description: "Clean, minimalist button with hover effects",
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
      default: '"#ffffff"',
      description: "Background colour.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#0a0a0a"',
      description: "Text colour.",
    },
    {
      name: "radius",
      type: "number",
      default: "10",
      description: "Corner radius in pixels.",
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
      default: "Simple",
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
      default: "#ffffff",
    },
    {
      prop: "textColor",
      label: "Text",
      type: "color",
      default: "#0a0a0a",
    },
    {
      prop: "radius",
      type: "number",
      default: 10,
      min: 0,
      max: 26,
      step: 1,
      unit: "px",
    },
  ],
} satisfies ComponentMeta;
