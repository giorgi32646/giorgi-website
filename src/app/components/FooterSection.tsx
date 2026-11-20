export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" style={{ background: "var(--paper)", borderTop: "1px solid var(--line)", padding: "1.6rem 0" }}>
      <div className="studio-wrap" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.75rem 1.5rem", alignItems: "baseline" }}>
        <p className="display" style={{ fontSize: "1.05rem", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
          The Giorgi Lortki
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0", textTransform: "none", color: "var(--muted)", marginLeft: "0.7rem" }}>
            We design. We engineer. We deliver.
          </span>
        </p>
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
          <a href="https://x.com/Giorgi5926481" target="_blank" rel="noopener noreferrer" aria-label="Follow Giorgi Lortkipanidze on X (Twitter)" style={{ color: "var(--muted)", textDecoration: "none" }}>
            @Giorgi5926481
          </a>
          <span aria-label={`Copyright ${year} Giorgi Lortkipanidze`}>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
