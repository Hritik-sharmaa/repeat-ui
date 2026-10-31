import type { ComponentMeta } from "../../catalog";

export default {
  description: "Simple custom dot cursor with smooth following animation",
  dateAdded: "2025-09-12",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "size",
      type: "number",
      default: "10",
      description: "Size of the cursor dot in pixels.",
    },
    {
      name: "smoothness",
      type: "number",
      default: "0.15",
      description:
        "Smoothness factor for cursor movement (0-1, where higher values are smoother).",
    },
  ],
} satisfies ComponentMeta;
