import type { Metadata } from "next";
import { Suspense } from "react";
import { Overview } from "./Overview";

export const metadata: Metadata = {
  title: "Components · Repeat UI",
  description: "Every Repeat UI component, by category.",
};

export default function ComponentsPage() {
  return (
    <Suspense>
      <Overview />
    </Suspense>
  );
}
