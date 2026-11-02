import type { ComponentMeta } from "../../catalog";

export default {
  description:
    "Search bar component with keyboard shortcuts (Ctrl+K) and modal support",
  dateAdded: "2025-09-04",
  tier: "free",
  version: "2.0.0",
  props: [
    {
      name: "placeholder",
      type: "string",
      default: '"Search..."',
      description: "Placeholder text.",
    },
    {
      name: "enableModal",
      type: "boolean",
      default: "true",
      description: "Open a search dialog instead of searching inline.",
    },
    {
      name: "enableHotkey",
      type: "boolean",
      default: "true",
      description:
        "Toggle the dialog with Ctrl/⌘ + hotkey, and show the shortcut.",
    },
    {
      name: "hotkey",
      type: "string",
      default: '"k"',
      description: "The letter used with Ctrl/⌘.",
    },
    {
      name: "width",
      type: "number",
      default: "300",
      description: "Width of the field in pixels.",
    },
    {
      name: "radius",
      type: "number",
      default: "12",
      description: "Corner radius in pixels.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#f97316"',
      description: "Focus outline colour.",
    },
    {
      name: "onSearch",
      type: "(query: string) => void",
      default: "-",
      description:
        "Called on Enter in the dialog, or on every keystroke inline.",
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
      prop: "placeholder",
      type: "text",
      default: "Search...",
    },
    {
      prop: "enableModal",
      label: "Modal",
      type: "boolean",
      default: true,
    },
    {
      prop: "enableHotkey",
      label: "Hotkey",
      type: "boolean",
      default: true,
    },
    {
      prop: "hotkey",
      type: "text",
      default: "k",
    },
    {
      prop: "width",
      type: "number",
      default: 300,
      min: 180,
      max: 480,
      unit: "px",
    },
    {
      prop: "radius",
      type: "number",
      default: 12,
      min: 0,
      max: 24,
      unit: "px",
    },
    {
      prop: "accentColor",
      label: "Accent",
      type: "color",
      default: "#f97316",
    },
  ],
} satisfies ComponentMeta;
