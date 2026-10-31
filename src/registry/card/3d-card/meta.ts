import type { ComponentMeta } from "../../catalog";

export default {
  description: "Interactive 3D card with hover tilt effects",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "companyName",
      type: "string",
      default: "-",
      description: "The name of the company",
    },
    {
      name: "logo",
      type: "string",
      default: "-",
      description: "The logo of company",
    },
    {
      name: "userName",
      type: "string",
      default: "-",
      description: "Name of the user",
    },
    {
      name: "userRole",
      type: "string",
      default: "-",
      description: "The role user do",
    },
    {
      name: "avatar",
      type: "string",
      default: "-",
      description: "The avatar icon for the user",
    },
  ],
} satisfies ComponentMeta;
