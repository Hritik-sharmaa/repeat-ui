"use client";

import { useState, type KeyboardEvent, type Ref } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from "motion/react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-receipt",
  list: "rui-receipt-list",
  roll: "rui-receipt-roll",
  slip: "rui-receipt-slip",
  edge: "rui-receipt-edge",
  paper: "rui-receipt-paper",
  sheen: "rui-receipt-sheen",
  shade: "rui-receipt-shade",
  scissors: "rui-receipt-scissors",
  header: "rui-receipt-header",
  title: "rui-receipt-title",
  meta: "rui-receipt-meta",
  rule: "rui-receipt-rule",
  row: "rui-receipt-row",
  total: "rui-receipt-total",
  barcode: "rui-receipt-barcode",
  bar: "rui-receipt-bar",
  note: "rui-receipt-note",
  printer: "rui-receipt-printer",
  slot: "rui-receipt-slot",
  front: "rui-receipt-front",
  led: "rui-receipt-led",
  status: "rui-receipt-status",
  feed: "rui-receipt-feed",
  foot: "rui-receipt-foot",
};

export interface ReceiptLine {
  label: string;
  value: string;
}

export interface Receipt {
  id: string | number;
  title: string;
  meta?: string;
  lines?: ReceiptLine[];
  total?: string;
  note?: string;
}

export interface ThermalReceiptProps {
  receipts: Receipt[];
  onTear?: (id: string | number) => void;
  header?: string;
  maxVisible?: number;
  width?: number;
  printSpeed?: number;
  paperColor?: string;
  inkColor?: string;
  printerColor?: string;
  accentColor?: string;
  showBarcode?: boolean;
  className?: string;
}

type Tear = { id: string | number; x: number; y: number } | null;

// The printer feeds paper a row at a time: each row eases out, settles, then the next follows.
const feed = (rows: number) => (t: number) => {
  const s = t * rows;
  const i = Math.floor(s);
  const f = Math.min(1, (s - i) * 1.4);
  return Math.min(1, (i + f * f * (3 - 2 * f)) / rows);
};

