import { ReactNode, Suspense } from "react";
import Sidebar from "@/app/components/site/navs/Sidebar";
import { Header } from "@/app/components/site/navs/header";
// import Link from "next/link";
// import Image from "next/image";

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

         <div className="fixed left-0 right-0 h-20 bg-gradient-to-b from-white via-white/60 to-transparent dark:from-zinc-900 dark:via-zinc-900/60 dark:to-transparent z-25 pointer-events-none" />

      
          
      <div className="pt-10 min-h-screen">
        <div className="w-full max-w-[100rem] mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
          <aside className="fixed top-16 w-56 h-[calc(100vh-4rem)] overflow-y-auto bg-background z-20">
            <Sidebar />
          </aside>
          <main className="ml-56 min-h-screen">
            {/* <div className="flex items-center justify-center gap-3 w-full py-8">
              <Link
              href="/"
              className="flex items-center gap-3 transition-all duration-300 hover:opacity-80">
              <div className="relative">
                <Image
                src="/Logo.png"
                alt="Repeat UI Logo"
                width={36}
                height={36}
                className="rounded-lg"
                />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                Repeat UI
              </h1>
              </Link>
            </div> */}
            <div className="w-full max-w-7xl mx-auto px-4">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}