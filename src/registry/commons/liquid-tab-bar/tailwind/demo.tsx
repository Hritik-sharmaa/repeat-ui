"use client";

import { useState, type ComponentProps } from "react";
import LiquidTabBar from "./preview";

const icon = (d: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d={d} />
  </svg>
);

const items = [
  {
    label: "Home",
    icon: icon(
      "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
    ),
  },
  {
    label: "Search",
    icon: icon("M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3"),
  },
  { label: "Library", icon: icon("M4 4v16M9 4v16M14 4l6 16") },
  {
    label: "Profile",
    icon: icon("M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0"),
  },
];

// Night shots: dark enough for the white glass to stand out, with colour in them for it to bend.
const PHOTOS = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600",
  "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600",
  "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600",
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&h=600",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600",
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600",
];

// A feed you can scroll under the bar, so you can watch the glass bend it. Tap a tab, or drag the lens.
const LiquidTabBarDemo = (
  props: Partial<ComponentProps<typeof LiquidTabBar>>,
) => {
  const [tab, setTab] = useState(0);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 440,
        height: 520,
        margin: "0 auto",
        overflowY: "auto",
        borderRadius: 28,
        background: "#050505",
        scrollbarWidth: "none",
      }}
    >
      <div
        style={{
          padding: "20px 16px 0",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, opacity: 0.6 }}>
          Scroll the feed under the bar
        </p>
        <h3 style={{ margin: "4px 0 16px", fontSize: 28, fontWeight: 800 }}>
          {items[tab].label}
        </h3>
        {PHOTOS.map((src, i) => (
          <div
            key={i}
            style={{
              height: 200,
              marginBottom: 14,
              borderRadius: 20,
              background: `url(${src}) center / cover`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "sticky",
          bottom: 18,
          display: "flex",
          justifyContent: "center",
          padding: "0 12px",
        }}
      >
        <LiquidTabBar {...props} items={items} value={tab} onChange={setTab} />
      </div>
    </div>
  );
};

export default LiquidTabBarDemo;
