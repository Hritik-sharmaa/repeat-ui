import type { ComponentMeta } from "../../catalog";

export default {
  description: "Text that pops with scale animations",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "maintext",
      type: "string",
      default: "undefined",
      description:
        "The main text content to be displayed with pop animation effect",
    },
    {
      name: "subText",
      type: "string",
      default: "undefined",
      description:
        "The secondary text content displayed below the main text with yellow styling",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional CSS classes to apply to the component container",
    },
  ],
} satisfies ComponentMeta;
