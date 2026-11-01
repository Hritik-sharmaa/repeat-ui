import type { ComponentMeta } from "../../catalog";

export default {
  description: "Beautiful user profile display card",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "2.0.0",
  props: [
    {
      name: "image",
      type: "string",
      default: "-",
      description: "Photo URL.",
    },
    {
      name: "name",
      type: "string",
      default: '"Maya Chen"',
      description: "Display name.",
    },
    {
      name: "verified",
      type: "boolean",
      default: "true",
      description: "Show the verified badge.",
    },
    {
      name: "bio",
      type: "string",
      default: '"Product designer. Collects fonts and houseplants."',
      description: "A line about the person.",
    },
    {
      name: "followers",
      type: "number",
      default: "-",
      description: "Follower count; following adds one.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#111827"',
      description: "Follow button colour.",
    },
    {
      name: "verifiedColor",
      type: "string",
      default: '"#22c55e"',
      description: "Verified badge colour.",
    },
    {
      name: "radius",
      type: "number",
      default: "36",
      description: "Card corner radius in pixels.",
    },
    {
      name: "onFollow",
      type: "(following: boolean) => void",
      default: "-",
      description: "Called with the new state when the button is pressed.",
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
      prop: "name",
      type: "text",
      default: "Maya Chen",
    },
    {
      prop: "verified",
      type: "boolean",
      default: true,
    },
    {
      prop: "bio",
      type: "text",
      default: "Product designer. Collects fonts and houseplants.",
    },
    {
      prop: "followers",
      type: "number",
      default: 2230,
      min: 0,
      max: 100000,
      step: 10,
    },
    {
      prop: "accentColor",
      label: "Button",
      type: "color",
      default: "#111827",
    },
    {
      prop: "verifiedColor",
      label: "Badge",
      type: "color",
      default: "#22c55e",
    },
    {
      prop: "radius",
      type: "number",
      default: 36,
      min: 8,
      max: 48,
      unit: "px",
    },
  ],
  usage: ['image="/avatar.jpg"'],
} satisfies ComponentMeta;
