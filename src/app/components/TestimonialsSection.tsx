import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Giorgi delivered our entire design system in three weeks — what I expected to take months. Every component was production-ready on day one. The handoff was flawless.",
    name: "Mark T.",
    role: "CTO, RedFlag.ai",
    initials: "MT",
  },
  {
    id: 2,
    quote:
      "We hired Giorgi to redesign our drone OS interface and he shipped the designs and the React implementation. It saved us two full-time positions and six months of back-and-forth.",
    name: "Sarah K.",
    role: "Product Lead, Universal Drone OS",
    initials: "SK",
  },
  {
    id: 3,
    quote:
      "Best freelance engagement I've ever managed. Crystal-clear communication, stunning output, zero revision hell. We went live on schedule.",
    name: "David M.",
    role: "CEO, SecureShare",
    initials: "DM",
  },
];

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
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
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
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
            What clients say
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.id}
              {...FADE_UP}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              aria-label={`Testimonial from ${t.name}, ${t.role}`}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "clamp(24px, 4vw, 32px)",
                margin: 0,
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
              {/* Quote mark */}
              <div
                aria-hidden="true"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "3rem",
                  lineHeight: 1,
                  color: "#0080FF",
                  opacity: 0.5,
                  marginBottom: "12px",
                  userSelect: "none",
                }}
              >
                "
              </div>

              <blockquote
                style={{ margin: 0 }}
              >
                <p
                  style={{
                    color: "#8A93A6",
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: 0,
                  }}
                >
                  {t.quote}
                </p>
              </blockquote>

              <figcaption
                className="flex items-center gap-3 mt-6"
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(0,128,255,0.15)",
                    border: "1px solid rgba(0,128,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <span
                    style={{
                      color: "#0080FF",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    {t.initials}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      color: "#8A93A6",
                      fontSize: "0.775rem",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
