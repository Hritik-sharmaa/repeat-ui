"use client";

import type { ComponentProps } from "react";
import Simple from "./preview";

// Any prop passes straight through to the button.
const SimpleBtnDemo = (props: ComponentProps<typeof Simple>) => <Simple {...props}>{props.children ?? "Simple"}</Simple>;

export default SimpleBtnDemo;
