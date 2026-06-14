const MARQUEE_ITEMS = [
  { name: "Figma",          color: "#A259FF" },
  { name: "React",          color: "#61DAFB" },
  { name: "TypeScript",     color: "#3178C6" },
  { name: "Next.js",        color: "#ffffff" },
  { name: "Python",         color: "#FFD43B" },
  { name: "FastAPI",        color: "#05998B" },
  { name: "Tailwind CSS",   color: "#38BDF8" },
  { name: "Supabase",       color: "#3ECF8E" },
  { name: "WebSockets",     color: "#0080FF" },
  { name: "MapLibre GL",    color: "#4DA6FF" },
  { name: "Framer Motion",  color: "#BB4BFF" },
  { name: "Gemini AI",      color: "#4285F4" },
  { name: "MAVLink",        color: "#FF6B35" },
  { name: "NATS JetStream", color: "#27AAE1" },
  { name: "AES-256-GCM",   color: "#34D399" },
  { name: "Polar.sh",       color: "#ffffff" },
];

function TechPill({ tech }: { tech: { name: string; color: string } }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 18px",
        borderRadius: "9999px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        whiteSpace: "nowrap",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.85rem",
        fontWeight: 500,
        color: "#8A93A6",
        flexShrink: 0,
      }}
    >
      {/* Color dot */}
      <span
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: tech.color,
          flexShrink: 0,
          opacity: 0.9,
        }}
        aria-hidden="true"
      />
      {tech.name}
    </span>
  );
}

export function TechMarquee() {
  // Duplicate items to create seamless infinite loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      aria-label="Technologies I work with"
      style={{
        background: "#0A0E1A",
        padding: "48px 0",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Left fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to right, #0A0E1A, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Right fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to left, #0A0E1A, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Label */}
      <p
        style={{
          textAlign: "center",
          color: "#4A5568",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "20px",
        }}
      >
        Stack &amp; Tools
      </p>

      {/* Scrolling track */}
      <div style={{ overflow: "hidden" }}>
        <div
          className="marquee-track"
          style={{ gap: "0.75rem" }}
          role="list"
        >
          {items.map((tech, i) => (
            <span key={`${tech.name}-${i}`} role="listitem">
              <TechPill tech={tech} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
