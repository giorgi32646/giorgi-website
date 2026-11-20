import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";

const PROJECTS = [
  {
    id: "universal-drone-os",
    title: "Universal Drone OS",
    category: "Full-stack product · Drone fleet management",
    description:
      "Multi-tenant drone fleet management platform targeting 500+ simultaneous drones. Real-time telemetry, mission planning, and incident triage — designed and built end-to-end.",
    tags: ["Python", "FastAPI", "MAVLink", "NATS JetStream", "React", "MapLibre GL JS", "WebSocket", "Supabase"],
    year: "2024–25",
  },
  {
    id: "redflag-ai",
    title: "RedFlag.ai",
    category: "AI SaaS · Contract analysis",
    description:
      "AI-powered contract red flag scanner. Paste or upload any contract and get a plain-English risk breakdown in seconds. Google/Facebook OAuth, magic link auth, and Polar.sh payments.",
    tags: ["Next.js 14", "TypeScript", "Tailwind", "Gemini 2.0 Flash", "Supabase Auth", "Polar.sh"],
    year: "2024",
  },
  {
    id: "secureshare",
    title: "SecureShare",
    category: "Full-stack product · Encrypted file sharing",
    description:
      "Zero-knowledge encrypted file sharing. Files are encrypted client-side with AES-256-GCM before upload — the server never sees plaintext. Chunked resumable uploads and JWT auth.",
    tags: ["FastAPI", "AES-256-GCM", "Chunked Uploads", "JWT", "Python"],
    year: "2023",
  },
];

export function WorkSection() {
  const navigate = useNavigate();

  return (
    <section id="work" aria-labelledby="work-heading" className="studio-section" style={{ paddingTop: 0 }}>
      <div className="studio-wrap">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <p className="kicker">01 — Selected work</p>
          <h2 id="work-heading" className="display" style={{ fontSize: "clamp(2.1rem, 4.5vw, 3.6rem)" }}>
            Products designed and built
          </h2>
          <p className="lede" style={{ marginTop: "0.9rem", maxWidth: "36rem" }}>
            Own products, taken from zero to production. The same standard applied to client work.
          </p>
        </motion.div>

        <div style={{ marginTop: "2.5rem", borderTop: "1px solid var(--ink)" }}>
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              aria-label={`${project.title} — ${project.category}`}
              style={{ padding: "2rem 0", borderBottom: "1px solid var(--line)" }}
            >
              <div className="grid lg:grid-cols-12" style={{ gap: "1.25rem 2rem" }}>
                <div className="lg:col-span-3" style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                  <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)" }}>
                    0{i + 1}{i === 0 ? " · Featured" : ""}
                  </p>
                  <p className="lg:hidden" style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--faint)" }}>
                    {project.year}
                  </p>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>{project.title}</h3>
                  <p style={{ margin: "0.55rem 0 0", fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.04em", color: "var(--muted)" }}>
                    Own product · {project.category}
                  </p>
                  <p className="lede" style={{ marginTop: "0.9rem", fontSize: "1rem", maxWidth: "40rem" }}>{project.description}</p>
                  <p style={{ margin: "1rem 0 0", color: "var(--ink-soft)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                    {project.tags.join("  /  ")}
                  </p>
                  <a
                    href="mailto:thegiorgilortki@gmail.com"
                    aria-label={`Ask Giorgi about ${project.title}`}
                    className="inline-flex items-center gap-1.5"
                    style={{ marginTop: "1.1rem", color: "var(--accent)", fontWeight: 560, textDecoration: "none" }}
                  >
                    Ask me about this project <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
                <p className="hidden lg:block lg:col-span-3" style={{ margin: 0, textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--faint)" }}>
                  {project.year}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button type="button" onClick={() => navigate("/portfolio")} className="btn btn-line">
            View full portfolio <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
