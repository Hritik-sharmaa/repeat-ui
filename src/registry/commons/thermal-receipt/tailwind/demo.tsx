"use client";

import { useState, type ComponentProps } from "react";
import ThermalReceipt, { type Receipt } from "./preview";

const SAMPLES: Omit<Receipt, "id">[] = [
  {
    title: "Order shipped",
    lines: [
      { label: "1x Desk lamp", value: "$48.00" },
      { label: "1x Matchbox", value: "$2.50" },
    ],
    total: "$50.50",
    note: "Arrives Thursday",
  },
  {
    title: "Deploy succeeded",
    lines: [
      { label: "Build", value: "41s" },
      { label: "Pages", value: "128" },
    ],
    note: "repeat-ui.vercel.app",
  },
  {
    title: "Payment received",
    lines: [{ label: "From", value: "Acme Inc." }],
    total: "$1,200.00",
    note: "Thank you",
  },
  {
    title: "New follower",
    lines: [{ label: "User", value: "@maya" }],
    note: "Say hello",
  },
];

const time = (n: number) =>
  `12:0${n % 10} PM · #${String(1040 + n).padStart(5, "0")}`;

// Starts with one receipt; the button prints the next sample. Drag a receipt away to tear it off.
const ThermalReceiptDemo = (
  props: Partial<ComponentProps<typeof ThermalReceipt>>,
) => {
  const [count, setCount] = useState(1);
  const [receipts, setReceipts] = useState<Receipt[]>([
    { id: 0, meta: time(0), ...SAMPLES[0] },
  ]);
  const print = () => {
    setReceipts((list) => [
      ...list,
      { id: count, meta: time(count), ...SAMPLES[count % SAMPLES.length] },
    ]);
    setCount((n) => n + 1);
  };
  return (
    <div
      style={{
        width: "100%",
        minHeight: 600,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 28,
        padding: "24px 0",
      }}
    >
      <ThermalReceipt
        {...props}
        receipts={receipts}
        onTear={(id) => setReceipts((list) => list.filter((r) => r.id !== id))}
      />
      <button
        type="button"
        onClick={print}
        style={{
          height: 36,
          padding: "0 16px",
          font: "inherit",
          fontSize: 14,
          fontWeight: 500,
          color: "#fafafa",
          background: "#262626",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        Print receipt
      </button>
    </div>
  );
};

export default ThermalReceiptDemo;
