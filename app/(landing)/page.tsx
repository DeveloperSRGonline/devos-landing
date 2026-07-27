import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProductPreview } from "@/components/sections/ProductPreview";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Features />
      <HowItWorks />
      <ProductPreview />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
