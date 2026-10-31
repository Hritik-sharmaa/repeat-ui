import type { ComponentMeta } from "../../catalog";

export default {
  description: "Document upload modal with drag and drop support",
  dateAdded: "2025-09-04",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "buttonText",
      type: "string",
      default: '"Upload document"',
      description: "Text to display on the upload button.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Additional CSS classes to apply to the upload button.",
    },
  ],
} satisfies ComponentMeta;
