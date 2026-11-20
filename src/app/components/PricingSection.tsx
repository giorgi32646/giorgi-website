import { motion } from "motion/react";
import { Link } from "react-router";

const RANGES = [
  { name: "Premium Website", range: "$2,000–5,000", note: "A focused, custom site with premium UI and considered motion." },
  { name: "Business Website", range: "$3,500–7,000", note: "A fuller marketing or company site with custom functionality." },
  { name: "E-commerce Platform", range: "$4,000–10,000", note: "A store built around the product, not a theme." },
  { name: "UI/UX Product Design", range: "$2,000–8,000", note: "Web, SaaS, or mobile product design, including a design system when needed." },
  { name: "Complete Branding", range: "$1,500–5,000", note: "Identity, visual system, and guidelines for a digital-first brand." },
  { name: "Advanced Web Experience", range: "$5,000–15,000+", note: "3D, advanced motion, and immersive landing pages." },
  { name: "AI-powered Product", range: "$5,000–20,000+", note: "Prototypes, integrations, and AI product MVPs." },
];

export function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="studio-section">
      <div className="studio-wrap">
        <p className="kicker">Project ranges</p>
        <h2 id="pricing-heading" className="display" style={{ fontSize: "clamp(2.1rem, 4.5vw, 3.5rem)", maxWidth: "14ch" }}>
          Starting ranges, not fixed prices
        </h2>
        <p className="lede" style={{ marginTop: "0.9rem", maxWidth: "38rem" }}>
          Every engagement is quoted to scope. These ranges show where a project usually begins.
        </p>
        <div style={{ marginTop: "2.25rem", borderTop: "1px solid var(--line)" }}>
          {RANGES.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="grid md:grid-cols-12"
              style={{ gap: "0.5rem 1.5rem", padding: "1.25rem 0", borderBottom: "1px solid var(--line)" }}
            >
              <h3 className="display md:col-span-4" style={{ fontSize: "1.35rem" }}>{item.name}</h3>
              <p className="md:col-span-3" style={{ margin: 0, color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem" }}>{item.range}</p>
              <p className="lede md:col-span-5" style={{ fontSize: "0.98rem" }}>{item.note}</p>
            </motion.article>
          ))}
        </div>
        <Link to="/contact" className="btn btn-ink" style={{ marginTop: "1.75rem" }}>Request a quote</Link>
      </div>
    </section>
  );
}
