import type { ComponentMeta } from "../../catalog";

export default {
  description: "Split and reveal text letter by letter",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "outerText",
      type: "string",
      default: "undefined",
      description:
        "The main text that will be displayed and split into top and bottom halves on hover",
    },
    {
      name: "innerText",
      type: "string",
      default: "undefined",
      description:
        "The text that appears in the center when hovering over the outer text",
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional CSS classes to apply to the component container",
    },
  ],
} satisfies ComponentMeta;
