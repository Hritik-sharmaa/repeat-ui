import { ReactNode } from "react";
import Sidebar from "@/app/components/site/navs/Sidebar";
import { Header } from "@/app/components/site/navs/header";

export default function ComponentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <header className=" shadow fixedz-10">
        <Header />
      </header>
      <div className="flex flex-1">
        <aside>
          <Sidebar />
        </aside>
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
