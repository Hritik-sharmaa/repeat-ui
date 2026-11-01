"use client";

import type { ComponentProps } from "react";
import TypingText from "./preview";

const TypingTextDemo = (props: ComponentProps<typeof TypingText>) => (
  <TypingText text="Best component library for Next.js." {...props} />
);

export default TypingTextDemo;
