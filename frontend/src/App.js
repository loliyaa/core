import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { VideoStory } from "@/components/sections/VideoStory";
import { Impact, Transparency } from "@/components/sections/Impact";
import { Manifesto } from "@/components/sections/Manifesto";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App font-body bg-[#FDFDFD]">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <Impact />
        <VideoStory />
        <Transparency />
        <Manifesto />
        <MarqueeBand />
        <NewsGrid />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
