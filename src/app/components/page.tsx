"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Header } from "./site/navs/header";
import Sidebar from "./site/navs/Sidebar";
import MobileNav from "./site/navs/MobileNav";

const ComponentsPage = () => {
  const [selectedPath] = useState<string | null>(null);
  const [LoadedComponent, setLoadedComponent] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (!selectedPath) {
      setLoadedComponent(null);
      return;
    }
    const DynamicComponent = dynamic(
      () => import(`./content/${selectedPath}`),
      {
        loading: () => (
          <div className="text-sm text-zinc-500">Loading component...</div>
        ),
        ssr: false,
      }
    );

    setLoadedComponent(() => DynamicComponent);
  }, [selectedPath]);

  return (
    <div>
      <MobileNav />
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
              <Sidebar />
            </aside>
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto h-screen lg:ml-56">
              <div>
                <h1>{selectedPath?.replace("/", " ")}</h1>
              </div>
              {LoadedComponent ? (
                <LoadedComponent />
              ) : (
                <p className="text-sm text-zinc-500">
                  Select a component to preview it here.
                </p>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage;
