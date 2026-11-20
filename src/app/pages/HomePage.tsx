import { Helmet } from "react-helmet-async";
import { HeroSection } from "../components/HeroSection";
import { WorkSection } from "../components/WorkSection";
import { ServicesSection } from "../components/ServicesSection";
import { ApproachSection } from "../components/ApproachSection";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>The Giorgi Lortki | Premium Digital Product Studio</title>
        <meta
          name="description"
          content="The Giorgi Lortki designs, engineers, and delivers digital products — websites, software, mobile apps, marketplaces, and enterprise systems."
        />
        <meta property="og:title" content="The Giorgi Lortki | Premium Digital Studio" />
        <meta
          property="og:description"
          content="The Giorgi Lortki is a premium independent digital studio. We design. We build. We elevate. Creative direction, UI/UX, engineering, branding, and AI."
        />
        <meta property="og:url" content="https://www.giorgilortkipanidze.online/" />
        <meta name="twitter:title" content="The Giorgi Lortki | Premium Digital Studio" />
        <meta
          name="twitter:description"
          content="The Giorgi Lortki is a premium independent digital studio. We design. We build. We elevate. Creative direction, UI/UX, engineering, branding, and AI."
        />
        <link rel="canonical" href="https://www.giorgilortkipanidze.online/" />
      </Helmet>
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <ApproachSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
