"use client";

import type { ComponentProps } from "react";
import SlideProjector, { type Slide } from "./preview";

const items: Slide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=560&fit=crop",
    title: "Lake at dawn",
    caption: "Summer '72 · The lake",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&h=560&fit=crop",
    title: "Open road",
    caption: "Summer '72 · Route 66",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=560&fit=crop",
    title: "Mountain pass",
    caption: "Summer '72 · The pass",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=560&fit=crop",
    title: "Beach",
    caption: "Summer '72 · The coast",
  },
  {
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&h=560&fit=crop",
    title: "Waterfall",
    caption: "Summer '72 · The falls",
  },
  {
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&h=560&fit=crop",
    title: "Cabin",
    caption: "Summer '72 · The cabin",
  },
];

// Click the buttons, use the arrow keys, or click a slide in the tray.
const SlideProjectorDemo = (
  props: Partial<ComponentProps<typeof SlideProjector>>,
) => (
  <div style={{ width: "100%", padding: "24px 0 8px" }}>
    <SlideProjector {...props} items={items} />
  </div>
);

export default SlideProjectorDemo;
