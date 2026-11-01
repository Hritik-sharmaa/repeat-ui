"use client";

import type { ComponentProps } from "react";
import Rotation from "./preview";

// Any prop passes straight through to the button.
const RotationBtnDemo = (props: ComponentProps<typeof Rotation>) => <Rotation {...props}>{props.children ?? "Rotate"}</Rotation>;

export default RotationBtnDemo;
