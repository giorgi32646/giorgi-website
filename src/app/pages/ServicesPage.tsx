import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { CATEGORIES, PRICE_DISCLAIMER, PRIMARY_CATEGORIES, SERVICES_FAQ, STACK, WHY, serviceBySlug } from "../../lib/services-catalog";
import { CategoryCard } from "../components/services/CategoryCard";
import { ServiceCard } from "../components/services/ServiceCard";
import { ProcessTimeline } from "../components/services/ProcessTimeline";
import { FAQAccordion } from "../components/services/FAQAccordion";
import { ProjectInquiryForm } from "../components/services/ProjectInquiryForm";
import { FeatureList } from "../components/services/FeatureList";

const FEATURED = [
  serviceBySlug("marketplaces", "taxi-booking"),
  serviceBySlug("marketplaces", "ride-hailing"),
  serviceBySlug("marketplaces", "multi-vendor"),
].filter((item): item is NonNullable<typeof item> => Boolean(item));

export function ServicesPage() {
  const additional = CATEGORIES.find((category) => category.slug === "additional");

  return (
    <div style={{ paddingTop: "72px" }}>
      <Helmet>
        <title>Services & Solutions | The Giorgi Lortki</title>
        <meta name="description" content="Digital product design and engineering, from a premium website to enterprise platforms. Indicative ranges from $1,000 to $400,000+. Every project is a custom quote." />
        <link rel="canonical" href="https://www.giorgilortkipanidze.online/services" />
      </Helmet>

      <header className="studio-wrap" style={{ paddingTop: "3rem", paddingBottom: "2.5rem" }}>
        <p className="kicker">The Giorgi Lortki · Services</p>
        <h1 className="display" style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)", maxWidth: "14ch" }}>
          We design.
          <br />
          We engineer.
          <br />
          <span style={{ color: "var(--accent)" }}>We deliver.</span>
        </h1>
        <p className="lede" style={{ marginTop: "1.2rem", maxWidth: "42rem" }}>
          We design, engineer, and deliver complete digital products — from premium websites and custom software to complex SaaS platforms, mobile applications, marketplaces, and enterprise-grade solutions.
        </p>
      </header>

      <section className="studio-section" style={{ paddingTop: 0 }} aria-labelledby="categories-heading">
        <div className="studio-wrap">
          <p className="kicker">Service categories</p>
          <h2 id="categories-heading" className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "1.25rem" }}>Six practices. One studio.</h2>
          <div className="service-bento">
            {PRIMARY_CATEGORIES.map((category) => <CategoryCard key={category.slug} category={category} />)}
          </div>
        </div>
      </section>

      <section className="studio-section" style={{ background: "var(--cream)" }} aria-labelledby="all-services-heading">
        <div className="studio-wrap">
          <p className="kicker">Individual services</p>
          <h2 id="all-services-heading" className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>Every product type</h2>
          {PRIMARY_CATEGORIES.map((category) => (
            <div key={category.slug} style={{ marginTop: "2.2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "baseline", marginBottom: "0.9rem" }}>
                <h3 className="display" style={{ fontSize: "1.5rem" }}>{category.number} — {category.title}</h3>
                <Link to={`/services/${category.slug}`} style={{ color: "var(--accent)", textDecoration: "none" }}>Open category</Link>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3" style={{ gap: "0.8rem" }}>
                {category.services.map((service) => <ServiceCard key={service.slug} categorySlug={category.slug} service={service} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="studio-section" aria-labelledby="pricing-heading">
        <div className="studio-wrap">
          <p className="kicker">Pricing and investment</p>
          <h2 id="pricing-heading" className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", maxWidth: "16ch" }}>Indicative ranges, then a custom quote</h2>
          <div style={{ marginTop: "1.4rem", borderTop: "1px solid var(--line)" }}>
            {PRIMARY_CATEGORIES.map((category) => (
              <div key={category.slug} className="grid md:grid-cols-12" style={{ gap: "0.4rem 1rem", padding: "1rem 0", borderBottom: "1px solid var(--line)" }}>
                <h3 className="display md:col-span-4" style={{ fontSize: "1.2rem" }}>{category.title}</h3>
                <p className="md:col-span-3" style={{ margin: 0, color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700 }}>{category.starting}</p>
                <p className="lede md:col-span-5" style={{ fontSize: "0.95rem" }}>{category.services[0]?.range} through {category.services[category.services.length - 1]?.range}, depending on the product.</p>
              </div>
            ))}
          </div>
          <p className="lede" style={{ marginTop: "1rem", fontSize: "0.92rem" }}>{PRICE_DISCLAIMER}</p>
        </div>
      </section>

      <section className="studio-section" style={{ paddingTop: 0 }} aria-labelledby="featured-heading">
        <div className="studio-wrap">
          <p className="kicker">Featured capabilities</p>
          <h2 id="featured-heading" className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>Platforms with more than one product</h2>
          <div className="grid lg:grid-cols-3" style={{ gap: "0.9rem", marginTop: "1.3rem" }}>
            {FEATURED.map(({ category, service }) => (
              <article key={service.slug} style={{ border: "1px solid var(--line)", padding: "1.15rem" }}>
                <p className="kicker">{service.range}</p>
                <h3 className="display" style={{ fontSize: "1.45rem" }}>{service.name}</h3>
                <p className="lede" style={{ margin: "0.55rem 0 0.9rem", fontSize: "0.95rem" }}>{service.summary}</p>
                {service.features?.slice(0, 3).map((group) => (
                  <FeatureList key={group.title} title={group.title} items={group.items.slice(0, 3)} />
                ))}
                <Link to={`/services/${category.slug}/${service.slug}`} className="btn btn-line" style={{ marginTop: "1rem" }}>View breakdown</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section" style={{ background: "var(--cream)" }} aria-labelledby="process-heading">
        <div className="studio-wrap grid lg:grid-cols-12" style={{ gap: "2rem" }}>
          <div className="lg:col-span-4">
            <p className="kicker">Development process</p>
            <h2 id="process-heading" className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>From discovery to what happens after launch</h2>
          </div>
          <div className="lg:col-span-8">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <section className="studio-section" aria-labelledby="stack-heading">
        <div className="studio-wrap">
          <p className="kicker">Technology</p>
          <h2 id="stack-heading" className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>A stack chosen for the product</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: "0.8rem", marginTop: "1.3rem" }}>
            {STACK.map((item) => (
              <article key={item.name} style={{ borderTop: "1px solid var(--line)", paddingTop: "0.9rem" }}>
                <h3 className="display" style={{ fontSize: "1.25rem" }}>{item.name}</h3>
                <p className="lede" style={{ marginTop: "0.35rem" }}>{item.items}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section" style={{ paddingTop: 0 }} aria-labelledby="why-heading">
        <div className="studio-wrap">
          <p className="kicker">Why this studio</p>
          <h2 id="why-heading" className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.2rem" }}>What you are hiring</h2>
          <div className="grid md:grid-cols-2" style={{ gap: "1rem" }}>
            {WHY.map((item) => (
              <article key={item.title} style={{ borderTop: "1px solid var(--line)", paddingTop: "0.9rem" }}>
                <h3 className="display" style={{ fontSize: "1.35rem" }}>{item.title}</h3>
                <p className="lede" style={{ marginTop: "0.4rem" }}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {additional && (
        <section className="studio-section" style={{ background: "var(--cream)" }} aria-labelledby="additional-heading">
          <div className="studio-wrap">
            <p className="kicker">Additional services</p>
            <h2 id="additional-heading" className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Available alone, or inside a larger project</h2>
            <p className="lede" style={{ marginTop: "0.7rem", maxWidth: "40rem" }}>{additional.description}</p>
            <div className="grid md:grid-cols-2 xl:grid-cols-3" style={{ gap: "0.8rem", marginTop: "1.3rem" }}>
              {additional.services.map((service) => <ServiceCard key={service.slug} categorySlug="additional" service={service} />)}
            </div>
          </div>
        </section>
      )}

      <section className="studio-section" aria-labelledby="faq-heading">
        <div className="studio-wrap grid lg:grid-cols-12" style={{ gap: "2rem" }}>
          <div className="lg:col-span-4">
            <p className="kicker">FAQ</p>
            <h2 id="faq-heading" className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Common questions</h2>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={SERVICES_FAQ} />
          </div>
        </div>
      </section>

      <section id="inquire" className="studio-section" style={{ paddingTop: 0 }} aria-labelledby="inquiry-heading">
        <div className="studio-wrap grid lg:grid-cols-12" style={{ gap: "2rem" }}>
          <div className="lg:col-span-4">
            <p className="kicker">Project inquiry</p>
            <h2 id="inquiry-heading" className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>Tell us what you want built</h2>
            <p className="lede" style={{ marginTop: "0.8rem" }}>The questions change with the service you select. A proposal follows only after this reaches the studio.</p>
          </div>
          <div className="lg:col-span-8">
            <ProjectInquiryForm idPrefix="services-inquiry" />
          </div>
        </div>
      </section>

      <section className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap" style={{ borderTop: "1px solid var(--line)", paddingTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", alignItems: "end" }}>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", maxWidth: "14ch" }}>From a focused site to a platform.</h2>
          <Link to="/contact" className="btn btn-ink">Start a project</Link>
        </div>
      </section>
    </div>
  );
}
