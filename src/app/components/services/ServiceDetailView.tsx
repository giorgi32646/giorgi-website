import { Link } from "react-router";
import { PRICE_DISCLAIMER, PROCESS, type Category, type ServiceItem } from "../../../lib/services-catalog";
import { CategoryMockup } from "./Mockups";
import { PricingCard } from "./PricingCard";
import { FeatureList } from "./FeatureList";
import { FAQAccordion } from "./FAQAccordion";
import { ProjectInquiryForm } from "./ProjectInquiryForm";

export function ServiceDetailView({ category, service, index }: { category: Category; service: ServiceItem; index: number }) {
  return (
    <article>
      <header className="studio-wrap" style={{ paddingTop: "2.5rem" }}>
        <p className="kicker">
          <Link to="/services" style={{ color: "var(--accent)", textDecoration: "none" }}>Services</Link>
          {" / "}
          <Link to={`/services/${category.slug}`} style={{ color: "var(--accent)", textDecoration: "none" }}>{category.title}</Link>
        </p>
        <div className="grid lg:grid-cols-12" style={{ gap: "1.5rem", alignItems: "end" }}>
          <div className="lg:col-span-7">
            <h1 className="display" style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)" }}>{service.name}</h1>
            <p className="lede" style={{ marginTop: "1rem", maxWidth: "40rem" }}>{service.description}</p>
            <p style={{ margin: "1rem 0 0", color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem" }}>
              {service.priced ? `${service.starting} · ${service.range}` : "Custom quotation"}
            </p>
          </div>
          <div className="lg:col-span-5" style={{ minHeight: 260, border: "1px solid var(--line)" }}>
            <CategoryMockup slug={category.slug} variant={index % 3} />
            <p style={{ margin: 0, padding: "0.55rem 0.8rem", color: "var(--faint)", fontSize: "0.75rem" }}>Demonstration interface. Not a client project.</p>
          </div>
        </div>
      </header>

      <section className="studio-section">
        <div className="studio-wrap grid lg:grid-cols-2" style={{ gap: "2rem" }}>
          <FeatureList title="Business problems" items={service.problems} />
          <FeatureList title="Key capabilities" items={service.capabilities} />
          <FeatureList title="Technical features" items={service.technical} />
          <FeatureList title="Deliverables" items={service.deliverables} />
        </div>
      </section>

      {service.features && (
        <section className="studio-section" style={{ paddingTop: 0 }}>
          <div className="studio-wrap">
            <p className="kicker">Feature breakdown</p>
            <div className="grid md:grid-cols-2" style={{ gap: "1.5rem" }}>
              {service.features.map((group) => (
                <FeatureList key={group.title} title={group.title} items={group.items} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="studio-section" style={{ paddingTop: 0, background: "var(--cream)" }}>
        <div className="studio-wrap">
          <p className="kicker">Investment</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", maxWidth: "16ch" }}>Three levels. One custom quote.</h2>
          <div className="grid lg:grid-cols-3" style={{ gap: "0.9rem", marginTop: "1.5rem" }}>
            {service.tiers.map((tier) => <PricingCard key={tier.level} tier={tier} />)}
          </div>
          <p className="lede" style={{ marginTop: "1rem", fontSize: "0.92rem" }}>{PRICE_DISCLAIMER}</p>
          <div style={{ marginTop: "1.5rem" }}>
            <FeatureList title="Optional add-ons" items={service.addons} />
          </div>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-wrap grid lg:grid-cols-12" style={{ gap: "2rem" }}>
          <div className="lg:col-span-4">
            <p className="kicker">Development process</p>
            <h2 className="display" style={{ fontSize: "2.2rem" }}>How this gets built</h2>
          </div>
          <ol className="lg:col-span-8" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {PROCESS.map((step) => (
              <li key={step.step} style={{ display: "grid", gridTemplateColumns: "3.2rem 1fr", gap: "0.8rem", padding: "0.85rem 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}>{step.step}</span>
                <div>
                  <h3 className="display" style={{ fontSize: "1.15rem" }}>{step.title}</h3>
                  <p className="lede" style={{ fontSize: "0.95rem" }}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap grid lg:grid-cols-12" style={{ gap: "2rem" }}>
          <div className="lg:col-span-4">
            <p className="kicker">FAQ</p>
            <h2 className="display" style={{ fontSize: "2.2rem" }}>Before you enquire</h2>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={service.faqs} />
          </div>
        </div>
      </section>

      <section id="inquire" className="studio-section" style={{ paddingTop: 0 }}>
        <div className="studio-wrap grid lg:grid-cols-12" style={{ gap: "2rem" }}>
          <div className="lg:col-span-4">
            <p className="kicker">Project inquiry</p>
            <h2 className="display" style={{ fontSize: "2.4rem" }}>Request a proposal</h2>
            <p className="lede" style={{ marginTop: "0.8rem" }}>The form is set to {service.name}. Change the product if the brief is broader.</p>
          </div>
          <div className="lg:col-span-8">
            <ProjectInquiryForm idPrefix={`${service.slug}-inquiry`} initialCategory={category.slug} initialService={service.slug} />
          </div>
        </div>
      </section>
    </article>
  );
}
