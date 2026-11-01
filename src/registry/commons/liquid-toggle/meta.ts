import type { ComponentMeta } from "../../catalog";

export default {
  description: "A switch whose knob stretches like a water drop",
  dateAdded: "2026-11-01",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "checked",
      type: "boolean",
      default: "-",
      description: "Controlled state; leave out to let the toggle manage itself.",
    },
    {
      name: "defaultChecked",
      type: "boolean",
      default: "false",
      description: "Starting state when uncontrolled.",
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      default: "-",
      description: "Called with the new state.",
    },
    {
      name: "label",
      type: "string",
      default: '"Notifications"',
      description: "Text beside the switch.",
    },
    {
      name: "width",
      type: "number",
      default: "60",
      description: "Track width in pixels.",
    },
    {
      name: "height",
      type: "number",
      default: "34",
      description: "Track height in pixels.",
    },
    {
      name: "onColor",
      type: "string",
      default: '"#fa5f1b"',
      description: "Track colour when on.",
    },
    {
      name: "offColor",
      type: "string",
      default: '"#3f3f46"',
      description: "Track colour when off.",
    },
    {
      name: "knobColor",
      type: "string",
      default: '"#ffffff"',
      description: "Knob colour.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the switch.",
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
      prop: "defaultChecked",
      label: "On at start",
      type: "boolean",
      default: false,
    },
    {
      prop: "label",
      type: "text",
      default: "Notifications",
    },
    {
      prop: "width",
      type: "number",
      default: 60,
      min: 44,
      max: 100,
      unit: "px",
    },
    {
      prop: "height",
      type: "number",
      default: 34,
      min: 22,
      max: 48,
      unit: "px",
    },
    {
      prop: "onColor",
      label: "On",
      type: "color",
      default: "#fa5f1b",
    },
    {
      prop: "offColor",
      label: "Off",
      type: "color",
      default: "#3f3f46",
    },
    {
      prop: "knobColor",
      label: "Knob",
      type: "color",
      default: "#ffffff",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: false,
    },
  ],
} satisfies ComponentMeta;
