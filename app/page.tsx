import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Features />
      <HowItWorks />
    </main>
  );
}
