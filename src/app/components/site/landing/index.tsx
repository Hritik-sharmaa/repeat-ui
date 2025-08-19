"use client";
import React from "react";
import { ArrowRight, Heart } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import Footer from "../footer/index";
import { categories, Category, Subcategory } from "../../../../data/categories";

const getTotalComponents = (): number => {
  return categories.reduce((total: number, category: Category) => {
    return (
      total +
      category.subcategories.reduce(
        (subTotal: number, subcategory: Subcategory) => {
          return subTotal + subcategory.variants.length;
        },
        0
      )
    );
  }, 0);
};

const getTotalCategories = (): number => {
  return categories.reduce((total: number, category: Category) => {
    return total + category.subcategories.length;
  }, 0);
};

const AnimatedCounter = ({
  from,
  to,
  duration = 5,
}: {
  from: number;
  to: number;
  duration?: number;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const [displayValue, setDisplayValue] = React.useState(from);

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [isInView, motionValue, to]);

  React.useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
};

const Landing = () => {
  const totalComponents = getTotalComponents();
  const totalCategories = getTotalCategories();

  return (
    <>
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-950 relative overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full border-2 border-gray-200 dark:border-gray-800"
          animate={{ rotate: [0, 15, -10, 0] }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border-2 border-gray-200 dark:border-gray-800"
          animate={{ rotate: [0, -10, 12, 0] }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <section className="flex flex-col items-center justify-center min-h-[80vh] max-w-5xl mx-auto px-6 text-center pt-40 relative z-10">
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200/80 dark:border-gray-800 rounded-full text-sm font-medium mb-10 shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">
                Next-Gen Component Library
              </span>
            </div>
          </motion.div>

          <div className="relative w-full">
            <div className="relative mx-auto max-w-4xl rounded-3xl bg-neutral-50 dark:bg-gray-950 ">
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40 dark:ring-black/20"
                aria-hidden
              />

              <div className="px-8 md:px-12 py-12 md:py-16">
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-3 font-cal-sans tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}>
                  Build Beautiful
                </motion.h1>
                <motion.h2
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-700 dark:text-gray-300 font-cal-sans tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}>
                  UIs Faster
                </motion.h2>

                <motion.p
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}>
                  Grab the hottest components and drop them straight into your
                  project. Perfect styles and smooth animations, right out of
                  the box.
                </motion.p>

                <motion.div
                  className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}>
                  <motion.a
                    href="https://github.com/Hritik-sharmaa/repeat-ui"
                    className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl relative z-30 inline-block border border-transparent dark:border-gray-200/60"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}>
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Contribute Here!
                    </span>
                  </motion.a>

                  <motion.a
                    href="/components/button"
                    className="px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl backdrop-blur-sm relative z-30 inline-block"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}>
                    <span className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Browse Components
                    </span>
                  </motion.a>
                </motion.div>

                <motion.div
                  className="mt-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}>
                  <div className="py-4 px-4">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      <AnimatedCounter
                        from={0}
                        to={totalComponents}
                        duration={6}
                      />
                      +
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Ready Components
                    </div>
                  </div>
                  <div className="py-4 px-4">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      <AnimatedCounter
                        from={0}
                        to={totalCategories}
                        duration={6}
                      />
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Categories
                    </div>
                  </div>
                  <div className="py-4 px-4">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      Copy & Go
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Production-ready
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex items-center justify-center flex-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}>
                  <div className="flex items-center justify-center gap-8 opacity-60">
                    <motion.div
                      className="group flex items-center gap-2"
                      whileHover={{ scale: 1.1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0 stroke-1 text-neutral-500 md:h-10 md:w-10">
                        <path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993"></path>
                        <path d="M15 12v-3"></path>
                      </svg>
                      <span className="shrink-0 text-sm font-semibold text-neutral-500">
                        Next.js
                      </span>
                    </motion.div>

                    <motion.div
                      className="group flex items-center gap-2"
                      whileHover={{ scale: 1.1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0 stroke-1 text-neutral-500 md:h-10 md:w-10">
                        <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102"></path>
                        <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102"></path>
                        <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2"></path>
                        <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2"></path>
                        <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896"></path>
                        <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897"></path>
                        <path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z"></path>
                      </svg>
                      <span className="shrink-0 text-sm font-semibold text-neutral-500">
                        React
                      </span>
                    </motion.div>

                    <motion.div
                      className="group flex items-center gap-2"
                      whileHover={{ scale: 1.1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0 stroke-1 text-neutral-500 md:h-10 md:w-10">
                        <path d="M23.395 7.081c-.488-.207-1.053-.002-1.29.472-.224.448-.523.723-.914.838-.612.183-1.343-.052-1.685-.253-.451-.265-.974-.667-1.527-1.092C16.214 5.688 14.018 4 11 4 8.586 4 7.346 5.239 5.293 7.293 4.902 7.684 4.899 8.32 5.29 8.71 5.67 9.092 6.28 9.104 6.672 8.74c.01-.009.02-.019.03-.028.552-.426 4.03-.012 5.55 1.196C14.511 11.703 16.142 13 18 13c2.659 0 4.879-1.741 5.94-4.658C24.121 7.844 23.882 7.291 23.395 7.081zM18.395 14.081c-.488-.207-1.053-.002-1.29.472-.224.448-.523.723-.914.838-.612.18-1.343-.052-1.685-.253-.451-.265-.974-.667-1.527-1.092C11.214 12.688 9.018 11 6 11c-2.414 0-3.654 1.239-5.707 3.293-.391.391-.394 1.027-.003 1.417.38.382.991.395 1.383.03.01-.009.02-.019.03-.028.551-.426 4.031-.012 5.55 1.196C9.511 18.703 11.142 20 13 20c2.659 0 4.879-1.741 5.94-4.658C19.121 14.844 18.882 14.291 18.395 14.081z"></path>
                      </svg>
                      <span className="shrink-0 text-sm font-semibold text-neutral-500">
                        Tailwind CSS
                      </span>
                    </motion.div>

                    <motion.div
                      className="group flex items-center gap-2"
                      whileHover={{ scale: 1.1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0 stroke-1 text-neutral-500 md:h-10 md:w-10">
                        <path d="M12 12l-8 -8v16l16 -16v16l-4 -4"></path>
                        <path d="M20 12l-8 8l-4 -4"></path>
                      </svg>
                      <span className="shrink-0 text-sm font-semibold text-neutral-500">
                        Framer Motion
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full z-10"
              style={{ left: `${18 + i * 14}%`, top: `${28 + (i % 3) * 18}%` }}
              animate={{
                y: [-8, -18, -8],
                opacity: [0.35, 0.75, 0.35],
                scale: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.4,
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
