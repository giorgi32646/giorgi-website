import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { ContactSection } from "../components/ContactSection";
import { Mail, Twitter, Clock, MessageSquare, Zap, Shield, CalendarDays } from "lucide-react";

const WHAT_TO_INCLUDE = [
  { icon: MessageSquare, title: "What you're building", body: "Give me a one-paragraph overview of your product — what it does, who it's for, and what stage it's at." },
  { icon: Zap, title: "What you need from me", body: "Design only? Design + code? A UX audit? The clearer you are, the faster I can tell you if I'm the right fit." },
  { icon: Clock, title: "Your timeline", body: "When do you need this done? Hard deadlines help me assess fit and prioritize. If you're flexible, say so." },
  { icon: Shield, title: "Your budget range", body: "You don't have to commit — just a ballpark. It saves us both time if expectations are aligned from the start." },
];

const WAYS_TO_REACH = [
  { icon: CalendarDays, label: "Book a call", value: "Free 30-min intro", href: "/book", note: "Fastest way to get time on my calendar" },
  { icon: Mail, label: "Email", value: "thegiorgilortki@gmail.com", href: "mailto:thegiorgilortki@gmail.com", note: "Best for detailed project inquiries" },
  { icon: Twitter, label: "X (Twitter)", value: "@Giorgi5926481", href: "https://x.com/Giorgi5926481", note: "Good for quick questions or following along" },
];

const CONTACT_FAQS = [
  { q: "How fast do you reply?", a: "Within 24 hours on weekdays. Usually faster. I treat inbound messages seriously — if you've taken the time to write, I'll give you a real reply." },
  { q: "What if I'm not ready to start yet?", a: "That's fine. Reach out anyway. Early conversations help me block time for you, and I can give you a rough scope estimate to help with budgeting." },
  { q: "Do you do free discovery calls?", a: "Yes. A 30-minute intro call is free. I won't pitch you — we'll just figure out if there's a fit. If there isn't, I'll tell you honestly." },
  { q: "Do you work with non-US clients?", a: "Yes. Most of my work is remote and international. I'm comfortable working across time zones — I'll set up async checkpoints that work for both of us." },
];

const AVAILABILITY = [
  { label: "Response time", value: "< 24h", note: "On weekdays. Usually much faster." },
  { label: "Availability", value: "5–10h/wk", note: "Alongside product work. Limited slots." },
  { label: "Time zone", value: "UTC+4", note: "Flexible for async. Overlap with EU & some US hours." },
];

export function ContactPage() {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: "72px" }}>
      <Helmet>
        <title>Contact | Giorgi Lortkipanidze</title>
        <meta name="description" content="Start a project or ask a question. Replies within 24 hours on weekdays, free 30-minute intro calls, and remote collaboration across time zones from UTC+4." />
        <meta property="og:title" content="Contact | Giorgi Lortkipanidze" />
        <meta property="og:description" content="Start a project or ask a question. Replies within 24 hours on weekdays, free 30-minute intro calls, and remote collaboration across time zones from UTC+4." />
        <meta property="og:url" content="https://www.giorgilortkipanidze.online/contact" />
        <meta name="twitter:title" content="Contact | Giorgi Lortkipanidze" />
        <meta name="twitter:description" content="Start a project or ask a question. Replies within 24 hours on weekdays, free 30-minute intro calls, and remote collaboration across time zones from UTC+4." />
        <link rel="canonical" href="https://www.giorgilortkipanidze.online/contact" />
      </Helmet>

      <ContactSection />

      <section className="studio-section">
        <div className="studio-wrap">
          <p className="kicker">Tips</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", maxWidth: "16ch" }}>What to include in your message</h2>
          <p className="lede" style={{ marginTop: "0.75rem", maxWidth: "32rem" }}>The more context you give, the faster I can respond with something useful.</p>
          <div className="grid md:grid-cols-2" style={{ gap: "1.25rem", marginTop: "1.75rem" }}>
            {WHAT_TO_INCLUDE.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} style={{ borderTop: "1px solid var(--ink)", paddingTop: "0.9rem", display: "flex", gap: "0.85rem" }}>
                  <Icon size={18} aria-hidden="true" style={{ color: "var(--accent)", marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <h3 className="display" style={{ fontSize: "1.3rem" }}>{item.title}</h3>
                    <p className="lede" style={{ marginTop: "0.4rem", fontSize: "0.98rem" }}>{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap">
          <p className="kicker">Other channels</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "1.25rem", maxWidth: "14ch" }}>Prefer a different way to reach me?</h2>
          <div className="grid md:grid-cols-3" style={{ gap: "1rem" }}>
            {WAYS_TO_REACH.map((channel) => {
              const Icon = channel.icon;
              const isInternal = channel.href.startsWith("/");
              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={isInternal ? (e) => { e.preventDefault(); navigate(channel.href); } : undefined}
                  style={{ textDecoration: "none", color: "inherit", borderTop: "1px solid var(--ink)", paddingTop: "0.9rem" }}
                >
                  <Icon size={16} aria-hidden="true" style={{ color: "var(--accent)" }} />
                  <p className="kicker" style={{ marginTop: "0.7rem" }}>{channel.label}</p>
                  <p className="display" style={{ fontSize: "1.25rem" }}>{channel.value}</p>
                  <p className="lede" style={{ marginTop: "0.35rem", fontSize: "0.92rem" }}>{channel.note}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap grid md:grid-cols-3" style={{ gap: 0, borderTop: "1px solid var(--line)" }}>
          {AVAILABILITY.map((item) => (
            <div key={item.label} style={{ padding: "1.25rem 1.25rem 1.25rem 0", borderBottom: "1px solid var(--line)" }}>
              <p className="kicker">{item.label}</p>
              <p className="display" style={{ fontSize: "2.2rem" }}>{item.value}</p>
              <p className="lede" style={{ marginTop: "0.4rem", fontSize: "0.92rem" }}>{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap" style={{ maxWidth: 760 }}>
          <p className="kicker">FAQ</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "1rem" }}>Before you reach out</h2>
          {CONTACT_FAQS.map((faq) => (
            <motion.article key={faq.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ padding: "1.15rem 0", borderBottom: "1px solid var(--line)" }}>
              <h3 className="display" style={{ fontSize: "1.25rem" }}>{faq.q}</h3>
              <p className="lede" style={{ marginTop: "0.45rem", fontSize: "1rem" }}>{faq.a}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
