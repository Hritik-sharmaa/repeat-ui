"use client";

import type { ComponentProps } from "react";
import Holo from "./preview";

// One of each shape. Move the pointer over them to catch the light.
const HoloDemo = ({
  children,
  shape = "circle",
  rotate = -8,
  ...props
}: ComponentProps<typeof Holo>) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
      padding: 24,
    }}
  >
    <Holo {...props} shape={shape} rotate={rotate}>
      {children ?? (
        <>
          <span
            style={{ fontSize: "0.5em", letterSpacing: "0.3em", opacity: 0.8 }}
          >
            LIMITED
          </span>
          <span>HOLO</span>
          <span
            style={{
              fontSize: "0.4em",
              letterSpacing: "0.2em",
              opacity: 0.8,
              marginTop: 6,
            }}
          >
            ★ 2026 ★
          </span>
        </>
      )}
    </Holo>
    <Holo {...props} shape="burst" rotate={rotate + 18} color="#7c2d12">
      <span style={{ fontSize: "1.3em" }}>NEW!</span>
    </Holo>
    <Holo {...props} shape="rounded" rotate={rotate + 14} color="#1e1b4b">
      <span style={{ fontSize: "2.4em" }}>✦</span>
      <span
        style={{ fontSize: "0.55em", letterSpacing: "0.25em", marginTop: 8 }}
      >
        RARE PULL
      </span>
    </Holo>
  </div>
);

export default HoloDemo;
