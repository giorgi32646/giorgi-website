import { Link, useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { serviceBySlug } from "../../lib/services-catalog";
import { ServiceDetailView } from "../components/services/ServiceDetailView";

export function ServiceDetailPage() {
  const { category: categorySlug, service: serviceSlug } = useParams();
  const match = serviceBySlug(categorySlug, serviceSlug);

  if (!match) {
    return (
      <div className="studio-wrap" style={{ paddingTop: "8rem", paddingBottom: "4rem" }}>
        <h1 className="display" style={{ fontSize: "2.4rem" }}>That service is not in the catalog.</h1>
        <Link to="/services" className="btn btn-ink" style={{ marginTop: "1rem" }}>Back to services</Link>
      </div>
    );
  }

  const index = match.category.services.findIndex((item) => item.slug === match.service.slug);

  return (
    <div style={{ paddingTop: "72px" }}>
      <Helmet>
        <title>{match.service.name} | The Giorgi Lortki</title>
        <meta name="description" content={`${match.service.summary} Indicative range ${match.service.range}. Final investment is quoted to scope.`} />
        <link rel="canonical" href={`https://www.giorgilortkipanidze.online/services/${match.category.slug}/${match.service.slug}`} />
      </Helmet>
      <ServiceDetailView category={match.category} service={match.service} index={Math.max(index, 0)} />
    </div>
  );
}
