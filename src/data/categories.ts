export interface ComponentVariant {
  name: string;
  dateAdded: string; // ISO date string
}

export interface Subcategory {
  name: string;
  variants: ComponentVariant[];
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

const createVariant = (name: string, dateAdded?: string): ComponentVariant => ({
  name,
  dateAdded: dateAdded || "2025-01-01",
});

export const isNewComponent = (dateAdded: string): boolean => {
  const addedDate = new Date(dateAdded);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return addedDate > thirtyDaysAgo;
};

export const categories: Category[] = [
  {
    name: "Components",
    subcategories: [
      {
        name: "Button",
        variants: [
          createVariant("simple", "2025-08-14"),
          createVariant("sketchy", "2025-08-14"),
          createVariant("pulse", "2025-08-14"),
          createVariant("rotation", "2025-08-14"),
          createVariant("fill", "2025-08-14"),
          createVariant("letter", "2025-08-14"),
          createVariant("creep", "2025-08-14"),
          createVariant("layers", "2025-08-14"),
          createVariant("wiggle", "2025-08-14"),
          createVariant("bubble", "2025-08-14"),
        ],
      },
      {
        name: "Card",
        variants: [
          createVariant("profile-card", "2025-08-14"),
          createVariant("pricing-card", "2025-08-14"),
          createVariant("3D-card", "2025-08-14"),
        ],
      },
      {
        name: "texteffect",
        variants: [
          createVariant("flipping-text", "2025-08-14"),
          createVariant("typing-text", "2025-08-14"),
          createVariant("flow-text", "2025-08-14"),
          createVariant("text-shadow", "2025-08-14"),
          createVariant("pop-text", "2025-08-14"),
          createVariant("split-reveal-text", "2025-08-14"),
          //createVariant("aurora-title"),
        ],
      },
    ],
  },
];
