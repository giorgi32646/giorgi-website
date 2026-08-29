import { Helmet } from "react-helmet-async";
import { WorkSection } from "../components/WorkSection";

export function WorkPage() {
  return (
    <div style={{ background: "#0A0E1A", paddingTop: "68px" }}>
      <Helmet>
        <title>Selected Work | Giorgi Lortkipanidze</title>
        <meta
          name="description"
          content="Own products designed and developed solo, from zero to production — Universal Drone OS, RedFlag.ai, and SecureShare. Real-time systems, AI, and encryption."
        />
        <meta property="og:title" content="Selected Work | Giorgi Lortkipanidze" />
        <meta
          property="og:description"
          content="Own products designed and developed solo, from zero to production — Universal Drone OS, RedFlag.ai, and SecureShare. Real-time systems, AI, and encryption."
        />
        <meta property="og:url" content="https://giorgilortkipanidze.online/work" />
        <meta name="twitter:title" content="Selected Work | Giorgi Lortkipanidze" />
        <meta
          name="twitter:description"
          content="Own products designed and developed solo, from zero to production — Universal Drone OS, RedFlag.ai, and SecureShare. Real-time systems, AI, and encryption."
        />
        <link rel="canonical" href="https://giorgilortkipanidze.online/work" />
      </Helmet>

      <WorkSection />
    </div>
  );
}
