"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";

function formatName(name: string) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
import { useSearch } from "@/app/context/search-context";
import { useVariant } from "@/app/context/code-context";
import ThemeToggle from "@/app/components/site/ui/ThemeToggler";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const pathname = usePathname();
  const { openSearch } = useSearch();
  const { flavor } = useVariant();

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  // Close mobile nav when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSearchClick = () => {
    setIsOpen(false);
    openSearch();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/80 dark:border-gray-800 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu">
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed top-0 left-0 z-50 w-72 h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Components</h2>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearchClick}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Search className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Search components...
                  </span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-6">
                {categories.map((cat) => (
                  <div key={cat.name} className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      All Components
                    </h3>
                    <ul className="space-y-2">
                      {cat.subcategories.map((sub) => {
                        const categoryPath = `/components/${sub.name.toLowerCase()}`;
                        const isActive = pathname.startsWith(categoryPath);
                        const isExpanded = expandedCategories.has(sub.name);

                        return (
                          <li key={sub.name} className="space-y-1">
                            <div className="flex items-center">
                              <Link
                                href={categoryPath}
                                className={`flex-1 block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                  isActive
                                    ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                                }`}>
                                {formatName(sub.name)}
                              </Link>
                              {sub.variants && sub.variants.length > 0 && (
                                <button
                                  onClick={() => toggleCategory(sub.name)}
                                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-1">
                                  {isExpanded ? (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-gray-500" />
                                  )}
                                </button>
                              )}
                            </div>

                            {/* Expandable variant list */}
                            <AnimatePresence>
                              {isExpanded && sub.variants && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="ml-6 space-y-1 overflow-hidden">
                                  {sub.variants.map((variant) => {
                                    const variantPath = `/components/${sub.name.toLowerCase()}/${variant.name.toLowerCase()}`;
                                    const isVariantActive =
                                      pathname === variantPath;

                                    return (
                                      <li key={variant.name}>
                                        <Link
                                          href={`${variantPath}?flavor=${flavor}`}
                                          className={`block px-2 py-1 text-xs rounded-md transition-colors ${
                                            isVariantActive
                                              ? "bg-orange-100 dark:bg-orange-800/30 text-orange-700 dark:text-orange-300"
                                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                                          }`}>
                                          {formatName(variant.name)}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
