import { motion } from "motion/react";
import { AboutSection } from "../components/AboutSection";

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

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
  {
    category: "Design",
    skills: ["Figma", "Design Systems", "Motion / Framer", "UX Research", "Prototyping", "Accessibility"],
  },
  {
    category: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite", "WebSockets"],
  },
  {
    category: "Backend & Data",
    skills: ["FastAPI", "Python", "Supabase", "PostgreSQL", "REST APIs", "Node.js"],
  },
  {
    category: "Tooling",
    skills: ["Git / GitHub", "Linear", "Vercel", "Figma Code Connect", "MapLibre GL JS", "Docker"],
  },
];

const VALUES = [
  {
    title: "Design and code are one discipline",
    body: "I don't believe in handoffs. The best products are built by people who can think across both sides of the stack — and I've spent years building that muscle.",
  },
  {
    title: "Scope clarity before anything",
    body: "Before touching a pixel or a component, I make sure we agree on what done looks like. Scope creep is a trust issue, not a complexity issue.",
  },
  {
    title: "Async-first, documentation-heavy",
    body: "I work best in writing. Every decision I make is documented — design rationale, component specs, architecture notes. Your team can always see why, not just what.",
  },
  {
    title: "Ship, then improve",
    body: "I bias towards getting something in front of users fast. Perfect is the enemy of shipped. I'd rather iterate on real feedback than polish a prototype nobody's seen.",
  },
];

export function AboutPage() {
  return (
    <div style={{ background: "#0A0E1A", paddingTop: "68px" }}>
      <AboutSection />

      {/* Timeline */}
      <section style={{ background: "#0A0E1A", padding: "0 0 96px" }}>
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
              Experience
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
              Where I've been
            </h2>
          </motion.div>

          <div style={{ position: "relative", paddingLeft: "28px" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "8px",
                bottom: "8px",
                width: "2px",
                background: "linear-gradient(180deg, #0080FF 0%, rgba(0,128,255,0.1) 100%)",
                borderRadius: "1px",
              }}
            />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                {...FADE_UP}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                style={{ position: "relative", marginBottom: i < TIMELINE.length - 1 ? "40px" : 0 }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-35px",
                    top: "6px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#0080FF",
                    boxShadow: "0 0 12px rgba(0,128,255,0.5)",
                  }}
                />
                <p
                  style={{
                    color: "#0080FF",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.year}
                </p>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontSize: "1.05rem",
                    margin: "0 0 8px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "#8A93A6",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: 0,
                    maxWidth: "600px",
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
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
              Skills
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
              Full-stack by design
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKILL_GROUPS.map((group, i) => (
              <motion.div
                key={group.category}
                {...FADE_UP}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <p
                  style={{
                    color: "#0080FF",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: "16px",
                  }}
                >
                  {group.category}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      style={{
                        color: "#C5CCD9",
                        fontSize: "0.875rem",
                        fontFamily: "'DM Sans', sans-serif",
                        lineHeight: 1.4,
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values / Philosophy */}
      <section style={{ background: "#0A0E1A", padding: "80px 0 112px" }}>
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
              How I work
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
              Principles I don't negotiate on
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                {...FADE_UP}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "28px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontSize: "1rem",
                    margin: "0 0 12px",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    color: "#8A93A6",
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: 0,
                  }}
                >
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
