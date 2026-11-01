"use client";

import { useState } from "react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "flex w-full",
  panel:
    "relative min-w-0 cursor-pointer overflow-hidden outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
  image: "absolute inset-0 size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
  shade: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent",
  index: "absolute left-4 top-4 font-mono text-xs text-white/80",
  caption: "absolute inset-x-0 bottom-0 p-5 text-white transition-all duration-500 ease-out",
  title: "m-0 truncate text-lg font-semibold",
  subtitle: "m-0 mt-1 truncate text-sm opacity-75",
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
