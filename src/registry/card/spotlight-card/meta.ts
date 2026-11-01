import type { ComponentMeta } from "../../catalog";

export default {
  description: "A glow and a lit border that follow the pointer",
  dateAdded: "2026-11-01",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "title",
      type: "string",
      default: '"Copy"',
      description: "Card heading.",
    },
    {
      name: "description",
      type: "string",
      default: '"Find a component you like and copy it straight from the page."',
      description: "Card text.",
    },
    {
      name: "icon",
      type: "ReactNode",
      default: "-",
      description: "Shown in a tinted tile above the title.",
    },
    {
      name: "children",
      type: "ReactNode",
      default: "-",
      description: "Extra content under the text.",
    },
    {
      name: "glowColor",
      type: "string",
      default: '"#fa5f1b"',
      description: "Colour of the light and the lit border.",
    },
    {
      name: "background",
      type: "string",
      default: '"#0a0a0a"',
      description: "Card background.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#fafafa"',
      description: "Text colour.",
    },
    {
      name: "spotlightSize",
      type: "number",
      default: "320",
      description: "Diameter of the light, in pixels.",
    },
    {
      name: "radius",
      type: "number",
      default: "24",
      description: "Corner radius in pixels.",
    },
    {
      name: "borderGlow",
      type: "boolean",
      default: "true",
      description: "Light up the border near the pointer.",
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
      prop: "title",
      type: "text",
      default: "Copy",
    },
    {
      prop: "description",
      type: "text",
      default: "Find a component you like and copy it straight from the page.",
    },
    {
      prop: "glowColor",
      label: "Glow",
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
      default: "#fafafa",
    },
    {
      prop: "spotlightSize",
      label: "Light size",
      type: "number",
      default: 320,
      min: 120,
      max: 600,
      unit: "px",
    },
    {
      prop: "radius",
      type: "number",
      default: 24,
      min: 0,
      max: 40,
      unit: "px",
    },
    {
      prop: "borderGlow",
      label: "Border glow",
      type: "boolean",
      default: true,
    },
  ],
} satisfies ComponentMeta;
