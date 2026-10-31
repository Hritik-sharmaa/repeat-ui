// Built from each component's meta.ts by scripts/build-registry.ts. To add a component,
// run `npm run new <category> <name>` instead of editing this file.
import catalog from "@/registry/__generated__/catalog.json";
import type { ComponentMeta } from "@/registry/catalog";

export type ComponentVariant = Omit<ComponentMeta, "props"> & { name: string };

export interface Subcategory {
  name: string;
  variants: ComponentVariant[];
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

export const isNewComponent = (dateAdded: string): boolean => {
  const addedDate = new Date(dateAdded);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return addedDate > thirtyDaysAgo;
};

export const categories: Category[] = [
  { name: "Components", subcategories: catalog as Subcategory[] },
];

// Every component in sidebar order, with its category.
export const allComponents = categories
  .flatMap((c) => c.subcategories)
  .flatMap((sub) => sub.variants.map((v) => ({ ...v, category: sub.name })));
