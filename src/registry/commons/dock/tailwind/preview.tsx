"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";

export interface DockItem {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

export interface DockProps {
  items: DockItem[];
  baseSize?: number;
  magnification?: number;
  distance?: number;
  background?: string;
  tileColor?: string;
  iconColor?: string;
  accentColor?: string;
  showLabels?: boolean;
  showIndicator?: boolean;
  className?: string;
}

type IconProps = {
  item: DockItem;
  mouseX: MotionValue<number>;
  baseSize: number;
  magnification: number;
  distance: number;
  tileColor: string;
  iconColor: string;
  accentColor: string;
  showLabels: boolean;
  active: boolean;
  dotId: string;
  onSelect: () => void;
};

// One tile: grows with the pointer's closeness, lifts its icon on hover and hops when clicked.
const DockIcon = ({
  item,
  mouseX,
  baseSize,
  magnification,
  distance,
  tileColor,
  iconColor,
  accentColor,
  showLabels,
  active,
  dotId,
  onSelect,
}: IconProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [hops, setHops] = useState(0);
  const offset = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    return rect ? x - (rect.left + rect.width / 2) : distance;
  });
  const target = useTransform(offset, [-distance, 0, distance], [baseSize, baseSize * magnification, baseSize]);
  const size = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 });

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={item.label}
      aria-current={active || undefined}
      onClick={() => {
        setHops((h) => h + 1);
        onSelect();
        item.onClick?.();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.92 }}
      className="relative shrink-0 cursor-pointer rounded-[28%] border border-white/10 p-0 shadow-md shadow-black/30"
      style={{ width: size, height: size, background: tileColor, color: iconColor }}>
      {/* A soft highlight on the top half, like light on glass. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/15 to-transparent to-60%"
      />
      <motion.span
        key={hops}
        className="absolute inset-0 grid place-items-center [&>svg]:size-[46%]"
        initial={hops ? { y: 0 } : false}
        animate={{ y: [0, -10, 0, -3, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}>
        {item.icon}
      </motion.span>
      <AnimatePresence>
        {showLabels && hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 4, scale: 0.95, x: "-50%" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="pointer-events-none absolute -top-10 left-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white shadow-lg">
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {active && (
        <span aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-2.5 flex justify-center">
          <motion.span
            layoutId={dotId}
            className="block size-1 rounded-full"
            style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        </span>
      )}
    </motion.button>
  );
};

// A row of icons that swell as the pointer passes, like a desktop dock. The last one clicked gets a dot.
const Dock = ({
  items,
  baseSize = 48,
  magnification = 1.7,
  distance = 140,
  background = "rgba(23, 23, 23, 0.8)",
  tileColor = "#262626",
  iconColor = "#e5e5e5",
  accentColor = "#fa5f1b",
  showLabels = true,
  showIndicator = true,
  className = "",
}: DockProps) => {
  const mouseX = useMotionValue(Infinity);
  const [active, setActive] = useState(items[0]?.label);
  const dotId = useId();
  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`mx-auto flex w-max items-end gap-3 rounded-3xl border border-white/10 px-3 pb-3.5 pt-3 shadow-2xl shadow-black/40 backdrop-blur-md ${className}`}
      style={{ background, height: baseSize + 26 }}>
      {items.map((item) => (
        <DockIcon
          key={item.label}
          item={item}
          mouseX={mouseX}
          baseSize={baseSize}
          magnification={magnification}
          distance={distance}
          tileColor={tileColor}
          iconColor={iconColor}
          accentColor={accentColor}
          showLabels={showLabels}
          active={showIndicator && active === item.label}
          dotId={dotId}
          onSelect={() => setActive(item.label)}
        />
      ))}
    </div>
  );
};

export default Dock;
