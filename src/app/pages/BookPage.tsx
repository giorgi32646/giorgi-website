import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Clock, Video, Globe, Wallet } from "lucide-react";
import { BookingWidget } from "../components/BookingWidget";

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const CALL_FACTS = [
  { icon: Clock, label: "Duration", value: "30 min" },
  { icon: Wallet, label: "Cost", value: "Free" },
  { icon: Video, label: "Format", value: "Video call" },
  { icon: Globe, label: "Time zone", value: "Yours" },
];

const AGENDA = [
  {
    title: "What you're building",
    body: "You walk me through the product — what it does, who it's for, and what stage it's at. I'll ask questions, not pitch.",
  },
  {
    title: "Where the friction is",
    body: "We pinpoint the actual problem: unclear UX, a stalled build, a design system that's fighting you, or something else entirely.",
  },
  {
    title: "Whether I'm the right fit",
    body: "If I can help, I'll tell you roughly what it would take. If I can't, I'll say so — and point you somewhere better.",
  },
];

export function BookPage() {
  return (
    <div style={{ background: "#0A0E1A", paddingTop: "68px" }}>
      <Helmet>
        <title>Book a Call | Giorgi Lortkipanidze</title>
        <meta
          name="description"
          content="Book a free 30-minute intro call. We'll cover what you're building, where the friction is, and whether I'm the right fit — no pitch, no obligation."
        />
        <meta property="og:title" content="Book a Call | Giorgi Lortkipanidze" />
        <meta
          property="og:description"
          content="Book a free 30-minute intro call. We'll cover what you're building, where the friction is, and whether I'm the right fit — no pitch, no obligation."
        />
        <meta property="og:url" content="https://www.giorgilortkipanidze.online/book" />
        <meta name="twitter:title" content="Book a Call | Giorgi Lortkipanidze" />
        <meta
          name="twitter:description"
          content="Book a free 30-minute intro call. We'll cover what you're building, where the friction is, and whether I'm the right fit — no pitch, no obligation."
        />
        <link rel="canonical" href="https://www.giorgilortkipanidze.online/book" />
      </Helmet>

      {/* Header + embed */}
      <section style={{ background: "#0A0E1A", padding: "80px 0 0" }}>
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
              Book a call
            </p>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color: "#ffffff",
                fontSize: "clamp(1.75rem, 5vw, 3rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Grab 30 minutes with me
            </h1>
            <p
              style={{
                color: "#8A93A6",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                fontFamily: "'DM Sans', sans-serif",
                marginTop: "14px",
                maxWidth: "520px",
              }}
            >
              Pick a slot that works for you. It's free, there's no pitch, and if I'm not the
              right person for the job I'll tell you on the call.
            </p>
          </motion.div>

          {/* Call facts */}
          <motion.div
            {...FADE_UP}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
            style={{ marginBottom: "32px" }}
          >
            {CALL_FACTS.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    padding: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "32px",
                      height: "32px",
                      borderRadius: "9px",
                      background: "rgba(0,128,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={15} style={{ color: "#0080FF" }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        color: "#0080FF",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontFamily: "'DM Sans', sans-serif",
                        margin: "0 0 3px",
                      }}
                    >
                      {fact.label}
                    </p>
                    <p
                      style={{
                        color: "#ffffff",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {fact.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div {...FADE_UP} transition={{ duration: 0.55, delay: 0.15 }}>
            <BookingWidget />
          </motion.div>
        </div>
      </section>

      {/* Agenda */}
      <section
        style={{
          background: "linear-gradient(180deg, #0A0E1A 0%, #0C1220 50%, #0A0E1A 100%)",
          padding: "80px 0",
          marginTop: "80px",
        }}
      >
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
              Agenda
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
              What we'll cover
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4">
            {AGENDA.map((item, i) => (
              <motion.div
                key={item.title}
                {...FADE_UP}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    color: "rgba(0,128,255,0.2)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    marginBottom: "14px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
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
                    fontSize: "0.875rem",
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

      {/* Email fallback */}
      <section style={{ background: "#0A0E1A", padding: "0 0 112px" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6" style={{ textAlign: "center" }}>
          <motion.div {...FADE_UP} transition={{ duration: 0.5 }}>
            <p
              style={{
                color: "#8A93A6",
                fontSize: "0.95rem",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: "20px",
              }}
            >
              None of the times work, or you'd rather write it out first?
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
              Email me instead →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
