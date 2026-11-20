import type { PricingTier } from "../../../lib/services-catalog";

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <article style={{ borderTop: "2px solid var(--accent)", background: "#101624", padding: "1.15rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
      <p className="kicker" style={{ margin: 0 }}>{tier.level}</p>
      <h3 className="display" style={{ fontSize: "1.35rem" }}>{tier.range}</h3>
      <p className="lede" style={{ fontSize: "0.95rem" }}>{tier.scope}</p>
      <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--ink-soft)", display: "grid", gap: "0.35rem" }}>
        {tier.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
