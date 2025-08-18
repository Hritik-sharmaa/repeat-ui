"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import ThemeToggle from "@/app/components/site/ui/ThemeToggler";
import { useEffect, useState } from "react";
import { fetchGitHubStars, formatStarCount } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const [isLoadingStars, setIsLoadingStars] = useState(true);
  const [starCount, setStarCount] = useState(0);

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

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/components/button/", label: "Components" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 mx-auto mt-4 px-4 max-w-[60rem] py-3 backdrop-blur-3xl border border-black/30 dark:border-white/20 rounded-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2">
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
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-6">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 hover:text-[#fa5f1b] transition-all duration-300 font-medium relative ${
                    isActive ? "text-[#fa5f1b]" : ""
                  }`}>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="w-2 h-2 bg-[#fa5f1b] rounded-full"
                    />
                  )}
                  <motion.span
                    whileHover={{ y: -1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}>
                    {item.label}
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}

          <motion.a
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/hritik-sharmaa/repeat-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:bg-gray-100/20 dark:hover:bg-gray-800/20 transition-all duration-300 font-medium border dark:border-white/30 border-zinc-400 rounded-full px-3 py-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}>
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
            </motion.div>
            <span>Star on Github</span>
            <span className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-full text-xs font-mono min-w-[2rem] text-center">
              {isLoadingStars ? "..." : formatStarCount(starCount)}
            </span>
          </motion.a>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.7,
              type: "spring",
              stiffness: 500,
            }}>
            <ThemeToggle />
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
