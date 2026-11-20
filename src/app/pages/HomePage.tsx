import { Seo } from "../components/Seo";
import { pageByPath } from "../../lib/seo";
import { HeroSection } from "../components/HeroSection";
import { WorkSection } from "../components/WorkSection";
import { ServicesSection } from "../components/ServicesSection";
import { ApproachSection } from "../components/ApproachSection";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";

export function HomePage() {
  return (
    <>
      <Seo page={pageByPath("/")!} />
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <ApproachSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
