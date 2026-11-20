import { Link } from "react-router";

export function HeroSection() {
  return (
    <section id="hero" aria-label="Introduction" className="relative">
      <div className="studio-wrap" style={{ width: "min(1180px, calc(100% - 2.5rem))", paddingTop: "7.25rem", paddingBottom: "5rem" }}>
        <p className="kicker">The Giorgi Lortki · Premium digital studio</p>
        <h1 className="display" style={{ fontSize: "clamp(3rem, 8.4vw, 6.6rem)", maxWidth: "11ch" }}>
          We design.
          <br />
          We engineer.
          <br />
          <span style={{ color: "var(--accent)" }}>We deliver.</span>
        </h1>
        <div className="grid lg:grid-cols-12" style={{ marginTop: "2.25rem", paddingTop: "1.5rem", borderTop: "1px solid var(--line)", gap: "1.5rem 2rem" }}>
          <p className="lede lg:col-span-7" style={{ maxWidth: "38rem" }}>
            We design, engineer, and deliver complete digital products — from premium websites and custom software to SaaS platforms, mobile applications, marketplaces, and enterprise systems.
          </p>
          <div className="lg:col-span-5" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-start" }}>
            <Link to="/services" className="btn btn-ink">Explore services</Link>
            <a href="#work" className="btn btn-line">View selected work</a>
          </div>
        </div>
      </div>
    </section>
  );
}
