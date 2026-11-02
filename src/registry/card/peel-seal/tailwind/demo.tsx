"use client";

import type { ComponentProps } from "react";
import PeelSeal from "./preview";

// A coupon hidden under the seal. Drag the corner to peel it; the code sits in the corner that
// lifts first, so it shows as soon as the peel starts.
const PeelSealDemo = (props: ComponentProps<typeof PeelSeal>) => (
  <PeelSeal {...props}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: 6,
        height: "100%",
        padding: 24,
        textAlign: "right",
        color: "#fafafa",
        background: "radial-gradient(circle at 15% 15%, rgba(250,95,27,0.45), transparent 55%), #111111",
      }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
        Welcome gift
      </span>
      <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>20% off</span>
      <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, opacity: 0.8 }}>Code: REPEAT-26</span>
    </div>
  </PeelSeal>
);

export default PeelSealDemo;
