import type { ComponentMeta } from "../../catalog";

export default {
  description: "Beautiful user profile display card",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "image",
      type: "string",
      default: "-",
      description: "Image path",
    },
    {
      name: "name",
      type: "string",
      default: "-",
      description: "Name of the user",
    },
    {
      name: "verified",
      type: "boolean",
      default: "-",
      description: "Verified badge",
    },
    {
      name: "bio",
      type: "string",
      default: "-",
      description: "Small description about the user",
    },
    {
      name: "followers",
      type: "number | string",
      default: "-",
      description: "Number of followers does user have",
    },
    {
      name: "onFollow",
      type: "function",
      default: "-",
      description: "Follow button when it gets click",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the card.",
    },
  ],
} satisfies ComponentMeta;
