import type { ComponentMeta } from "../../catalog";

export default {
  description: "Text that flips between different words",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "2.0.0",
  props: [
    {
      name: "text",
      type: "string",
      default: '"Follow along"',
      description: "The word that flips on hover.",
    },
    {
      name: "socialPlatforms",
      type: "SocialPlatform[]",
      default: '["linkedin", "instagram", "facebook"]',
      description: 'Icons beside the text: "linkedin", "instagram" or "facebook".',
    },
    {
      name: "layout",
      type: '"text-left" | "text-right"',
      default: '"text-left"',
      description: "Which side the text sits on.",
      options: ["text-left", "text-right"],
    },
    {
      name: "color",
      type: "string",
      default: '"currentColor"',
      description: "Text colour.",
    },
    {
      name: "fontSize",
      type: "number",
      default: "48",
      description: "Text size in pixels.",
    },
    {
      name: "duration",
      type: "number",
      default: "0.8",
      description: "Seconds for one flip.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the root element.",
    },
  ],
  controls: [
    {
      prop: "text",
      type: "text",
      default: "Follow along",
    },
    {
      prop: "layout",
      type: "select",
      default: "text-left",
      options: ["text-left", "text-right"],
    },
    {
      prop: "color",
      type: "color",
      default: "currentColor",
    },
    {
      prop: "fontSize",
      type: "number",
      default: 48,
      min: 20,
      max: 96,
      unit: "px",
    },
    {
      prop: "duration",
      type: "number",
      default: 0.8,
      min: 0.2,
      max: 2,
      step: 0.1,
      unit: "s",
    },
  ],
} satisfies ComponentMeta;
