const STEPS = [
  {
    index: "01",
    title: "Strategy",
    body: "We define the audience, the offer, and what the work has to achieve before a single screen is drawn.",
  },
  {
    index: "02",
    title: "Design",
    body: "Creative direction, interface, and brand are resolved together so the product looks and behaves as one system.",
  },
  {
    index: "03",
    title: "Development",
    body: "The same practice builds what it designs. Motion, structure, and engineering stay under one standard.",
  },
  {
    index: "04",
    title: "Delivery",
    body: "You receive a finished, documented release — ready to launch, measure, and extend.",
  },
];

export function ApproachSection() {
  return (
    <section id="approach" aria-labelledby="approach-heading" className="studio-section" style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="studio-wrap">
        <p className="kicker">03 — Approach</p>
        <h2 id="approach-heading" className="display" style={{ fontSize: "clamp(2.1rem, 4.5vw, 3.5rem)", maxWidth: "12ch" }}>
          How an engagement runs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4" style={{ gap: "1.5rem", marginTop: "2.25rem" }}>
          {STEPS.map((step) => (
            <article key={step.index} style={{ borderTop: "1px solid var(--accent)", paddingTop: "1rem" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent)" }}>{step.index}</p>
              <h3 className="display" style={{ fontSize: "1.45rem", marginTop: "0.65rem" }}>{step.title}</h3>
              <p className="lede" style={{ marginTop: "0.65rem", fontSize: "0.98rem" }}>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
