import type { ComponentMeta } from "../../catalog";

export default {
  description:
    "A holographic foil sticker that tilts and shifts colour under the pointer",
  dateAdded: "2026-11-22",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "children",
      type: "ReactNode",
      default: '"HOLO"',
      description: "What is printed on the sticker.",
    },
    {
      name: "shape",
      type: '"circle" | "rounded" | "burst"',
      default: '"circle"',
      description:
        "Outline of the sticker. Burst is a starburst like a price sticker.",
      options: ["circle", "rounded", "burst"],
    },
    {
      name: "size",
      type: "number",
      default: "180",
      description: "Width and height in pixels. The text scales with it.",
    },
    {
      name: "color",
      type: "string",
      default: '"#3f3f46"',
      description: "Base colour under the foil.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#fafafa"',
      description: "Colour of the printed text.",
    },
    {
      name: "intensity",
      type: "number",
      default: "0.8",
      description: "Strength of the rainbow foil, from 0 to 1.",
    },
    {
      name: "rotate",
      type: "number",
      default: "-8",
      description: "Resting angle in degrees.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the root element.",
    },
  ],
  controls: [
    { prop: "children", label: "Text", type: "text", default: "HOLO" },
    {
      prop: "shape",
      type: "select",
      default: "circle",
      options: ["circle", "rounded", "burst"],
    },
    {
      prop: "size",
      type: "number",
      default: 180,
      min: 100,
      max: 280,
      unit: "px",
    },
    { prop: "color", label: "Base", type: "color", default: "#3f3f46" },
    { prop: "textColor", label: "Text", type: "color", default: "#fafafa" },
    {
      prop: "intensity",
      type: "number",
      default: 0.8,
      min: 0,
      max: 1,
      step: 0.05,
    },
    {
      prop: "rotate",
      type: "number",
      default: -8,
      min: -30,
      max: 30,
      unit: "°",
    },
  ],
} satisfies ComponentMeta;
