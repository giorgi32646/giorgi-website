import { Link } from "react-router";
import type { Category } from "../../../lib/services-catalog";
import { CategoryMockup } from "./Mockups";

export function CategoryCard({ category }: { category: Category }) {
  const selected = category.services.slice(0, 4);
  return (
    <article className={`service-card bento-${category.slug}`}>
      <CategoryMockup slug={category.slug} />
      <div style={{ padding: "1.15rem 1.15rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.7rem", flex: 1 }}>
        <p className="kicker" style={{ margin: 0 }}>{category.number}</p>
        <h3 className="display" style={{ fontSize: "clamp(1.45rem, 2vw, 1.9rem)" }}>{category.title}</h3>
        <p className="lede" style={{ fontSize: "0.98rem" }}>{category.summary}</p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.28rem" }}>
          {selected.map((service) => (
            <li key={service.slug} style={{ color: "var(--ink-soft)", fontSize: "0.92rem" }}>{service.name}</li>
          ))}
        </ul>
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center", paddingTop: "0.4rem" }}>
          <p style={{ margin: 0, color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700 }}>{category.starting}</p>
          <Link to={`/services/${category.slug}`} className="btn btn-line" style={{ minHeight: 42 }}>
            Explore category
          </Link>
        </div>
        <p style={{ margin: 0, color: "var(--faint)", fontSize: "0.75rem" }}>Demonstration interface. Not a client project.</p>
      </div>
    </article>
  );
}
