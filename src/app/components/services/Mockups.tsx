import type { CSSProperties, ReactNode } from "react";

type MockupProps = { slug: string; variant?: number };

const frame: CSSProperties = {
  height: "100%",
  minHeight: 220,
  background: "#0A0E1A",
  position: "relative",
  overflow: "hidden",
};

function Browser({ children, url }: { children: ReactNode; url: string }) {
  return (
    <div style={{ background: "#12182A", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, overflow: "hidden", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ width: 7, height: 7, borderRadius: 99, background: "#0080FF" }} />
        <span style={{ width: 7, height: 7, borderRadius: 99, background: "rgba(255,255,255,0.2)" }} />
        <span style={{ width: 7, height: 7, borderRadius: 99, background: "rgba(255,255,255,0.2)" }} />
        <span style={{ marginLeft: 8, flex: 1, height: 16, borderRadius: 99, background: "rgba(255,255,255,0.05)", color: "#9AA3B5", fontSize: 10, display: "flex", alignItems: "center", padding: "0 8px" }}>{url}</span>
      </div>
      <div style={{ padding: 12 }}>{children}</div>
    </div>
  );
}

function Phone({ children, tilt = 0 }: { children: ReactNode; tilt?: number }) {
  return (
    <div style={{ width: 118, height: 230, borderRadius: 22, border: "1px solid rgba(255,255,255,0.18)", background: "#0A0E1A", padding: 8, transform: `rotate(${tilt}deg)`, boxShadow: "0 16px 40px rgba(0,0,0,0.35)" }}>
      <div style={{ height: "100%", borderRadius: 16, background: "#12182A", overflow: "hidden", padding: 8 }}>{children}</div>
    </div>
  );
}

export function CategoryMockup({ slug, variant = 0 }: MockupProps) {
  return (
    <div aria-hidden="true" style={frame}>
      <div style={{ position: "absolute", inset: 16 }}>
        {slug === "websites" && <Websites variant={variant} />}
        {slug === "mobile" && <Mobile variant={variant} />}
        {slug === "software" && <Software variant={variant} />}
        {slug === "marketplaces" && <Market variant={variant} />}
        {slug === "ai" && <Ai variant={variant} />}
        {slug === "enterprise" && <Enterprise variant={variant} />}
        {slug === "additional" && <Software variant={variant} />}
      </div>
    </div>
  );
}

function Websites({ variant }: { variant: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: variant === 1 ? "1fr" : "1.3fr 0.8fr", gap: 10, height: "100%" }}>
      <Browser url="atelier.studio">
        <div style={{ height: 10, width: "42%", background: "#F4F7FB", marginBottom: 8 }} />
        <div style={{ height: 28, width: "78%", background: "#F4F7FB", marginBottom: 12 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 8 }}>
          <div style={{ height: 78, background: "#0080FF" }} />
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ height: 35, background: "rgba(255,255,255,0.08)" }} />
            <div style={{ height: 35, background: "rgba(255,255,255,0.08)" }} />
          </div>
        </div>
      </Browser>
      {variant !== 1 && (
        <div style={{ alignSelf: "end", transform: "translateY(18px)" }}>
          <Browser url="product">
            <div style={{ height: 46, background: "rgba(0,128,255,0.35)", marginBottom: 8 }} />
            <div style={{ height: 8, width: "70%", background: "rgba(255,255,255,0.35)", marginBottom: 6 }} />
            <div style={{ height: 8, width: "48%", background: "rgba(255,255,255,0.18)" }} />
          </Browser>
        </div>
      )}
    </div>
  );
}

function Mobile({ variant }: { variant: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 12, height: "100%", paddingTop: 8 }}>
      <Phone tilt={variant === 2 ? 0 : -8}>
        <div style={{ height: 28, background: "#0080FF", marginBottom: 8 }} />
        {[0, 1, 2, 3].map((n) => (
          <div key={n} style={{ height: 22, background: "rgba(255,255,255,0.08)", marginBottom: 6 }} />
        ))}
      </Phone>
      <Phone tilt={variant === 2 ? 0 : 6}>
        <div style={{ height: 90, background: "rgba(0,128,255,0.25)", marginBottom: 8, position: "relative" }}>
          <span style={{ position: "absolute", left: "45%", top: "40%", width: 10, height: 10, borderRadius: 99, background: "#0080FF" }} />
        </div>
        <div style={{ height: 8, width: "80%", background: "#F4F7FB", marginBottom: 6 }} />
        <div style={{ height: 28, background: "#0080FF" }} />
      </Phone>
      {variant !== 1 && (
        <Phone tilt={-2}>
          <div style={{ width: 36, height: 36, borderRadius: 99, background: "#0080FF", margin: "8px auto 10px" }} />
          <div style={{ height: 8, width: "70%", margin: "0 auto 8px", background: "#F4F7FB" }} />
          <div style={{ height: 8, background: "rgba(255,255,255,0.12)", marginBottom: 6 }} />
          <div style={{ height: 8, width: "60%", background: "rgba(255,255,255,0.12)" }} />
        </Phone>
      )}
    </div>
  );
}

