"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, X, ChevronRight, Folder, FileCode } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { motion, AnimatePresence } from "motion/react";
import { categories } from "@/data/categories";
import { useRouter } from "next/navigation";
import { useVariant } from "@/app/context/code-context";

interface SearchResult {
  type: "component" | "category";
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  category?: string;
  variant?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { flavor } = useVariant();

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      const results: SearchResult[] = [];

      categories.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
          subcategory.variants.slice(0, 3).forEach((variant) => {
            results.push({
              type: "component",
              title: variant.name.replace(/-/g, " "),
              subtitle: subcategory.name,
              href: `/components/${subcategory.name.toLowerCase()}/${variant.name.toLowerCase()}?flavor=${flavor}`,
              icon: <FileCode className="w-4 h-4" />,
              category: subcategory.name.toLowerCase(),
              variant: variant.name.toLowerCase(),
            });
          });
        });
      });

      return results.slice(0, 10);
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    categories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        if (subcategory.name.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: "category",
            title: subcategory.name,
            subtitle: `${subcategory.variants.length} components`,
            href: `/components/${subcategory.name.toLowerCase()}`,
            icon: <Folder className="w-4 h-4" />,
            category: subcategory.name.toLowerCase(),
          });
        }

        subcategory.variants.forEach((variant) => {
          const variantName = variant.name.replace(/-/g, " ");
          if (
            variantName.toLowerCase().includes(lowerQuery) ||
            variant.name.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              type: "component",
              title: variantName,
              subtitle: subcategory.name,
              href: `/components/${subcategory.name.toLowerCase()}/${variant.name.toLowerCase()}?flavor=${flavor}`,
              icon: <FileCode className="w-4 h-4" />,
              category: subcategory.name.toLowerCase(),
              variant: variant.name.toLowerCase(),
            });
          }
        });
      });
    });

    return results.slice(0, 10);
  }, [query, flavor]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            router.push(searchResults[selectedIndex].href);
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, router, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleResultClick = (href: string) => {
    router.push(href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-[5vh] sm:pt-[10vh] px-2 sm:px-4"
        onClick={onClose}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden mx-2"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b border-zinc-800">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
            <Input
              ref={(input) => input?.focus()}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components..."
              className="flex-1 border-none bg-transparent text-white placeholder:text-zinc-400 focus:outline-none focus:ring-0 text-sm sm:text-base"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="p-8 text-center text-zinc-400">
                <Search className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                <p className="text-lg mb-2">No components found</p>
                <p className="text-sm">
                  Try searching for &quot;button&quot;, &quot;card&quot;, or
                  &quot;text&quot;
                </p>
              </div>
            ) : (
              <div className="p-2">
                {!query.trim() && (
                  <div className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Browse Components
                  </div>
                )}
                {query.trim() && (
                  <div className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Search Results
                  </div>
                )}
                {searchResults.map((result, index) => (
                  <motion.div
                    key={`${result.type}-${result.title}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      index === selectedIndex
                        ? "bg-white/10 border border-white/20"
                        : "hover:bg-white/5"
                    }`}
                    onClick={() => handleResultClick(result.href)}>
                    <div
                      className={`p-2 rounded-md ${
                        result.type === "category"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                      }`}>
                      {result.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium capitalize">
                        {result.title}
                      </div>
                      <div className="text-sm text-zinc-400 capitalize">
                        {result.subtitle}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-500">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-3 border-t border-zinc-800 text-xs text-zinc-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-zinc-800 rounded text-zinc-400">
                  ↑↓
                </kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-zinc-800 rounded text-zinc-400">
                  ↵
                </kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-zinc-800 rounded text-zinc-400">
                  Esc
                </kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
