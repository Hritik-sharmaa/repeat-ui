"use client";
import React from "react";
import { ArrowRight, Heart } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Footer from "../footer/index";

const SPRING = { stiffness: 150, damping: 18, mass: 0.5 };

const Landing = () => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const auraTransform = useTransform(
    [x, y],
    (latest: number[]) =>
      `translate3d(${latest[0] - 200}px, ${latest[1] - 200}px, 0)`
  );

  React.useEffect(() => {
    const handle = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, [rawX, rawY]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 dark:from-gray-900 dark:via-orange-950/20 dark:to-amber-950/20 relative overflow-hidden">
        <motion.div
          style={{ transform: auraTransform }}
          className="fixed pointer-events-none z-10 w-96 h-96 rounded-full opacity-40 blur-3xl"
          aria-hidden>
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(251,146,60,.55)_0%,rgba(245,101,101,.4)_45%,rgba(168,85,247,.25)_100%)]" />
        </motion.div>

        <section className="flex flex-col items-center justify-center min-h-[80vh] max-w-4xl mx-auto px-6 text-center pt-32 relative z-20">
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full text-sm font-medium mb-12 shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">
                Next-Gen Component Library
              </span>
            </div>
          </motion.div>

          <div className="mb-8">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}>
              Build Beautiful
            </motion.h1>
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}>
              UIs Faster
            </motion.h2>
          </div>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}>
            Grab the hottest components and drop them straight into your
            project. Perfect styles and smooth animations, right out of the box.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}>
            <motion.button
              className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl relative z-30"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Contribute Here!
              </span>
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-2xl font-semibold hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl backdrop-blur-sm relative z-30"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <span className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Browse Components
              </span>
            </motion.button>
          </motion.div>

          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-300/30 dark:bg-orange-400/20 rounded-full z-10"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.3, 0.7, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </section>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Landing;
