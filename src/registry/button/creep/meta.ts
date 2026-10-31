import type { ComponentMeta } from "../../catalog";

export default {
  description: "Subtle creeping shadow animation",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "children",
      type: "ReactNode",
      default: "-",
      description: "The button content.",
    },
    {
      name: "onClick",
      type: "(event: MouseEvent) => void",
      default: "-",
      description: "Click event handler.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the button.",
    },
  ],
} satisfies ComponentMeta;
