import type { ComponentMeta } from "../../catalog";

export default {
  description: "Notifications that print out as receipts you tear off",
  dateAdded: "2026-11-02",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "receipts",
      type: "Receipt[]",
      default: "-",
      description:
        "{ id, title, meta?, lines?, total?, note? }, oldest first. lines are { label, value }.",
    },
    {
      name: "onTear",
      type: "(id: string | number) => void",
      default: "-",
      description:
        "Called when a receipt is torn off, or the roll of older ones is tapped.",
    },
    {
      name: "header",
      type: "string",
      default: '"Repeat UI"',
      description: "Shop name printed at the top of every receipt.",
    },
    {
      name: "maxVisible",
      type: "number",
      default: "2",
      description:
        "Receipts left hanging before the oldest curl into the roll.",
    },
    {
      name: "width",
      type: "number",
      default: "300",
      description: "Printer width in pixels. Shrinks to fit narrow screens.",
    },
    {
      name: "printSpeed",
      type: "number",
      default: "70",
      description: "Milliseconds to feed each printed row.",
    },
    {
      name: "paperColor",
      type: "string",
      default: '"#f6f3ea"',
      description: "Paper colour.",
    },
    {
      name: "inkColor",
      type: "string",
      default: '"#27241f"',
      description: "Print colour.",
    },
    {
      name: "printerColor",
      type: "string",
      default: '"#1f1f1f"',
      description: "Printer body colour.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#22c55e"',
      description: "Status light colour.",
    },
    {
      name: "showBarcode",
      type: "boolean",
      default: "true",
      description: "Print a barcode on each receipt.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the root element.",
    },
  ],
  controls: [
    { prop: "header", type: "text", default: "Repeat UI" },
    {
      prop: "maxVisible",
      label: "Max visible",
      type: "number",
      default: 2,
      min: 1,
      max: 4,
    },
    {
      prop: "width",
      type: "number",
      default: 300,
      min: 240,
      max: 380,
      unit: "px",
    },
    {
      prop: "printSpeed",
      label: "Print speed",
      type: "number",
      default: 70,
      min: 20,
      max: 200,
      step: 10,
      unit: "ms",
    },
    { prop: "showBarcode", label: "Barcode", type: "boolean", default: true },
    { prop: "paperColor", label: "Paper", type: "color", default: "#f6f3ea" },
    { prop: "inkColor", label: "Ink", type: "color", default: "#27241f" },
    {
      prop: "printerColor",
      label: "Printer",
      type: "color",
      default: "#1f1f1f",
    },
    { prop: "accentColor", label: "Light", type: "color", default: "#22c55e" },
  ],
  usage: ["receipts={receipts}", "onTear={tear}"],
} satisfies ComponentMeta;
