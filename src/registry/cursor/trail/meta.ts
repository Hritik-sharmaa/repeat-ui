import type { ComponentMeta } from "../../catalog";

export default {
  description: "Custom cursor with trailing effect and line following cursor",
  dateAdded: "2025-09-12",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "trailLength",
      type: "number",
      default: "10",
      description: "Number of trail points to display.",
    },
    {
      name: "trailColor",
      type: "string",
      default: "blue-500",
      description: "Color of the trail effect.",
    },
  ],
} satisfies ComponentMeta;
