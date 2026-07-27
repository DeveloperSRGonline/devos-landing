import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProductPreview } from "@/components/sections/ProductPreview";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Features />
      <HowItWorks />
      <ProductPreview />
      <Pricing />
    </main>
  );
}

