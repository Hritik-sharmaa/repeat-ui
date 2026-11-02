"use client";

import type { ComponentProps } from "react";
import BentoGrid from "./preview";

const BentoGridDemo = (props: Partial<ComponentProps<typeof BentoGrid>>) => {
  return (
    <main className="flex w-full items-center justify-center">
      <div className="w-full">
        <BentoGrid {...props} />
      </div>
    </main>
  );
};

export default BentoGridDemo;
