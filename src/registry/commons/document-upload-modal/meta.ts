import type { ComponentMeta } from "../../catalog";

export default {
  description: "Document upload modal with drag and drop support",
  dateAdded: "2025-09-04",
  tier: "free",
  version: "2.0.0",
  props: [
    {
      name: "buttonText",
      type: "string",
      default: '"Upload document"',
      description: "Label of the button that opens the modal.",
    },
    {
      name: "title",
      type: "string",
      default: '"Upload Document"',
      description: "Modal heading.",
    },
    {
      name: "description",
      type: "string",
      default:
        '"Choose a document to upload. Supported formats include PDF, Word, PowerPoint, Excel, and text files."',
      description: "Text under the heading.",
    },
    {
      name: "accept",
      type: "string",
      default: '".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"',
      description: "Allowed file extensions, comma separated.",
    },
    {
      name: "maxSizeMB",
      type: "number",
      default: "10",
      description: "Largest allowed file, in megabytes.",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#2563eb"',
      description: "Button, dropzone and focus colour.",
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
      prop: "buttonText",
      label: "Button",
      type: "text",
      default: "Upload document",
    },
    {
      prop: "title",
      type: "text",
      default: "Upload Document",
    },
    {
      prop: "description",
      type: "text",
      default:
        "Choose a document to upload. Supported formats include PDF, Word, PowerPoint, Excel, and text files.",
    },
    {
      prop: "accept",
      label: "Accepted types",
      type: "text",
      default: ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt",
    },
    {
      prop: "maxSizeMB",
      label: "Max size",
      type: "number",
      default: 10,
      min: 1,
      max: 100,
      unit: "MB",
    },
    {
      prop: "accentColor",
      label: "Accent",
      type: "color",
      default: "#2563eb",
    },
  ],
} satisfies ComponentMeta;
