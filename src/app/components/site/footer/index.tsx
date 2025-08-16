"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
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
          <p className="">
            A library crafted with <span className="text-pink-500">♥</span> by{" "}
            <Link
              href="https://hritik-sharma-portfolio.vercel.app/"
              className="text-purple-400 underline hover:text-purple-300">
              ME
            </Link>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <Link href="https://github.com/Hritik-sharmaa/repeat-ui" className="hover:text-white transition">
            GitHub
          </Link>
          <Link href="/components/button" className="hover:text-white transition">
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
