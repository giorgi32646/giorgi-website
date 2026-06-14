import { motion } from "motion/react";

const SKILLS = [
  "Figma",
  "React",
  "TypeScript",
  "Next.js",
  "FastAPI",
  "Python",
  "Tailwind CSS",
  "Motion / Framer",
  "Design Systems",
  "Supabase",
  "WebSockets",
  "MapLibre GL JS",
];

const STATS = [
  { value: "6+",   label: "Years of experience" },
  { value: "50+",  label: "Products shipped" },
  { value: "100%", label: "Remote-native" },
];

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{ background: "#0A0E1A", padding: "96px 0 112px" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: text */}
          <div>
            <motion.div {...FADE_UP} transition={{ duration: 0.55 }}>
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
                About
              </p>
              <h2
                id="about-heading"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  color: "#ffffff",
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  margin: "0 0 24px 0",
                }}
              >
                Designer who ships code
              </h2>
            </motion.div>

            <motion.div {...FADE_UP} transition={{ duration: 0.55, delay: 0.1 }}>
              <p
                style={{
                  color: "#8A93A6",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "16px",
                }}
              >
                I'm a hybrid designer-developer — I design interfaces in Figma and build them into production-ready code myself, with no handoff in between.
              </p>
              <p
                style={{
                  color: "#8A93A6",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "16px",
                }}
              >
                My edge: I'm a designer-developer hybrid. I design in Figma{" "}
                <em style={{ color: "#ffffff", fontStyle: "normal" }}>and</em>{" "}
                ship in React. No handoff, no translation loss, no "that's not what the design said" — what I design matches what gets built.
              </p>
              <p
                style={{
                  color: "#8A93A6",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Currently building Universal Drone OS alongside freelance work, with 5–10h/week available for the right client engagements.
              </p>
            </motion.div>

            <motion.div
              {...FADE_UP}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-8"
            >
              <a
                href="mailto:thegiorgilortki@gmail.com"
                style={{
                  display: "inline-block",
                  background: "rgba(0,128,255,0.12)",
                  border: "1px solid rgba(0,128,255,0.35)",
                  color: "#0080FF",
                  borderRadius: "12px",
                  padding: "12px 24px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,128,255,0.2)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,128,255,0.12)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
                onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "3px"; }}
                onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
              >
                Let's work together →
              </a>
            </motion.div>
          </div>

          {/* Right: stats + skills */}
          <div>
            {/* Stats */}
            <motion.div
              {...FADE_UP}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 0 24px rgba(0,128,255,0.18)",
                    borderColor: "rgba(0,128,255,0.35)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    padding: "24px 16px 20px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      color: "#0080FF",
                      fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      marginBottom: "6px",
                      whiteSpace: "nowrap",
                    }}
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      color: "#8A93A6",
                      fontSize: "0.775rem",
                      fontFamily: "'DM Sans', sans-serif",
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills */}
          </div>
        </div>
      </div>
    </section>
  );
}
