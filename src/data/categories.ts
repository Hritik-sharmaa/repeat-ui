export const categories = [
  {
    name: "Components",
    subcategories: [
      {
        name: "Button",
        variants: [
          "simple",
          "sketchy",
          "pulse",
          "rotation",
          "fill",
          "letter",
          "creep",
          "layers",
          "wiggle",
          "bubble",
        ],
      },
      {
        name: "Card",
        variants: ["profile-card", "pricing-card", "3D-card"],
      },
      {
        name: "texteffect",
        variants: [
          "flipping-text",
          "typing-text",
          "flow-text",
          "text-shadow",
          "pop-text",
          "split-reveal-text",
          //"aurora-title",
        ],
      },
    ],
  },
] as const;
