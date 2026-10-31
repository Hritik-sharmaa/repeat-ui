"use client";

import { allComponents, categories } from "@/data/categories";
import { DemoTile } from "@/site/ui/DemoTile";
import { Reveal } from "@/site/motion/Reveal";
import { useFlavor } from "@/lib/use-flavor";
import { formatName } from "@/lib/utils";

export function Overview() {
  const flavor = useFlavor();
  const subcategories = categories.flatMap((c) => c.subcategories);
  return (
    <div className="py-12 sm:py-16">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Library</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">Components</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          {allComponents.length} animated components in {subcategories.length} categories. Pick a
          category to see them all running.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {subcategories.map((sub, i) => (
          <Reveal key={sub.name} delay={(i % 2) * 0.06}>
            <DemoTile
              category={sub.name}
              variants={[sub.variants[0].name]}
              title={formatName(sub.name)}
              subtitle={sub.name === "cursor" ? sub.variants[0].description : `${sub.variants.length} components`}
              href={`/components/${sub.name}?flavor=${flavor}`}
              style={flavor.split("-")[1]}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
