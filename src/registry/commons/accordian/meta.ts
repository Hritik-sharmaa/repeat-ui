import type { ComponentMeta } from "../../catalog";

export default {
  description: "Accordion component with smooth expand/collapse animations",
  dateAdded: "2025-09-04",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "items",
      type: "AccordionItem[]",
      default: "[]",
      description:
        "Array of accordion items with id, title, and content properties.",
    },
    {
      name: "allowMultiple",
      type: "boolean",
      default: "false",
      description:
        "Whether to allow multiple accordion items to be open simultaneously.",
    },
  ],
} satisfies ComponentMeta;
