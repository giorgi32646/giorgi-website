import { motion } from "motion/react";
import { Check } from "lucide-react";

const TIERS = [
  {
    id: "ux-audit",
    name: "UX Audit",
    price: "$2–4k",
    priceLabel: null,
    timeline: "1–2 weeks",
    description: "A focused review of your existing product with prioritized UX improvements and a clear action plan.",
    features: [
      "Full UX/UI audit (up to 20 screens)",
      "Heuristic evaluation report",
      "Prioritized fix list",
      "2 rounds of async Q&A",
      "Figma annotations",
    ],
    cta: "Start an audit",
    highlight: false,
  },
  {
    id: "design-sprint",
    name: "Design Sprint",
    price: "$15–20k",
    priceLabel: null,
    timeline: "4–6 weeks",
    description: "Full product design for a new feature, flow, or SaaS product — from research to production-ready Figma.",
    features: [
      "User research & journey mapping",
      "Wireframes + high-fidelity screens",
      "Interactive Figma prototype",
      "Design system / component library",
      "Developer handoff with specs",
      "3 revision rounds",
    ],
    cta: "Start a sprint",
    highlight: false,
  },
  {
    id: "full-mvp",
    name: "Full MVP",
    price: "$15–30k",
    priceLabel: null,
    timeline: "6–12 weeks",
    description: "Design and development in one engagement. I design it, then I build it — production React delivered to your repo.",
    features: [
      "Everything in Design Sprint",
      "React + TypeScript development",
      "Responsive across all breakpoints",
      "Auth, routing, and core features",
      "Deployed staging environment",
      "30-day post-launch support",
    ],
    cta: "Build my MVP",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$30–50k+",
    priceLabel: "/month",
    timeline: "Ongoing",
    description: "For funded startups needing a dedicated design + dev resource at scale — priority access, deeper involvement, and architecture-level ownership.",
    features: [
      "Everything in Full MVP",
      "Dedicated availability (< 24h response)",
      "Architecture & technical strategy input",
      "Direct Slack/Linear access, daily async updates",
      "Quarterly roadmap planning sessions",
    ],
    cta: "Let's Talk",
    highlight: false,
  },
];

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      style={{
        background: "linear-gradient(180deg, #0A0E1A 0%, #0C1220 50%, #0A0E1A 100%)",
        padding: "96px 0 112px",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          {...FADE_UP}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <p
            style={{
              color: "#0080FF",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: "12px",
            }}
          >
            Pricing
          </p>
          <h2
            id="pricing-heading"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "#ffffff",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Straightforward rates
          </h2>
          <p
            style={{
              color: "#8A93A6",
              fontSize: "1rem",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.6,
              maxWidth: "480px",
              margin: "12px auto 0",
            }}
          >
            Fixed-scope packages. No hourly surprises, no scope creep — just clear deliverables.
          </p>
        </motion.div>

        {/* Pricing cards — items-stretch so all rows match height */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              {...FADE_UP}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              role="article"
              aria-label={`${tier.name} pricing tier`}
              className="flex flex-col"
              style={{
                background: tier.highlight
                  ? "rgba(0,128,255,0.07)"
                  : "rgba(255,255,255,0.03)",
                border: tier.highlight
                  ? "1px solid rgba(0,128,255,0.4)"
                  : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "28px 24px 24px",
                position: "relative",
                transition: "border-color 0.25s, background 0.25s",
              }}
              onMouseEnter={(e) => {
                if (!tier.highlight) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,128,255,0.2)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.045)";
                }
              }}
              onMouseLeave={(e) => {
                if (!tier.highlight) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }
              }}
            >
              {/* Most Popular badge — overlaps top border, centered */}
              {tier.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: "-1px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#0080FF",
                    color: "#0A0E1A",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "4px 14px",
                    borderRadius: "0 0 8px 8px",
                    fontFamily: "'DM Sans', sans-serif",
                    whiteSpace: "nowrap",
                  }}
                  aria-label="Most popular option"
                >
                  Most Popular
                </div>
              )}

              {/* Card body — flex-col fills full height */}
              <div
                className="flex flex-col"
                style={{
                  flex: 1,
                  marginTop: tier.highlight ? "16px" : "0",
                }}
              >
                {/* 1. Title */}
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontSize: "1.05rem",
                    margin: "0 0 10px 0",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {tier.name}
                </h3>

                {/* 2. Price — large and bold, always first thing under title */}
                <div className="flex items-baseline gap-1 flex-wrap" style={{ marginBottom: "4px" }}>
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      color: tier.highlight ? "#0080FF" : "#ffffff",
                      fontSize: "1.875rem",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tier.price}
                  </span>
                  {tier.priceLabel && (
                    <span
                      style={{
                        color: "#8A93A6",
                        fontSize: "0.8rem",
                        fontFamily: "'DM Sans', sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tier.priceLabel}
                    </span>
                  )}
                </div>

                {/* 3. Timeline */}
                <p
                  style={{
                    color: "#4A5568",
                    fontSize: "0.75rem",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: "16px",
                    marginTop: "2px",
                  }}
                >
                  {tier.timeline} timeline
                </p>

                {/* 4. Description */}
                <p
                  style={{
                    color: "#8A93A6",
                    fontSize: "0.845rem",
                    lineHeight: 1.65,
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: "20px",
                  }}
                >
                  {tier.description}
                </p>

                {/* 5. Features — grows to push CTA to bottom */}
                <ul
                  style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}
                  aria-label={`Features included in ${tier.name}`}
                >
                  {tier.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2"
                      style={{ marginBottom: "9px" }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          marginTop: "3px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "rgba(0,128,255,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-hidden="true"
                      >
                        <Check size={9} style={{ color: "#0080FF", strokeWidth: 3 }} />
                      </span>
                      <span
                        style={{
                          color: "#8A93A6",
                          fontSize: "0.82rem",
                          lineHeight: 1.5,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* 6. CTA — pinned to bottom via mt-auto */}
                <a
                  href="mailto:thegiorgilortki@gmail.com"
                  aria-label={`${tier.cta} — contact Giorgi about ${tier.name}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "11px 20px",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "transform 0.2s, opacity 0.2s",
                    background: tier.highlight ? "#0080FF" : "rgba(255,255,255,0.07)",
                    color: tier.highlight ? "#0A0E1A" : "#ffffff",
                    border: tier.highlight ? "none" : "1px solid rgba(255,255,255,0.12)",
                    marginTop: "24px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                  onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "3px"; }}
                  onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
                >
                  {tier.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...FADE_UP}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
          style={{
            color: "#4A5568",
            fontSize: "0.85rem",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          All projects include a kick-off call and NDA.{" "}
          <a
            href="mailto:thegiorgilortki@gmail.com"
            style={{ color: "#0080FF", textDecoration: "none" }}
            onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "2px"; e.currentTarget.style.borderRadius = "2px"; }}
            onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
          >
            Custom scope?
          </a>{" "}
          Let's talk.
        </motion.p>
      </div>
    </section>
  );
}
