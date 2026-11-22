import type { ComponentMeta } from "../../catalog";

export default {
  description:
    'The "Hello, my name is" sticker, written in marker and ready to type over',
  dateAdded: "2026-11-22",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "name",
      type: "string",
      default: '"Alex"',
      description: "The name written on the tag.",
    },
    {
      name: "greeting",
      type: "string",
      default: '"Hello"',
      description: "Big text in the coloured band.",
    },
    {
      name: "subtext",
      type: "string",
      default: '"my name is"',
      description: "Small text under the greeting.",
    },
    {
      name: "color",
      type: "string",
      default: '"#e11d48"',
      description: "Colour of the band and the strip along the bottom.",
    },
    {
      name: "inkColor",
      type: "string",
      default: '"#18181b"',
      description: "Marker colour of the name.",
    },
    {
      name: "width",
      type: "number",
      default: "280",
      description: "Width in pixels. Everything on the tag scales with it.",
    },
    {
      name: "rotate",
      type: "number",
      default: "-3",
      description: "Angle in degrees, since nobody sticks one on straight.",
    },
    {
      name: "editable",
      type: "boolean",
      default: "true",
      description: "Let people click the name and type their own.",
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Your name"',
      description: "Shown when the name is empty.",
    },
    {
      name: "onNameChange",
      type: "(name: string) => void",
      default: "-",
      description: "Called with the new name as it is typed.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the root element.",
    },
  ],
  controls: [
    { prop: "name", type: "text", default: "Alex" },
    { prop: "greeting", type: "text", default: "Hello" },
    { prop: "subtext", type: "text", default: "my name is" },
    { prop: "color", label: "Band", type: "color", default: "#e11d48" },
    { prop: "inkColor", label: "Marker", type: "color", default: "#18181b" },
    {
      prop: "width",
      type: "number",
      default: 280,
      min: 180,
      max: 380,
      unit: "px",
    },
    {
      prop: "rotate",
      type: "number",
      default: -3,
      min: -20,
      max: 20,
      unit: "°",
    },
    { prop: "editable", type: "boolean", default: true },
  ],
} satisfies ComponentMeta;
