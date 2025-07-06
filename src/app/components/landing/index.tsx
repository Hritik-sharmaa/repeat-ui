"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../footer";

const Landing = () => {
  return (
    <>
      <section className="relative flex flex-col justify-center items-start mt-32 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <Sparkles className="w-4 h-4 text-amber-300" />
          Next-Gen Component Library
        </motion.div>

        <div className="flex flex-col items-start gap-y-2 md:gap-y-4 text-balance">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold heading-font"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}>
            Build
          </motion.h1>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold heading-font bg-clip-text text-transparent bg-gradient-to-r from-[#fa5f1b] to-[#e99d32]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}>
            Beautiful UIs
          </motion.h1>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold heading-font"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}>
            Faster
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}>
            Grab the hottest components and drop them straight into your
            project. Perfect styles and smooth animations, right out of the box.
          </motion.p>
        </div>

        <motion.div
          className="mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}>
          <motion.div
            className="mt-10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}>
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400/15 to-amber-400/15 
                     dark:from-orange-500/25 dark:to-amber-500/25
                     blur-2xl scale-150 group-hover:from-orange-400/25 group-hover:to-amber-400/25
                     dark:group-hover:from-orange-500/35 dark:group-hover:to-amber-500/35
                     transition-all duration-300"
              animate={{
                scale: [1.4, 1.6, 1.4],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-300/20 to-amber-300/20 
                     dark:from-orange-400/30 dark:to-amber-400/30
                     blur-xl scale-125 group-hover:from-orange-300/30 group-hover:to-amber-300/30
                     dark:group-hover:from-orange-400/40 dark:group-hover:to-amber-400/40
                     transition-all duration-300"
              animate={{
                scale: [1.2, 1.3, 1.2],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-200/25 to-amber-200/25 
                     dark:from-orange-300/35 dark:to-amber-300/35
                     blur-lg scale-110 group-hover:from-orange-200/35 group-hover:to-amber-200/35
                     dark:group-hover:from-orange-300/45 dark:group-hover:to-amber-300/45
                     transition-all duration-300"
              animate={{
                scale: [1.05, 1.15, 1.05],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            <motion.button
              className="group relative px-8 py-3 text-lg font-medium rounded-2xl cursor-pointer
                     bg-white/90 dark:bg-gray-800/90
                     text-gray-900 dark:text-gray-100
                     border border-gray-200/50 dark:border-gray-700/50
                     shadow-lg hover:shadow-xl dark:shadow-gray-900/20
                     transition-all duration-300 ease-out
                     hover:border-orange-300 dark:hover:border-orange-600
                     focus:outline-none focus:ring-4 focus:ring-orange-500/20 dark:focus:ring-orange-400/30
                     backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
              whileHover={{
                scale: 1.02,
                y: -1,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}>
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-50/50 to-amber-50/50 
                       dark:from-orange-950/30 dark:to-amber-950/30
                       group-hover:from-orange-50 group-hover:to-amber-50
                       dark:group-hover:from-orange-950/50 dark:group-hover:to-amber-950/50
                       transition-all duration-300"
              />

              <motion.div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-400/10 to-amber-400/10 
                       dark:from-orange-500/20 dark:to-amber-500/20
                       blur-md group-hover:from-orange-400/20 group-hover:to-amber-400/20
                       dark:group-hover:from-orange-500/30 dark:group-hover:to-amber-500/30
                       transition-all duration-300 -z-10"
              />

              <span className="relative flex items-center gap-2 z-10 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                Browse Components
                <motion.div className="group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </span>
            </motion.button>

            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-400/40 dark:bg-orange-300/30 rounded-full"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${25 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [-8, -16, -8],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2.5 + i * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
};

export default Landing;
