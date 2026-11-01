import type { ComponentMeta } from "../../catalog";

export default {
  description: "Toasts that stack as a deck and fan out on hover",
  dateAdded: "2026-11-01",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "notifications",
      type: "StackNotification[]",
      default: "-",
      description: "{ id, title, description?, icon? }, oldest first.",
    },
    {
      name: "onDismiss",
      type: "(id: string | number) => void",
      default: "-",
      description: "Called when one is dragged away or closed.",
    },
    {
      name: "maxVisible",
      type: "number",
      default: "3",
      description: "How many show at once.",
    },
    {
      name: "width",
      type: "number",
      default: "340",
      description: "Card width in pixels.",
    },
    {
      name: "expandOnHover",
      type: "boolean",
      default: "true",
      description: "Fan the stack out into a list on hover.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#fa5f1b"',
      description: "Icon colour.",
    },
    {
      name: "background",
      type: "string",
      default: '"#171717"',
      description: "Card background.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#fafafa"',
      description: "Text colour.",
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
      prop: "maxVisible",
      label: "Max visible",
      type: "number",
      default: 3,
      min: 1,
      max: 6,
    },
    {
      prop: "width",
      type: "number",
      default: 340,
      min: 260,
      max: 440,
      unit: "px",
    },
    {
      prop: "expandOnHover",
      label: "Expand on hover",
      type: "boolean",
      default: true,
    },
    {
      prop: "accentColor",
      label: "Accent",
      type: "color",
      default: "#fa5f1b",
    },
    {
      prop: "background",
      type: "color",
      default: "#171717",
    },
    {
      prop: "textColor",
      label: "Text",
      type: "color",
      default: "#fafafa",
    },
  ],
  usage: ["notifications={notifications}", "onDismiss={dismiss}"],
} satisfies ComponentMeta;
