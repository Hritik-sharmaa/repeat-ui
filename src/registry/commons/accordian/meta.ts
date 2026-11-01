import type { ComponentMeta } from "../../catalog";

export default {
  description: "Accordion component with smooth expand/collapse animations",
  dateAdded: "2025-09-04",
  tier: "free",
  version: "2.0.0",
  props: [
    {
      name: "items",
      type: "AccordionItem[]",
      default: "-",
      description: "Rows: { id, title, content }.",
    },
    {
      name: "allowMultiple",
      type: "boolean",
      default: "false",
      description: "Let several rows stay open at once.",
    },
    {
      name: "defaultOpen",
      type: "(string | number)[]",
      default: "[]",
      description: "Ids of rows open at first.",
    },
    {
      name: "variant",
      type: '"bordered" | "separated"',
      default: '"bordered"',
      description: "One bordered box, or a separate card per row.",
      options: ["bordered", "separated"],
    },
    {
      name: "icon",
      type: '"chevron" | "plus"',
      default: '"chevron"',
      description: "A chevron that flips, or a plus that turns into a cross.",
      options: ["chevron", "plus"],
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#f97316"',
      description: "Colour of the open row's title and icon.",
    },
    {
      name: "radius",
      type: "number",
      default: "16",
      description: "Corner radius in pixels.",
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
      prop: "allowMultiple",
      label: "Allow multiple",
      type: "boolean",
      default: false,
    },
    {
      prop: "variant",
      type: "select",
      default: "bordered",
      options: ["bordered", "separated"],
    },
    {
      prop: "icon",
      type: "select",
      default: "chevron",
      options: ["chevron", "plus"],
    },
    {
      prop: "accentColor",
      label: "Accent",
      type: "color",
      default: "#f97316",
    },
    {
      prop: "radius",
      type: "number",
      default: 16,
      min: 0,
      max: 32,
      unit: "px",
    },
  ],
  usage: ["items={items}"],
} satisfies ComponentMeta;
