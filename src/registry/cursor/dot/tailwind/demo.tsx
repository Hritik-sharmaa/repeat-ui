"use client";

import type { ComponentProps } from "react";
import DotCursor from "./preview";

const DotCursorDemo = (props: ComponentProps<typeof DotCursor>) => (
  <div>
    <h1 style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.03em", opacity: 0.35 }}>Move the cursor</h1>
    <DotCursor {...props} />
  </div>
);

export default DotCursorDemo;
