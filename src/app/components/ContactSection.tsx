import { motion } from "motion/react";
import { ProjectInquiryForm } from "./services/ProjectInquiryForm";
import { FacebookIcon } from "./FacebookIcon";
import { InstagramIcon } from "./InstagramIcon";
import { XIcon } from "./XIcon";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="studio-section" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="studio-wrap">
        <div className="grid lg:grid-cols-12" style={{ gap: "2.5rem" }}>
          <motion.div className="lg:col-span-5" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <p className="kicker">05 — Contact</p>
            <h2 id="contact-heading" className="display" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
              Start a project
            </h2>
            <p className="lede" style={{ marginTop: "1.1rem", maxWidth: "28rem" }}>
              Choose the service, answer the questions that belong to it, and send the brief. A proposal follows only after the message is received.
            </p>
            <div style={{ marginTop: "1.75rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <a href="mailto:thegiorgilortki@gmail.com" style={{ color: "var(--ink)", textDecoration: "none" }}>thegiorgilortki@gmail.com</a>
              <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
                <a href="https://x.com/Thegiorgilortki" target="_blank" rel="noopener noreferrer" aria-label="Follow Giorgi on X" style={{ color: "var(--muted)", textDecoration: "none", display: "inline-flex" }}>
                  <XIcon size={16} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61580678950143" target="_blank" rel="noopener noreferrer" aria-label="Follow Giorgi on Facebook" style={{ color: "var(--muted)", textDecoration: "none", display: "inline-flex" }}>
                  <FacebookIcon size={16} />
                </a>
                <a href="https://www.instagram.com/thegiorgilortki" target="_blank" rel="noopener noreferrer" aria-label="Follow Giorgi on Instagram" style={{ color: "var(--muted)", textDecoration: "none", display: "inline-flex" }}>
                  <InstagramIcon size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-7" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}>
            <ProjectInquiryForm idPrefix="home-inquiry" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
