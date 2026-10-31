"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { categories } from "@/data/categories";
import { DemoTile } from "@/site/ui/DemoTile";
import { Reveal } from "@/site/motion/Reveal";
import { useFlavor } from "@/lib/use-flavor";
import { formatName } from "@/lib/utils";

export default function CategoryGalleryPage() {
  const { category } = useParams<{ category: string }>();
  const flavor = useFlavor();
  const subcategory = categories
    .flatMap((cat) => cat.subcategories)
    .find((sub) => sub.name === category);
  if (!subcategory) notFound();

  return (
    <div className="py-12 sm:py-16">
      <Reveal>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
          <Link href={`/components?flavor=${flavor}`} className="hover:text-fg">
            Components
          </Link>
          <span className="text-subtle">/</span>
          <span className="text-fg">{formatName(category)}</span>
        </nav>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">{formatName(category)}</h1>
        <p className="mt-4 text-lg text-muted">
          {subcategory.variants.length} components. Open one for its code, install command and props.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {subcategory.variants.map((variant, i) => (
          <Reveal key={variant.name} delay={(i % 2) * 0.06}>
            <DemoTile
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
    </div>
  );
}
