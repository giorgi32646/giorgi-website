import { motion } from "motion/react";
import { Link } from "react-router";

const SKILLS = [
  "Figma", "React", "TypeScript", "Next.js", "FastAPI", "Python",
  "Tailwind CSS", "Motion", "Design systems", "Supabase", "WebSockets", "MapLibre GL JS",
];

const STATS = [
  { value: "6+", label: "Years of experience" },
  { value: "50+", label: "Products shipped" },
  { value: "100%", label: "Remote-native" },
];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="studio-section">
      <div className="studio-wrap">
        <div className="grid lg:grid-cols-12" style={{ gap: "2.5rem" }}>
          <motion.div className="lg:col-span-7" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <p className="kicker">04 — About</p>
            <h2 id="about-heading" className="display" style={{ fontSize: "clamp(2.1rem, 4.5vw, 3.6rem)", maxWidth: "14ch" }}>
              A designer who builds the work
            </h2>
            <p className="lede" style={{ marginTop: "1.25rem" }}>
              The Giorgi Lortki is an independent digital studio led by a designer-developer. Creative direction, interface, and frontend engineering stay in one practice.
            </p>
            <p className="lede" style={{ marginTop: "1rem" }}>
              The work is for ambitious businesses and startups that want precision, not a template. What is designed is what gets built.
            </p>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Based in Tbilisi. Available for a limited number of premium engagements.
            </p>
            <Link to="/contact" className="btn btn-ink" style={{ marginTop: "1.75rem" }}>
              Start a project
            </Link>
          </motion.div>

          <motion.div className="lg:col-span-5" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}>
            <dl style={{ margin: 0, borderTop: "1px solid var(--line)" }}>
              {STATS.map((stat) => (
                <div key={stat.label} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "baseline", padding: "1.1rem 0", borderBottom: "1px solid var(--line)" }}>
                  <dt style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontSize: "0.95rem" }}>{stat.label}</dt>
                  <dd className="display" style={{ margin: 0, fontSize: "2rem", color: "var(--accent)" }}>{stat.value}</dd>
                </div>
              ))}
            </dl>
            <p className="kicker" style={{ marginTop: "1.75rem" }}>Tools</p>
            <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.9 }}>
              {SKILLS.join("  ·  ")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