// Thermal ink darkens as the paper warms: each printed row fades up from a soft blur.
// `fade` is how dark the row ends up.
const ink = (fade = 1): Variants => ({
  hidden: { opacity: 0, filter: "blur(2px)", y: 3 },
  show: {
    opacity: fade,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
});

// A stable fake barcode: bar widths come from the receipt's id.
function bars(id: string | number) {
  let h = 2166136261;
  for (const ch of String(id)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return Array.from({ length: 34 }, (_, i) => 1 + (((h >>> (i % 29)) & 3) % 3));
}

type SlipProps = {
  receipt: Receipt;
  header: string;
  paperColor: string;
  inkColor: string;
  printSpeed: number;
  showBarcode: boolean;
  first: boolean;
  last: boolean;
  onTear: (x: number, y: number) => void;
  onPrinted: () => void;
  ref?: Ref<HTMLDivElement>;
};

// One receipt on the strip. Drag it far enough in any direction and it tears off along its serrated edges.
const Slip = ({
  receipt: r,
  header,
  paperColor,
  inkColor,
  printSpeed,
  showBarcode,
  first,
  last,
  onTear,
  onPrinted,
  ref,
}: SlipProps) => {
  const x = useMotionValue(0);
  // While pulled, both edges show as torn; at rest the strip reads as one roll with perforations.
  const [pulling, setPulling] = useState(false);
  const rotate = useTransform(x, [-160, 160], [-14, 14]);
  const rows = 7 + (r.lines?.length ?? 0) + (showBarcode ? 2 : 0);
  const step = printSpeed / 1000;
  const rule = `color-mix(in srgb, ${inkColor} 40%, transparent)`;
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace" || e.key === "Enter")
      onTear(60, -40);
  };
  return (
    <motion.div
      ref={ref}
      layout="position"
      tabIndex={0}
      role="status"
      aria-label={`${r.title}. Press Delete to tear it off.`}
      onKeyDown={onKeyDown}
      className={C.slip}
      style={{
        x,
        rotate,
        transformOrigin: "50% 100%",
        filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.28))",
      }}
      drag
      dragSnapToOrigin
      dragElastic={0.55}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 18 }}
      whileHover={{ scale: 1.012 }}
      whileDrag={{
        scale: 1.04,
        filter: "drop-shadow(0 22px 24px rgba(0,0,0,0.38))",
      }}
      onDragStart={() => setPulling(true)}
      onDragEnd={(_, info) => {
        setPulling(false);
        if (Math.hypot(info.offset.x, info.offset.y) > 110)
          onTear(info.offset.x, info.offset.y);
      }}
      variants={{
        hidden: { height: 0 },
        show: {
          height: "auto",
          transition: {
            height: { duration: rows * step, ease: feed(rows) },
            delayChildren: step * 0.6,
            staggerChildren: step,
          },
        },
        // Torn slips fly off the way they were pulled; slips pushed out of view wind into the roll.
        exit: (tear: Tear) =>
          tear?.id === r.id
            ? {
                x: tear.x * 2.4,
                y: tear.y * 2.4 - 60,
                rotate: tear.x >= 0 ? 32 : -32,
                scale: 0.92,
                opacity: 0,
                transition: { duration: 0.55, ease: [0.4, 0, 1, 1] },
              }
            : {
                height: 0,
                opacity: 0,
                scaleX: 0.96,
                transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
              },
      }}
      initial="hidden"
      animate="show"
      exit="exit"
      onAnimationComplete={(name) => name === "show" && onPrinted()}
    >
      <div
        aria-hidden
        className={C.edge}
        style={{
          // The top receipt was torn from the one before it; the rest are joined by a row of perforations.
          background:
            first || pulling
              ? `conic-gradient(from 135deg at 50% 0, ${paperColor} 90deg, transparent 0) 0 0 / 10px 100%`
              : `radial-gradient(circle, color-mix(in srgb, ${inkColor} 35%, transparent) 1px, transparent 1.5px) 0 0 / 6px 100% repeat-x, ${paperColor}`,
        }}
      />
      <div
        className={C.paper}
        style={{
          color: inkColor,
          background: `linear-gradient(90deg, rgba(0,0,0,0.07), transparent 14%, transparent 86%, rgba(0,0,0,0.07)), ${paperColor}`,
        }}
      >
        {/* A faint glossy sweep, like light catching coated thermal paper. */}
        <span
          aria-hidden
          className={C.sheen}
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.45) 45%, transparent 60%)",
            mixBlendMode: "soft-light",
          }}
        />
        <motion.button
          type="button"
          aria-label="Tear off"
          tabIndex={-1}
          className={C.scissors}
          style={{ color: inkColor, opacity: 0.35 }}
          whileHover={{
            opacity: 0.9,
            scale: 1.15,
            rotate: [0, -18, 0, -12, 0],
            transition: { duration: 0.5 },
          }}
          whileTap={{ scale: 0.85 }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onTear(40, -40)}
        >
          <svg
            viewBox="0 0 24 24"
            width="13"
            height="13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
          </svg>
        </motion.button>
        <motion.p variants={ink(0.7)} className={C.header}>
          {header}
        </motion.p>
        <motion.p variants={ink()} className={C.title}>
          {r.title}
        </motion.p>
        {r.meta && (
          <motion.p variants={ink(0.6)} className={C.meta}>
            {r.meta}
          </motion.p>
        )}
        {(r.lines?.length || r.total) && (
          <motion.hr
            variants={ink()}
            className={C.rule}
            style={{ borderColor: rule }}
          />
        )}
        {r.lines?.map((line, i) => (
          <motion.div key={i} variants={ink()} className={C.row}>
            <span>{line.label}</span>
            <span>{line.value}</span>
          </motion.div>
        ))}
        {r.total && (
          <>
            <motion.hr
              variants={ink()}
              className={C.rule}
              style={{ borderColor: rule }}
            />
            <motion.div variants={ink()} className={C.total}>
              <span>Total</span>
              <span>{r.total}</span>
            </motion.div>
          </>
        )}
        {showBarcode && (
          <motion.div
            aria-hidden
            className={C.barcode}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.012 } },
            }}
          >
            {bars(r.id).map((w, i) => (
              <motion.span
                key={i}
                className={C.bar}
                style={{
                  width: w,
                  background: i % 2 ? "transparent" : inkColor,
                }}
                variants={{
                  hidden: { scaleY: 0 },
                  show: {
                    scaleY: 1,
                    transition: { duration: 0.25, ease: "easeOut" },
                  },
                }}
              />
            ))}
          </motion.div>
        )}
        {r.note && (
          <motion.p variants={ink(0.6)} className={C.note}>
            {r.note}
          </motion.p>
        )}
      </div>
      <div
        aria-hidden
        className={C.edge}
        style={{
          background: !pulling
            ? paperColor
            : `conic-gradient(from -45deg at 50% 100%, ${paperColor} 90deg, transparent 0) 0 0 / 10px 100%`,
        }}
      />
      {/* The paper still in the slot sits in the printer's shadow. */}
      {last && !pulling && (
        <span
          aria-hidden
          className={C.shade}
          style={{
            background: "linear-gradient(transparent, rgba(0,0,0,0.16))",
          }}
        />
      )}
    </motion.div>
  );
};

