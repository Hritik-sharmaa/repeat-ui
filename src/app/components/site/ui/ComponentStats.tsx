import React from "react";
import { categories, isNewComponent } from "@/data/categories";

interface ComponentStatsProps {
  className?: string;
}

export const ComponentStats: React.FC<ComponentStatsProps> = ({
  className = "",
}) => {
  const stats = React.useMemo(() => {
    let totalComponents = 0;
    let newComponents = 0;
    const categoryStats: Array<{
      name: string;
      total: number;
      new: number;
    }> = [];

    categories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        let categoryTotal = 0;
        let categoryNew = 0;

        subcategory.variants.forEach((variant) => {
          totalComponents++;
          categoryTotal++;

          if (isNewComponent(variant.dateAdded)) {
            newComponents++;
            categoryNew++;
          }
        });

        // Find existing category or create new one
        const existingCategory = categoryStats.find(
          (c) => c.name === subcategory.name
        );
        if (existingCategory) {
          existingCategory.total += categoryTotal;
          existingCategory.new += categoryNew;
        } else {
          categoryStats.push({
            name: subcategory.name,
            total: categoryTotal,
            new: categoryNew,
          });
        }
      });
    });

    return {
      total: totalComponents,
      new: newComponents,
      categories: categoryStats,
    };
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-zinc-400">Total Components</div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-green-400">{stats.new}</div>
            {stats.new > 0 && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                NEW
              </span>
            )}
          </div>
          <div className="text-sm text-zinc-400">New Components</div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-zinc-300">By Category</h4>
        <div className="space-y-1">
          {stats.categories.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between py-2 px-3 bg-zinc-900/30 border border-zinc-800/50 rounded-md">
              <span className="text-sm text-zinc-300 capitalize">
                {category.name.replace(/-/g, " ")}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">{category.total}</span>
                {category.new > 0 && (
                  <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                    {category.new}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentStats;
