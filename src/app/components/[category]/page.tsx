"use client";
import React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useFlavor } from "@/lib/use-flavor";
import { categories } from "@/data/categories";

// Buttons are small enough to preview live in a card; bigger components (and cursors,
// which take over the whole page) show their description instead.
const LIVE_PREVIEW = new Set(["button"]);

export default function CategoryGalleryPage() {
  const { category } = useParams<{ category: string }>();
  const flavor = useFlavor();
  const subcategory = categories
    .flatMap((cat) => cat.subcategories)
    .find((sub) => sub.name.toLowerCase() === category);
  if (!subcategory) notFound();

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {category.replace(/-/g, " ")} Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {subcategory.variants.map((variant) => (
          <Link
            key={variant.name}
            href={`/components/${category}/${variant.name}?flavor=${flavor}`}
            className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-lg transition border border-zinc-200 dark:border-zinc-800 hover:-translate-y-1 h-56 flex flex-col z-20">
            <div className="text-lg font-semibold mb-4 capitalize">
              {variant.name.replace(/-/g, " ")}
            </div>
            <div className="flex items-center justify-center flex-1 overflow-hidden relative">
              {LIVE_PREVIEW.has(category) ? (
                <DemoPreview
                  category={category}
                  variant={variant.name}
                  style={flavor.split("-")[1]}
                />
              ) : (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {variant.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function DemoPreview({
  category,
  variant,
  style,
}: {
  category: string;
  variant: string;
  style: string;
}) {
  const [Demo, setDemo] = React.useState<React.ComponentType | null>(null);
  React.useEffect(() => {
    let isMounted = true;
    import(`@/registry/${category}/${variant}/${style}/demo`)
      .then((mod) => {
        if (isMounted) setDemo(() => mod.default);
      })
      .catch(() => setDemo(null));
    return () => {
      isMounted = false;
    };
  }, [category, variant, style]);
  if (!Demo)
    return <span className="text-zinc-400 text-sm">Preview unavailable</span>;
  return <Demo />;
}
