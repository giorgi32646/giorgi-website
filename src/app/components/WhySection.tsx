import { motion } from "motion/react";

const POINTS = [
  {
    id: "no-handoff",
    title: "No handoff delays",
    description: "I design in Figma and ship in code myself — zero context loss between design and development.",
  },
  {
    id: "async-first",
    title: "Async-first communication",
    description: "Daily progress updates via Slack or Loom — no endless meetings, just steady visible progress.",
  },
  {
    id: "production-ready",
    title: "Production-ready code",
    description: "TypeScript, tested, documented — code your team can confidently maintain after I'm gone.",
  },
];

export function WhySection() {
  return (
    <section id="why" aria-labelledby="why-heading" className="studio-section">
      <div className="studio-wrap">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <p className="kicker">01 — The difference</p>
          <h2 id="why-heading" className="display" style={{ fontSize: "clamp(2.1rem, 4.5vw, 3.6rem)", maxWidth: "12ch" }}>
            Why work with me
          </h2>
        </motion.div>

        <div style={{ marginTop: "2.75rem", borderTop: "1px solid var(--line)" }}>
          {POINTS.map((point, i) => (
            <motion.article
              key={point.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="grid md:grid-cols-12"
              style={{ gap: "1rem 2rem", padding: "1.75rem 0", borderBottom: "1px solid var(--line)" }}
            >
              <p className="md:col-span-2" style={{ margin: 0, fontFamily: "var(--font-mono)", color: "var(--accent)", fontSize: "0.8rem" }}>
                0{i + 1}
              </p>
              <h3 className="display md:col-span-4" style={{ fontSize: "clamp(1.45rem, 2vw, 1.9rem)", fontWeight: 560 }}>
                {point.title}
              </h3>
              <p className="lede md:col-span-6" style={{ fontSize: "1rem" }}>
                {point.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
