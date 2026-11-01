import type { ComponentMeta } from "../../catalog";

export default {
  description: "Leans toward the pointer, with its label leaning further",
  dateAdded: "2026-11-01",
  tier: "free",
  version: "1.0.0",
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
      name: "strength",
      type: "number",
      default: "0.35",
      description: "How hard the pointer pulls, from 0 (not at all) to 1.",
    },
    {
      name: "color",
      type: "string",
      default: '"#fafafa"',
      description: "Button colour.",
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
      default: "999",
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
      default: "Get started →",
    },
    {
      prop: "size",
      type: "select",
      default: "md",
      options: ["sm", "md", "lg"],
    },
    {
      prop: "strength",
      type: "number",
      default: 0.35,
      min: 0,
      max: 1,
      step: 0.05,
    },
    {
      prop: "color",
      label: "Button",
      type: "color",
      default: "#fafafa",
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
      default: 999,
      min: 0,
      max: 999,
      unit: "px",
    },
  ],
} satisfies ComponentMeta;
