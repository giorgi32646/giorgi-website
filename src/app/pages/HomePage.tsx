import { HeroSection } from "../components/HeroSection";
import { TechMarquee } from "../components/TechMarquee";
import { WhySection } from "../components/WhySection";
import { WorkSection } from "../components/WorkSection";
import { AboutSection } from "../components/AboutSection";
import { PricingSection } from "../components/PricingSection";
import { ContactSection } from "../components/ContactSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <WhySection />
      <WorkSection />
      <AboutSection />
      <PricingSection />
      <ContactSection />
    </>
  );
}
