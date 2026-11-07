import type { ComponentMeta } from "../../catalog";

export default {
  description:
    "An area where a yo-yo hangs from the pointer, swings and can be thrown",
  dateAdded: "2026-11-07",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "children",
      type: "ReactNode",
      default: "-",
      description: "The area the yo-yo plays over.",
    },
    {
      name: "color",
      type: "string",
      default: '"#ef4444"',
      description: "Colour of the yo-yo.",
    },
    {
      name: "stringColor",
      type: "string",
      default: '"#e5e5e5"',
      description: "Colour of the string and finger loop.",
    },
    {
      name: "size",
      type: "number",
      default: "40",
      description: "Diameter of the yo-yo, in pixels.",
    },
    {
      name: "stringLength",
      type: "number",
      default: "80",
      description: "How far it hangs at rest, in pixels.",
    },
    {
      name: "throwLength",
      type: "number",
      default: "220",
      description: "How far a throw sends it, in pixels.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the root element.",
    },
  ],
  controls: [
    { prop: "color", type: "color", default: "#ef4444" },
    { prop: "stringColor", label: "String", type: "color", default: "#e5e5e5" },
    { prop: "size", type: "number", default: 40, min: 20, max: 80, unit: "px" },
    {
      prop: "stringLength",
      label: "String length",
      type: "number",
      default: 80,
      min: 30,
      max: 200,
      unit: "px",
    },
    {
      prop: "throwLength",
      label: "Throw length",
      type: "number",
      default: 220,
      min: 80,
      max: 320,
      unit: "px",
    },
  ],
} satisfies ComponentMeta;
