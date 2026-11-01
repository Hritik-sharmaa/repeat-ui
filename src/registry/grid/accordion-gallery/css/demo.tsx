"use client";

import type { ComponentProps } from "react";
import AccordionGallery from "./preview";

const items = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=900&fit=crop",
    title: "Mountain Vista",
    subtitle: "Above the clouds",
  },
  {
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=900&h=900&fit=crop",
    title: "Ocean Waves",
    subtitle: "Where the tide turns",
  },
  {
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=900&fit=crop",
    title: "Forest Path",
    subtitle: "A walk in the green",
  },
  {
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=900&h=900&fit=crop",
    title: "Desert Dunes",
    subtitle: "Sand in every direction",
  },
  {
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=900&fit=crop",
    title: "Lake Shore",
    subtitle: "Still water, quiet morning",
  },
];

const AccordionGalleryDemo = (props: Partial<ComponentProps<typeof AccordionGallery>>) => (
  <div style={{ width: "100%", maxWidth: 760 }}>
    <AccordionGallery items={items} {...props} />
  </div>
);

export default AccordionGalleryDemo;
