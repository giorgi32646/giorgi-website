import { HeroSection } from "../components/HeroSection";
import { TechMarquee } from "../components/TechMarquee";
import { WhySection } from "../components/WhySection";
import { AboutSection } from "../components/AboutSection";
import { PricingSection } from "../components/PricingSection";
import { ContactSection } from "../components/ContactSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <WhySection />
      <AboutSection />
      <PricingSection />
      <ContactSection />
    </>
  );
}
