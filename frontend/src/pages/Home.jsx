import { Hero } from "@/components/sections/Hero";
import { VideoStory } from "@/components/sections/VideoStory";
import { Impact, Transparency } from "@/components/sections/Impact";
import { Manifesto } from "@/components/sections/Manifesto";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Impact />
      <VideoStory />
      <Transparency />
      <Manifesto />
      <MarqueeBand />
      <NewsGrid />
      <FinalCTA />
    </>
  );
}
