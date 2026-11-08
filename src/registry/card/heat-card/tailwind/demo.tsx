"use client";

import type { ComponentProps } from "react";
import HeatCard from "./preview";

// Move over the card to warm it, and press and hold to leave a handprint. Warm it enough to read the message.
const HeatCardDemo = (props: Partial<ComponentProps<typeof HeatCard>>) => (
  <HeatCard {...props}>
    <div
      style={{
        height: "100%",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.45)",
        }}
      >
        THERMOCHROMIC
      </span>
      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
        Touch to warm it. Hold for a handprint.
      </span>
    </div>
  </HeatCard>
);

export default HeatCardDemo;
