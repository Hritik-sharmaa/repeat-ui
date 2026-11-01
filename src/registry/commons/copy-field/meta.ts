import type { ComponentMeta } from "../../catalog";

export default {
  description: "A command to copy, with a ghost and a counter on every copy",
  dateAdded: "2026-11-01",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "text",
      type: "string",
      default: '"npx @hritik-sharmaa/repeat-ui add button-echo"',
      description: "The text to copy.",
    },
    {
      name: "prefix",
      type: "string",
      default: '"$"',
      description: "Shown before the text in the accent colour.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#fa5f1b"',
      description: "Prefix, ghost, shine and counter colour.",
    },
    {
      name: "background",
      type: "string",
      default: '"#0a0a0a"',
      description: "Field background.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#e5e5e5"',
      description: "Text colour.",
    },
    {
      name: "showCount",
      type: "boolean",
      default: "true",
      description: "Count repeat copies (×2, ×3).",
    },
    {
      name: "onCopy",
      type: "(count: number) => void",
      default: "-",
      description: "Called after each copy, with how many times it has been copied.",
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
      prop: "text",
      type: "text",
      default: "npx @hritik-sharmaa/repeat-ui add button-echo",
    },
    {
      prop: "prefix",
      type: "text",
      default: "$",
    },
    {
      prop: "accentColor",
      label: "Accent",
      type: "color",
      default: "#fa5f1b",
    },
    {
      prop: "background",
      type: "color",
      default: "#0a0a0a",
    },
    {
      prop: "textColor",
      label: "Text",
      type: "color",
      default: "#e5e5e5",
    },
    {
      prop: "showCount",
      label: "Count copies",
      type: "boolean",
      default: true,
    },
  ],
} satisfies ComponentMeta;