// Notifications as till receipts: each one prints out of the slot row by row and pushes the older ones up.
// Drag a receipt away to tear it off. The oldest ones curl into a roll at the top; tap the roll to clear them.
const ThermalReceipt = ({
  receipts,
  onTear,
  header = "Repeat UI",
  maxVisible = 2,
  width = 300,
  printSpeed = 70,
  paperColor = "#f6f3ea",
  inkColor = "#27241f",
  printerColor = "#1f1f1f",
  accentColor = "#22c55e",
  showBarcode = true,
  className = "",
}: ThermalReceiptProps) => {
  const [tear, setTear] = useState<Tear>(null);
  // Receipts already on screen when the component mounts count as printed.
  const [printed, setPrinted] = useState(
    () => new Set(receipts.map((r) => r.id)),
  );
  const visible = receipts.slice(-maxVisible);
  const rolled = receipts.slice(0, -maxVisible);
  const printing = visible.some((r) => !printed.has(r.id));

  const tearOff = (id: string | number, x: number, y: number) => {
    setTear({ id, x, y });
    onTear?.(id);
  };

  return (
    <div
      className={`${C.root} ${className}`}
      style={{ width, maxWidth: "100%" }}
    >
      {/* When a receipt finishes printing, the strip sways a little on the slot like loose paper. */}
      <motion.div
        className={C.list}
        aria-live="polite"
        style={{ transformOrigin: "50% 100%" }}
        animate={printing ? { rotate: 0 } : { rotate: [0, 0.8, -0.5, 0.2, 0] }}
        transition={
          printing ? { duration: 0.2 } : { duration: 1.1, ease: "easeOut" }
        }
      >
        <AnimatePresence>
          {rolled.length > 0 && (
            <motion.button
              key="roll"
              type="button"
              aria-label={`Tear off ${rolled.length} older receipt${rolled.length === 1 ? "" : "s"}`}
              className={C.roll}
              style={{
                color: inkColor,
                background: `linear-gradient(180deg, color-mix(in srgb, ${paperColor} 70%, #000) 0%, ${paperColor} 45%, color-mix(in srgb, ${paperColor} 80%, #000) 100%)`,
              }}
              initial={{ opacity: 0, scaleY: 0.4 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              onClick={() => rolled.forEach((r) => onTear?.(r.id))}
            >
              <motion.span
                key={rolled.length}
                className={C.status}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                +{rolled.length}
              </motion.span>
              rolled up
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false} mode="popLayout" custom={tear}>
          {visible.map((r, i) => (
            <Slip
              key={r.id}
              receipt={r}
              header={header}
              paperColor={paperColor}
              inkColor={inkColor}
              printSpeed={printSpeed}
              showBarcode={showBarcode}
              first={i === 0 && rolled.length === 0}
              last={i === visible.length - 1}
              onTear={(x, y) => tearOff(r.id, x, y)}
              onPrinted={() => setPrinted((set) => new Set(set).add(r.id))}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* The printer: the paper disappears into the slot, the body hums and the light pulses while it prints. */}
      <motion.div
        className={C.printer}
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${printerColor} 78%, #fff), ${printerColor} 38%)`,
        }}
        animate={
          printing
            ? { x: [0, -0.6, 0.6, 0], y: [0, 0.3, 0, 0.3] }
            : { x: 0, y: 0 }
        }
        transition={
          printing
            ? { duration: 0.1, repeat: Infinity, ease: "linear" }
            : { duration: 0.15 }
        }
      >
        <div className={C.slot} />
        <div className={C.front}>
          <motion.span
            className={C.led}
            style={{ background: accentColor }}
            animate={
              printing
                ? {
                    opacity: [1, 0.45, 1],
                    boxShadow: [
                      `0 0 4px ${accentColor}`,
                      `0 0 12px ${accentColor}`,
                      `0 0 4px ${accentColor}`,
                    ],
                  }
                : { opacity: 1, boxShadow: `0 0 6px ${accentColor}` }
            }
            transition={
              printing
                ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={printing ? "printing" : "ready"}
              className={C.status}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              {printing ? "Printing" : "Ready"}
            </motion.span>
          </AnimatePresence>
          <motion.span
            aria-hidden
            className={C.feed}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            whileTap={{ scale: 0.85 }}
          />
        </div>
        <span aria-hidden className={C.foot} style={{ left: 24 }} />
        <span aria-hidden className={C.foot} style={{ right: 24 }} />
      </motion.div>
    </div>
  );
};

export default ThermalReceipt;
