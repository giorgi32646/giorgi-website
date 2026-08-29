import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Giorgi Lortkipanidze | SaaS UI/UX Designer & Developer</title>
        <meta
          name="description"
          content="Designer-developer building production-ready SaaS interfaces. No handoff, no delays — just shipped UI. Available for freelance work."
        />
        <meta property="og:title" content="Giorgi Lortkipanidze | SaaS UI/UX Designer & Developer" />
        <meta
          property="og:description"
          content="Designer-developer building production-ready SaaS interfaces. No handoff, no delays — just shipped UI. Available for freelance work."
        />
        <meta property="og:url" content="https://giorgilortkipanidze.online/" />
        <meta name="twitter:title" content="Giorgi Lortkipanidze | SaaS UI/UX Designer & Developer" />
        <meta
          name="twitter:description"
          content="Designer-developer building production-ready SaaS interfaces. No handoff, no delays — just shipped UI. Available for freelance work."
        />
        <link rel="canonical" href="https://giorgilortkipanidze.online/" />
      </Helmet>
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
