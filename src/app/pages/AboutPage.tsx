import { motion } from "motion/react";
import { Seo } from "../components/Seo";
import { pageByPath } from "../../lib/seo";
import { AboutSection } from "../components/AboutSection";

const TIMELINE = [
  {
    year: "2024–Now",
    title: "Founder — Universal Drone OS",
    description:
      "Building a real-time drone fleet management platform from the ground up — full-stack design + engineering. WebSockets, MapLibre GL, FastAPI, React.",
  },
  {
    year: "2022–2024",
    title: "Senior Product Designer + Engineer",
    description:
      "Led design and front-end engineering for a Series-A fintech SaaS. Owned the entire design system, built React component library used by 6 engineers.",
  },
  {
    year: "2020–2022",
    title: "Freelance Designer-Developer",
    description:
      "Worked with early-stage startups across Europe and the US — product strategy, UX research, full Figma design, and React builds.",
  },
  {
    year: "2018–2020",
    title: "UI/UX Designer",
    description:
      "Started as a visual and UX designer, then taught myself React and TypeScript to eliminate the gap between what I designed and what got shipped.",
  },
];

const SKILL_GROUPS = [
  { category: "Design", skills: ["Figma", "Design Systems", "Motion / Framer", "UX Research", "Prototyping", "Accessibility"] },
  { category: "Frontend", skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite", "WebSockets"] },
  { category: "Backend & Data", skills: ["FastAPI", "Python", "Supabase", "PostgreSQL", "REST APIs", "Node.js"] },
  { category: "Tooling", skills: ["Git / GitHub", "Linear", "Vercel", "Figma Code Connect", "MapLibre GL JS", "Docker"] },
];

const VALUES = [
  { title: "Design and code are one discipline", body: "I don't believe in handoffs. The best products are built by people who can think across both sides of the stack — and I've spent years building that muscle." },
  { title: "Scope clarity before anything", body: "Before touching a pixel or a component, I make sure we agree on what done looks like. Scope creep is a trust issue, not a complexity issue." },
  { title: "Async-first, documentation-heavy", body: "I work best in writing. Every decision I make is documented — design rationale, component specs, architecture notes. Your team can always see why, not just what." },
  { title: "Ship, then improve", body: "I bias towards getting something in front of users fast. Perfect is the enemy of shipped. I'd rather iterate on real feedback than polish a prototype nobody's seen." },
];

export function AboutPage() {
  return (
    <div style={{ paddingTop: "72px" }}>
      <Seo page={pageByPath("/about")!} />

      <AboutSection />

      <section className="studio-section">
        <div className="studio-wrap">
          <p className="kicker">Experience</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "1.5rem" }}>Where I've been</h2>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {TIMELINE.map((item, i) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid md:grid-cols-12"
                style={{ gap: "0.6rem 1.5rem", padding: "1.4rem 0", borderBottom: "1px solid var(--line)" }}
              >
                <p className="md:col-span-3" style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--accent)" }}>{item.year}</p>
                <div className="md:col-span-9">
                  <h3 className="display" style={{ fontSize: "1.45rem" }}>{item.title}</h3>
                  <p className="lede" style={{ marginTop: "0.45rem", fontSize: "1rem", maxWidth: "42rem" }}>{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap">
          <p className="kicker">Skills</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "1.75rem" }}>Full-stack by design</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "1.5rem" }}>
            {SKILL_GROUPS.map((group) => (
              <div key={group.category} style={{ borderTop: "1px solid var(--ink)", paddingTop: "1rem" }}>
                <p className="kicker">{group.category}</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {group.skills.map((skill) => (
                    <li key={skill} style={{ color: "var(--ink-soft)" }}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap">
          <p className="kicker">How I work</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "1.5rem", maxWidth: "14ch" }}>Principles I don't negotiate on</h2>
          <div className="grid md:grid-cols-2" style={{ gap: "0" }}>
            {VALUES.map((v, i) => (
              <article key={v.title} style={{ padding: "1.4rem 1.2rem 1.4rem 0", borderTop: "1px solid var(--line)", paddingRight: i % 2 === 0 ? "2rem" : 0 }}>
                <h3 className="display" style={{ fontSize: "1.45rem" }}>{v.title}</h3>
                <p className="lede" style={{ marginTop: "0.6rem", fontSize: "1rem" }}>{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
