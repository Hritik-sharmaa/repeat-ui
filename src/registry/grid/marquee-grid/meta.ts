import type { ComponentMeta } from "../../catalog";

export default {
  description: "Rows of cards drifting sideways, each at its own pace",
  dateAdded: "2026-11-01",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "items",
      type: "ReactNode[]",
      default: "12 component names",
      description: "Cards to scroll.",
    },
    {
      name: "rows",
      type: "number",
      default: "3",
      description: "Number of rows.",
    },
    {
      name: "speed",
      type: "number",
      default: "40",
      description: "Seconds for the first row to loop; each row below is slower.",
    },
    {
      name: "gap",
      type: "number",
      default: "12",
      description: "Space between cards and rows, in pixels.",
    },
    {
      name: "pauseOnHover",
      type: "boolean",
      default: "true",
      description: "Stop a row while the pointer is over it.",
    },
    {
      name: "cardColor",
      type: "string",
      default: '"#171717"',
      description: "Card background.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#e5e5e5"',
      description: "Card text colour.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#fa5f1b"',
      description: "Dot colour.",
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
      prop: "rows",
      type: "number",
      default: 3,
      min: 1,
      max: 5,
    },
    {
      prop: "speed",
      type: "number",
      default: 40,
      min: 10,
      max: 90,
      unit: "s",
    },
    {
      prop: "gap",
      type: "number",
      default: 12,
      min: 4,
      max: 32,
      unit: "px",
    },
    {
      prop: "pauseOnHover",
      label: "Pause on hover",
      type: "boolean",
      default: true,
    },
    {
      prop: "cardColor",
      label: "Cards",
      type: "color",
      default: "#171717",
    },
    {
      prop: "textColor",
      label: "Text",
      type: "color",
      default: "#e5e5e5",
    },
    {
      prop: "accentColor",
      label: "Dots",
      type: "color",
      default: "#fa5f1b",
    },
  ],
} satisfies ComponentMeta;
