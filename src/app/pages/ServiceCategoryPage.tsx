import { Link, useParams } from "react-router";
import { PRICE_DISCLAIMER, categoryBySlug } from "../../lib/services-catalog";
import { Seo } from "../components/Seo";
import { categorySeo, notFoundSeo } from "../../lib/seo";
import { CategoryMockup } from "../components/services/Mockups";
import { ServiceCard } from "../components/services/ServiceCard";
import { ProjectInquiryForm } from "../components/services/ProjectInquiryForm";

export function ServiceCategoryPage() {
  const { category: slug } = useParams();
  const category = categoryBySlug(slug);

  if (!category) {
    return (
      <div className="studio-wrap" style={{ paddingTop: "8rem", paddingBottom: "4rem" }}>
        <Seo page={notFoundSeo()} />
        <h1 className="display" style={{ fontSize: "2.4rem" }}>That category is not in the catalog.</h1>
        <Link to="/services" className="btn btn-ink" style={{ marginTop: "1rem" }}>Back to services</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "72px" }}>
      <Seo page={categorySeo(category.slug)!} />
      <header className="studio-wrap" style={{ paddingTop: "2.5rem" }}>
        <p className="kicker"><Link to="/services" style={{ color: "var(--accent)", textDecoration: "none" }}>Services</Link> / {category.number}</p>
        <div className="grid lg:grid-cols-12" style={{ gap: "1.5rem" }}>
          <div className="lg:col-span-6">
            <h1 className="display" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>{category.title}</h1>
            <p className="lede" style={{ marginTop: "1rem" }}>{category.description}</p>
            <p style={{ margin: "1rem 0 0", color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700 }}>{category.starting}</p>
          </div>
          <div className="lg:col-span-6" style={{ minHeight: 280, border: "1px solid var(--line)" }}>
            <CategoryMockup slug={category.slug} />
            <p style={{ margin: 0, padding: "0.55rem 0.8rem", color: "var(--faint)", fontSize: "0.75rem" }}>Demonstration interface. Not a client project.</p>
          </div>
        </div>
      </header>
      <section className="studio-section">
        <div className="studio-wrap">
          <h2 className="display" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Services in this category</h2>
          <div className="grid md:grid-cols-2" style={{ gap: "0.8rem" }}>
            {category.services.map((service) => <ServiceCard key={service.slug} categorySlug={category.slug} service={service} />)}
          </div>
          <p className="lede" style={{ marginTop: "1.2rem", fontSize: "0.92rem" }}>{PRICE_DISCLAIMER}</p>
        </div>
      </section>
      <section className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap grid lg:grid-cols-12" style={{ gap: "2rem" }}>
          <div className="lg:col-span-4">
            <h2 className="display" style={{ fontSize: "2.2rem" }}>Enquire about {category.title}</h2>
          </div>
          <div className="lg:col-span-8">
            <ProjectInquiryForm idPrefix={`${category.slug}-category`} initialCategory={category.slug} />
          </div>
        </div>
      </section>
    </div>
  );
}