function Software({ variant }: { variant: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "54px 1fr", gap: 8, height: "100%" }}>
      <div style={{ background: "#12182A", border: "1px solid rgba(255,255,255,0.08)", padding: 8, display: "grid", alignContent: "start", gap: 8 }}>
        <div style={{ height: 10, background: "#0080FF" }} />
        {[0, 1, 2, 3].map((n) => <div key={n} style={{ height: 8, background: "rgba(255,255,255,0.12)" }} />)}
      </div>
      <div style={{ display: "grid", gridTemplateRows: "auto 1fr", gap: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {["24", "1.2k", "98"].map((n) => (
            <div key={n} style={{ background: "#12182A", border: "1px solid rgba(255,255,255,0.08)", padding: 8 }}>
              <div style={{ color: "#F4F7FB", fontFamily: "Syne, sans-serif", fontSize: 16 }}>{n}</div>
              <div style={{ height: 4, marginTop: 8, background: n === "98" ? "#0080FF" : "rgba(255,255,255,0.15)" }} />
            </div>
          ))}
        </div>
        <div style={{ background: "#12182A", border: "1px solid rgba(255,255,255,0.08)", padding: 10, display: "flex", alignItems: "flex-end", gap: 6 }}>
          {[40, 70, 48, 90, 62, 78, variant === 1 ? 50 : 84].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 3 ? "#0080FF" : "rgba(255,255,255,0.14)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Market({ variant }: { variant: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: variant === 2 ? "1fr" : "1fr 1fr", gap: 8, height: "100%" }}>
      <div style={{ background: "#12182A", border: "1px solid rgba(255,255,255,0.08)", padding: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, alignContent: "start" }}>
        {[0, 1, 2, 3].map((n) => (
          <div key={n} style={{ background: "rgba(255,255,255,0.04)", padding: 6 }}>
            <div style={{ height: 36, background: n === 0 ? "#0080FF" : "rgba(255,255,255,0.1)", marginBottom: 6 }} />
            <div style={{ height: 6, width: "70%", background: "#F4F7FB" }} />
          </div>
        ))}
      </div>
      {variant !== 2 && (
        <div style={{ background: "#101624", border: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }}>
          <svg viewBox="0 0 200 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <path d="M20 40 C 70 30, 90 90, 140 70 S 180 150, 120 180" fill="none" stroke="#0080FF" strokeWidth="3" />
            <circle cx="48" cy="52" r="6" fill="#F4F7FB" />
            <circle cx="132" cy="78" r="6" fill="#0080FF" />
            <circle cx="118" cy="168" r="6" fill="#F4F7FB" />
          </svg>
        </div>
      )}
    </div>
  );
}

function Ai({ variant }: { variant: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: variant === 1 ? "1fr" : "1.1fr 0.9fr", gap: 8, height: "100%" }}>
      <div style={{ background: "#12182A", border: "1px solid rgba(255,255,255,0.08)", padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ alignSelf: "flex-end", maxWidth: "80%", background: "#0080FF", color: "#fff", fontSize: 11, padding: "6px 8px" }}>Show risk by region</div>
        <div style={{ alignSelf: "flex-start", maxWidth: "88%", background: "rgba(255,255,255,0.06)", color: "#F4F7FB", fontSize: 11, padding: "6px 8px" }}>Three regions moved. The largest change is in the west corridor.</div>
        <div style={{ marginTop: "auto", height: 28, borderTop: "1px solid rgba(255,255,255,0.08)" }} />
      </div>
      {variant !== 1 && (
        <div style={{ display: "grid", gap: 8 }}>
          <svg viewBox="0 0 160 80" width="100%" height="70">
            <polyline fill="none" stroke="#0080FF" strokeWidth="2" points="0,60 20,58 40,40 60,46 80,22 100,30 120,14 150,18" />
          </svg>
          {[72, 48, 61].map((n) => (
            <div key={n} style={{ height: 8, width: `${n}%`, background: "rgba(255,255,255,0.16)" }} />
          ))}
        </div>
      )}
    </div>
  );
}

function Enterprise({ variant }: { variant: number }) {
  const nodes = [
    { x: 30, y: 30, label: "Clients" },
    { x: 120, y: 24, label: "API" },
    { x: 78, y: 88, label: "Services" },
    { x: 150, y: 96, label: "Data" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 8, height: "100%" }}>
      <svg viewBox="0 0 190 140" width="100%" height="100%">
        <line x1="40" y1="36" x2="120" y2="30" stroke="rgba(255,255,255,0.25)" />
        <line x1="120" y1="34" x2="86" y2="88" stroke="#0080FF" />
        <line x1="90" y1="96" x2="146" y2="100" stroke="rgba(255,255,255,0.25)" />
        {nodes.map((node) => (
          <g key={node.label}>
            <rect x={node.x} y={node.y} width="52" height="22" fill="#12182A" stroke={node.label === "API" ? "#0080FF" : "rgba(255,255,255,0.2)"} />
            <text x={node.x + 8} y={node.y + 15} fill="#F4F7FB" fontSize="9" fontFamily="DM Sans, sans-serif">{node.label}</text>
          </g>
        ))}
      </svg>
      <div style={{ display: "grid", alignContent: "center", gap: 8 }}>
        {(variant === 2 ? [88, 64, 73, 51] : [64, 80, 42]).map((n) => (
          <div key={n}>
            <div style={{ height: 6, width: `${n}%`, background: n > 70 ? "#0080FF" : "rgba(255,255,255,0.2)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
