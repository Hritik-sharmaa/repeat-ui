export interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  dependencies: string[];
  dateAdded: string;
  files: {
    component: string;
    styles?: string;
    demo: string;
  };
  variants: {
    "js-css": boolean;
    "js-tailwind": boolean;
    "ts-css": boolean;
    "ts-tailwind": boolean;
  };
}

export const componentRegistry: Record<string, ComponentInfo> = {
  // Button Components
  "button-simple": {
    name: "Simple Button",
    category: "button",
    description: "A simple, clean button component",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "button-layers": {
    name: "Layers Button",
    category: "button",
    description: "A button with layered hover effects",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "button-bubble": {
    name: "Bubble Button",
    category: "button",
    description: "A button with bubble animation effects",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "button-creep": {
    name: "Creep Button",
    category: "button",
    description: "A button with creeping animation effects",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "button-fill": {
    name: "Fill Button",
    category: "button",
    description: "A button with fill animation effects",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "button-letter": {
    name: "Letter Button",
    category: "button",
    description: "A button with letter animation effects",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "button-pulse": {
    name: "Pulse Button",
    category: "button",
    description: "A button with pulse animation effects",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "button-rotation": {
    name: "Rotation Button",
    category: "button",
    description: "A button with rotation animation effects",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "button-sketchy": {
    name: "Sketchy Button",
    category: "button",
    description: "A button with sketchy animation effects",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "button-wiggle": {
    name: "Wiggle Button",
    category: "button",
    description: "A button with wiggle animation effects",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },

  // Card Components
  "card-3d-card": {
    name: "3D Card",
    category: "card",
    description: "A beautiful 3D card component with hover effects",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "card-pricing-card": {
    name: "Pricing Card",
    category: "card",
    description: "A beautiful pricing card component for subscription plans",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "card-profile-card": {
    name: "Profile Card",
    category: "card",
    description: "A card component for displaying user profiles",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },

  // Text Effect Components
  "text-effect-flipping-text": {
    name: "Flipping Text",
    category: "text-effect",
    description: "A text effect with flipping animation",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "text-effect-flow-text": {
    name: "Flow Text",
    category: "text-effect",
    description: "A text effect with flowing animation",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "text-effect-pop-text": {
    name: "Pop Text",
    category: "text-effect",
    description: "A text effect with popping animation",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "text-effect-split-reveal-text": {
    name: "Split Reveal Text",
    category: "text-effect",
    description: "A text effect with split reveal animation",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "text-effect-text-shadow": {
    name: "Text Shadow",
    category: "text-effect",
    description: "A text effect with dynamic shadow animation",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "text-effect-typing-text": {
    name: "Typing Text",
    category: "text-effect",
    description: "A text effect with typing animation",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },

  // Grid Components
  "grid-2-column-bento-grid": {
    name: "2 Column Bento Grid",
    category: "grid",
    description: "A 2 column layout with bento style grid",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "grid-3-column-bento-grid": {
    name: "3 Column Bento Grid",
    category: "grid",
    description: "A 3 column layout with bento style grid",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "grid-pinterest-grid": {
    name: "Pinterest Grid",
    category: "grid",
    description: "A Pinterest style grid layout",
    dependencies: [],
    dateAdded: "2025-08-14",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },

  // Carousel Components
  "carousel-simple-carousel": {
    name: "Simple Carousel",
    category: "carousel",
    description: "Basic carousel with navigation arrows and dot indicators",
    dependencies: [],
    dateAdded: "2025-08-17",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "carousel-modern-carousel": {
    name: "Modern Carousel",
    category: "carousel",
    description: "Advanced carousel with fade transitions and auto-play",
    dependencies: [],
    dateAdded: "2025-08-17",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
  "carousel-loop-deck": {
    name: "Loop Deck Carousel",
    category: "carousel",
    description: "Infinite loop carousel with card deck style presentation",
    dependencies: [],
    dateAdded: "2025-08-17",
    files: {
      component: "preview",
      styles: "style.css",
      demo: "demo",
    },
    variants: {
      "js-css": true,
      "js-tailwind": true,
      "ts-css": true,
      "ts-tailwind": true,
    },
  },
};

export const getComponentsList = () => Object.keys(componentRegistry);
export const getComponentInfo = (name: string) => componentRegistry[name];
export const getComponentsByCategory = (category: string) =>
  Object.entries(componentRegistry)
    .filter(([, info]) => info.category === category)
    .map(([key]) => key);
