const MARQUEE_ITEMS = [
  "Figma",
  "React",
  "TypeScript",
  "Next.js",
  "Python",
  "FastAPI",
  "Tailwind CSS",
  "Supabase",
  "WebSockets",
  "MapLibre GL",
  "Framer Motion",
  "Gemini AI",
  "MAVLink",
  "NATS JetStream",
  "AES-256-GCM",
  "Polar.sh",
];

export function TechMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      aria-label="Technologies I work with"
      style={{ position: "relative", overflow: "hidden", padding: "1.6rem 0 1.75rem", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
    >
      <div className="marquee-fade-left" aria-hidden="true" />
      <div className="marquee-fade-right" aria-hidden="true" />
      <p className="kicker" style={{ textAlign: "center" }}>Stack &amp; tools</p>
      <div style={{ overflow: "hidden" }}>
        <div className="marquee-track" style={{ gap: "0", alignItems: "center" }} role="list">
          {items.map((name, i) => (
            <span key={`${name}-${i}`} role="listitem" style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink-soft)", paddingRight: "0.15rem" }}>
              {name}
              <span aria-hidden="true" style={{ color: "var(--accent)", padding: "0 1.1rem" }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
