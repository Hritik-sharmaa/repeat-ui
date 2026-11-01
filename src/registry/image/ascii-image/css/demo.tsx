"use client";

import type { ComponentProps } from "react";
import AsciiImage from "./preview";

// Hover to brighten the characters under the pointer; the button copies the art as text.
const AsciiImageDemo = (props: ComponentProps<typeof AsciiImage>) => (
  <AsciiImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&h=1100&fit=crop" alt="A portrait" {...props} />
);

export default AsciiImageDemo;
