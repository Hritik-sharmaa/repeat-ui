import type { ComponentMeta } from "../../catalog";

export default {
  description: "A ⌘K command menu with a gliding highlight",
  dateAdded: "2026-11-01",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "items",
      type: "CommandItem[]",
      default: "-",
      description: "{ id, label, group, shortcut?, icon? }.",
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Type a command or search..."',
      description: "Search field placeholder.",
    },
    {
      name: "buttonLabel",
      type: "string",
      default: '"Search commands"',
      description: "Text on the button that opens the palette.",
    },
    {
      name: "hotkey",
      type: "string",
      default: '"k"',
      description: "Letter used with Ctrl/⌘ to open it.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#fa5f1b"',
      description: "Highlight colour.",
    },
    {
      name: "background",
      type: "string",
      default: '"#171717"',
      description: "Panel background.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#fafafa"',
      description: "Text colour.",
    },
    {
      name: "onSelect",
      type: "(item: CommandItem) => void",
      default: "-",
      description: "Called with the chosen item.",
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
      default: "Type a command or search...",
    },
    {
      prop: "buttonLabel",
      label: "Button",
      type: "text",
      default: "Search commands",
    },
    {
      prop: "hotkey",
      type: "text",
      default: "k",
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
  usage: ["items={items}"],
} satisfies ComponentMeta;
