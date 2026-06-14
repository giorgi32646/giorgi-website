import { motion } from "motion/react";
import { PricingSection } from "../components/PricingSection";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const PROCESS = [
  {
    step: "01",
    title: "Discovery call",
    description:
      "A 30–45 minute call to understand your product, goals, and constraints. I'll ask about your users, your current design/tech stack, and what success looks like for this engagement.",
  },
  {
    step: "02",
    title: "Proposal & SOW",
    description:
      "Within 48 hours I send a detailed Statement of Work — scope, deliverables, timeline, milestones, and payment schedule. No ambiguity. You know exactly what you're getting.",
  },
  {
    step: "03",
    title: "Kick-off & alignment",
    description:
      "We sign the NDA + contract, you pay the first milestone, and we kick off. I'll share my workflow, communication cadence, and where you'll see progress updates.",
  },
  {
    step: "04",
    title: "Design & build",
    description:
      "I work async, sharing progress at each milestone. You review, give feedback, and I iterate. For MVP builds, design and code are developed in parallel — not sequentially.",
  },
  {
    step: "05",
    title: "Handoff & support",
    description:
      "Delivery includes a full Figma handoff (if applicable), clean GitHub PR, documentation, and 30 days of post-launch support for bug fixes.",
  },
];

const FAQS = [
  {
    q: "Do you do hourly work?",
    a: "No. I only work on fixed-scope engagements. Hourly billing creates misaligned incentives — I move fast, and I shouldn't be penalized for it.",
  },
  {
    q: "Can I hire you for just design (no code)?",
    a: "Yes. The UX Audit and Design Sprint tiers are design-only. Code is optional at every tier — we scope based on what you need.",
  },
  {
    q: "What's your current availability?",
    a: "I have 5–10 hours/week available for client work. I take on one active engagement at a time. If you're planning ahead, reach out early — slots fill quickly.",
  },
  {
    q: "Do you work with non-technical founders?",
    a: "Yes. Half my clients are non-technical. I'll explain technical decisions in plain language and give you enough context to make informed choices.",
  },
  {
    q: "What happens if the scope needs to change?",
    a: "Out-of-scope work is always discussed before starting. I'll give you a change order estimate, you approve it, and we move forward. No silent billing.",
  },
  {
    q: "Do you offer retainers?",
    a: "Yes — the Enterprise tier is a monthly retainer. For smaller ongoing relationships, reach out and we can discuss a custom arrangement.",
  },
  {
    q: "What tech stack do you use for builds?",
    a: "React + TypeScript + Tailwind CSS as the default. Backend: FastAPI (Python) or Next.js API routes depending on the project. Hosting: Vercel. I'll adapt to your existing stack.",
  },
  {
    q: "Is there a payment plan?",
    a: "Yes. All engagements are split into milestones — typically 50% upfront, 50% on delivery for smaller projects. Longer engagements split across 3–4 milestones.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "16px",
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            color: "#ffffff",
            fontSize: "0.975rem",
            lineHeight: 1.4,
          }}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink: 0, color: "#0080FF" }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            color: "#8A93A6",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            fontFamily: "'DM Sans', sans-serif",
            margin: "0 0 20px",
            paddingRight: "32px",
          }}
        >
          {a}
        </motion.p>
      )}
    </motion.div>
  );
}

export function PricingPage() {
  return (
    <div style={{ background: "#0A0E1A", paddingTop: "68px" }}>
      <PricingSection />

      {/* Process */}
      <section
        style={{
          background: "linear-gradient(180deg, #0A0E1A 0%, #0C1220 50%, #0A0E1A 100%)",
          padding: "80px 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...FADE_UP} transition={{ duration: 0.55 }} style={{ marginBottom: "48px" }}>
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
              Process
            </p>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color: "#ffffff",
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              How an engagement works
            </h2>
            <p
              style={{
                color: "#8A93A6",
                fontSize: "0.95rem",
                fontFamily: "'DM Sans', sans-serif",
                marginTop: "12px",
                maxWidth: "480px",
              }}
            >
              From first message to shipped product — here's exactly what to expect.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.step}
                {...FADE_UP}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                className="grid sm:grid-cols-[120px_1fr]"
                style={{
                  gap: "0 32px",
                  padding: "28px 0",
                  borderBottom: i < PROCESS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "2rem",
                    color: "rgba(0,128,255,0.2)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    paddingTop: "4px",
                  }}
                >
                  {step.step}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      color: "#ffffff",
                      fontSize: "1rem",
                      margin: "0 0 8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: "#8A93A6",
                      fontSize: "0.9rem",
                      lineHeight: 1.75,
                      fontFamily: "'DM Sans', sans-serif",
                      margin: 0,
                      maxWidth: "560px",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's always included */}
      <section style={{ background: "#0A0E1A", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...FADE_UP} transition={{ duration: 0.55 }} style={{ marginBottom: "40px" }}>
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
              Standard inclusions
            </p>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color: "#ffffff",
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Every project includes
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Kick-off call", body: "30–45 min video call to align on goals, scope, and success criteria before any work begins." },
              { title: "NDA on request", body: "Happy to sign your NDA or use mine — confidentiality is standard, not a premium add-on." },
              { title: "Async progress updates", body: "Regular written updates so you're never in the dark. I document decisions as I go." },
              { title: "Revision rounds", body: "Every tier includes defined revision rounds — use them, don't rush them." },
              { title: "Source files", body: "You own everything. Figma source files, code repository access, no vendor lock-in." },
              { title: "30-day support", body: "Post-delivery bug fixes and minor adjustments included on all build engagements." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...FADE_UP}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "22px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    margin: "0 0 8px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "#8A93A6",
                    fontSize: "0.85rem",
                    lineHeight: 1.7,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#0A0E1A", padding: "0 0 112px" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div {...FADE_UP} transition={{ duration: 0.55 }} style={{ marginBottom: "40px" }}>
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
              FAQ
            </p>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color: "#ffffff",
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Common questions
            </h2>
          </motion.div>

          <div>
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <motion.div
            {...FADE_UP}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginTop: "48px", textAlign: "center" }}
          >
            <p
              style={{
                color: "#8A93A6",
                fontSize: "0.95rem",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: "20px",
              }}
            >
              Still have questions?
            </p>
            <a
              href="mailto:thegiorgilortki@gmail.com"
              style={{
                display: "inline-block",
                background: "#0080FF",
                color: "#0A0E1A",
                borderRadius: "12px",
                padding: "13px 28px",
                fontSize: "0.9rem",
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Ask me directly →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
