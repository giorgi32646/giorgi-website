import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { PricingSection } from "../components/PricingSection";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const PROCESS = [
  { step: "01", title: "Discovery call", description: "A 30–45 minute call to understand your product, goals, and constraints. I'll ask about your users, your current design/tech stack, and what success looks like for this engagement." },
  { step: "02", title: "Proposal & SOW", description: "Within 48 hours I send a detailed Statement of Work — scope, deliverables, timeline, milestones, and payment schedule. No ambiguity. You know exactly what you're getting." },
  { step: "03", title: "Kick-off & alignment", description: "We sign the NDA + contract, you pay the first milestone, and we kick off. I'll share my workflow, communication cadence, and where you'll see progress updates." },
  { step: "04", title: "Design & build", description: "I work async, sharing progress at each milestone. You review, give feedback, and I iterate. For MVP builds, design and code are developed in parallel — not sequentially." },
  { step: "05", title: "Handoff & support", description: "Delivery includes a full Figma handoff (if applicable), clean GitHub PR, documentation, and 30 days of post-launch support for bug fixes." },
];

const INCLUDED = [
  { title: "Kick-off call", body: "30–45 min video call to align on goals, scope, and success criteria before any work begins." },
  { title: "NDA on request", body: "Happy to sign your NDA or use mine — confidentiality is standard, not a premium add-on." },
  { title: "Async progress updates", body: "Regular written updates so you're never in the dark. I document decisions as I go." },
  { title: "Revision rounds", body: "Every tier includes defined revision rounds — use them, don't rush them." },
  { title: "Source files", body: "You own everything. Figma source files, code repository access, no vendor lock-in." },
  { title: "30-day support", body: "Post-delivery bug fixes and minor adjustments included on all build engagements." },
];

const FAQS = [
  { q: "Do you do hourly work?", a: "No. I only work on fixed-scope engagements. Hourly billing creates misaligned incentives — I move fast, and I shouldn't be penalized for it." },
  { q: "Can I hire you for just design (no code)?", a: "Yes. Brand identity and UI/UX product design can be design-only. Development is added when the project needs it — we scope that separately." },
  { q: "What's your current availability?", a: "I have 5–10 hours/week available for client work. I take on one active engagement at a time. If you're planning ahead, reach out early — slots fill quickly." },
  { q: "Do you work with non-technical founders?", a: "Yes. Half my clients are non-technical. I'll explain technical decisions in plain language and give you enough context to make informed choices." },
  { q: "What happens if the scope needs to change?", a: "Out-of-scope work is always discussed before starting. I'll give you a change order estimate, you approve it, and we move forward. No silent billing." },
  { q: "Do you offer retainers?", a: "Yes — the Enterprise tier is a monthly retainer. For smaller ongoing relationships, reach out and we can discuss a custom arrangement." },
  { q: "What tech stack do you use for builds?", a: "React + TypeScript + Tailwind CSS as the default. Backend: FastAPI (Python) or Next.js API routes depending on the project. Hosting: Vercel. I'll adapt to your existing stack." },
  { q: "Is there a payment plan?", a: "Yes. All engagements are split into milestones — typically 50% upfront, 50% on delivery for smaller projects. Longer engagements split across 3–4 milestones." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", padding: "1.15rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: "1.15rem" }}
      >
        {q}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: "var(--accent)", flexShrink: 0 }}>
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lede" style={{ margin: "0 0 1.1rem", paddingRight: "2rem", fontSize: "1rem" }}>
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PricingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: "72px" }}>
      <Helmet>
        <title>Pricing & Process | Giorgi Lortkipanidze</title>
        <meta name="description" content="Fixed-scope engagements, never hourly — from $2–4k UX audits to $15–30k MVP builds. See the five-step process, what every project includes, and FAQs." />
        <meta property="og:title" content="Pricing & Process | Giorgi Lortkipanidze" />
        <meta property="og:description" content="Fixed-scope engagements, never hourly — from $2–4k UX audits to $15–30k MVP builds. See the five-step process, what every project includes, and FAQs." />
        <meta property="og:url" content="https://www.giorgilortkipanidze.online/pricing" />
        <meta name="twitter:title" content="Pricing & Process | Giorgi Lortkipanidze" />
        <meta name="twitter:description" content="Fixed-scope engagements, never hourly — from $2–4k UX audits to $15–30k MVP builds. See the five-step process, what every project includes, and FAQs." />
        <link rel="canonical" href="https://www.giorgilortkipanidze.online/pricing" />
      </Helmet>

      <PricingSection />

      <section className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap">
          <p className="kicker">Process</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>How an engagement works</h2>
          <p className="lede" style={{ marginTop: "0.75rem", maxWidth: "32rem" }}>From first message to shipped product — here's exactly what to expect.</p>
          <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--line)" }}>
            {PROCESS.map((step) => (
              <article key={step.step} className="grid md:grid-cols-12" style={{ gap: "0.5rem 1.5rem", padding: "1.35rem 0", borderBottom: "1px solid var(--line)" }}>
                <p className="md:col-span-2 display" style={{ fontSize: "1.8rem", color: "var(--accent)", margin: 0 }}>{step.step}</p>
                <div className="md:col-span-10">
                  <h3 className="display" style={{ fontSize: "1.4rem" }}>{step.title}</h3>
                  <p className="lede" style={{ marginTop: "0.4rem", fontSize: "1rem", maxWidth: "40rem" }}>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap">
          <p className="kicker">Standard inclusions</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "1.5rem" }}>Every project includes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1.25rem" }}>
            {INCLUDED.map((item) => (
              <article key={item.title} style={{ borderTop: "1px solid var(--ink)", paddingTop: "0.9rem" }}>
                <h3 className="display" style={{ fontSize: "1.3rem" }}>{item.title}</h3>
                <p className="lede" style={{ marginTop: "0.45rem", fontSize: "0.98rem" }}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap" style={{ maxWidth: 760 }}>
          <p className="kicker">FAQ</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "1rem" }}>Common questions</h2>
          {FAQS.map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
          <p className="lede" style={{ marginTop: "2rem" }}>Still have questions?</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <a href="/book" onClick={(e) => { e.preventDefault(); navigate("/book"); }} className="btn btn-ink">Book a discovery call</a>
            <a href="mailto:thegiorgilortki@gmail.com" className="btn btn-line">Ask me directly</a>
          </div>
        </div>
      </section>
    </div>
  );
}
