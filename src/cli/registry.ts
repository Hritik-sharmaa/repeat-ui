export interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  dependencies: string[];
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
  "texteffect-aurora-title": {
    name: "Aurora Title",
    category: "texteffect",
    description: "A text effect with aurora-like animation",
    dependencies: [],
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
  "texteffect-flipping-text": {
    name: "Flipping Text",
    category: "texteffect",
    description: "A text effect with flipping animation",
    dependencies: [],
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
  "texteffect-flow-text": {
    name: "Flow Text",
    category: "texteffect",
    description: "A text effect with flowing animation",
    dependencies: [],
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
  "texteffect-pop-text": {
    name: "Pop Text",
    category: "texteffect",
    description: "A text effect with popping animation",
    dependencies: [],
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
  "texteffect-split-reveal-text": {
    name: "Split Reveal Text",
    category: "texteffect",
    description: "A text effect with split reveal animation",
    dependencies: [],
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
  "texteffect-text-shadow": {
    name: "Text Shadow",
    category: "texteffect",
    description: "A text effect with dynamic shadow animation",
    dependencies: [],
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
  "texteffect-typing-text": {
    name: "Typing Text",
    category: "texteffect",
    description: "A text effect with typing animation",
    dependencies: [],
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
