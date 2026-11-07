import type { ComponentMeta } from "../../catalog";

export default {
  description:
    "An area where the pointer becomes a fountain pen writing in wet ink",
  dateAdded: "2026-11-07",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "children",
      type: "ReactNode",
      default: "-",
      description: "The area to write over.",
    },
    {
      name: "inkColor",
      type: "string",
      default: '"#1d3fbf"',
      description: "Ink colour.",
    },
    {
      name: "nibColor",
      type: "string",
      default: '"#d4a94a"',
      description: "Colour of the gold nib.",
    },
    {
      name: "thickness",
      type: "number",
      default: "5",
      description: "Widest stroke, in pixels. Fast strokes run thinner.",
    },
    {
      name: "fadeTime",
      type: "number",
      default: "3000",
      description: "Milliseconds before ink fades away; 0 keeps it.",
    },
    {
      name: "blots",
      type: "boolean",
      default: "true",
      description: "Let a resting pen bleed a blot.",
    },
    {
      name: "splatter",
      type: "boolean",
      default: "true",
      description: "Flick a spatter of drops on click.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the root element.",
    },
  ],
  controls: [
    { prop: "inkColor", label: "Ink", type: "color", default: "#1d3fbf" },
    { prop: "nibColor", label: "Nib", type: "color", default: "#d4a94a" },
    {
      prop: "thickness",
      type: "number",
      default: 5,
      min: 1,
      max: 14,
      unit: "px",
    },
    {
      prop: "fadeTime",
      label: "Fade after",
      type: "number",
      default: 3000,
      min: 0,
      max: 8000,
      step: 100,
      unit: "ms",
    },
    { prop: "blots", type: "boolean", default: true },
    { prop: "splatter", type: "boolean", default: true },
  ],
} satisfies ComponentMeta;
