import type { ComponentMeta } from "../../catalog";

export default {
  description: "Dynamic grid layout with animated items",
  dateAdded: "2025-08-14",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "mainCard",
      type: "GridItemData",
      default: "{}",
      description: "Main character card configuration",
      properties: [
        {
          name: "title",
          type: "string",
          optional: true,
          default: "Jon Snow",
          description: "Character name displayed as large title",
        },
        {
          name: "description",
          type: "string",
          optional: true,
          default: "House Stark",
          description: "House or faction name shown above title",
        },
        {
          name: "image",
          type: "string",
          optional: true,
          default: "Default portrait",
          description: "Character portrait image URL for profile picture",
        },
        {
          name: "stats",
          type: "Array<{label: string, value: string}>",
          optional: true,
          default: "Default Jon Snow stats",
          description: "Array of character statistics displayed in grid format",
        },
      ],
    },
    {
      name: "contactCard",
      type: "GridItemData",
      default: "{}",
      description: "Character contact/ally card configuration",
      properties: [
        {
          name: "description",
          type: "string",
          optional: true,
          default: "A girl has no name, but she has many faces",
          description: "Character quote or description in top badge",
        },
        {
          name: "image",
          type: "string",
          optional: true,
          default: "Medieval sword background",
          description: "Background image URL for the card",
        },
        {
          name: "contact",
          type: "object",
          optional: true,
          description: "Contact information object",
          properties: [
            {
              name: "name",
              type: "string",
              description: "Character full name",
            },
            {
              name: "position",
              type: "string",
              description: "Character title or role",
            },
            {
              name: "email",
              type: "string",
              description: "Character email or identifier",
            },
            {
              name: "phone",
              type: "string",
              description: "Character location or contact method",
            },
          ],
        },
        {
          name: "about",
          type: "object",
          optional: true,
          description: "Additional character information",
          properties: [
            {
              name: "title",
              type: "string",
              description: "Organization or group name",
            },
            {
              name: "year",
              type: "string",
              description: "Large display text (e.g., 'VALAR')",
            },
            {
              name: "description",
              type: "string",
              description: "Detailed description of character background",
            },
          ],
        },
      ],
    },
    {
      name: "logoCard",
      type: "GridItemData",
      default: "{}",
      description: "House sigil/logo card configuration",
      properties: [
        {
          name: "title",
          type: "string",
          optional: true,
          default: "House Stark",
          description: "House or organization name",
        },
        {
          name: "description",
          type: "string",
          optional: true,
          default: "Winter is Coming",
          description: "House motto or tagline",
        },
        {
          name: "image",
          type: "string",
          optional: true,
          default: "Wolf emoji with text",
          description: "House sigil or logo image URL",
        },
      ],
    },
    {
      name: "mapCard",
      type: "GridItemData",
      default: "{}",
      description: "Map/location card configuration",
      properties: [
        {
          name: "title",
          type: "string",
          optional: true,
          default: "The Seven Kingdoms",
          description: "Location or region name",
        },
        {
          name: "description",
          type: "string",
          optional: true,
          default: "From Winterfell to King's Landing",
          description: "Location description or subtitle",
        },
        {
          name: "image",
          type: "string",
          optional: true,
          default: "Game of Thrones landscape",
          description: "Map or landscape image URL",
        },
      ],
    },
    {
      name: "detailsCard",
      type: "GridItemData",
      default: "{}",
      description: "Character details card configuration",
      properties: [
        {
          name: "title",
          type: "string",
          optional: true,
          default: "Bastard of Winterfell",
          description: "Character title or epithet",
        },
        {
          name: "description",
          type: "string",
          optional: true,
          default: "King in the North",
          description: "Character role or status",
        },
        {
          name: "image",
          type: "string",
          optional: true,
          description: "Background image URL (displayed with low opacity)",
        },
      ],
    },
  ],
} satisfies ComponentMeta;
