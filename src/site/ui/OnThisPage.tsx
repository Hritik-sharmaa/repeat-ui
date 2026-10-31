"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// "On this page" links that follow the section being read.
export function OnThisPage({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A section counts as "being read" while it crosses the upper third of the screen.
      { rootMargin: "-80px 0px -60% 0px" }
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">On this page</p>
      <ul className="relative border-l border-line">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn("relative block py-1.5 pl-4 transition-colors", active === id ? "text-fg" : "text-muted hover:text-fg")}>
              {active === id && (
                <motion.span
                  layoutId="toc-active"
                  className="absolute -left-px inset-y-1 w-0.5 rounded-full bg-(--tint)"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
