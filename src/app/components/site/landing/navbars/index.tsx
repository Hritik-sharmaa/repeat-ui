"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ThemeToggle from "@/app/components/site/ui/ThemeToggler";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/components/button/primary", label: "Components" },
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
            href="https://github.com/yourusername/repeat-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:bg-gray-100/20 dark:hover:bg-gray-800/20 transition-all duration-300 font-medium border border-white/30 rounded-lg px-3 py-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}>
              <Image src="/github.svg" alt="github" width={20} height={20} />
            </motion.div>
            Star on Github
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
