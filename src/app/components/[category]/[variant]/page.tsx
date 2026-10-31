import { notFound } from "next/navigation";
import ComponentTabs from "@/site/ui/ComponentTabs";
import PropTable from "@/site/ui/PropTable";
import InstallationGuide from "@/site/ui/InstallationGuide";
import ScrollToTopButton from "@/site/ui/ScrollToTopButton";
import { categories } from "@/data/categories";
import type { ComponentMeta } from "@/registry/catalog";
import { generateComponentMetadata } from "@/lib/faviconGenerator";
import { DEFAULT_FLAVOR, isFlavor } from "@/lib/flavor";

interface RegistryItem {
  shadcnName: string;
  dependencies: string[];
  files: { path: string; content: string }[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category?: string; variant?: string }>;
}) {
  const category = (await params)?.category?.toLowerCase();
  const variant = (await params)?.variant?.toLowerCase();

  if (!category || !variant) {
    return {
      title: "Component Not Found - Repeat UI",
      description: "The requested component could not be found.",
    };
  }

  return generateComponentMetadata(category, variant);
}

export default async function ComponentVariantPage({
  params,
  searchParams,
}: {
  params: Promise<{ category?: string; variant?: string }>;
  searchParams?: Promise<{ flavor?: string }>;
}) {
  const category = (await params)?.category?.toLowerCase();
  const variant = (await params)?.variant?.toLowerCase();
  const flavor = (await searchParams)?.flavor || DEFAULT_FLAVOR;

  const exists = categories
    .flatMap((cat) => cat.subcategories)
    .find((sub) => sub.name === category)
    ?.variants.some((v) => v.name === variant);

  if (!category || !variant || !exists || !isFlavor(flavor)) {
    notFound();
  }

  // Both files exist for every listed component and flavor, or scripts/build-registry.ts fails the build.
  // shortcut: the JSON is generated when dev/build starts, so the Code tab is stale while you edit a
  // component in dev; rerun `npm run registry` to refresh it.
  const style = flavor.split("-")[1];
  const Demo = (await import(`@/registry/${category}/${variant}/${style}/demo`)).default;
  const meta: ComponentMeta = (await import(`@/registry/${category}/${variant}/meta`)).default;
  const item: RegistryItem = (
    await import(`@/registry/__generated__/${flavor}/${category}-${variant}.json`)
  ).default;

  const preview = item.files.find((f) => f.path.startsWith("preview."))!;
  const css = item.files.find((f) => f.path.endsWith(".css"));

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-6xl font-bold capitalize mb-4 font-cal-sans">
          {variant.replace(/-/g, " ")}
        </h1>
        {meta.description && (
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-4">
            {meta.description}
          </p>
        )}
      </div>

      <ComponentTabs
        component={<Demo />}
        sourceCode={preview.content}
        fileName={preview.path}
        cssCode={css?.content ?? null}
      />

      <InstallationGuide
        componentName={`${category}-${variant}`}
        shadcnName={item.shadcnName}
        variant={flavor}
        dependencies={item.dependencies}
      />
      <div className="mb-28">
        <PropTable data={meta.props} />
      </div>

      <ScrollToTopButton />
    </main>
  );
}
