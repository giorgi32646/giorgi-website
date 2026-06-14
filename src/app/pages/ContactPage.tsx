import { motion } from "motion/react";
import { ContactSection } from "../components/ContactSection";
import { Mail, Twitter, Clock, MessageSquare, Zap, Shield } from "lucide-react";

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const WHAT_TO_INCLUDE = [
  {
    icon: MessageSquare,
    title: "What you're building",
    body: "Give me a one-paragraph overview of your product — what it does, who it's for, and what stage it's at.",
  },
  {
    icon: Zap,
    title: "What you need from me",
    body: "Design only? Design + code? A UX audit? The clearer you are, the faster I can tell you if I'm the right fit.",
  },
  {
    icon: Clock,
    title: "Your timeline",
    body: "When do you need this done? Hard deadlines help me assess fit and prioritize. If you're flexible, say so.",
  },
  {
    icon: Shield,
    title: "Your budget range",
    body: "You don't have to commit — just a ballpark. It saves us both time if expectations are aligned from the start.",
  },
];

const WAYS_TO_REACH = [
  {
    icon: Mail,
    label: "Email",
    value: "thegiorgilortki@gmail.com",
    href: "mailto:thegiorgilortki@gmail.com",
    note: "Best for detailed project inquiries",
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    value: "@Giorgi5926481",
    href: "https://x.com/Giorgi5926481",
    note: "Good for quick questions or following along",
  },
];

const CONTACT_FAQS = [
  {
    q: "How fast do you reply?",
    a: "Within 24 hours on weekdays. Usually faster. I treat inbound messages seriously — if you've taken the time to write, I'll give you a real reply.",
  },
  {
    q: "What if I'm not ready to start yet?",
    a: "That's fine. Reach out anyway. Early conversations help me block time for you, and I can give you a rough scope estimate to help with budgeting.",
  },
  {
    q: "Do you do free discovery calls?",
    a: "Yes. A 30-minute intro call is free. I won't pitch you — we'll just figure out if there's a fit. If there isn't, I'll tell you honestly.",
  },
  {
    q: "Do you work with non-US clients?",
    a: "Yes. Most of my work is remote and international. I'm comfortable working across time zones — I'll set up async checkpoints that work for both of us.",
  },
];

export function ContactPage() {
  return (
    <div style={{ background: "#0A0E1A", paddingTop: "68px" }}>
      <ContactSection />

      {/* What to include */}
      <section style={{ background: "#0A0E1A", padding: "0 0 80px" }}>
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
              Tips
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
              What to include in your message
            </h2>
            <p
              style={{
                color: "#8A93A6",
                fontSize: "0.95rem",
                fontFamily: "'DM Sans', sans-serif",
                marginTop: "12px",
                maxWidth: "460px",
              }}
            >
              The more context you give, the faster I can respond with something useful.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {WHAT_TO_INCLUDE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  {...FADE_UP}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(0,128,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={17} style={{ color: "#0080FF" }} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        margin: "0 0 7px",
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
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other ways to reach */}
      <section
        style={{
          background: "linear-gradient(180deg, #0A0E1A 0%, #0C1220 50%, #0A0E1A 100%)",
          padding: "80px 0",
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
              Other channels
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
              Prefer a different way to reach me?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5" style={{ maxWidth: "640px" }}>
            {WAYS_TO_REACH.map((channel, i) => {
              const Icon = channel.icon;
              return (
                <motion.a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  {...FADE_UP}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    display: "block",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    padding: "24px",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,128,255,0.3)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,128,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(0,128,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px",
                    }}
                  >
                    <Icon size={17} style={{ color: "#0080FF" }} />
                  </div>
                  <p
                    style={{
                      color: "#0080FF",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "'DM Sans', sans-serif",
                      marginBottom: "4px",
                    }}
                  >
                    {channel.label}
                  </p>
                  <p
                    style={{
                      color: "#ffffff",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                      marginBottom: "6px",
                    }}
                  >
                    {channel.value}
                  </p>
                  <p
                    style={{
                      color: "#8A93A6",
                      fontSize: "0.8rem",
                      fontFamily: "'DM Sans', sans-serif",
                      margin: 0,
                    }}
                  >
                    {channel.note}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Availability + response time */}
      <section style={{ background: "#0A0E1A", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { label: "Response time", value: "< 24h", note: "On weekdays. Usually much faster." },
              { label: "Availability", value: "5–10h/wk", note: "Alongside product work. Limited slots." },
              { label: "Time zone", value: "UTC+4", note: "Flexible for async. Overlap with EU & some US hours." },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                {...FADE_UP}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: "#0080FF",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: "10px",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    color: "#ffffff",
                    fontSize: "1.75rem",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {item.value}
                </p>
                <p
                  style={{
                    color: "#8A93A6",
                    fontSize: "0.8rem",
                    fontFamily: "'DM Sans', sans-serif",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {item.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
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
              Before you reach out
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {CONTACT_FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                {...FADE_UP}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  padding: "24px 0",
                  borderBottom: i < CONTACT_FAQS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontSize: "0.975rem",
                    margin: "0 0 10px",
                  }}
                >
                  {faq.q}
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
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
