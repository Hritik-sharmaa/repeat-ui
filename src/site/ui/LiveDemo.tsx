"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { useInView } from "motion/react";

// Loads a registry component's demo in the browser, once its placeholder scrolls near view.
// Used by the landing page and the galleries, where many demos share a page.
export function LiveDemo({
  category,
  variant,
  style = "tailwind",
}: {
  category: string;
  variant: string;
  style?: string;
}) {
  const placeholder = useRef<HTMLDivElement>(null);
  const near = useInView(placeholder, { once: true, margin: "200px" });
  const [Demo, setDemo] = useState<ComponentType | null | undefined>(undefined);

  useEffect(() => {
    if (!near) return;
    let active = true;
    import(`@/registry/${category}/${variant}/${style}/demo`)
      .then((mod) => {
        if (active) setDemo(() => mod.default);
      })
      .catch(() => {
        if (active) setDemo(null);
      });
    return () => {
      active = false;
    };
  }, [near, category, variant, style]);

  if (Demo === undefined) {
    return <div ref={placeholder} className="size-10 animate-pulse rounded-full bg-surface-2" aria-hidden />;
  }
  if (!Demo) return <span className="text-sm text-muted">Preview unavailable</span>;
  return <Demo />;
}
