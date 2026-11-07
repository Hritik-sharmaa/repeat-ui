"use client";

import type { ComponentProps } from "react";
import IronFilings from "./preview";

// Move the magnet over the filings, and click to turn it a quarter turn.
const IronFilingsDemo = (
  props: Partial<ComponentProps<typeof IronFilings>>,
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
    <IronFilings {...props}>
      <div
        style={{
          height: 380,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "radial-gradient(120% 100% at 50% 0%, #1c1c1f, #09090b)",
        }}
      >
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
          Move the magnet. Click to turn it.
        </p>
      </div>
    </IronFilings>
  </div>
);

export default IronFilingsDemo;
