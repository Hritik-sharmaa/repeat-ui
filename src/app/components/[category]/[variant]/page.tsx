import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ComponentTabs from "@/site/ui/ComponentTabs";
import PropTable from "@/site/ui/PropTable";
import InstallationGuide from "@/site/ui/InstallationGuide";
import ScrollToTopButton from "@/site/ui/ScrollToTopButton";
import { OnThisPage } from "@/site/ui/OnThisPage";
import { DemoTile } from "@/site/ui/DemoTile";
import { Command } from "@/site/ui/Command";
import { categoryStyle, tintStyle } from "@/site/categoryStyle";
import { allComponents, isNewComponent } from "@/data/categories";
import type { ComponentMeta } from "@/registry/catalog";
import { generateComponentMetadata } from "@/lib/faviconGenerator";
import { formatDateForDisplay } from "@/lib/dateUtils";
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
  const { icon: CategoryIcon } = categoryStyle(category);
  const name = `${category}-${variant}`;
  const installCommand = `npx @hritik-sharmaa/repeat-ui add ${name}${flavor === DEFAULT_FLAVOR ? "" : ` --variant ${flavor}`}`;
  const siblings = allComponents.filter((c) => c.category === category && c.name !== variant).slice(0, 3);
  const neighbours = [
    { link: allComponents[index - 1], label: "Previous", Icon: ArrowLeft },
    { link: allComponents[index + 1], label: "Next", Icon: ArrowRight },
  ];
  const sections = [
    { id: "preview", label: "Preview" },
    { id: "installation", label: "Installation" },
    ...(meta.props.length ? [{ id: "props", label: "Props" }] : []),
    ...(siblings.length ? [{ id: "more", label: `More ${formatName(category).toLowerCase()}` }] : []),
  ];
  const details = [
    {
      label: "Category",
      value: (
        <Link href={`/components/${category}?flavor=${flavor}`} className="inline-flex items-center gap-1.5 hover:text-accent">
          <CategoryIcon className="size-3.5 text-(--tint)" />
          {formatName(category)}
        </Link>
      ),
    },
    { label: "Added", value: formatDateForDisplay(meta.dateAdded) },
    { label: "Version", value: meta.version },
    { label: "Packages", value: item.dependencies.length ? item.dependencies.join(", ") : "None" },
    { label: "Flavors", value: "TS · JS · Tailwind · CSS" },
  ];

  return (
    <div className="py-8 sm:py-10" style={tintStyle(category)}>
      <header className="relative overflow-hidden rounded-[2rem] border border-line bg-surface">
        <div aria-hidden className="tint-glow absolute inset-0" />
        <div aria-hidden className="bg-grid fade-edges absolute inset-0 opacity-50" />
        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
              <Link href={`/components?flavor=${flavor}`} className="hover:text-fg">
                Components
              </Link>
              <span className="text-subtle">/</span>
              <Link href={`/components/${category}?flavor=${flavor}`} className="hover:text-fg">
                {formatName(category)}
              </Link>
            </nav>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{formatName(variant)}</h1>
              {isNewComponent(meta.dateAdded) && (
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">New</span>
              )}
            </div>
            {meta.description && <p className="mt-3 max-w-xl text-lg text-muted">{meta.description}</p>}
            <Command className="mt-7 max-w-xl bg-bg/60 backdrop-blur" text={installCommand} />
          </div>

          <dl className="self-end rounded-2xl border border-line bg-bg/50 p-4 text-sm backdrop-blur">
            {details.map(({ label, value }) => (
              <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line py-2 first:pt-0 last:border-0 last:pb-0">
                <dt className="text-muted">{label}</dt>
                <dd className="truncate text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mt-10 grid gap-12 xl:grid-cols-[minmax(0,1fr)_10rem]">
        <div className="min-w-0">
          <ComponentTabs
            category={category}
            component={<Demo />}
            sourceCode={preview.content}
            fileName={preview.path}
            cssCode={css?.content ?? null}
          />

          <InstallationGuide componentName={name} shadcnName={item.shadcnName} variant={flavor} dependencies={item.dependencies} />
          <PropTable data={meta.props} />

          {siblings.length > 0 && (
            <section id="more" className="mt-16 scroll-mt-20">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-tight">More {formatName(category).toLowerCase()}</h2>
                <Link href={`/components/${category}?flavor=${flavor}`} className="group inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
                  See all
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {siblings.map((s) => (
                  <DemoTile
                    key={s.name}
                    size="sm"
                    category={category}
                    variants={[s.name]}
                    title={formatName(s.name)}
                    subtitle={s.description}
                    href={`/components/${category}/${s.name}?flavor=${flavor}`}
                    style={style}
                  />
                ))}
              </div>
            </section>
          )}

          <nav aria-label="More components" className="mt-16 grid gap-3 sm:grid-cols-2">
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
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <OnThisPage sections={sections} />
          </div>
        </aside>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
