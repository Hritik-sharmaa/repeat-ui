"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type AccordionItem = {
  id: string | number;
  title: string;
  content: string;
};

export type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: (string | number)[];
  variant?: "bordered" | "separated";
  icon?: "chevron" | "plus";
  accentColor?: string;
  radius?: number;
  className?: string;
};

// Questions that open to reveal their answers, one at a time or several with `allowMultiple`.
const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  variant = "bordered",
  icon = "chevron",
  accentColor = "#f97316",
  radius = 16,
  className = "",
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState(defaultOpen);
  const toggle = (id: string | number) =>
    setOpenItems((open) => (open.includes(id) ? open.filter((o) => o !== id) : allowMultiple ? [...open, id] : [id]));

  const separated = variant === "separated";

  return (
    <div
      className={`mx-auto w-full max-w-2xl text-neutral-900 dark:text-white ${
        separated
          ? "space-y-3"
          : "overflow-hidden border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
      } ${className}`}
      style={separated ? undefined : { borderRadius: radius }}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div
            key={item.id}
            className={
              separated
                ? "overflow-hidden border border-neutral-200 bg-white shadow-sm transition-colors dark:border-neutral-800 dark:bg-neutral-950"
                : index > 0
                  ? "border-t border-neutral-200 dark:border-neutral-800"
                  : ""
            }
            style={separated ? { borderRadius: radius, borderColor: isOpen ? accentColor : undefined } : undefined}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className="group flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
              <span className="text-lg font-medium transition-colors" style={{ color: isOpen ? accentColor : undefined }}>
                {item.title}
              </span>
              <motion.svg
                viewBox="0 0 24 24"
                className="size-5 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
                animate={{ rotate: isOpen ? (icon === "plus" ? 45 : 180) : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ color: isOpen ? accentColor : undefined }}>
                <path d={icon === "plus" ? "M12 5v14M5 12h14" : "m6 9 6 6 6-6"} />
              </motion.svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden">
                  <p className="m-0 px-6 pb-5 pt-0 leading-relaxed text-neutral-600 dark:text-neutral-400">{item.content}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
