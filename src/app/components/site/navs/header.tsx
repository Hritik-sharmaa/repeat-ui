"use client";

import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/app/components/site/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/site/ui/Dropdown-menu";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../ui/ThemeToggler";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useVariant } from "@/app/context/code-context";
import { useSearch } from "@/app/context/search-context";
import { SearchModal } from "@/app/components/site/ui/SearchModal";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flavor, setFlavor } = useVariant();
  const { isSearchOpen, openSearch, closeSearch } = useSearch();

  const [language, style] = flavor.split("-");

  useEffect(() => {
    const queryFlavor = searchParams.get("flavor");
    if (queryFlavor && queryFlavor !== flavor) {
      setFlavor(queryFlavor);
    }
  }, [searchParams, flavor, setFlavor]);

  const updateFlavor = (newLang: string, newStyle: string) => {
    const newFlavor = `${newLang}-${newStyle}`;
    setFlavor(newFlavor);

    const params = new URLSearchParams(searchParams.toString());
    params.set("flavor", newFlavor);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <nav className="w-full max-w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-zinc-800">
        <div className="w-full max-w-[95rem] mx-auto flex h-16 items-center justify-between px-2 sm:px-4 md:px-8 lg:px-12">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Image src="/Logo.png" alt="logo" width={32} height={32} />
              </motion.div>
              <h1 className="text-2xl font-bold">Repeat UI</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                onClick={openSearch}
                className="w-64 justify-start gap-3 bg-muted/50 border border-zinc-400 dark:border-white/30 rounded-full px-4 py-2 text-muted-foreground hover:text-white cursor-pointer ">
                <Search className="h-4 w-4" />
                <span className="flex-1 text-left">Search components...</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-full border border-white/30 bg-muted px-1.5 font-mono text-[10px] text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="gap-1 bg-transparent outline-none rounded-full border border-zinc-400 dark:border-white/30 cursor-pointer">
                  {language.toUpperCase()}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border border-zinc-400 dark:border-white/30 rounded-2xl m-4 p-2 ">
                <DropdownMenuItem
                  onClick={() => updateFlavor("js", style)}
                  className="rounded-2xl">
                  JavaScript
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updateFlavor("ts", style)}
                  className="rounded-2xl">
                  TypeScript
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="gap-1 bg-transparent outline-none rounded-full border border-zinc-400 dark:border-white/30 cursor-pointer">
                  {style === "tailwind" ? "Tailwind" : "CSS"}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border border-zinc-400 dark:border-white/30 rounded-2xl m-4 p-2 ">
                <DropdownMenuItem
                  onClick={() => updateFlavor(language, "css")}
                  className="rounded-2xl">
                  CSS
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updateFlavor(language, "tailwind")}
                  className="rounded-2xl">
                  Tailwind CSS
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
            <a
              href="https://github.com/hritik-sharmaa/repeat-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:bg-gray-100/20 dark:hover:bg-gray-800/20 transition-all duration-300 font-medium border dark:border-white/30 border-zinc-400 rounded-full px-3 py-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github-icon lucide-github">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              Star on Github
            </a>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={openSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
