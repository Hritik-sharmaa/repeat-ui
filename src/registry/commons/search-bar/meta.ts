import type { ComponentMeta } from "../../catalog";

export default {
  description:
    "Search bar component with keyboard shortcuts (Ctrl+K) and modal support",
  dateAdded: "2025-09-04",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "placeholder",
      type: "string",
      default: '"Search..."',
      description:
        "Placeholder text displayed in the search input field and trigger button.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description:
        "Additional CSS classes to apply to the search container wrapper.",
    },
    {
      name: "enableHotkey",
      type: "boolean",
      default: "true",
      description:
        "Whether to enable Ctrl+K (or Cmd+K) keyboard shortcut to open/close the search modal and show the hotkey badge.",
    },
    {
      name: "enableModal",
      type: "boolean",
      default: "true",
      description:
        "Whether to show search results in a modal. When false, displays inline search input that triggers onSearch callback on each keystroke.",
    },
    {
      name: "onSearch",
      type: "(query: string) => void",
      default: "undefined",
      description:
        "Callback function called when search is performed. In modal mode, triggered on Enter key. In inline mode, triggered on each keystroke.",
    },
  ],
} satisfies ComponentMeta;
