import type { CSSProperties } from "react";
import {
  Boxes,
  GalleryHorizontal,
  LayoutGrid,
  MousePointer2,
  MousePointerClick,
  SquareUser,
  Type,
  type LucideIcon,
} from "lucide-react";

// Each category's icon, tint and one-line pitch. The tint only colours glows, chips and icons;
// orange stays the brand accent. Read the tint in CSS as var(--tint) under tintStyle().
const STYLES: Record<string, { icon: LucideIcon; tint: string; blurb: string }> = {
  button: { icon: MousePointerClick, tint: "#fa5f1b", blurb: "Buttons that react to every hover and press." },
  card: { icon: SquareUser, tint: "#8b5cf6", blurb: "Profile, pricing and 3D cards with depth and motion." },
  carousel: { icon: GalleryHorizontal, tint: "#0ea5e9", blurb: "Slides, decks and loops that move on their own." },
  "text-effect": { icon: Type, tint: "#10b981", blurb: "Type that types, flips, flows and pops." },
  grid: { icon: LayoutGrid, tint: "#f59e0b", blurb: "Bento and masonry layouts, ready to fill." },
  cursor: { icon: MousePointer2, tint: "#ec4899", blurb: "Custom cursors that follow with style." },
  commons: { icon: Boxes, tint: "#14b8a6", blurb: "Everyday pieces: search, upload, accordion." },
};

export function categoryStyle(category: string) {
  return STYLES[category] ?? { icon: Boxes, tint: "#fa5f1b", blurb: "" };
}

export const tintStyle = (category: string) => ({ "--tint": categoryStyle(category).tint }) as CSSProperties;
