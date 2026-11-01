import type { ComponentMeta } from "../../catalog";

export default {
  description: "Custom cursor with trailing effect and line following cursor",
  dateAdded: "2025-09-12",
  tier: "free",
  version: "2.0.0",
  props: [
    {
      name: "trailLength",
      type: "number",
      default: "40",
      description: "Number of points in the trail.",
    },
    {
      name: "trailColor",
      type: "string",
      default: '"#9dff00"',
      description: "Trail colour.",
    },
    {
      name: "width",
      type: "number",
      default: "10",
      description: "Trail thickness at the head, in pixels.",
    },
    {
      name: "dotColor",
      type: "string",
      default: '"currentColor"',
      description: "Dot colour; follows the text colour by default.",
    },
    {
      name: "smoothness",
      type: "number",
      default: "0.15",
      description: "How quickly the cursor catches up, from 0 (never) to 1 (instantly).",
    },
    {
      name: "hideCursor",
      type: "boolean",
      default: "false",
      description: "Hide the system cursor on the whole page.",
    },
  ],
  controls: [
    {
      prop: "trailLength",
      label: "Trail length",
      type: "number",
      default: 40,
      min: 4,
      max: 80,
    },
    {
      prop: "trailColor",
      label: "Trail",
      type: "color",
      default: "#9dff00",
    },
    {
      prop: "width",
      type: "number",
      default: 10,
      min: 2,
      max: 30,
      unit: "px",
    },
    {
      prop: "dotColor",
      label: "Dot",
      type: "color",
      default: "currentColor",
    },
    {
      prop: "smoothness",
      type: "number",
      default: 0.15,
      min: 0.03,
      max: 1,
      step: 0.01,
    },
    {
      prop: "hideCursor",
      label: "Hide system cursor",
      type: "boolean",
      default: false,
    },
  ],
} satisfies ComponentMeta;
