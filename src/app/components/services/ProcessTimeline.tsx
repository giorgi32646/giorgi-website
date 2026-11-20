import { PROCESS } from "../../../lib/services-catalog";

export function ProcessTimeline() {
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0" }}>
      {PROCESS.map((step) => (
        <li key={step.step} style={{ display: "grid", gridTemplateColumns: "4.5rem 1fr", gap: "1rem", padding: "1.15rem 0", borderTop: "1px solid var(--line)" }}>
          <span style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700 }}>{step.step}</span>
          <div>
            <h3 className="display" style={{ fontSize: "1.45rem" }}>{step.title}</h3>
            <p className="lede" style={{ marginTop: "0.35rem" }}>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
