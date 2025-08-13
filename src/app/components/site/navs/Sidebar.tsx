"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";
import { useVariant } from "@/app/context/code-context";
import { motion } from "framer-motion";


function formatName(name: string) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Sidebar() {
  const pathname = usePathname();
  const { flavor } = useVariant();


  return (
    <aside className="w-full h-full overflow-y-auto no-scrollbar">
      <nav
        className="pt-6 px-4 space-y-6"
       
      >
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="space-y-3"
            >
            <ul className="space-y-1">
              {cat.subcategories.map((sub, subIndex) => (
                <li key={sub.name} className="relative group ">
                  <Link href={`/components/${sub.name.toLowerCase()}`}>
                    <motion.div
                      className="text-sm font-medium mb-2 px-2 py-1 transition-colors rounded-md"
                      whileHover={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        scale: 1.02,
                      }}
                      transition={{ duration: 0.2 }}>
                      {formatName(sub.name)}
                    </motion.div>
                  </Link>
                  <ul
                    className={`ml-4 space-y-0.5 relative`}
                    >
                    <motion.div
                      className="absolute left-0 top-0 w-px bg-gray-700"
                      initial={{ height: 0 }}
                      animate={{
                        height:
                          subIndex === cat.subcategories.length - 1
                            ? "calc(100% - 0.5rem)"
                            : "100%",
                      }}
                     
                    />
                    {sub.variants.map((variant, variantIndex) => {
                      const variantPath = `/components/${sub.name.toLowerCase()}/${variant.toLowerCase()}`;
                      const isActive = pathname === variantPath;
                      return (
                        <motion.li
                          key={variant}
                          className={`relative pl-2 group/item transition-colors duration-200 ${
                            isActive
                              ? "text-white"
                              : "text-zinc-400 hover:text-white"
                          }`}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.3 + variantIndex * 0.1 }}>
                          <motion.div
                            className={`absolute left-0 top-0 w-px bg-white h-full origin-top transition-transform duration-200 ease-out rounded-full ${
                              isActive
                                ? "scale-y-100"
                                : "scale-y-0 group-hover/item:scale-y-100"
                            }`}
                          />

                          <Link
                            href={`${variantPath}?flavor=${flavor}`}
                            className={`flex items-center py-2 px-3 text-sm rounded-md transition-all duration-200 ${
                              isActive
                                ? "sidebar-active-text"
                                : "sidebar-inactive-text"
                            }`}>
                            <motion.span
                              whileHover={{
                                scale: 1.05,
                                x: 4,
                              }}
                              transition={{ duration: 0.2 }}>
                              {formatName(variant)}
                            </motion.span>
                            {isActive && (
                              <motion.div
                                className="absolute inset-0 bg-white/10 rounded-md -z-10"
                                layoutId="activeTab"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </Link>
                        </motion.li>
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
