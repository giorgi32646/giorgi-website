export function FeatureList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="display" style={{ fontSize: "1.2rem", marginBottom: "0.7rem" }}>{title}</h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.45rem" }}>
        {items.map((item) => (
          <li key={item} style={{ display: "grid", gridTemplateColumns: "10px 1fr", gap: "0.65rem", alignItems: "start", color: "var(--ink-soft)" }}>
            <span aria-hidden="true" style={{ width: 10, height: 2, background: "var(--accent)", marginTop: "0.65rem" }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
