import type { ComponentMeta } from "../../catalog";

export default {
  description: "Advanced carousel with fade transitions and auto-play",
  dateAdded: "2025-08-17",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "items",
      type: "CarouselItem[]",
      default: "-",
      description:
        "Array of carousel items to display. Each item should have id, title, subtitle, image, description, and color (which is optional) properties.",
    },
    {
      name: "autoPlay",
      type: "boolean",
      default: "true",
      description:
        "Whether the carousel should automatically advance to the next slide",
    },
    {
      name: "autoPlayInterval",
      type: "number",
      default: "5000",
      description: "Time in milliseconds between automatic slide transitions",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Additional CSS classes to apply to the carousel container",
    },
  ],
} satisfies ComponentMeta;
