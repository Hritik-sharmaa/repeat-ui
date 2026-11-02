"use client";

import { useState, type ComponentProps } from "react";
import StackNotifications, { type StackNotification } from "./preview";

const MESSAGES = [
  {
    title: "Deployed to production",
    description: "repeat-ui.vercel.app is live.",
  },
  { title: "New comment", description: "Maya: the dock looks great!" },
  { title: "Payment received", description: "$120 from Acme Inc." },
  { title: "Build finished", description: "36 components, 0 warnings." },
  { title: "Backup complete", description: "All files are safe." },
];

// Starts with three; the button adds more, cycling through the sample messages.
const StackNotificationsDemo = (
  props: Partial<ComponentProps<typeof StackNotifications>>,
) => {
  const [count, setCount] = useState(3);
  const [items, setItems] = useState<StackNotification[]>(() =>
    MESSAGES.slice(0, 3).map((m, i) => ({ id: i, ...m })),
  );
  const add = () => {
    setItems((list) => [
      ...list,
      { id: count, ...MESSAGES[count % MESSAGES.length] },
    ]);
    setCount((n) => n + 1);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        paddingTop: 140,
      }}
    >
      <StackNotifications
        {...props}
        notifications={items}
        onDismiss={(id) => setItems((list) => list.filter((n) => n.id !== id))}
      />
      <button
        type="button"
        onClick={add}
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
        Add notification
      </button>
    </div>
  );
};

export default StackNotificationsDemo;
