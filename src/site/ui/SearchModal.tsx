"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, CornerDownLeft, FileCode2, Folder, Search } from "lucide-react";
import { allComponents, categories } from "@/data/categories";
import { useFlavor } from "@/lib/use-flavor";
import { cn, formatName } from "@/lib/utils";

interface SearchResult {
  type: "component" | "category";
  title: string;
  subtitle: string;
  href: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mounted only while open, so the query and selection start fresh every time.
export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  return isOpen ? <SearchDialog onClose={onClose} /> : null;
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const flavor = useFlavor();

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    const component = (c: (typeof allComponents)[number]): SearchResult => ({
      type: "component",
      title: formatName(c.name),
      subtitle: c.description || formatName(c.category),
      href: `/components/${c.category}/${c.name}?flavor=${flavor}`,
    });
    if (!q) return allComponents.slice(-8).reverse().map(component);

    const matchingCategories = categories
      .flatMap((c) => c.subcategories)
      .filter((sub) => sub.name.replace(/-/g, " ").includes(q))
      .map<SearchResult>((sub) => ({
        type: "category",
        title: formatName(sub.name),
        subtitle: `${sub.variants.length} components`,
        href: `/components/${sub.name}?flavor=${flavor}`,
      }));
    const matchingComponents = allComponents
      .filter((c) => `${c.name} ${c.category} ${c.description}`.replace(/-/g, " ").toLowerCase().includes(q))
      .map(component);
    return [...matchingCategories, ...matchingComponents].slice(0, 10);
  }, [query, flavor]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].href);
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
  }, [results, selectedIndex, router, onClose]);

  const open = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" onClick={onClose}>
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search components"
        initial={{ opacity: 0, scale: 0.96, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/30"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 text-muted" />
          <input
            ref={(input) => input?.focus()}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search components..."
            className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-subtle"
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">Esc</kbd>
        </div>

        <div className="thin-scrollbar max-h-[min(60vh,420px)] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-4 py-12 text-center text-sm text-muted">
              Nothing matches &ldquo;{query}&rdquo;. Try &ldquo;button&rdquo; or &ldquo;text&rdquo;.
            </p>
          ) : (
            <>
              <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                {query.trim() ? "Results" : "Newest"}
              </p>
              {results.map((result, index) => {
                const Icon = result.type === "category" ? Folder : FileCode2;
                const active = index === selectedIndex;
                return (
                  <button
                    key={result.href}
                    type="button"
                    onMouseMove={() => setSelectedIndex(index)}
                    onClick={() => open(result.href)}
                    className="relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left">
                    {active && (
                      <motion.span
                        layoutId="search-active"
                        className="absolute inset-0 rounded-xl bg-surface-2"
                        transition={{ type: "spring", stiffness: 600, damping: 40 }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative grid size-8 shrink-0 place-items-center rounded-lg border border-line",
                        active ? "text-accent" : "text-muted"
                      )}>
                      <Icon className="size-4" />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className="block text-sm font-medium">{result.title}</span>
                      <span className="block truncate text-xs text-muted">{result.subtitle}</span>
                    </span>
                    {active && <ArrowRight className="relative size-4 text-muted" />}
                  </button>
                );
              })}
            </>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-line px-1 font-mono">↑↓</kbd> Navigate
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-line px-1"><CornerDownLeft className="size-3" /></kbd> Open
          </span>
        </div>
      </motion.div>
    </div>
  );
}
