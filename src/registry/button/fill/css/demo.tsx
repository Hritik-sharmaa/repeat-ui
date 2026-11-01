"use client";

import type { ComponentProps } from "react";
import Fill from "./preview";

// Any prop passes straight through to the button.
const FillBtnDemo = (props: ComponentProps<typeof Fill>) => <Fill {...props}>{props.children ?? "Fill"}</Fill>;

export default FillBtnDemo;
