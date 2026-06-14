import { motion } from "motion/react";
import { Layers, Zap, CheckCircle } from "lucide-react";

const CARDS = [
  {
    id: "no-handoff",
    Icon: Layers,
    title: "No Handoff Delays",
    description:
      "I design in Figma and ship in code myself — zero context loss between design and development.",
  },
  {
    id: "async-first",
    Icon: Zap,
    title: "Async-First Communication",
    description:
      "Daily progress updates via Slack or Loom — no endless meetings, just steady visible progress.",
  },
  {
    id: "production-ready",
    Icon: CheckCircle,
    title: "Production-Ready Code",
    description:
      "TypeScript, tested, documented — code your team can confidently maintain after I'm gone.",
  },
];

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function WhySection() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      style={{
        background: "linear-gradient(180deg, #0A0E1A 0%, #0B1018 50%, #0A0E1A 100%)",
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
            The difference
          </p>
          <h2
            id="why-heading"
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
            Why Work With Me
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map(({ id, Icon, title, description }, i) => (
            <motion.div
              key={id}
              {...FADE_UP}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "clamp(24px, 4vw, 32px)",
                transition: "border-color 0.25s, background 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,128,255,0.2)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.045)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(0,128,255,0.12)",
                  border: "1px solid rgba(0,128,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
                aria-hidden="true"
              >
                <Icon size={20} style={{ color: "#0080FF" }} />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  color: "#ffffff",
                  fontSize: "1.05rem",
                  letterSpacing: "-0.01em",
                  margin: "0 0 10px 0",
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: "#8A93A6",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  fontFamily: "'DM Sans', sans-serif",
                  margin: 0,
                }}
              >
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
