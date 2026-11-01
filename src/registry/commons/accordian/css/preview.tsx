"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./style.css";

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
      className={`rui-acc ${separated ? "rui-acc-separated" : "rui-acc-bordered"} ${className}`}
      style={separated ? undefined : { borderRadius: radius }}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div
            key={item.id}
            className={separated ? "rui-acc-card" : index > 0 ? "rui-acc-divider" : ""}
            style={separated ? { borderRadius: radius, borderColor: isOpen ? accentColor : undefined } : undefined}>
            <button type="button" aria-expanded={isOpen} onClick={() => toggle(item.id)} className="rui-acc-trigger">
              <span className="rui-acc-title" style={{ color: isOpen ? accentColor : undefined }}>
                {item.title}
              </span>
              <motion.svg
                viewBox="0 0 24 24"
                className="rui-acc-icon"
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
                  className="rui-acc-panel">
                  <p className="rui-acc-content">{item.content}</p>
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
