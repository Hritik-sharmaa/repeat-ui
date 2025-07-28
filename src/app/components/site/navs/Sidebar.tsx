"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";
import { useVariant } from "@/app/context/code-context";

function formatName(name: string) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Sidebar() {
  const pathname = usePathname();
  const { flavor } = useVariant();

  return (
    <aside className="w-full sm:w-56 md:w-64 lg:min-w-[15rem] h-full overflow-y-auto">
      <nav className="px-2 sm:px-4 md:px-8 lg:px-12 pt-4">
        {categories.map((cat) => (
          <div key={cat.name} className="mb-6">
            <h3 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
              {formatName(cat.name)}
            </h3>
            <ul className="space-y-1">
              {cat.subcategories.map((sub) => (
                <li key={sub.name}>
                  <div className="text-gray-300 text-sm font-medium mb-2">
                    {formatName(sub.name)}
                  </div>
                  <ul className="pl-4 space-y-1">
                    {sub.variants.map((variant) => {
                      const path = `/components/${sub.name.toLowerCase()}/${variant.toLowerCase()}?flavor=${flavor}`;
                      const isActive = pathname === path;
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
                            {formatName(variant)}
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
