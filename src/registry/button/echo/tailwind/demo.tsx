"use client";

import type { ComponentProps } from "react";
import Echo from "./preview";

// Any prop passes straight through to the button.
const EchoDemo = (props: ComponentProps<typeof Echo>) => <Echo {...props}>{props.children ?? "Click me"}</Echo>;

export default EchoDemo;
