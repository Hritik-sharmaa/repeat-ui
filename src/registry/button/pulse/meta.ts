import type { ComponentMeta } from "../../catalog";

export default {
  description: "Rhythmic pulsing animation on hover",
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
      default: '"#00ff88"',
      description: "Glow colour.",
    },
    {
      name: "background",
      type: "string",
      default: '"#18181b"',
      description: "Background colour.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#fafafa"',
      description: "Text colour.",
    },
    {
      name: "speed",
      type: "number",
      default: "1.5",
      description: "Seconds per pulse.",
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
      default: "Pulse",
    },
    {
      prop: "size",
      type: "select",
      default: "md",
      options: ["sm", "md", "lg"],
    },
    {
      prop: "color",
      label: "Glow",
      type: "color",
      default: "#00ff88",
    },
    {
      prop: "background",
      type: "color",
      default: "#18181b",
    },
    {
      prop: "textColor",
      label: "Text",
      type: "color",
      default: "#fafafa",
    },
    {
      prop: "speed",
      type: "number",
      default: 1.5,
      min: 0.4,
      max: 4,
      step: 0.1,
      unit: "s",
    },
  ],
} satisfies ComponentMeta;
