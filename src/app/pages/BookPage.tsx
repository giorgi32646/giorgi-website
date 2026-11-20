import { motion } from "motion/react";
import { Seo } from "../components/Seo";
import { pageByPath } from "../../lib/seo";
import { Clock, Video, Globe, Wallet } from "lucide-react";
import { BookingWidget } from "../components/BookingWidget";

const CALL_FACTS = [
  { icon: Clock, label: "Duration", value: "30 min" },
  { icon: Wallet, label: "Cost", value: "Free" },
  { icon: Video, label: "Format", value: "Video call" },
  { icon: Globe, label: "Time zone", value: "Yours" },
];

const AGENDA = [
  { title: "What you're building", body: "You walk me through the product — what it does, who it's for, and what stage it's at. I'll ask questions, not pitch." },
  { title: "Where the friction is", body: "We pinpoint the actual problem: unclear UX, a stalled build, a design system that's fighting you, or something else entirely." },
  { title: "Whether I'm the right fit", body: "If I can help, I'll tell you roughly what it would take. If I can't, I'll say so — and point you somewhere better." },
];

export function BookPage() {
  return (
    <div style={{ paddingTop: "72px" }}>
      <Seo page={pageByPath("/book")!} />

      <section className="studio-section" style={{ paddingBottom: "2rem" }}>
        <div className="studio-wrap">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="kicker">Book a call</p>
            <h1 className="display" style={{ fontSize: "clamp(2.4rem, 6vw, 4.6rem)", maxWidth: "12ch" }}>Grab 30 minutes with me</h1>
            <p className="lede" style={{ marginTop: "1rem", maxWidth: "34rem" }}>
              Pick a slot that works for you. It's free, there's no pitch, and if I'm not the right person for the job I'll tell you on the call.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "0", margin: "2rem 0", borderTop: "1px solid var(--line)" }}>
            {CALL_FACTS.map((fact) => {
              const Icon = fact.icon;
              return (
                <div key={fact.label} style={{ padding: "1rem 1rem 1rem 0", borderBottom: "1px solid var(--line)" }}>
                  <p className="kicker" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon size={14} aria-hidden="true" /> {fact.label}
                  </p>
                  <p className="display" style={{ fontSize: "1.6rem" }}>{fact.value}</p>
                </div>
              );
            })}
          </div>

          <BookingWidget />
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-wrap">
          <p className="kicker">Agenda</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "1.5rem" }}>What we'll cover</h2>
          <div className="grid md:grid-cols-3" style={{ gap: "1.5rem" }}>
            {AGENDA.map((item, i) => (
              <article key={item.title} style={{ borderTop: "1px solid var(--ink)", paddingTop: "1rem" }}>
                <p style={{ margin: 0, fontFamily: "var(--font-mono)", color: "var(--accent)", fontSize: "0.78rem" }}>0{i + 1}</p>
                <h3 className="display" style={{ fontSize: "1.45rem", marginTop: "0.5rem" }}>{item.title}</h3>
                <p className="lede" style={{ marginTop: "0.6rem", fontSize: "1rem" }}>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="lede" style={{ marginTop: "2.5rem" }}>None of the times work, or you'd rather write it out first?</p>
          <a href="mailto:thegiorgilortki@gmail.com" className="btn btn-ink" style={{ marginTop: "1rem" }}>Email me instead</a>
        </div>
      </section>
    </div>
  );
}
