"use client";

import type { ComponentProps } from "react";
import BentoGrid from "./preview";

const BentoGridDemo = (props: Partial<ComponentProps<typeof BentoGrid>>) => {
  return (
    <main className="p-8 flex items-center justify-center">
      <div className="">
        <BentoGrid {...props} />
      </div>
    </main>
  );
};

export default BentoGridDemo;
