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
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto h-screen">
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
  );
};

export default ComponentsPage;
