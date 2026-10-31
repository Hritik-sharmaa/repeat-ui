import { Suspense } from "react";
import { Header } from "@/site/navs/header";
import Sidebar from "@/site/navs/Sidebar";
import MobileNav from "@/site/navs/MobileNav";

const ComponentsPage = () => {
  return (
    <div>
      {/* MobileNav and Sidebar read ?flavor= from the URL, which needs a Suspense boundary. */}
      <Suspense>
        <MobileNav />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-16 bg-background border-b border-zinc-800" />
        }>
        <Header />
      </Suspense>
      <div className="pt-16 min-h-screen">
        <div className="w-full max-w-[100rem] mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
          <div className="flex">
            <aside className="hidden lg:block fixed top-16 w-56 h-[calc(100vh-4rem)] overflow-y-auto bg-background border-r border-zinc-200 dark:border-zinc-800 z-20">
              <Suspense>
                <Sidebar />
              </Suspense>
            </aside>
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto h-screen lg:ml-56">
              <p className="text-sm text-zinc-500">
                Select a component to preview it here.
              </p>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage;
