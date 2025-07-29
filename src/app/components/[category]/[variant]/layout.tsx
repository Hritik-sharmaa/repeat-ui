import { ReactNode, Suspense } from "react";
import Sidebar from "@/app/components/site/navs/Sidebar";
import { Header } from "@/app/components/site/navs/header";

export default function ComponentLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-10 h-16">
        <Suspense
          fallback={
            <div className="h-16 bg-background border-b border-zinc-800" />
          }>
          <Header />
        </Suspense>
      </header>
      <div className="flex">
        <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-10">
          <Sidebar />
        </aside>
        <main className="flex-1 ml-[200px] sm:ml-[224px] md:ml-[256px] lg:ml-[240px] pt-16 min-h-screen">
          <div className="px-2 sm:px-4 md:px-8 lg:px-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
