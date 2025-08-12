import { ReactNode, Suspense } from "react";
import Sidebar from "@/app/components/site/navs/Sidebar";
import { Header } from "@/app/components/site/navs/header";

export default function ComponentLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-30 h-16">
        <Suspense
          fallback={
            <div className="h-16 bg-background border-b border-zinc-800" />
          }>
          <Header />
        </Suspense>
      </header>

      <div className="pt-16 min-h-screen">
        <div className="w-full max-w-[95rem] mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
          <aside className="fixed top-16 w-56 h-[calc(100vh-4rem)] overflow-y-auto bg-background z-20">
            <Sidebar />
          </aside>
          <main className="ml-56 min-h-screen">
            <div className="w-full max-w-7xl mx-auto px-4">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
