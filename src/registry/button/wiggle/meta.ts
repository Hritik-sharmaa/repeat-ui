import type { ComponentMeta } from "../../catalog";

export default {
  description: "Playful wiggle animation on hover",
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
      default: '"#facc15"',
      description: "Background colour.",
    },
    {
      name: "fillColor",
      type: "string",
      default: '"#3b82f6"',
      description: "Colour that rises on hover.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#0a0a0a"',
      description: "Text colour.",
    },
    {
      name: "borderColor",
      type: "string",
      default: '"#0a0a0a"',
      description: "Outline colour.",
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
      default: "Wiggle me!",
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
      default: "#facc15",
    },
    {
      prop: "fillColor",
      label: "Fill",
      type: "color",
      default: "#3b82f6",
    },
    {
      prop: "textColor",
      label: "Text",
      type: "color",
      default: "#0a0a0a",
    },
    {
      prop: "borderColor",
      label: "Outline",
      type: "color",
      default: "#0a0a0a",
    },
  ],
} satisfies ComponentMeta;
