"use client";

import type { ComponentProps } from "react";
import Pulse from "./preview";

// Any prop passes straight through to the button.
const PulseBtnDemo = (props: ComponentProps<typeof Pulse>) => <Pulse {...props}>{props.children ?? "Pulse"}</Pulse>;

export default PulseBtnDemo;
