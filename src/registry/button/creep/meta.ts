import type { ComponentMeta } from "../../catalog";

export default {
  description: "Subtle creeping shadow animation",
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
      default: '"#f44336"',
      description: "Button colour.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#ffffff"',
      description: "Text colour.",
    },
    {
      name: "backColor",
      type: "string",
      default: '"#0a0a0a"',
      description: "Colour of the hole behind, the outline and the pupils.",
    },
    {
      name: "eyeColor",
      type: "string",
      default: '"#ffffff"',
      description: "Colour of the eyes.",
    },
    {
      name: "tilt",
      type: "number",
      default: "12",
      description: "How far the button tips, in degrees.",
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
      label: "Button",
      type: "color",
      default: "#f44336",
    },
    {
      prop: "textColor",
      label: "Text",
      type: "color",
      default: "#ffffff",
    },
    {
      prop: "backColor",
      label: "Back",
      type: "color",
      default: "#0a0a0a",
    },
    {
      prop: "eyeColor",
      label: "Eyes",
      type: "color",
      default: "#ffffff",
    },
    {
      prop: "tilt",
      type: "number",
      default: 12,
      min: 4,
      max: 24,
      step: 1,
      unit: "°",
    },
  ],
} satisfies ComponentMeta;
