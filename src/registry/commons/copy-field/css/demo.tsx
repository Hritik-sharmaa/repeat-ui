"use client";

import type { ComponentProps } from "react";
import CopyField from "./preview";

const CopyFieldDemo = (props: ComponentProps<typeof CopyField>) => (
  <CopyField {...props} />
);

export default CopyFieldDemo;
