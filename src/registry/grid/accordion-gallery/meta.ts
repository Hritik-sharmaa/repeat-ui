import type { ComponentMeta } from "../../catalog";

export default {
  description: "Image panels that open wide under the pointer",
  dateAdded: "2026-11-01",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "items",
      type: "GalleryItem[]",
      default: "-",
      description: "{ image, title, subtitle? }.",
    },
    {
      name: "height",
      type: "number",
      default: "380",
      description: "Height in pixels.",
    },
    {
      name: "gap",
      type: "number",
      default: "8",
      description: "Space between panels, in pixels.",
    },
    {
      name: "radius",
      type: "number",
      default: "20",
      description: "Panel corner radius in pixels.",
    },
    {
      name: "expandRatio",
      type: "number",
      default: "4",
      description: "How much wider the open panel is than the others.",
    },
    {
      name: "defaultIndex",
      type: "number",
      default: "0",
      description: "The panel open at first.",
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
      prop: "height",
      type: "number",
      default: 380,
      min: 220,
      max: 560,
      unit: "px",
    },
    {
      prop: "gap",
      type: "number",
      default: 8,
      min: 0,
      max: 24,
      unit: "px",
    },
    {
      prop: "radius",
      type: "number",
      default: 20,
      min: 0,
      max: 40,
      unit: "px",
    },
    {
      prop: "expandRatio",
      label: "Expand",
      type: "number",
      default: 4,
      min: 1.5,
      max: 8,
      step: 0.5,
      unit: "×",
    },
  ],
  usage: ["items={items}"],
} satisfies ComponentMeta;
