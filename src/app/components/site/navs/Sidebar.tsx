"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";
import { useVariant } from "@/app/context/code-context";

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flavor } = useVariant();

  return (
    <aside className="w-64 h-full overflow-y-auto border-r border-zinc-800">
      <nav className="p-4">
        {categories.map((cat) => (
          <div key={cat.name} className="mb-6">
            <h3 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
              {cat.name}
            </h3>
            <ul className="space-y-1">
              {cat.subcategories.map((sub) => (
                <li key={sub.name}>
                  <div className="text-gray-300 text-sm font-medium mb-2">
                    {sub.name}
                  </div>
                  <ul className="pl-4 space-y-1">
                    {sub.variants.map((variant) => {
                      const path = `/components/${sub.name.toLowerCase()}/${variant.toLowerCase()}?flavor=${flavor}`;
                      const isActive = pathname === path;
                      console.log(
                        "Link:",
                        `/components/${sub.name.toLowerCase()}/${variant.toLowerCase()}`
                      );

                      return (
                        <li key={variant}>
                          <Link
                            href={path}
                            className={`
                              block py-1.5 px-2 rounded-md text-sm transition-colors duration-200
                              ${
                                isActive
                                  ? "bg-gray-800 text-white font-medium"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                              }
                            `}>
                            {variant}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
