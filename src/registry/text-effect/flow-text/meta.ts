import type { ComponentMeta } from "../../catalog";

export default {
  description: "Smooth flowing text animation",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "text",
      type: "string",
      default: '""',
      description: "The text content to be displayed and animated",
    },
    {
      name: "speed",
      type: "number",
      default: "2",
      description: "Animation speed in pixels per frame",
    },
    {
      name: "direction",
      type: '"left" | "right"',
      default: '"left"',
      description: "Direction of text animation flow",
    },
    {
      name: "className",
      type: "string",
      default: "undefined",
      description: "Additional CSS classes to apply to the container",
    },
    {
      name: "interactive",
      type: "boolean",
      default: "true",
      description: "Enable/disable drag interaction to control animation",
    },
    {
      name: "separator",
      type: "string",
      default: '" • "',
      description: "Text separator between repeated instances",
    },
  ],
} satisfies ComponentMeta;
