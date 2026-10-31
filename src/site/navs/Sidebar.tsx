"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { categories, isNewComponent } from "@/data/categories";
import { useFlavor } from "@/lib/use-flavor";
import { formatDateForDisplay } from "@/lib/dateUtils";
import { cn, formatName } from "@/lib/utils";

// The component navigation, in the desktop sidebar and the mobile drawer.
// `layoutGroup` keeps the two active pills from animating between each other.
export default function Sidebar({
  onNavigate,
  layoutGroup = "sidebar",
}: {
  onNavigate?: () => void;
  layoutGroup?: string;
}) {
  const pathname = usePathname();
  const flavor = useFlavor();

  const item = (href: string, label: React.ReactNode, active: boolean, extra?: React.ReactNode) => (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
        active ? "text-fg" : "text-muted hover:text-fg"
      )}>
      {active && (
        <motion.span
          layoutId={`${layoutGroup}-active`}
          className="absolute inset-0 rounded-lg bg-surface-2"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}>
          <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-accent" />
        </motion.span>
      )}
      <span className="relative truncate">{label}</span>
      {extra && <span className="relative">{extra}</span>}
    </Link>
  );

  return (
    <nav className="space-y-7 px-3 py-6 text-sm">
      <div>
        <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">Getting started</p>
        {item(`/components?flavor=${flavor}`, "All components", pathname === "/components")}
        {item("/#install", "Installation", false)}
      </div>

      {categories
        .flatMap((cat) => cat.subcategories)
        .map((sub) => {
          const categoryPath = `/components/${sub.name}`;
          return (
            <div key={sub.name}>
              <Link
                href={`${categoryPath}?flavor=${flavor}`}
                onClick={onNavigate}
                className={cn(
                  "mb-1 flex items-baseline justify-between px-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:text-fg",
                  pathname === categoryPath ? "text-accent" : "text-subtle"
                )}>
                {formatName(sub.name)}
                <span className="tabular-nums">{sub.variants.length}</span>
              </Link>
              {sub.variants.map((variant) => {
                const href = `${categoryPath}/${variant.name}`;
                return (
                  <div key={variant.name}>
                    {item(
                      `${href}?flavor=${flavor}`,
                      formatName(variant.name),
                      pathname === href,
                      isNewComponent(variant.dateAdded) && (
                        <span
                          className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-accent"
                          title={`Added on ${formatDateForDisplay(variant.dateAdded)}`}>
                          New
                        </span>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
    </nav>
  );
}
