import type { ComponentMeta } from "../../catalog";

export default {
  description: "Individual letter animation effects",
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
      default: '"#7c3aed"',
      description: "Background colour.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#ffffff"',
      description: "Text colour.",
    },
    {
      name: "lift",
      type: "number",
      default: "8",
      description: "How high each letter hops, in pixels.",
    },
    {
      name: "stagger",
      type: "number",
      default: "0.05",
      description: "Delay between letters, in seconds.",
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
      default: "#7c3aed",
    },
    {
      prop: "textColor",
      label: "Text",
      type: "color",
      default: "#ffffff",
    },
    {
      prop: "lift",
      type: "number",
      default: 8,
      min: 2,
      max: 14,
      step: 1,
      unit: "px",
    },
    {
      prop: "stagger",
      type: "number",
      default: 0.05,
      min: 0,
      max: 0.15,
      step: 0.01,
      unit: "s",
    },
  ],
} satisfies ComponentMeta;
