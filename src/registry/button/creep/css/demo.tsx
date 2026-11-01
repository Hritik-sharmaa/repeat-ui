"use client";

import type { ComponentProps } from "react";
import Creep from "./preview";

// Any prop passes straight through to the button.
const CreepBtnDemo = (props: ComponentProps<typeof Creep>) => <Creep {...props}>{props.children ?? "Hover me!"}</Creep>;

export default CreepBtnDemo;
