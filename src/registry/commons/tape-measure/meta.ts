import type { ComponentMeta } from "../../catalog";

export default {
  description:
    "A slider you pull out like a tape measure, with a lock and a whip-back",
  dateAdded: "2026-11-08",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "value",
      type: "number",
      default: "-",
      description: "The value. Leave it out to let the tape keep its own.",
    },
    {
      name: "defaultValue",
      type: "number",
      default: "30",
      description: "The value to start at when value is left out.",
    },
    {
      name: "onChange",
      type: "(value: number) => void",
      default: "-",
      description: "Called as the tape is pulled, and when it whips back.",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Smallest value, with the tape all the way in.",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Largest value, with the tape all the way out.",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Gap between values, and between the small ticks.",
    },
    {
      name: "unit",
      type: "string",
      default: '"cm"',
      description: "Unit shown in the reading window.",
    },
    {
      name: "width",
      type: "number",
      default: "460",
      description:
        "Width in pixels, case included. Shrinks to fit narrow screens.",
    },
    {
      name: "locked",
      type: "boolean",
      default: "true",
      description: "Start with the lock on, so the tape stays where it's left.",
    },
    {
      name: "caseColor",
      type: "string",
      default: '"#facc15"',
      description: "Colour of the case.",
    },
    {
      name: "tapeColor",
      type: "string",
      default: '"#fde047"',
      description: "Colour of the tape.",
    },
    {
      name: "inkColor",
      type: "string",
      default: '"#1c1917"',
      description: "Colour of the ticks and numbers.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the root element.",
    },
  ],
  controls: [
    { prop: "max", type: "number", default: 100, min: 20, max: 300, step: 10 },
    { prop: "step", type: "number", default: 1, min: 1, max: 10 },
    { prop: "unit", type: "text", default: "cm" },
    {
      prop: "width",
      type: "number",
      default: 460,
      min: 260,
      max: 720,
      unit: "px",
    },
    { prop: "locked", label: "Start locked", type: "boolean", default: true },
    { prop: "caseColor", label: "Case", type: "color", default: "#facc15" },
    { prop: "tapeColor", label: "Tape", type: "color", default: "#fde047" },
    { prop: "inkColor", label: "Ink", type: "color", default: "#1c1917" },
  ],
} satisfies ComponentMeta;
