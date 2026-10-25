"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, isNewComponent } from "@/data/categories";
import { useVariant } from "@/app/context/code-context";
import { motion } from "motion/react";
import { formatDateForDisplay } from "@/lib/dateUtils";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function formatName(name: string) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Sidebar() {
  const pathname = usePathname();
  const { flavor } = useVariant();
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = asideRef.current;
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const scrollableHeight = scrollHeight - clientHeight;

      setIsScrollable(scrollableHeight > 0);

      setIsAtBottom(scrollTop >= scrollableHeight - 5);
    };

    const checkInitialState = () => {
      const el = asideRef.current;
      if (!el) return;

      const { scrollHeight, clientHeight } = el;
      setIsScrollable(scrollHeight > clientHeight);
      setIsAtBottom(false);
    };

    const el = asideRef.current;
    if (el) {
      checkInitialState();

      el.addEventListener("scroll", handleScroll);

      const resizeObserver = new ResizeObserver(checkInitialState);
      resizeObserver.observe(el);

      return () => {
        el.removeEventListener("scroll", handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 80 },
          ease: "power2.out",
        });
      }
    }
  };

  return (
    <aside
      ref={asideRef}
      className="w-full h-full overflow-y-auto no-scrollbar relative">
      <nav className="space-y-6 pb-4">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-3">
            <h1 className="text-lg font-semibold">All components</h1>
            <ul className="space-y-3">
              {cat.subcategories.map((sub, subIndex) => (
                <li key={sub.name} className="relative group font-cal-sans">
                  <Link
                    href={`/components/${sub.name.toLowerCase()}`}
                    onClick={(e) =>
                      handleAnchorClick(
                        e,
                        `/components/${sub.name.toLowerCase()}`
                      )
                    }>
                    <motion.div
                      className="text-sm font-medium mb-2 px-2 py-1 transition-colors rounded-md"
                      whileHover={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        scale: 1.02,
                      }}
                      transition={{ duration: 0.2 }}>
                      {formatName(sub.name)}
                    </motion.div>
                  </Link>
                  <ul className={`ml-3 space-y-0.5 relative`}>
                    <motion.div
                      className="absolute left-0 top-0 w-px bg-gray-700"
                      initial={{ height: 0 }}
                      animate={{
                        height:
                          subIndex === cat.subcategories.length - 1
                            ? "calc(100% - 0.5rem)"
                            : "100%",
                      }}
                    />
                    {sub.variants.map((variant, variantIndex) => {
                      const variantPath = `/components/${sub.name.toLowerCase()}/${variant.name.toLowerCase()}`;
                      const isActive = pathname === variantPath;
                      const isNew = isNewComponent(variant.dateAdded);

                      return (
                        <motion.li
                          key={variant.name}
                          className={`relative pl-2 group/item transition-colors duration-200 ${
                            isActive
                              ? "dark:text-white text-black"
                              : "dark:text-zinc-400 dark:hover:text-white "
                          }`}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.3 + variantIndex * 0.1 }}>
                          <motion.div
                            className={`absolute left-0 top-0 w-px dark:bg-white bg-zinc-400 h-full origin-top transition-transform duration-200 ease-out rounded-full ${
                              isActive
                                ? "scale-y-100"
                                : "scale-y-0 group-hover/item:scale-y-100"
                            }`}
                          />

                          <Link
                            href={`${variantPath}?flavor=${flavor}`}
                            onClick={(e) =>
                              handleAnchorClick(
                                e,
                                `${variantPath}?flavor=${flavor}`
                              )
                            }
                            className={`flex items-center justify-between py-2 px-3 text-sm rounded-md transition-all duration-200 ${
                              isActive
                                ? "sidebar-active-text"
                                : "sidebar-inactive-text"
                            }`}>
                            <motion.span
                              whileHover={{
                                scale: 1.05,
                                x: 4,
                              }}
                              transition={{ duration: 0.2 }}>
                              {formatName(variant.name)}
                            </motion.span>

                            {isNew && (
                              <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full"
                                title={`Added on ${formatDateForDisplay(
                                  variant.dateAdded
                                )}`}>
                                New
                              </motion.span>
                            )}

                            {isActive && (
                              <motion.div
                                className="absolute inset-0 dark:bg-white/10 bg-black/10 rounded-md -z-10"
                                layoutId="activeTab"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {isScrollable && !isAtBottom && (
        <div className="pointer-events-none fixed bottom-0 left-0 w-full h-14 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent z-20" />
      )}
    </aside>
  );
}
