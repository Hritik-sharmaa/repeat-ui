import type { ComponentMeta } from "../../catalog";

export default {
  description: "Text that flips between different words",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "text",
      type: "string",
      default: "HELLO WORLD",
      description:
        "The text content that will have the rolling/flipping animation on hover",
    },
    {
      name: "socialPlatforms",
      type: "SocialPlatform[]",
      default: '["linkedin", "instagram", "facebook"]',
      description:
        "Array of social platforms to display. Options: 'linkedin', 'instagram', 'facebook'",
    },
    {
      name: "layout",
      type: '"text-left" | "text-right"',
      default: '"text-left"',
      description:
        "Layout direction - text-left places text on left and icons on right, text-right does the opposite",
    },
  ],
} satisfies ComponentMeta;
