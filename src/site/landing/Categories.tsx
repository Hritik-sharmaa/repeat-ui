"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Reveal } from "@/site/motion/Reveal";
import { formatName } from "@/lib/utils";

export function Categories() {
  const subcategories = categories.flatMap((c) => c.subcategories);
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Catalog</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Browse by <span className="font-serif font-normal">category</span>.
          </h2>
        </div>
        <Link href="/components" className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
          See everything
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>

      <div role="list" className="border-t border-line">
        {subcategories.map((sub, i) => (
          <Reveal key={sub.name} delay={i * 0.04} role="listitem">
              <Link
                href={`/components/${sub.name}`}
                className="group relative flex items-center gap-6 border-b border-line py-6 transition-colors">
                {/* An accent line that wipes in under the hovered row. */}
                <span aria-hidden className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="w-8 font-mono text-sm text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-2xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                  {formatName(sub.name)}
                </span>
                <span className="hidden flex-1 truncate text-right text-sm text-muted md:block">
                  {sub.variants.slice(0, 4).map((v) => formatName(v.name)).join(" · ")}
                </span>
                <span className="ml-auto font-mono text-sm text-muted md:ml-0">{sub.variants.length}</span>
                <ArrowRight className="size-5 -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
