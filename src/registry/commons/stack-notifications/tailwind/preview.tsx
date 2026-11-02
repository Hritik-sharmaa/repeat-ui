"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "relative",
  card: "absolute inset-x-0 bottom-0 flex cursor-grab touch-pan-y items-center gap-3 rounded-2xl border border-white/10 px-4 shadow-xl active:cursor-grabbing",
  icon: "grid size-9 shrink-0 place-items-center rounded-full",
  body: "min-w-0 flex-1",
  title: "m-0 truncate text-sm font-semibold",
  text: "m-0 mt-0.5 truncate text-xs opacity-60",
  close:
    "grid size-7 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 opacity-40 transition-opacity hover:opacity-100",
};

const CARD_HEIGHT = 72;
const GAP = 10;

export interface StackNotification {
  id: string | number;
  title: string;
  description?: string;
  icon?: ReactNode;
}

export interface StackNotificationsProps {
  notifications: StackNotification[];
  onDismiss?: (id: string | number) => void;
  maxVisible?: number;
  width?: number;
  expandOnHover?: boolean;
  accentColor?: string;
  background?: string;
  textColor?: string;
  className?: string;
}

const Bell = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M10.27 21a2 2 0 0 0 3.46 0M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33" />
  </svg>
);

// Notifications pile up as a deck, newest in front. Hovering fans them out into a list;
// drag one sideways, or press its cross, to dismiss it.
const StackNotifications = ({
  notifications,
  onDismiss,
  maxVisible = 3,
  width = 340,
  expandOnHover = true,
  accentColor = "#fa5f1b",
  background = "#171717",
  textColor = "#fafafa",
  className = "",
}: StackNotificationsProps) => {
  const [hovered, setHovered] = useState(false);
  const open = expandOnHover && hovered;
  const visible = notifications.slice(-maxVisible).reverse();
  const height = visible.length
    ? open
      ? visible.length * (CARD_HEIGHT + GAP) - GAP
      : CARD_HEIGHT + (visible.length - 1) * 10
    : 0;

  return (
    <motion.div
      className={`${C.root} ${className}`}
      style={{ width, maxWidth: "100%" }}
      animate={{ height }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence initial={false}>
        {visible.map((n, i) => (
          <motion.div
            key={n.id}
            layout
            drag="x"
            dragSnapToOrigin
            onDragEnd={(_, info) =>
              Math.abs(info.offset.x) > 100 && onDismiss?.(n.id)
            }
            className={C.card}
            style={{
              height: CARD_HEIGHT,
              zIndex: visible.length - i,
              background,
              color: textColor,
              transformOrigin: "50% 100%",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{
              opacity: open ? 1 : 1 - i * 0.2,
              y: open ? -i * (CARD_HEIGHT + GAP) : -i * 10,
              scale: open ? 1 : 1 - i * 0.05,
            }}
            exit={{ opacity: 0, x: 80, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            <span
              className={C.icon}
              style={{
                color: accentColor,
                background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
              }}
            >
              {n.icon ?? <Bell />}
            </span>
            <div className={C.body}>
              <p className={C.title}>{n.title}</p>
              {n.description && <p className={C.text}>{n.description}</p>}
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              className={C.close}
              style={{ color: textColor }}
              onClick={() => onDismiss?.(n.id)}
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default StackNotifications;
