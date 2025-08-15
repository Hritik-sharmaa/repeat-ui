"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/app/components/site/ui/Button";
import { useThemeAnimation } from "@/app/context/theme-provider";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { triggerAnimation } = useThemeAnimation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      triggerAnimation({ x, y }, theme || "dark");

      setTimeout(() => {
        setTheme(theme === "light" ? "dark" : "light");
      }, 100);
    } else {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-9 px-0 rounded-full transition-all ease-in outline-none relative overflow-hidden hover:bg-black/5 dark:hover:bg-white/10">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="sm"
      onClick={handleThemeChange}
      className="w-9 px-0 rounded-full transition-all ease-in outline-none relative overflow-hidden hover:bg-black/5 dark:hover:bg-white/10">
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            <Sun className="h-4 w-4" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            <Moon className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
