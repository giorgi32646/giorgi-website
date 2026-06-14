import { ArrowDown, Mail, Twitter } from "lucide-react";
import { MeshGradientBackground } from "./MeshGradientBackground";

export function HeroSection() {
  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative overflow-hidden flex flex-col items-center justify-center text-center px-4"
      style={{ minHeight: "100svh" }}
    >
      <MeshGradientBackground />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl mx-auto mt-20">
        {/* Status badge */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full mb-6 sm:mb-8"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(0,128,255,0.25)",
            display: "inline-flex",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
            aria-hidden="true"
            style={{ background: "#0080FF" }}
          />
          <span
            style={{
              color: "#0080FF",
              fontSize: "0.8rem",
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            Available for freelance work
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            lineHeight: 1.08,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
          className="text-[clamp(2.25rem,8vw,5rem)]"
        >
          Giorgi Lortkipanidze
        </h1>

        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            lineHeight: 1.08,
            background: "linear-gradient(90deg, #ffffff 20%, #0080FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "6px 0 0 0",
            letterSpacing: "-0.02em",
          }}
          className="text-[clamp(1.75rem,6.5vw,4rem)]"
        >
          Designer &amp; Developer
        </h2>

        {/* Subheadline */}
        <p
          className="mt-6 max-w-lg mx-auto"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#8A93A6",
            fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
            lineHeight: 1.7,
          }}
        >
          I design and build production-ready SaaS interfaces — no handoff, no delays.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          <a
            href="#work"
            onClick={scrollToWork}
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "#ffffff",
              borderRadius: "9999px",
              padding: "12px 28px",
              fontSize: "0.9375rem",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s",
              display: "inline-block",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "3px"; }}
            onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
          >
            View Work
          </a>
          <a
            href="mailto:thegiorgilortki@gmail.com"
            style={{
              background: "#0080FF",
              color: "#0A0E1A",
              borderRadius: "9999px",
              padding: "12px 28px",
              fontSize: "0.9375rem",
              fontWeight: 700,
              textDecoration: "none",
              transition: "transform 0.2s, opacity 0.2s",
              display: "inline-block",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)")}
            onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "3px"; }}
            onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
          >
            Book a Call
          </a>
        </div>

        {/* Secondary links */}
        <div className="flex flex-wrap gap-3 mt-5 justify-center">
          <a
            href="https://x.com/Giorgi5926481"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Giorgi on X (Twitter)"
            className="flex items-center gap-2"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "0.875rem",
              color: "#8A93A6",
              textDecoration: "none",
              transition: "color 0.2s, border-color 0.2s, background 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#ffffff";
              el.style.borderColor = "rgba(0,128,255,0.35)";
              el.style.background = "rgba(255,255,255,0.07)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#8A93A6";
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.background = "rgba(255,255,255,0.05)";
            }}
            onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "2px"; }}
            onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
          >
            <Twitter size={14} aria-hidden="true" />
            X (Twitter)
          </a>
          <a
            href="mailto:thegiorgilortki@gmail.com"
            aria-label="Email Giorgi"
            className="flex items-center gap-2"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "0.875rem",
              color: "#8A93A6",
              textDecoration: "none",
              transition: "color 0.2s, border-color 0.2s, background 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#ffffff";
              el.style.borderColor = "rgba(0,128,255,0.35)";
              el.style.background = "rgba(255,255,255,0.07)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#8A93A6";
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.background = "rgba(255,255,255,0.05)";
            }}
            onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "2px"; }}
            onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
          >
            <Mail size={14} aria-hidden="true" />
            Email
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            color: "#4A5568",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          SCROLL
        </span>
        <ArrowDown size={13} style={{ color: "#4A5568" }} className="animate-bounce" />
      </div>
    </section>
  );
}
