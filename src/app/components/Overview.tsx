"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { allComponents, categories } from "@/data/categories";
import { DemoTile } from "@/site/ui/DemoTile";
import { Command } from "@/site/ui/Command";
import { Reveal } from "@/site/motion/Reveal";
import { categoryStyle } from "@/site/categoryStyle";
import { useFlavor } from "@/lib/use-flavor";
import { cn, formatName } from "@/lib/utils";

const STATS = (count: number, groups: number) => [
  { value: count, label: "components" },
  { value: groups, label: "categories" },
  { value: 4, label: "flavors each" },
  { value: 0, label: "runtime packages" },
];

export function Overview() {
  const flavor = useFlavor();
  const style = flavor.split("-")[1];
  const subcategories = categories.flatMap((c) => c.subcategories);
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? allComponents : allComponents.filter((c) => c.category === filter);

  return (
    <div className="py-8 sm:py-10">
      <Reveal>
        <section className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-12 sm:px-10 sm:py-14">
          <div aria-hidden className="tint-glow absolute inset-0" />
          <div aria-hidden className="bg-grid fade-edges absolute inset-0 opacity-60" />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Library</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Every component, <span className="font-serif font-normal text-accent">live</span>.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Hover them, click them, drag them. Then open one for its code and add it with one command.
            </p>
            <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {STATS(allComponents.length, subcategories.length).map((stat) => (
                <div key={stat.label} className="bg-surface px-4 py-3">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight tabular-nums">{stat.value}</dd>
                  <dd className="text-xs text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
            <Command className="mt-6 max-w-md bg-bg/60 backdrop-blur" text="npx @hritik-sharmaa/repeat-ui list" />
          </div>
        </section>
      </Reveal>

      {/* Category filter. Stays in view while scrolling the grid. */}
      <div className="sticky top-14 z-10 -mx-4 mt-8 bg-bg/80 px-4 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto" role="tablist" aria-label="Filter by category">
          {[{ name: "all", variants: allComponents }, ...subcategories].map((sub) => {
            const active = filter === sub.name;
            const Icon = sub.name === "all" ? null : categoryStyle(sub.name).icon;
            return (
              <button
                key={sub.name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(sub.name)}
                className={cn(
                  "relative inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
                  active ? "border-transparent text-bg" : "border-line text-muted hover:border-line-strong hover:text-fg"
                )}>
                {active && (
                  <motion.span
                    layoutId="overview-filter"
                    className="absolute inset-0 rounded-full bg-fg"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
                {Icon && <Icon className="relative size-3.5" />}
                <span className="relative">{sub.name === "all" ? "All" : formatName(sub.name)}</span>
                <span className={cn("relative font-mono text-xs", active ? "text-bg/60" : "text-subtle")}>
                  {sub.variants.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((c) => (
            <motion.div
              key={`${c.category}-${c.name}`}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}>
              <DemoTile
                size="sm"
                showCategory={filter === "all"}
                category={c.category}
                variants={[c.name]}
                title={formatName(c.name)}
                subtitle={c.description}
                href={`/components/${c.category}/${c.name}?flavor=${flavor}`}
                style={style}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
