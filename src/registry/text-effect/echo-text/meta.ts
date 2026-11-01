import type { ComponentMeta } from "../../catalog";

export default {
  description: "Outlined copies of a word fan out behind it",
  dateAdded: "2026-11-01",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "text",
      type: "string",
      default: '"Repeat"',
      description: "The word to echo.",
    },
    {
      name: "copies",
      type: "number",
      default: "5",
      description: "Number of outlined copies.",
    },
    {
      name: "offset",
      type: "number",
      default: "10",
      description: "Distance between copies, in pixels.",
    },
    {
      name: "direction",
      type: '"down" | "up" | "left" | "right" | "diagonal"',
      default: '"down"',
      description: "Which way the copies fan out.",
      options: ["down", "up", "left", "right", "diagonal"],
    },
    {
      name: "color",
      type: "string",
      default: '"currentColor"',
      description: "Colour of the front word.",
    },
    {
      name: "echoColor",
      type: "string",
      default: '"#fa5f1b"',
      description: "Outline colour of the copies.",
    },
    {
      name: "fontSize",
      type: "number",
      default: "96",
      description: "Text size in pixels; shrinks on narrow screens.",
    },
    {
      name: "always",
      type: "boolean",
      default: "false",
      description: "Keep the copies fanned out, not only on hover.",
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
      default: "Repeat",
    },
    {
      prop: "copies",
      type: "number",
      default: 5,
      min: 1,
      max: 10,
    },
    {
      prop: "offset",
      type: "number",
      default: 10,
      min: 2,
      max: 30,
      unit: "px",
    },
    {
      prop: "direction",
      type: "select",
      default: "down",
      options: ["down", "up", "left", "right", "diagonal"],
    },
    {
      prop: "color",
      label: "Text",
      type: "color",
      default: "currentColor",
    },
    {
      prop: "echoColor",
      label: "Echo",
      type: "color",
      default: "#fa5f1b",
    },
    {
      prop: "fontSize",
      type: "number",
      default: 96,
      min: 32,
      max: 160,
      unit: "px",
    },
    {
      prop: "always",
      label: "Always open",
      type: "boolean",
      default: false,
    },
  ],
} satisfies ComponentMeta;
