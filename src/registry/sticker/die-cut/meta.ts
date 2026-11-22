import type { ComponentMeta } from "../../catalog";

export default {
  description:
    "A vinyl sticker cut around any emoji, word or logo, that you can drag and slap down",
  dateAdded: "2026-11-22",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "children",
      type: "ReactNode",
      default: '"🔥"',
      description:
        "What the sticker is: an emoji, text, an SVG or a transparent image. The border follows its shape.",
    },
    {
      name: "outline",
      type: "number",
      default: "6",
      description: "Width of the die-cut border in pixels.",
    },
    {
      name: "outlineColor",
      type: "string",
      default: '"#ffffff"',
      description: "Colour of the die-cut border.",
    },
    {
      name: "rotate",
      type: "number",
      default: "-6",
      description: "Resting angle in degrees.",
    },
    {
      name: "draggable",
      type: "boolean",
      default: "true",
      description: "Let people pick the sticker up and move it.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the root element.",
    },
  ],
  controls: [
    { prop: "children", label: "Sticker", type: "text", default: "🔥" },
    {
      prop: "outline",
      type: "number",
      default: 6,
      min: 0,
      max: 16,
      unit: "px",
    },
    {
      prop: "outlineColor",
      label: "Border",
      type: "color",
      default: "#ffffff",
    },
    {
      prop: "rotate",
      type: "number",
      default: -6,
      min: -30,
      max: 30,
      unit: "°",
    },
    { prop: "draggable", type: "boolean", default: true },
  ],
} satisfies ComponentMeta;
