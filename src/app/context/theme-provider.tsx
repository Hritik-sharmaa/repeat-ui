"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { motion, AnimatePresence } from "motion/react";

interface ThemeAnimationContextType {
  isAnimating: boolean;
  triggerAnimation: (
    position: { x: number; y: number },
    currentTheme: string
  ) => void;
}

const ThemeAnimationContext = React.createContext<
  ThemeAnimationContextType | undefined
>(undefined);

export function useThemeAnimation() {
  const context = React.useContext(ThemeAnimationContext);
  if (!context) {
    return {
      isAnimating: false,
      triggerAnimation: () => {},
    };
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [animationPosition, setAnimationPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [animationType, setAnimationType] = React.useState<
    "expand" | "contract"
  >("contract");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const triggerAnimation = React.useCallback(
    (position: { x: number; y: number }, currentTheme: string) => {
      setAnimationPosition(position);
      setAnimationType(currentTheme === "light" ? "expand" : "contract");
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    },
    []
  );

  const themeAnimationValue = React.useMemo(
    () => ({
      isAnimating,
      triggerAnimation,
    }),
    [isAnimating, triggerAnimation]
  );

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange>
      <ThemeAnimationContext.Provider value={themeAnimationValue}>
        <div className="relative">
          {children}

          <AnimatePresence>
            {isAnimating && (
              <>
                <motion.div
                  initial={{
                    clipPath:
                      animationType === "expand"
                        ? `circle(0px at ${animationPosition.x}px ${animationPosition.y}px)`
                        : `circle(2000px at ${animationPosition.x}px ${animationPosition.y}px)`,
                  }}
                  animate={{
                    clipPath:
                      animationType === "expand"
                        ? `circle(2000px at ${animationPosition.x}px ${animationPosition.y}px)`
                        : `circle(0px at ${animationPosition.x}px ${animationPosition.y}px)`,
                  }}
                  exit={{
                    clipPath:
                      animationType === "expand"
                        ? `circle(2000px at ${animationPosition.x}px ${animationPosition.y}px)`
                        : `circle(0px at ${animationPosition.x}px ${animationPosition.y}px)`,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`fixed inset-0 z-50 pointer-events-none ${
                    animationType === "expand" ? "bg-gray-950" : "bg-[#ffff]"
                  }`}
                />

                <motion.div
                  initial={{
                    clipPath:
                      animationType === "expand"
                        ? `circle(0px at ${animationPosition.x}px ${animationPosition.y}px)`
                        : `circle(1800px at ${animationPosition.x}px ${animationPosition.y}px)`,
                    opacity: 0.3,
                  }}
                  animate={{
                    clipPath:
                      animationType === "expand"
                        ? `circle(1800px at ${animationPosition.x}px ${animationPosition.y}px)`
                        : `circle(0px at ${animationPosition.x}px ${animationPosition.y}px)`,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`fixed inset-0 z-49 pointer-events-none ${
                    animationType === "expand"
                      ? "bg-gradient-to-r from-purple-400/40 to-blue-400/40"
                      : "bg-gradient-to-r from-yellow-400/40 to-orange-400/40"
                  }`}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </ThemeAnimationContext.Provider>
    </NextThemesProvider>
  );
}
