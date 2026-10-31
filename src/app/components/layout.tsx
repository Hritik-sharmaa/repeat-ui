import { ReactNode, Suspense } from "react";
import Sidebar from "@/site/navs/Sidebar";
import { Header } from "@/site/navs/header";
import Footer from "@/site/footer";

// The shell of every /components page. Header and Sidebar read ?flavor= from the URL, which
// needs a Suspense boundary.
export default function ComponentsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="fixed inset-x-0 top-0 h-14 border-b border-line" />}>
        <Header />
      </Suspense>
      <aside className="thin-scrollbar fixed bottom-0 left-0 top-14 z-20 hidden w-64 overflow-y-auto border-r border-line lg:block">
        <Suspense>
          <Sidebar />
        </Suspense>
      </aside>
      <div className="pt-14 lg:pl-64">
        <main className="mx-auto min-h-[calc(100vh-3.5rem)] w-full max-w-6xl px-4 pb-24 sm:px-8">{children}</main>
        <Footer />
      </div>
    </>
  );
}
