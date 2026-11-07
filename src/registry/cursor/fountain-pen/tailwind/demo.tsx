"use client";

import type { ComponentProps } from "react";
import FountainPen from "./preview";

// Write on the paper. Rest the pen to let a blot spread, and click to flick a spatter of ink.
const FountainPenDemo = (
  props: Partial<ComponentProps<typeof FountainPen>>,
) => (
  <div
    style={{
      width: "100%",
      maxWidth: 560,
      margin: "0 auto",
      borderRadius: 24,
      overflow: "hidden",
      boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
    }}
  >
    <FountainPen {...props}>
      <div
        style={{
          height: 360,
          padding: 28,
          background:
            "repeating-linear-gradient(#f7f3e8 0 33px, #d9e2f0 33px 34px), #f7f3e8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "Georgia, serif",
            fontSize: 30,
            fontStyle: "italic",
            color: "#1f2937",
            pointerEvents: "none",
          }}
        >
          Dear reader,
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: "system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#6b7280",
            pointerEvents: "none",
          }}
        >
          Write anything. Rest the pen to blot, click to splatter.
        </p>
      </div>
    </FountainPen>
  </div>
);

export default FountainPenDemo;
