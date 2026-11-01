import type { ComponentMeta } from "../../catalog";

export default {
  description: "Dynamic shadow effects on text",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "2.0.0",
  props: [
    {
      name: "text",
      type: "string",
      default: '"Hover me"',
      description: "The text.",
    },
    {
      name: "color",
      type: "string",
      default: '"#f6aca2"',
      description: "Text colour.",
    },
    {
      name: "shadowColor",
      type: "string",
      default: '"#ee6352"',
      description: "Colour the shadow stack blends towards.",
    },
    {
      name: "depth",
      type: "number",
      default: "4",
      description: "Number of shadow layers.",
    },
    {
      name: "step",
      type: "number",
      default: "3",
      description: "Pixels between layers.",
    },
    {
      name: "fontSize",
      type: "number",
      default: "72",
      description: "Text size in pixels; shrinks on narrow screens.",
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
      prop: "text",
      type: "text",
      default: "Hover me",
    },
    {
      prop: "color",
      label: "Text",
      type: "color",
      default: "#f6aca2",
    },
    {
      prop: "shadowColor",
      label: "Shadow",
      type: "color",
      default: "#ee6352",
    },
    {
      prop: "depth",
      type: "number",
      default: 4,
      min: 1,
      max: 10,
    },
    {
      prop: "step",
      type: "number",
      default: 3,
      min: 1,
      max: 6,
      unit: "px",
    },
    {
      prop: "fontSize",
      type: "number",
      default: 72,
      min: 24,
      max: 140,
      unit: "px",
    },
  ],
} satisfies ComponentMeta;
