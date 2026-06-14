import { Twitter } from "lucide-react";

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        background: "#070B15",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "40px 0",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: brand */}
          <div className="flex items-center gap-3">
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: "#0080FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <span
                style={{
                  color: "#0A0E1A",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  letterSpacing: "-0.02em",
                }}
              >
                GL
              </span>
            </div>
            <div>
              <div
                style={{
                  color: "#ffffff",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Giorgi Lortkipanidze
              </div>
              <div
                style={{
                  color: "#4A5568",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                }}
              >
                Designer &amp; Developer
              </div>
            </div>
          </div>

          {/* Right: social + copyright */}
          <div className="flex items-center gap-5">
            <a
              href="https://x.com/Giorgi5926481"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Giorgi Lortkipanidze on X (Twitter)"
              className="flex items-center gap-2"
              style={{
                color: "#8A93A6",
                textDecoration: "none",
                fontSize: "0.825rem",
                fontFamily: "'DM Sans', sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8A93A6")}
              onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "3px"; e.currentTarget.style.borderRadius = "4px"; }}
              onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
            >
              <Twitter size={15} aria-hidden="true" />
              <span>@Giorgi5926481</span>
            </a>

            <span
              style={{
                color: "#4A5568",
                fontSize: "0.775rem",
                fontFamily: "'DM Sans', sans-serif",
              }}
              aria-label={`Copyright ${year} Giorgi Lortkipanidze`}
            >
              © {year}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
