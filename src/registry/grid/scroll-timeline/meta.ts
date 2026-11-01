import type { ComponentMeta } from "../../catalog";

export default {
  description: "A timeline that draws itself as you scroll",
  dateAdded: "2026-11-01",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "items",
      type: "TimelineItem[]",
      default: "-",
      description: "{ date, title, description? }.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#fa5f1b"',
      description: "Line, dot and date colour.",
    },
    {
      name: "lineColor",
      type: "string",
      default: '"rgba(255, 255, 255, 0.12)"',
      description: "Colour of the undrawn line.",
    },
    {
      name: "dotColor",
      type: "string",
      default: '"#0a0a0a"',
      description: "Dot fill before it lights up.",
    },
    {
      name: "gap",
      type: "number",
      default: "48",
      description: "Space between milestones, in pixels.",
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
      prop: "accentColor",
      label: "Accent",
      type: "color",
      default: "#fa5f1b",
    },
    {
      prop: "lineColor",
      label: "Line",
      type: "color",
      default: "rgba(255, 255, 255, 0.12)",
    },
    {
      prop: "dotColor",
      label: "Dot",
      type: "color",
      default: "#0a0a0a",
    },
    {
      prop: "gap",
      type: "number",
      default: 48,
      min: 16,
      max: 96,
      unit: "px",
    },
  ],
  usage: ["items={items}"],
} satisfies ComponentMeta;
