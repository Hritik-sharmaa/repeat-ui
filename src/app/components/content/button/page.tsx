"use client";
import React from "react";
import { useVariant } from "@/app/context/code-context";
import { categories } from "@/data/categories";
import Link from "next/link";
import ComponentLayout from "../../[category]/[variant]/layout";

export default function ButtonGalleryPage() {
  const { flavor } = useVariant();
  const buttonCategory = categories[0].subcategories.find(
    (sub) => sub.name.toLowerCase() === "button"
  );
  if (!buttonCategory) return <div>No button variants found.</div>;

  return (
    <ComponentLayout>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Button Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {buttonCategory.variants.map((variant) => (
            <Link
              key={variant.name}
              href={`/components/button/${variant.name}?flavor=${flavor}`}
              className="block p-6 bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-lg transition border border-zinc-200 dark:border-zinc-800 hover:-translate-y-1">
              <div className="text-lg font-semibold mb-2 capitalize">
                {variant.name}
              </div>
              <div className="flex items-center justify-center min-h-[48px]">
                <DemoPreview variant={variant.name} flavor={flavor} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ComponentLayout>
  );
}

function DemoPreview({ variant, flavor }: { variant: string; flavor: string }) {
  const [Demo, setDemo] = React.useState<React.ComponentType | null>(null);
  React.useEffect(() => {
    let isMounted = true;
    import(`@/app/components/content/button/${flavor}/${variant}/demo`)
      .then((mod) => {
        if (isMounted) setDemo(() => mod.default);
      })
      .catch(() => setDemo(null));
    return () => {
      isMounted = false;
    };
  }, [variant, flavor]);
  if (!Demo)
    return <span className="text-zinc-400 text-sm">Preview unavailable</span>;
  return <Demo />;
}
