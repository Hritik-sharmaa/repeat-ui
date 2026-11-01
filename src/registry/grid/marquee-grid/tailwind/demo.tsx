"use client";

import type { ComponentProps } from "react";
import MarqueeGrid from "./preview";

const MarqueeGridDemo = (props: ComponentProps<typeof MarqueeGrid>) => (
  <div style={{ width: "100%", maxWidth: 760 }}>
    <MarqueeGrid {...props} />
  </div>
);

export default MarqueeGridDemo;
