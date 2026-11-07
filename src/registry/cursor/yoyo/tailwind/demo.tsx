"use client";

import type { ComponentProps } from "react";
import Yoyo from "./preview";

// Move to swing the yo-yo on its string, and click to throw it.
const YoyoDemo = (props: Partial<ComponentProps<typeof Yoyo>>) => (
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
    <Yoyo {...props}>
      <div
        style={{
          height: 380,
          padding: 28,
          background: "radial-gradient(120% 90% at 50% 0%, #27272a, #0a0a0a)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "system-ui, sans-serif",
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#fafafa",
            pointerEvents: "none",
          }}
        >
          Walk the dog.
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: "system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#a1a1aa",
            pointerEvents: "none",
          }}
        >
          Move to swing it. Click to throw.
        </p>
      </div>
    </Yoyo>
  </div>
);

export default YoyoDemo;
