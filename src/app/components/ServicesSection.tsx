import { Link } from "react-router";
import { PRIMARY_CATEGORIES } from "../../lib/services-catalog";
import { CategoryCard } from "./services/CategoryCard";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="studio-section" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="studio-wrap">
        <p className="kicker">02 — Services</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", alignItems: "end", marginBottom: "1.4rem" }}>
          <h2 id="services-heading" className="display" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", maxWidth: "12ch" }}>
            What the studio delivers
          </h2>
          <Link to="/services" className="btn btn-line">Full catalog</Link>
        </div>
        <div className="service-bento">
          {PRIMARY_CATEGORIES.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
