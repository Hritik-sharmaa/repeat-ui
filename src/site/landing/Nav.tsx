"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Github, Search } from "lucide-react";
import { Logo } from "@/site/brand/Logo";
import ThemeToggle from "@/site/ui/ThemeToggler";
import { SearchModal } from "@/site/ui/SearchModal";
import { useSearch } from "@/app/context/search-context";
import { useGitHubStars } from "@/lib/use-github-stars";
import { cn, formatStarCount, GITHUB_URL } from "@/lib/utils";

// Floating pill nav for the landing page. It gains a surface once the page scrolls.
export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));
  const { isSearchOpen, openSearch, closeSearch } = useSearch();
  const stars = useGitHubStars();

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 px-4">
        <nav
          className={cn(
            "mx-auto flex h-14 max-w-5xl items-center gap-2 rounded-full border pl-4 pr-2 transition-all duration-300 sm:pl-5",
            scrolled
              ? "border-line bg-bg/70 shadow-lg shadow-black/5 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}>
          <Link href="/" aria-label="Repeat UI home">
            <Logo animate />
          </Link>

          <div className="ml-6 hidden items-center gap-1 text-sm text-muted md:flex">
            <Link href="/components" className="rounded-full px-3 py-1.5 transition-colors hover:text-fg">
              Components
            </Link>
            <Link href="/#install" className="rounded-full px-3 py-1.5 transition-colors hover:text-fg">
              Install
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={openSearch}
              className="hidden h-9 items-center gap-2 rounded-full border border-line bg-surface/60 pl-3 pr-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-flex">
              <Search className="size-4" />
              <span className="pr-6">Search</span>
              <kbd className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
            </button>
            <button type="button" onClick={openSearch} aria-label="Search components" className="grid size-9 place-items-center rounded-full text-muted hover:text-fg sm:hidden">
              <Search className="size-4" />
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 items-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:text-fg sm:inline-flex">
              <Github className="size-4" />
              {stars !== null && <span className="font-mono text-xs">{formatStarCount(stars)}</span>}
            </a>
            <ThemeToggle className="size-9" />
            <Link
              href="/components"
              className="ml-1 inline-flex h-9 items-center rounded-full bg-fg px-4 text-sm font-medium text-bg md:hidden">
              Browse
            </Link>
          </div>
        </nav>
      </motion.header>
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
