import { Link } from "react-router";
import type { ServiceItem } from "../../../lib/services-catalog";

export function ServiceCard({ categorySlug, service }: { categorySlug: string; service: ServiceItem }) {
  return (
    <Link to={`/services/${categorySlug}/${service.slug}`} className="service-card" style={{ padding: "1.15rem 1.15rem 1.2rem", minHeight: 0 }}>
      <p className="kicker" style={{ margin: 0 }}>{service.complexity}</p>
      <h3 className="display" style={{ fontSize: "1.35rem", marginTop: "0.35rem" }}>{service.name}</h3>
      <p className="lede" style={{ fontSize: "0.95rem", marginTop: "0.45rem" }}>{service.summary}</p>
      <p style={{ margin: "0.9rem 0 0", color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700 }}>{service.priced ? service.range : "Custom quotation"}</p>
    </Link>
  );
}
