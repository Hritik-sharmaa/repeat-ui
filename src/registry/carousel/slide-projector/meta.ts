import type { ComponentMeta } from "../../catalog";

export default {
  description:
    "A carousel shown through an old slide projector with a turning tray",
  dateAdded: "2026-11-08",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "items",
      type: "Slide[]",
      default: "-",
      description: "{ image, title, caption? } for each slide.",
    },
    {
      name: "autoPlay",
      type: "boolean",
      default: "false",
      description: "Advance on its own; pauses on hover.",
    },
    {
      name: "interval",
      type: "number",
      default: "4000",
      description: "Milliseconds between slides when autoPlay is on.",
    },
    {
      name: "width",
      type: "number",
      default: "560",
      description: "Width in pixels. Shrinks to fit narrow screens.",
    },
    {
      name: "lampColor",
      type: "string",
      default: '"#ffd9a0"',
      description: "Colour of the projector lamp.",
    },
    {
      name: "bodyColor",
      type: "string",
      default: '"#2b2724"',
      description: "Colour of the projector body and tray.",
    },
    {
      name: "screenColor",
      type: "string",
      default: '"#e8e3d6"',
      description: "Colour of the screen around the picture.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#f59e0b"',
      description: "Colour of the slide counter.",
    },
    {
      name: "flicker",
      type: "boolean",
      default: "true",
      description: "Let the lamp flicker faintly.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the root element.",
    },
  ],
  controls: [
    { prop: "autoPlay", label: "Auto play", type: "boolean", default: false },
    {
      prop: "interval",
      type: "number",
      default: 4000,
      min: 1500,
      max: 9000,
      step: 250,
      unit: "ms",
    },
    {
      prop: "width",
      type: "number",
      default: 560,
      min: 300,
      max: 760,
      unit: "px",
    },
    { prop: "flicker", type: "boolean", default: true },
    { prop: "lampColor", label: "Lamp", type: "color", default: "#ffd9a0" },
    { prop: "bodyColor", label: "Body", type: "color", default: "#2b2724" },
    { prop: "screenColor", label: "Screen", type: "color", default: "#e8e3d6" },
    {
      prop: "accentColor",
      label: "Counter",
      type: "color",
      default: "#f59e0b",
    },
  ],
  usage: ["items={items}"],
} satisfies ComponentMeta;
