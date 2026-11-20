import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div style={{ borderTop: "1px solid var(--line)" }}>
      {items.map((item) => (
        <FAQItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center", padding: "1.05rem 0", background: "none", border: "none", color: "var(--ink)", cursor: "pointer", textAlign: "left", fontFamily: "var(--font-display)", fontSize: "1.12rem" }}
      >
        {q}
        <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ color: "var(--accent)", flexShrink: 0 }}>
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p className="lede" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", margin: 0, paddingBottom: "1rem" }}>
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
