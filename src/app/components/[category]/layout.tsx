import type { ReactNode } from "react";
import { formatName } from "@/lib/utils";

// Only for the tab title: the gallery page itself is a client component.
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return { title: `${formatName(category)} · Repeat UI` };
}

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return children;
}
