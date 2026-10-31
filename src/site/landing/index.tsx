import { Suspense } from "react";
import Footer from "@/site/footer";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { LiveWall } from "./LiveWall";
import { InstallFlow } from "./InstallFlow";
import { Flavors } from "./Flavors";
import { Features } from "./Features";
import { Categories } from "./Categories";
import { Cta } from "./Cta";

export default function Landing() {
  return (
    <>
      {/* The search dialog's links keep ?flavor= from the URL, which needs a Suspense boundary. */}
      <Suspense>
        <Nav />
      </Suspense>
      <main>
        <Hero />
        <LiveWall />
        <InstallFlow />
        <Flavors />
        <Features />
        <Categories />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
