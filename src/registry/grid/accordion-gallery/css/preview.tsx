"use client";

import { useState } from "react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-gallery",
  panel: "rui-gallery-panel",
  image: "rui-gallery-image",
  shade: "rui-gallery-shade",
  index: "rui-gallery-index",
  caption: "rui-gallery-caption",
  title: "rui-gallery-title",
  subtitle: "rui-gallery-subtitle",
};

export interface GalleryItem {
  image: string;
  title: string;
  subtitle?: string;
}

export interface AccordionGalleryProps {
  items: GalleryItem[];
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  defaultIndex?: number;
  className?: string;
}

// Image panels side by side: the one under the pointer opens wide and shows its caption, the rest make room.
const AccordionGallery = ({
  items,
  height = 380,
  gap = 8,
  radius = 20,
  expandRatio = 4,
  defaultIndex = 0,
  className = "",
}: AccordionGalleryProps) => {
  const [active, setActive] = useState(defaultIndex);
  return (
    <div className={`${C.root} ${className}`} style={{ height, gap }}>
      {items.map((item, i) => {
        const open = i === active;
        return (
          <div
            key={item.title}
            tabIndex={0}
            role="button"
            aria-expanded={open}
            aria-label={item.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={C.panel}
            style={{ flexGrow: open ? expandRatio : 1, flexBasis: 0, borderRadius: radius }}>
            <img
              src={item.image}
              alt=""
              draggable={false}
              className={C.image}
              style={{ transform: open ? "scale(1)" : "scale(1.12)" }}
            />
            <div className={C.shade} />
            <span className={C.index}>{String(i + 1).padStart(2, "0")}</span>
            <div className={C.caption} style={{ opacity: open ? 1 : 0, transform: open ? "none" : "translateY(12px)" }}>
              <p className={C.title}>{item.title}</p>
              {item.subtitle && <p className={C.subtitle}>{item.subtitle}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
