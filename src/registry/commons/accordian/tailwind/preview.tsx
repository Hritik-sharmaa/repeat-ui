"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type AccordionItem = {
  id: string | number;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
};

const Accordion = ({ items, allowMultiple = false }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<(string | number)[]>([]);

  const toggleItem = (id: string | number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-black dark:text-white text-black dark:border-gray-950 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        const isLast = index === items.length - 1;
        return (
          <div
            key={item.id}
            className={`${
              !isLast ? "border-b border-gray-100 dark:border-gray-950" : ""
            }`}>
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between text-left px-6 py-5 dark:hover:bg-zinc-950 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50 dark:focus:bg-zinc-950 group">
              <span className="text-lg font-medium transition-colors duration-200">
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-shrink-0 ml-4">
                <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden">
                  <div className="px-6 pb-5 pt-1">
                    <div className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                      {item.content}
                    </div>
                  </div>
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
