"use client";

import type { ComponentProps } from "react";
import BentoGrid from "./preview";

const BentoGridDemo = (props: Partial<ComponentProps<typeof BentoGrid>>) => {
  return (
    <main className="">
      <BentoGrid {...props} />
    </main>
  );
};

export default BentoGridDemo;
