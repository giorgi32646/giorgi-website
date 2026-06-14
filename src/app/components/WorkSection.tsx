import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";

const PROJECTS = [
  {
    id: "universal-drone-os",
    title: "Universal Drone OS",
    category: "Full-Stack Product · Drone Fleet Management",
    description:
      "Multi-tenant drone fleet management platform targeting 500+ simultaneous drones. Real-time telemetry, mission planning, and incident triage — designed and built end-to-end.",
    tags: ["Python", "FastAPI", "MAVLink", "NATS JetStream", "React", "MapLibre GL JS", "WebSocket", "Supabase"],
    year: "2024–25",
    featured: true,
  },
  {
    id: "redflag-ai",
    title: "RedFlag.ai",
    category: "AI SaaS · Contract Analysis",
    description:
      "AI-powered contract red flag scanner. Paste or upload any contract and get a plain-English risk breakdown in seconds. Google/Facebook OAuth, magic link auth, and Polar.sh payments.",
    tags: ["Next.js 14", "TypeScript", "Tailwind", "Gemini 2.0 Flash", "Supabase Auth", "Polar.sh"],
    year: "2024",
    featured: false,
  },
  {
    id: "secureshare",
    title: "SecureShare",
    category: "Full-Stack Product · Encrypted File Sharing",
    description:
      "Zero-knowledge encrypted file sharing. Files are encrypted client-side with AES-256-GCM before upload — the server never sees plaintext. Chunked resumable uploads and JWT auth.",
    tags: ["FastAPI", "AES-256-GCM", "Chunked Uploads", "JWT", "Python"],
    year: "2023",
    featured: false,
  },
];

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function OwnProductBadge() {
  return (
    <span
      style={{
        background: "rgba(77,166,255,0.12)",
        color: "#4DA6FF",
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "3px 9px",
        borderRadius: "6px",
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap",
        border: "1px solid rgba(77,166,255,0.2)",
      }}
      title="This is Giorgi's own product — not a client project"
    >
      Own Product
    </span>
  );
}

export function WorkSection() {
  const navigate = useNavigate();

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      style={{ background: "#0A0E1A", padding: "96px 0 112px" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div {...FADE_UP} transition={{ duration: 0.55 }} className="mb-14">
          <p
            style={{
              color: "#0080FF", fontSize: "0.75rem", fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif", marginBottom: "12px",
            }}
          >
            Selected Work
          </p>
          <h2
            id="work-heading"
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#ffffff",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.02em",
              lineHeight: 1.15, margin: 0,
            }}
          >
            Products I've built
          </h2>
          <p style={{ color: "#8A93A6", fontSize: "1rem", marginTop: "12px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
            These are my own products — designed and developed solo, from zero to production.
          </p>
        </motion.div>

        {/* Featured project */}
        <motion.article
          {...FADE_UP}
          transition={{ duration: 0.6, delay: 0.05 }}
          aria-label={`${PROJECTS[0].title} — ${PROJECTS[0].category}`}
          className="mb-5"
          style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px", padding: "clamp(24px, 5vw, 48px)",
            transition: "border-color 0.25s, background 0.25s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,128,255,0.25)";
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.045)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
          }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              style={{
                background: "rgba(0,128,255,0.15)", color: "#0080FF", fontSize: "0.7rem",
                fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "4px 10px", borderRadius: "6px", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
              }}
            >
              Featured
            </span>
            <OwnProductBadge />
            <span style={{ color: "#8A93A6", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>
              {PROJECTS[0].year}
            </span>
          </div>

          <h3
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#ffffff",
              fontSize: "clamp(1.5rem, 3.5vw, 2rem)", letterSpacing: "-0.02em",
              margin: "0 0 4px 0", lineHeight: 1.2,
            }}
          >
            {PROJECTS[0].title}
          </h3>
          <p style={{ color: "#0080FF", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}>
            {PROJECTS[0].category}
          </p>
          <p style={{ color: "#8A93A6", fontSize: "0.9375rem", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", maxWidth: "640px" }}>
            {PROJECTS[0].description}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {PROJECTS[0].tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "#8A93A6", fontSize: "0.775rem", fontFamily: "'DM Sans', sans-serif",
                  padding: "4px 12px", borderRadius: "6px", whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <a
              href="mailto:thegiorgilortki@gmail.com"
              aria-label="Ask Giorgi about Universal Drone OS"
              className="inline-flex items-center gap-2"
              style={{ color: "#0080FF", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}
              onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "2px"; e.currentTarget.style.borderRadius = "4px"; }}
              onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
            >
              Ask me about this project <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </motion.article>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.slice(1).map((project, i) => (
            <motion.article
              key={project.id}
              {...FADE_UP}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
              aria-label={`${project.title} — ${project.category}`}
              style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px", padding: "clamp(20px, 4vw, 36px)",
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
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <OwnProductBadge />
                <span style={{ color: "#4A5568", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>{project.year}</span>
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#ffffff",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", letterSpacing: "-0.02em",
                  margin: "0 0 4px 0", lineHeight: 1.25,
                }}
              >
                {project.title}
              </h3>
              <p style={{ color: "#0080FF", fontSize: "0.775rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "14px" }}>
                {project.category}
              </p>
              <p style={{ color: "#8A93A6", fontSize: "0.875rem", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "#8A93A6", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif",
                      padding: "3px 10px", borderRadius: "5px", whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <a
                  href="mailto:thegiorgilortki@gmail.com"
                  aria-label={`Ask Giorgi about ${project.title}`}
                  className="inline-flex items-center gap-1.5"
                  style={{ color: "#0080FF", fontSize: "0.825rem", fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}
                  onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "2px"; e.currentTarget.style.borderRadius = "4px"; }}
                  onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
                >
                  Ask me about this project <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View Full Portfolio link */}
        <motion.div
          {...FADE_UP}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => navigate("/portfolio")}
            className="inline-flex items-center gap-2"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#8A93A6",
              borderRadius: "12px",
              padding: "12px 24px",
              fontSize: "0.9rem",
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "rgba(0,128,255,0.35)";
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#8A93A6";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
            onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "3px"; }}
            onBlur={(e)  => { e.currentTarget.style.outline = "none"; }}
          >
            View Full Portfolio
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
