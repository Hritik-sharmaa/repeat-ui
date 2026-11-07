import type { ComponentMeta } from "../../catalog";

export default {
  description:
    "An area of iron filings that line up round a magnet on the pointer",
  dateAdded: "2026-11-07",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "children",
      type: "ReactNode",
      default: "-",
      description: "The area the filings lie under.",
    },
    {
      name: "filingColor",
      type: "string",
      default: '"#c4c4cc"',
      description: "Colour of the filings.",
    },
    {
      name: "northColor",
      type: "string",
      default: '"#ef4444"',
      description: "Colour of the magnet's north pole.",
    },
    {
      name: "southColor",
      type: "string",
      default: '"#3b82f6"',
      description: "Colour of the magnet's south pole.",
    },
    {
      name: "spacing",
      type: "number",
      default: "13",
      description: "Gap between filings, in pixels; smaller is denser.",
    },
    {
      name: "length",
      type: "number",
      default: "9",
      description: "Length of a filing, in pixels.",
    },
    {
      name: "reach",
      type: "number",
      default: "150",
      description: "How far the magnet's pull carries, in pixels.",
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
      prop: "filingColor",
      label: "Filings",
      type: "color",
      default: "#c4c4cc",
    },
    { prop: "northColor", label: "North", type: "color", default: "#ef4444" },
    { prop: "southColor", label: "South", type: "color", default: "#3b82f6" },
    {
      prop: "spacing",
      type: "number",
      default: 13,
      min: 8,
      max: 30,
      unit: "px",
    },
    { prop: "length", type: "number", default: 9, min: 4, max: 20, unit: "px" },
    {
      prop: "reach",
      type: "number",
      default: 150,
      min: 60,
      max: 320,
      unit: "px",
    },
  ],
} satisfies ComponentMeta;
