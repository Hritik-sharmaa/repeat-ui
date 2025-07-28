import { ReactNode } from "react";
import Sidebar from "@/app/components/site/navs/Sidebar";
import { Header } from "@/app/components/site/navs/header";

export default function ComponentLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-10 h-16">
        <Header />
      </header>
      <div className="">
        <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-10">
          <Sidebar />
        </aside>
        <main className="pl-36 pt-16 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
