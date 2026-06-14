import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, Twitter, Mail, ArrowUpRight } from "lucide-react";

const FORMSPREE_URL = "https://formspree.io/f/xgobrzaj";
const HEADLINE     = "Let's Build Something";
const SUBHEADLINE  = "I'm available for freelance projects — 5–10h/week alongside my own product work. If you have a SaaS that needs design + code in one package, let's talk.";

const FORM_FIELDS = {
  name:    "Your name",
  email:   "your@email.com",
  message: "Tell me about your project — scope, timeline, and anything else that helps.",
};

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://x.com/Giorgi5926481",          icon: Twitter },
  { label: "Email",       href: "mailto:thegiorgilortki@gmail.com",      icon: Mail    },
];

type Status = "idle" | "sending" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

function FormField({
  type,
  placeholder,
  value,
  onChange,
  error,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "0.875rem 1rem",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${error ? "#d4183d" : focused ? "#0080FF" : "rgba(0,128,255,0.2)"}`,
          borderRadius: "0.75rem",
          color: "#F5F7FA",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "0.9375rem",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: focused ? "0 0 0 3px rgba(0,128,255,0.15)" : "none",
        }}
      />
      {error && (
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.8125rem",
            color: "#d4183d",
            marginTop: "0.375rem",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function validate(form: { name: string; email: string; message: string }): Errors {
  const e: Errors = {};
  if (!form.name.trim())                          e.name    = "Name is required.";
  if (!form.email.trim())                         e.email   = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
  if (!form.message.trim())                       e.message = "Message is required.";
  return e;
}

export function ContactSection() {
  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ background: "#0A0E1A", padding: "96px 0 112px" }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#0080FF",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Let's Talk
          </p>
          <h2
            id="contact-heading"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 7vw, 4rem)",
              color: "#F5F7FA",
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              lineHeight: 1.05,
            }}
          >
            {HEADLINE}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0080FF, #4DA6FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Great
            </span>
          </h2>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "1.0625rem",
              color: "#8A93A6",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            {SUBHEADLINE}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                role="status"
                aria-live="polite"
                style={{
                  textAlign: "center",
                  padding: "3rem 2rem",
                  background: "rgba(0,212,170,0.05)",
                  border: "1px solid rgba(0,212,170,0.2)",
                  borderRadius: "1.25rem",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎉</div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "#00D4AA",
                    marginBottom: "0.75rem",
                  }}
                >
                  Thanks! I'll get back to you soon.
                </h3>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    color: "#8A93A6",
                    fontSize: "1rem",
                  }}
                >
                  Your message was sent successfully. Expect a reply within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                style={{
                  background: "rgba(17,23,41,0.6)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(0,128,255,0.15)",
                  borderRadius: "1.25rem",
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {/* Name + Email row */}
                <div
                  style={{ display: "grid", gap: "1.25rem" }}
                  className="form-row"
                >
                  <FormField
                    type="text"
                    placeholder={FORM_FIELDS.name}
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    error={errors.name}
                  />
                  <FormField
                    type="email"
                    placeholder={FORM_FIELDS.email}
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    error={errors.email}
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    placeholder={FORM_FIELDS.message}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    aria-label="Message"
                    style={{
                      width: "100%",
                      padding: "0.875rem 1rem",
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${errors.message ? "#d4183d" : "rgba(0,128,255,0.2)"}`,
                      borderRadius: "0.75rem",
                      color: "#F5F7FA",
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.9375rem",
                      resize: "vertical",
                      outline: "none",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0080FF";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,128,255,0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.message ? "#d4183d" : "rgba(0,128,255,0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {errors.message && (
                    <p
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.8125rem",
                        color: "#d4183d",
                        marginTop: "0.375rem",
                      }}
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    style={{
                      padding: "0.875rem 1rem",
                      background: "rgba(212,24,61,0.08)",
                      border: "1px solid rgba(212,24,61,0.3)",
                      borderRadius: "0.75rem",
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.9rem",
                      color: "#f87171",
                    }}
                  >
                    Something went wrong. Please try again or email me directly at{" "}
                    <a
                      href="mailto:thegiorgilortki@gmail.com"
                      style={{ color: "#f87171", textDecoration: "underline" }}
                    >
                      thegiorgilortki@gmail.com
                    </a>
                    .
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={status !== "sending" ? { scale: 1.02, boxShadow: "0 0 30px rgba(0,128,255,0.45)" } : {}}
                  whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "1rem",
                    background: status === "sending" ? "rgba(0,128,255,0.5)" : "#0080FF",
                    color: "#F5F7FA",
                    border: "none",
                    borderRadius: "0.75rem",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    boxShadow: "0 0 20px rgba(0,128,255,0.25)",
                    transition: "background 0.2s ease",
                  }}
                  onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "3px"; }}
                  onBlur={(e)  => { e.currentTarget.style.outline = "none"; }}
                >
                  {status === "sending" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                        style={{ display: "flex" }}
                        aria-hidden="true"
                      >
                        <Loader2 size={18} />
                      </motion.span>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                whileHover={{ scale: 1.06, borderColor: "rgba(0,128,255,0.5)" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1rem",
                  background: "rgba(17,23,41,0.8)",
                  border: "1px solid rgba(0,128,255,0.2)",
                  borderRadius: "0.75rem",
                  color: "#8A93A6",
                  textDecoration: "none",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F5F7FA"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8A93A6"; }}
                onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "3px"; e.currentTarget.style.borderRadius = "0.75rem"; }}
                onBlur={(e)  => { e.currentTarget.style.outline = "none"; }}
              >
                <Icon size={16} aria-hidden="true" />
                {social.label}
                <ArrowUpRight size={14} style={{ opacity: 0.6 }} aria-hidden="true" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
