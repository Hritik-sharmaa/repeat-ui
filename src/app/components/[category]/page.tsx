"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { categories } from "@/data/categories";
import { DemoTile } from "@/site/ui/DemoTile";
import { Reveal } from "@/site/motion/Reveal";
import { categoryStyle, tintStyle } from "@/site/categoryStyle";
import { useFlavor } from "@/lib/use-flavor";
import { cn, formatName } from "@/lib/utils";

export default function CategoryGalleryPage() {
  const { category } = useParams<{ category: string }>();
  const flavor = useFlavor();
  const subcategories = categories.flatMap((cat) => cat.subcategories);
  const subcategory = subcategories.find((sub) => sub.name === category);
  if (!subcategory) notFound();
  const { icon: Icon, blurb } = categoryStyle(category);

  return (
    <div className="py-8 sm:py-10" style={tintStyle(category)}>
      <Reveal>
        <section className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-10 sm:px-10 sm:py-12">
          <div aria-hidden className="tint-glow absolute inset-0" />
          <div aria-hidden className="bg-grid fade-edges absolute inset-0 opacity-60" />
          {/* The category icon, large and faint, as a backdrop. */}
          <Icon aria-hidden strokeWidth={1} className="absolute -right-6 -top-6 size-56 text-(--tint) opacity-[0.08]" />
          <div className="relative">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
              <Link href={`/components?flavor=${flavor}`} className="hover:text-fg">
                Components
              </Link>
              <span className="text-subtle">/</span>
              <span className="text-fg">{formatName(category)}</span>
            </nav>
            <div className="mt-6 grid size-12 place-items-center rounded-2xl border border-line bg-bg/60 backdrop-blur">
              <Icon className="size-5 text-(--tint)" />
            </div>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">{formatName(category)}</h1>
            <p className="mt-3 max-w-xl text-lg text-muted">{blurb}</p>
            <p className="mt-6 font-mono text-xs text-subtle">
              {subcategory.variants.length} components · TS / JS · Tailwind / CSS
            </p>
          </div>
        </section>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {subcategory.variants.map((variant, i) => (
          <Reveal key={variant.name} delay={(i % 3) * 0.06}>
            <DemoTile
              size="sm"
              category={category}
              variants={[variant.name]}
              title={formatName(variant.name)}
              subtitle={variant.description}
              href={`/components/${category}/${variant.name}?flavor=${flavor}`}
              style={flavor.split("-")[1]}
            />
          </Reveal>
        ))}
      </div>

      {/* Hop to the other categories without going back to the sidebar. */}
      <nav aria-label="Other categories" className="mt-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">Other categories</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {subcategories
            .filter((sub) => sub.name !== category)
            .map((sub) => {
              const { icon: SubIcon } = categoryStyle(sub.name);
              return (
                <Link
                  key={sub.name}
                  href={`/components/${sub.name}?flavor=${flavor}`}
                  style={tintStyle(sub.name)}
                  className={cn(
                    "inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                  )}>
                  <SubIcon className="size-3.5 text-(--tint)" />
                  {formatName(sub.name)}
                  <span className="font-mono text-xs text-subtle">{sub.variants.length}</span>
                </Link>
              );
            })}
        </div>
      </nav>
    </div>
  );
}
