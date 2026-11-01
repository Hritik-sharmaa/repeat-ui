import type { ComponentMeta } from "../../catalog";

export default {
  description: "Tabs whose highlight stretches across like elastic",
  dateAdded: "2026-11-01",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "tabs",
      type: "string[]",
      default: '["Overview", "Components", "Pricing", "Docs"]',
      description: "Tab labels.",
    },
    {
      name: "defaultIndex",
      type: "number",
      default: "0",
      description: "The tab selected at first.",
    },
    {
      name: "onChange",
      type: "(index: number) => void",
      default: "-",
      description: "Called with the selected tab's index.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#fa5f1b"',
      description: "Highlight colour.",
    },
    {
      name: "background",
      type: "string",
      default: '"#171717"',
      description: "Bar background.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#a3a3a3"',
      description: "Tab text colour.",
    },
    {
      name: "activeTextColor",
      type: "string",
      default: '"#ffffff"',
      description: "Selected tab's text colour.",
    },
    {
      name: "stretch",
      type: "number",
      default: "0.12",
      description: "Seconds the trailing edge waits; higher stretches more.",
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
      prop: "accentColor",
      label: "Highlight",
      type: "color",
      default: "#fa5f1b",
    },
    {
      prop: "background",
      type: "color",
      default: "#171717",
    },
    {
      prop: "textColor",
      label: "Text",
      type: "color",
      default: "#a3a3a3",
    },
    {
      prop: "activeTextColor",
      label: "Active text",
      type: "color",
      default: "#ffffff",
    },
    {
      prop: "stretch",
      type: "number",
      default: 0.12,
      min: 0,
      max: 0.4,
      step: 0.02,
      unit: "s",
    },
  ],
} satisfies ComponentMeta;
