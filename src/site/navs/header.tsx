"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Github, Menu, Search, X } from "lucide-react";
import { Logo } from "@/site/brand/Logo";
import ThemeToggle from "@/site/ui/ThemeToggler";
import { SearchModal } from "@/site/ui/SearchModal";
import { Segmented } from "@/site/ui/Segmented";
import Sidebar from "@/site/navs/Sidebar";
import { useSearch } from "@/app/context/search-context";
import { useFlavor } from "@/lib/use-flavor";
import { useGitHubStars } from "@/lib/use-github-stars";
import { formatStarCount, GITHUB_URL } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const flavor = useFlavor();
  const { isSearchOpen, openSearch, closeSearch } = useSearch();
  const stars = useGitHubStars();
  // The page the drawer was opened on, so navigating closes it.
  const [drawerOn, setDrawerOn] = useState<string | null>(null);
  const drawerOpen = drawerOn === pathname;

  const [language, style] = flavor.split("-");

  const updateFlavor = (newLang: string, newStyle: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("flavor", `${newLang}-${newStyle}`);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // No page scroll behind the open drawer.
  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const flavorControls = (
    <>
      <Segmented
        size="sm"
        label="Language"
        value={language}
        onChange={(lang) => updateFlavor(lang, style)}
        options={[
          { value: "ts", label: "TS" },
          { value: "js", label: "JS" },
        ]}
      />
      <Segmented
        size="sm"
        label="Styling"
        value={style}
        onChange={(s) => updateFlavor(language, s)}
        options={[
          { value: "tailwind", label: "Tailwind" },
          { value: "css", label: "CSS" },
        ]}
      />
    </>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-line bg-bg/80 backdrop-blur-xl">
        <div className="flex h-full items-center gap-3 px-4 lg:px-5">
          <button
            type="button"
            onClick={() => setDrawerOn(drawerOpen ? null : pathname)}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg lg:hidden">
            {drawerOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <Link href="/" aria-label="Repeat UI home">
            <Logo />
          </Link>

          <button
            type="button"
            onClick={openSearch}
            className="ml-4 hidden h-8 w-64 items-center gap-2 rounded-full border border-line bg-surface pl-3 pr-1 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg md:inline-flex">
            <Search className="size-3.5" />
            <span className="flex-1 text-left">Search components</span>
            <kbd className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>

          <div className="ml-auto flex items-center gap-1.5">
            <div className="hidden items-center gap-1.5 sm:flex">{flavorControls}</div>
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search components"
              className="grid size-8 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-fg md:hidden">
              <Search className="size-4" />
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-8 items-center gap-1.5 rounded-full px-2.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg sm:inline-flex">
              <Github className="size-4" />
              {stars !== null && <span className="font-mono text-xs">{formatStarCount(stars)}</span>}
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-0 top-14 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOn(null)}
            />
            <motion.aside
              className="thin-scrollbar fixed bottom-0 left-0 top-14 z-30 w-[min(20rem,85vw)] overflow-y-auto border-r border-line bg-bg lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}>
              <div className="flex flex-wrap gap-1.5 border-b border-line p-4 sm:hidden">{flavorControls}</div>
              <Sidebar layoutGroup="drawer" onNavigate={() => setDrawerOn(null)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
