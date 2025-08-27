"use client";

import { Search, ChevronDown, Github } from 'lucide-react';
import { Button } from "@/app/components/site/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/site/ui/Dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/app/components/site/ui/ThemeToggler";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useVariant } from "@/app/context/code-context";
import { useSearch } from "@/app/context/search-context";
import { SearchModal } from "@/app/components/site/ui/SearchModal";
import { fetchGitHubStars, formatStarCount } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flavor, setFlavor } = useVariant();
  const { isSearchOpen, openSearch, closeSearch } = useSearch();
  const [starCount, setStarCount] = useState<number>(0);
  const [isLoadingStars, setIsLoadingStars] = useState(true);

  const [language, style] = flavor.split("-");

  useEffect(() => {
    const queryFlavor = searchParams.get("flavor");
    if (queryFlavor && queryFlavor !== flavor) {
      setFlavor(queryFlavor);
    }
  }, [searchParams, flavor, setFlavor]);

  useEffect(() => {
    const loadStars = async () => {
      try {
        setIsLoadingStars(true);
        const stars = await fetchGitHubStars("hritik-sharmaa", "repeat-ui");
        setStarCount(stars);
      } catch (error) {
        console.warn("Failed to load GitHub stars:", error);
      } finally {
        setIsLoadingStars(false);
      }
    };

    loadStars();
  }, []);

  const updateFlavor = (newLang: string, newStyle: string) => {
    const newFlavor = `${newLang}-${newStyle}`;
    setFlavor(newFlavor);

    const params = new URLSearchParams(searchParams.toString());
    params.set("flavor", newFlavor);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-5xl">
        <div className="rounded-2xl shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/90 border border-zinc-200/50 dark:border-zinc-700/50 flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 transition-all duration-300 hover:opacity-80"
            >
              <div className="relative">
                <Image 
                  src="/Logo.png" 
                  alt="Repeat UI Logo" 
                  width={36} 
                  height={36}
                  className="rounded-lg"
                />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                Repeat UI
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button
                variant="outline"
                onClick={openSearch}
                className="w-64 justify-start gap-3 bg-muted/30 border-zinc-300 dark:border-zinc-600 rounded-xl px-4 py-2 text-muted-foreground hover:bg-muted/50 transition-all duration-200"
              >
                <Search className="h-4 w-4" />
                <span className="flex-1 text-left">Search components...</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-300 dark:border-zinc-600 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="lg:hidden rounded-xl border-zinc-300 dark:border-zinc-600"
              onClick={openSearch}
            >
              <Search className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-xl border-zinc-300 dark:border-zinc-600 min-w-[80px]"
                >
                  {language.toUpperCase()}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl border-zinc-300 dark:border-zinc-600">
                <DropdownMenuItem
                  onClick={() => updateFlavor("js", style)}
                  className="rounded-lg"
                >
                  JavaScript
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updateFlavor("ts", style)}
                  className="rounded-lg"
                >
                  TypeScript
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-xl border-zinc-300 dark:border-zinc-600 min-w-[100px]"
                >
                  {style === "tailwind" ? "Tailwind" : "CSS"}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl border-zinc-300 dark:border-zinc-600">
                <DropdownMenuItem
                  onClick={() => updateFlavor(language, "css")}
                  className="rounded-lg"
                >
                  CSS
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updateFlavor(language, "tailwind")}
                  className="rounded-lg"
                >
                  Tailwind CSS
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            <a
              href="https://github.com/hritik-sharmaa/repeat-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 hover:bg-muted/50 transition-all duration-200 font-medium border border-zinc-300 dark:border-zinc-600 rounded-xl px-3 py-2 text-sm"
            >
              <Github className="h-4 w-4" />
              <span className="hidden lg:inline">Star on GitHub</span>
              <span className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md text-xs font-mono min-w-[2rem] text-center">
                {isLoadingStars ? "..." : formatStarCount(starCount)}
              </span>
            </a>
          </div>
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
