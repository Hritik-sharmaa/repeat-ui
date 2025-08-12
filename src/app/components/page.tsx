"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Header } from "./site/navs/header";
import Sidebar from "./site/navs/Sidebar";

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
      <Suspense
        fallback={
          <div className="h-16 bg-background border-b border-zinc-800" />
        }>
        <Header />
      </Suspense>
      <div className="pt-16 min-h-screen">
        <div className="w-full max-w-[95rem] mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
          <div className="flex">
            <aside className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full max-w-[95rem] z-20">
              <div className="px-2 sm:px-4 md:px-8 lg:px-12">
                <div className="w-full sm:w-56 md:w-64 lg:w-[15rem] h-[calc(100vh-4rem)] overflow-y-auto bg-background border-r border-zinc-800">
                  <Sidebar />
                </div>
              </div>
            </aside>
            <main className="flex-1 p-6 overflow-y-auto h-screen ml-0 sm:ml-56 md:ml-64 lg:ml-[15rem]">
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
