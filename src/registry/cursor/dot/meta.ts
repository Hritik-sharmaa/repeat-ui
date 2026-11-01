import type { ComponentMeta } from "../../catalog";

export default {
  description: "Simple custom dot cursor with smooth following animation",
  dateAdded: "2025-09-12",
  tier: "free",
  version: "2.0.0",
  props: [
    {
      name: "size",
      type: "number",
      default: "24",
      description: "Dot diameter in pixels.",
    },
    {
      name: "color",
      type: "string",
      default: '"#ffffff"',
      description: "Dot colour. With blend on, white inverts whatever is underneath.",
    },
    {
      name: "smoothness",
      type: "number",
      default: "0.15",
      description: "How quickly the dot catches up, from 0 (never) to 1 (instantly).",
    },
    {
      name: "hoverScale",
      type: "number",
      default: "2.5",
      description: "How much the dot grows over links and buttons.",
    },
    {
      name: "blend",
      type: "boolean",
      default: "true",
      description: "Use mix-blend-mode: difference, so the dot inverts what it covers.",
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
      prop: "size",
      type: "number",
      default: 24,
      min: 6,
      max: 80,
      unit: "px",
    },
    {
      prop: "color",
      type: "color",
      default: "#ffffff",
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
      prop: "hoverScale",
      label: "Hover scale",
      type: "number",
      default: 2.5,
      min: 1,
      max: 5,
      step: 0.1,
      unit: "×",
    },
    {
      prop: "blend",
      type: "boolean",
      default: true,
    },
    {
      prop: "hideCursor",
      label: "Hide system cursor",
      type: "boolean",
      default: false,
    },
  ],
} satisfies ComponentMeta;
