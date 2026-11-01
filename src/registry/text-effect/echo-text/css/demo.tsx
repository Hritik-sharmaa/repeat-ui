"use client";

import type { ComponentProps } from "react";
import EchoText from "./preview";

const EchoTextDemo = (props: ComponentProps<typeof EchoText>) => <EchoText {...props} />;

export default EchoTextDemo;
