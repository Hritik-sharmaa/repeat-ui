"use client";

import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/app/components/site/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/site/ui/Dropdown-menu";
import { Input } from "@/app/components/site/ui/Input";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../ui/ThemeToggler";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useVariant } from "@/app/context/code-context";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flavor, setFlavor } = useVariant();

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
    <nav className="w-full max-w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-zinc-800">
      <div className="w-full max-w-[95rem] mx-auto flex h-16 items-center justify-between px-2 sm:px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 transition-all duration-300 font-bold">
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
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Docs"
              className="w-64 pl-10 pr-16 bg-muted/50 outline-none"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 bg-transparent outline-none">
                {language.toUpperCase()}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => updateFlavor("js", style)}>
                JavaScript
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateFlavor("ts", style)}>
                TypeScript
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 bg-transparent outline-none">
                {style === "tailwind" ? "Tailwind" : "CSS"}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => updateFlavor(language, "css")}>
                CSS
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateFlavor(language, "tailwind")}>
                Tailwind CSS
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
          <a
            href="https://github.com/yourusername/repeat-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:bg-gray-100/20 dark:hover:bg-gray-800/20 transition-all duration-300 font-medium border border-white/30 rounded-lg px-3 py-2">
            <div>
              <Image src="/github.svg" alt="github" width={20} height={20} />
            </div>
            Star on Github
          </a>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
