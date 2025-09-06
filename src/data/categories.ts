export interface ComponentVariant {
  name: string;
  dateAdded: string;
  description?: string;
}

export interface Subcategory {
  name: string;
  variants: ComponentVariant[];
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

const createVariant = (
  name: string,
  dateAdded?: string,
  description?: string
): ComponentVariant => ({
  name,
  dateAdded: dateAdded || "2025-01-01",
  description,
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
          createVariant(
            "simple",
            "2025-08-14",
            "Clean, minimalist button with hover effects"
          ),
          createVariant(
            "sketchy",
            "2025-08-14",
            "Hand-drawn style with rough, artistic borders"
          ),
          createVariant(
            "pulse",
            "2025-08-14",
            "Rhythmic pulsing animation on hover"
          ),
          createVariant(
            "rotation",
            "2025-08-14",
            "Smooth rotation effect on interaction"
          ),
          createVariant(
            "fill",
            "2025-08-14",
            "Color fill animation from left to right"
          ),
          createVariant(
            "letter",
            "2025-08-14",
            "Individual letter animation effects"
          ),
          createVariant(
            "creep",
            "2025-08-14",
            "Subtle creeping shadow animation"
          ),
          createVariant(
            "layers",
            "2025-08-14",
            "Multi-layered depth with shadow effects"
          ),
          createVariant(
            "wiggle",
            "2025-08-14",
            "Playful wiggle animation on hover"
          ),
          createVariant(
            "bubble",
            "2025-08-14",
            "Bubble-like expansion with bounce effect"
          ),
        ],
      },
      {
        name: "Card",
        variants: [
          createVariant(
            "profile-card",
            "2025-08-14",
            "Beautiful user profile display card"
          ),
          createVariant(
            "pricing-card",
            "2025-08-14",
            "Elegant pricing plan showcase card"
          ),
          createVariant(
            "3d-card",
            "2025-08-14",
            "Interactive 3D card with hover tilt effects"
          ),
        ],
      },
      {
        name: "carousel",
        variants: [
          createVariant(
            "simple-carousel",
            "2025-08-17",
            "Basic carousel with navigation arrows and dot indicators"
          ),
          createVariant(
            "modern-carousel",
            "2025-08-17",
            "Advanced carousel with fade transitions and auto-play"
          ),
          createVariant(
            "loop-deck",
            "2025-08-17",
            "Infinite loop carousel with card deck style presentation"
          ),
        ],
      },
      {
        name: "text-effect",
        variants: [
          createVariant(
            "flipping-text",
            "2025-08-14",
            "Text that flips between different words"
          ),
          createVariant(
            "typing-text",
            "2025-08-14",
            "Typewriter effect with blinking cursor"
          ),
          createVariant(
            "flow-text",
            "2025-08-14",
            "Smooth flowing text animation"
          ),
          createVariant(
            "text-shadow",
            "2025-08-14",
            "Dynamic shadow effects on text"
          ),
          createVariant(
            "pop-text",
            "2025-08-14",
            "Text that pops with scale animations"
          ),
          createVariant(
            "split-reveal-text",
            "2025-08-14",
            "Split and reveal text letter by letter"
          ),
        ],
      },
      {
        name: "grid",
        variants: [
          createVariant(
            "2-column-bento-grid",
            "2025-08-14",
            "Dynamic grid layout with animated items"
          ),
          createVariant(
            "3-column-bento-grid",
            "2025-08-14",
            "Masonry style grid with variable item heights"
          ),
          createVariant(
            "pinterest-grid",
            "2025-08-14",
            "Photo gallery grid with lightbox effect"
          ),
        ],
      },
      {
        name: "commons",
        variants: [
          createVariant(
            "document-upload-modal",
            "2025-09-04",
            "Document upload modal with drag and drop support"
          ),
          createVariant(
            "search-bar",
            "2025-09-04",
            "Search bar component with keyboard shortcuts (Ctrl+K) and modal support"
          ),
          createVariant(
            "accordian",
            "2025-09-04",
            "Accordion component with smooth expand/collapse animations"
          ),
        ],
      },
    ],
  },
];
