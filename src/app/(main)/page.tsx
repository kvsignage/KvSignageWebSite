import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { OfferStack } from "@/components/sections/OfferStack";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TrustBar } from "@/components/sections/TrustBar";
import { Testimonials } from "@/components/sections/Testimonials";
import { AreaCoverage } from "@/components/sections/AreaCoverage";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProblemSection />
      <OfferStack />
      <ServicesGrid />
      <Testimonials />
      <AreaCoverage />
      <FAQ />
      <FinalCTA />
    </>
  );
}
