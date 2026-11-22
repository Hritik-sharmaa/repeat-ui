"use client";

import type { ComponentProps } from "react";
import DieCut from "./preview";

// A laptop lid's worth of stickers. Every one is draggable: move them around and slap them down.
const DieCutDemo = ({
  children,
  rotate = -6,
  ...props
}: ComponentProps<typeof DieCut>) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      padding: 24,
    }}
  >
    <DieCut {...props} rotate={rotate}>
      <span style={{ fontSize: 72 }}>{children ?? "🔥"}</span>
    </DieCut>
    <DieCut {...props} rotate={rotate + 10}>
      <span
        style={{
          display: "inline-block",
          fontFamily: "ui-rounded, system-ui, sans-serif",
          fontSize: 40,
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: "#fa5f1b",
          textTransform: "uppercase",
        }}
      >
        Ship it
      </span>
    </DieCut>
    <DieCut {...props} rotate={rotate + 18}>
      <span style={{ fontSize: 64 }}>🦖</span>
    </DieCut>
    <DieCut {...props} rotate={rotate - 4}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          borderRadius: 999,
          background: "#18181b",
          color: "#fafafa",
          fontFamily: "ui-monospace, monospace",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        &lt;/&gt; npm i
      </span>
    </DieCut>
  </div>
);

export default DieCutDemo;
