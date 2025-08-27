#!/usr/bin/env node

import { categories, isNewComponent } from "../data/categories";

export function getNewComponents() {
  const newComponents: Array<{
    category: string;
    subcategory: string;
    variant: string;
    dateAdded: string;
  }> = [];

  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      subcategory.variants.forEach((variant) => {
        if (isNewComponent(variant.dateAdded)) {
          newComponents.push({
            category: category.name,
            subcategory: subcategory.name,
            variant: variant.name,
            dateAdded: variant.dateAdded,
          });
        }
      });
    });
  });

  return newComponents;
}

export function markComponentAsNew(
  subcategoryName: string,
  variantName: string,
  dateAdded?: string
) {
  const date = dateAdded || new Date().toISOString().split("T")[0];
  console.log(
    `Component ${subcategoryName}/${variantName} marked as new (${date})`
  );

  return {
    subcategory: subcategoryName,
    variant: variantName,
    dateAdded: date,
  };
}

export function getExpiredNewComponents() {
  const expiredComponents: Array<{
    category: string;
    subcategory: string;
    variant: string;
    dateAdded: string;
    daysOld: number;
  }> = [];

  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      subcategory.variants.forEach((variant) => {
        const addedDate = new Date(variant.dateAdded);
        const today = new Date();
        const daysOld = Math.floor(
          (today.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysOld > 30) {
          expiredComponents.push({
            category: category.name,
            subcategory: subcategory.name,
            variant: variant.name,
            dateAdded: variant.dateAdded,
            daysOld,
          });
        }
      });
    });
  });

  return expiredComponents;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];

  switch (command) {
    case "list-new":
      console.log("New Components (added in last 30 days):");
      console.log("==========================================");
      const newComponents = getNewComponents();
      newComponents.forEach((comp) => {
        console.log(
          `${comp.subcategory}/${comp.variant} - Added: ${comp.dateAdded}`
        );
      });
      break;

    case "list-expired":
      console.log("Components no longer marked as 'new':");
      console.log("====================================");
      const expiredComponents = getExpiredNewComponents();
      expiredComponents.forEach((comp) => {
        console.log(
          `${comp.subcategory}/${comp.variant} - Added: ${comp.dateAdded} (${comp.daysOld} days ago)`
        );
      });
      break;

    default:
      console.log("Usage:");
      console.log(
        "  node component-dates.js list-new     - List all new components"
      );
      console.log(
        "  node component-dates.js list-expired - List components that are no longer new"
      );
  }
}
