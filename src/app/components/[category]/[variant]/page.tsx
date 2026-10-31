import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ComponentTabs from "@/site/ui/ComponentTabs";
import PropTable from "@/site/ui/PropTable";
import InstallationGuide from "@/site/ui/InstallationGuide";
import ScrollToTopButton from "@/site/ui/ScrollToTopButton";
import { allComponents, isNewComponent } from "@/data/categories";
import type { ComponentMeta } from "@/registry/catalog";
import { generateComponentMetadata } from "@/lib/faviconGenerator";
import { DEFAULT_FLAVOR, isFlavor } from "@/lib/flavor";
import { formatName } from "@/lib/utils";

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

  const index = allComponents.findIndex((c) => c.category === category && c.name === variant);
  if (!category || !variant || index === -1 || !isFlavor(flavor)) {
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
  const neighbours = [
    { link: allComponents[index - 1], label: "Previous", Icon: ArrowLeft },
    { link: allComponents[index + 1], label: "Next", Icon: ArrowRight },
  ];

  return (
    <div className="py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
        <Link href={`/components?flavor=${flavor}`} className="hover:text-fg">
          Components
        </Link>
        <span className="text-subtle">/</span>
        <Link href={`/components/${category}?flavor=${flavor}`} className="hover:text-fg">
          {formatName(category)}
        </Link>
      </nav>

      <header className="mt-4 mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{formatName(variant)}</h1>
          {isNewComponent(meta.dateAdded) && (
            <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">New</span>
          )}
        </div>
        {meta.description && <p className="mt-3 max-w-2xl text-lg text-muted">{meta.description}</p>}
        <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs text-muted">
          <span className="rounded-full border border-line px-2.5 py-1">v{meta.version}</span>
          {item.dependencies.length === 0 ? (
            <span className="rounded-full border border-line px-2.5 py-1">no dependencies</span>
          ) : (
            item.dependencies.map((dep) => (
              <span key={dep} className="rounded-full border border-line px-2.5 py-1">
                {dep}
              </span>
            ))
          )}
        </div>
      </header>

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
      <PropTable data={meta.props} />

      <nav aria-label="More components" className="mt-20 grid gap-3 sm:grid-cols-2">
        {neighbours.map(({ link, label, Icon }) =>
          link ? (
            <Link
              key={label}
              href={`/components/${link.category}/${link.name}?flavor=${flavor}`}
              className={`group rounded-2xl border border-line p-5 transition-colors hover:border-line-strong hover:bg-surface ${
                label === "Next" ? "sm:col-start-2 sm:text-right" : ""
              }`}>
              <span className={`flex items-center gap-1.5 text-sm text-muted ${label === "Next" ? "sm:justify-end" : ""}`}>
                {label === "Previous" && <Icon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />}
                {label}
                {label === "Next" && <Icon className="size-3.5 transition-transform group-hover:translate-x-0.5" />}
              </span>
              <span className="mt-1 block text-lg font-medium transition-colors group-hover:text-accent">
                {formatName(link.name)}
              </span>
            </Link>
          ) : null
        )}
      </nav>

      <ScrollToTopButton />
    </div>
  );
}
