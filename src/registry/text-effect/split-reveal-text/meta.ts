import type { ComponentMeta } from "../../catalog";

export default {
  description: "Split and reveal text letter by letter",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "2.0.0",
  props: [
    {
      name: "outerText",
      type: "string",
      default: '"Hover"',
      description: "The word that splits open.",
    },
    {
      name: "innerText",
      type: "string",
      default: '"Hello there"',
      description: "The band revealed inside.",
    },
    {
      name: "color",
      type: "string",
      default: '"#fb923c"',
      description: "Colour of the word.",
    },
    {
      name: "bandColor",
      type: "string",
      default: '"#a3e635"',
      description: "Background of the inner band.",
    },
    {
      name: "bandTextColor",
      type: "string",
      default: '"#0a0a0a"',
      description: "Text colour of the inner band.",
    },
    {
      name: "gap",
      type: "number",
      default: "18",
      description: "How far the halves move apart, in pixels.",
    },
    {
      name: "fontSize",
      type: "number",
      default: "96",
      description: "Text size in pixels; shrinks on narrow screens.",
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
      prop: "outerText",
      label: "Outer text",
      type: "text",
      default: "Hover",
    },
    {
      prop: "innerText",
      label: "Inner text",
      type: "text",
      default: "Hello there",
    },
    {
      prop: "color",
      label: "Word",
      type: "color",
      default: "#fb923c",
    },
    {
      prop: "bandColor",
      label: "Band",
      type: "color",
      default: "#a3e635",
    },
    {
      prop: "bandTextColor",
      label: "Band text",
      type: "color",
      default: "#0a0a0a",
    },
    {
      prop: "gap",
      type: "number",
      default: 18,
      min: 6,
      max: 40,
      unit: "px",
    },
    {
      prop: "fontSize",
      type: "number",
      default: 96,
      min: 40,
      max: 160,
      unit: "px",
    },
  ],
} satisfies ComponentMeta;
