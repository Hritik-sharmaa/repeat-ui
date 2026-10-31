import type { ComponentMeta } from "../../catalog";

export default {
  description: "Dynamic shadow effects on text",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "text",
      type: "string",
      default: "''",
      description:
        "The text content that will be typed out with animation effects",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional CSS classes to apply to the component container",
    },
  ],
} satisfies ComponentMeta;
