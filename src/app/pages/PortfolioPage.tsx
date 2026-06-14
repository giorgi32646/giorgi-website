import { useState, useRef, useEffect, useCallback, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  X, ArrowUpRight, Check,
  Cpu, AlertCircle, Lock, Leaf, Sparkles, ShoppingBag, Headphones, Heart, Globe,
  Monitor, Palette, Zap, Gauge, TrendingUp, Home, Layers, BookOpen, Shield,
} from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { SAAS_PROJECTS, UIUX_PROJECTS, BRANDING_PROJECTS, CONCEPTS_PROJECTS } from "@/lib/portfolio-data";

/* ── Icon map (used as fallback when no thumbnailImage) ────── */

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  "universal-drone-os": Cpu,
  "redflag-ai": AlertCircle,
  "secureshare": Lock,
  // UI/UX
  "atelier-lili": ShoppingBag,
  "artspace-v2": Palette,
  "ai-agency": Zap,
  "koenigsegg": Gauge,
  "crypto-mining": TrendingUp,
  "furnispace": Home,
  "infiniti-war": Shield,
  "ilarutech": Monitor,
  "artspace-v1": Layers,
  // Branding
  "just-energy-drink": Zap,
  "brand-book": BookOpen,
  "rachareuli": Leaf,
  "vellura": Sparkles,
  "nekeas": ShoppingBag,
  // Concepts
  "ai-voice-book-reader": Headphones,
  "ai-dating-app": Heart,
  "digiframe": Globe,
};

/* ── Constants ─────────────────────────────────────────────── */

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

/* ── Shared micro-components ───────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      color: "#0080FF", fontSize: "0.75rem", fontWeight: 600,
      letterSpacing: "0.18em", textTransform: "uppercase",
      fontFamily: "'DM Sans', sans-serif", marginBottom: "12px",
    }}>
      {children}
    </p>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} style={{
      fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#ffffff",
      fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em",
      lineHeight: 1.15, margin: "0 0 40px 0",
    }}>
      {children}
    </h2>
  );
}

function CategoryPill({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-block",
      background: "rgba(0,128,255,0.08)",
      border: "1px solid rgba(0,128,255,0.25)",
      color: "#4DA6FF",
      fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em",
      textTransform: "uppercase", padding: "3px 10px",
      borderRadius: "6px", fontFamily: "'DM Sans', sans-serif",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function TechPill({ label }: { label: string }) {
  return (
    <span style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#8A93A6", fontSize: "0.75rem",
      fontFamily: "'DM Sans', sans-serif",
      padding: "4px 10px", borderRadius: "6px", whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function OwnProductBadge() {
  return (
    <span style={{
      background: "rgba(77,166,255,0.12)", color: "#4DA6FF",
      fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em",
      textTransform: "uppercase", padding: "3px 9px", borderRadius: "6px",
      fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
      border: "1px solid rgba(77,166,255,0.2)",
    }}>
      Own Product
    </span>
  );
}

/* ── Thumbnail area ────────────────────────────────────────── */

function ThumbnailArea({ project }: { project: PortfolioProject }) {
  const [imgFailed, setImgFailed] = useState(false);
  const Icon = ICON_MAP[project.id];
  const showImage = project.thumbnailImage && !imgFailed;

  return (
    <div style={{
      aspectRatio: "16/9", borderRadius: "12px",
      background: project.thumbnailGradient,
      marginBottom: "20px", overflow: "hidden",
      position: "relative", flexShrink: 0,
      display: showImage ? "block" : "flex",
      alignItems: "center", justifyContent: "center",
    }}>
      {showImage ? (
        <img
          src={project.thumbnailImage}
          alt={project.title}
          onError={() => setImgFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }} />
          <div style={{
            position: "absolute", width: "60%", height: "60%",
            background: "radial-gradient(circle, rgba(0,128,255,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />
          {Icon && <Icon size={36} color="rgba(0,128,255,0.55)" strokeWidth={1.5} />}
        </>
      )}
    </div>
  );
}

/* ── Project Modal ─────────────────────────────────────────── */

function ProjectModal({
  project,
  onClose,
  triggerRef,
}: {
  project: PortfolioProject | null;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Body scroll lock — prevents page scrolling while modal is open
  useEffect(() => {
    if (!project) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [project]);

  // Escape key + focus trap
  useEffect(() => {
    if (!project) return;

    const previousFocus = triggerRef.current;

    // Delay to let animation start then move focus in
    const t = setTimeout(() => {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.[0]?.focus();
    }, 50);

    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = Array.from(
        modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [project, onClose, triggerRef]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden="true"
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              background: "rgba(4,6,16,0.8)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Scroll container — scrollbar lives at the viewport edge */}
          <div
            style={{
              position: "fixed", inset: 0, zIndex: 101,
              overflowY: "auto",
              overscrollBehavior: "contain",
              display: "flex", alignItems: "flex-start", justifyContent: "center",
              padding: "20px",
            }}
            onClick={onClose}
          >
            {/* Modal card — no overflow here; the container above handles scrolling */}
            <motion.div
              key="modal-card"
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 8, transition: { duration: 0.18, ease: "easeIn" } }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                marginTop: "auto", marginBottom: "auto",
                width: "100%", maxWidth: "min(1200px, calc(100vw - 300px))",
                background: "rgba(6,9,20,0.98)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: "1px solid rgba(0,128,255,0.18)",
                borderTop: "1px solid rgba(0,128,255,0.4)",
                borderRadius: "18px",
                padding: "clamp(24px, 4vw, 36px)",
                boxShadow: "0 0 80px rgba(0,128,255,0.07), 0 40px 100px rgba(0,0,0,0.7)",
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  position: "absolute", top: "20px", right: "20px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "10px", width: "38px", height: "38px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#6A7590", transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.color = "#6A7590";
                }}
              >
                <X size={15} />
              </button>

              {/* Category + badges */}
              <div className="flex flex-wrap items-center gap-2" style={{ marginBottom: "12px" }}>
                <CategoryPill label={project.category} />
                {project.section === "saas" && <OwnProductBadge />}
                {project.statusBadge && (
                  <span style={{
                    fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "3px 8px", borderRadius: "5px",
                    fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
                    color: project.statusBadge.color,
                    background: project.statusBadge.bg,
                    border: `1px solid ${project.statusBadge.border}`,
                  }}>
                    {project.statusBadge.label}
                  </span>
                )}
                {project.year && (
                  <span style={{ color: "#3D4A62", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>
                    {project.year}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2
                id="modal-title"
                style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  color: "#ffffff", fontSize: "clamp(1.7rem, 4vw, 2.1rem)",
                  letterSpacing: "-0.03em", lineHeight: 1.08,
                  margin: "0 0 20px 0", paddingRight: "44px",
                }}
              >
                {project.title}
              </h2>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "20px" }} />

              {/* Full description */}
              <div style={{ marginBottom: "28px" }}>
                {project.fullDescription.map((para, i) => (
                  <p key={i} style={{
                    color: i === 0 ? "#C8D0E0" : "#8A93A6",
                    fontSize: "0.9375rem", lineHeight: 1.78,
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: i < project.fullDescription.length - 1 ? "14px" : 0,
                  }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Tech stack */}
              <div style={{ marginBottom: project.highlights ? "24px" : "28px" }}>
                <p style={{
                  color: "#3D5070", fontSize: "0.68rem", fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif", marginBottom: "10px",
                }}>
                  Tools &amp; Tech
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => <TechPill key={t} label={t} />)}
                </div>
              </div>

              {/* Highlights (SaaS case studies) */}
              {project.highlights && (
                <div style={{ marginBottom: "28px" }}>
                  <p style={{
                    color: "#3D5070", fontSize: "0.68rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif", marginBottom: "12px",
                  }}>
                    Key Highlights
                  </p>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {project.highlights.map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <div style={{
                          flexShrink: 0, marginTop: "3px",
                          width: "16px", height: "16px",
                          background: "rgba(0,128,255,0.14)",
                          border: "1px solid rgba(0,128,255,0.3)",
                          borderRadius: "4px", display: "flex",
                          alignItems: "center", justifyContent: "center",
                        }}>
                          <Check size={10} color="#4DA6FF" strokeWidth={2.5} />
                        </div>
                        <span style={{
                          color: "#B8C4D8", fontSize: "0.875rem",
                          lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif",
                        }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "22px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: "12px",
              }}>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  {project.behanceUrl && (
                    <a
                      href={project.behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                      style={{
                        color: "#5A6A8A", fontSize: "0.825rem", fontWeight: 600,
                        textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      View on Behance <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p style={{
                  color: "#6A7590", fontSize: "0.875rem",
                  fontFamily: "'DM Sans', sans-serif", margin: 0,
                }}>
                  Interested in something similar?
                </p>
                <a
                  href="mailto:thegiorgilortki@gmail.com"
                  className="inline-flex items-center gap-1.5"
                  style={{
                    color: "#0080FF", fontSize: "0.875rem", fontWeight: 600,
                    textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Get in touch <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ── Portfolio Card (standard vertical layout) ─────────────── */

function PortfolioCard({
  project,
  onClick,
  delay = 0,
}: {
  project: PortfolioProject;
  onClick: (project: PortfolioProject, el: HTMLElement) => void;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleActivate = useCallback(() => {
    if (ref.current) onClick(project, ref.current);
  }, [project, onClick]);

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  };

  return (
    <motion.div
      ref={ref}
      {...FADE_UP}
      transition={{ duration: 0.5, delay }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } }}
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${hovered ? "rgba(0,128,255,0.3)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "16px",
        padding: "24px",
        boxShadow: hovered
          ? "0 0 28px rgba(0,128,255,0.1), 0 8px 32px rgba(0,0,0,0.4)"
          : "0 2px 16px rgba(0,0,0,0.2)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
      }}
    >
      <ThumbnailArea project={project} />

      {/* Category / tag + status badge */}
      <div className="flex flex-wrap items-center gap-2" style={{ marginBottom: "10px" }}>
        <CategoryPill label={project.tag ?? project.category} />
        {project.statusBadge && (
          <span style={{
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "3px 8px", borderRadius: "5px",
            fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
            color: project.statusBadge.color,
            background: project.statusBadge.bg,
            border: `1px solid ${project.statusBadge.border}`,
          }}>
            {project.statusBadge.label}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 700,
        color: "#ffffff", fontSize: "1.125rem",
        letterSpacing: "-0.01em", margin: "0 0 8px 0", lineHeight: 1.3,
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        color: "#8A93A6", fontSize: "0.875rem", lineHeight: 1.65,
        fontFamily: "'DM Sans', sans-serif", margin: 0, flex: 1,
      }}>
        {project.shortDescription}
      </p>

      {/* "Click to view" hint */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
        style={{
          position: "absolute", bottom: "16px", right: "16px",
          fontSize: "0.7rem", color: "rgba(0,128,255,0.8)",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
          letterSpacing: "0.04em", pointerEvents: "none",
        }}
      >
        Click to view →
      </motion.span>
    </motion.div>
  );
}

/* ── Featured Card (UOS — full-width horizontal) ───────────── */

function FeaturedCard({
  project,
  onClick,
}: {
  project: PortfolioProject;
  onClick: (project: PortfolioProject, el: HTMLElement) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleActivate = useCallback(() => {
    if (ref.current) onClick(project, ref.current);
  }, [project, onClick]);

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  };

  return (
    <motion.div
      ref={ref}
      {...FADE_UP}
      transition={{ duration: 0.55, delay: 0.05 }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      className="mb-5"
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.01, y: -3, transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } }}
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${hovered ? "rgba(0,128,255,0.35)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "20px",
        padding: "clamp(24px, 5vw, 40px)",
        boxShadow: hovered
          ? "0 0 40px rgba(0,128,255,0.12), 0 12px 40px rgba(0,0,0,0.5)"
          : "0 4px 24px rgba(0,0,0,0.25)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "32px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Desktop: two-column, thumbnail right */}
      <div className="grid md:grid-cols-2 items-center gap-8">
        {/* Left: content */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span style={{
              background: "rgba(0,128,255,0.15)", color: "#0080FF",
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", padding: "4px 10px", borderRadius: "6px",
              fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
            }}>
              Featured
            </span>
            <OwnProductBadge />
            <span style={{
              background: "rgba(255,160,0,0.1)", color: "#F5A623",
              fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", padding: "3px 9px", borderRadius: "6px",
              fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
              border: "1px solid rgba(255,160,0,0.25)",
            }}>
              In Development
            </span>
            {project.year && (
              <span style={{ color: "#4A5568", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>
                {project.year}
              </span>
            )}
          </div>

          <h3 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            color: "#ffffff", fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
            letterSpacing: "-0.025em", margin: "0 0 6px 0", lineHeight: 1.1,
          }}>
            {project.title}
          </h3>
          <p style={{ color: "#0080FF", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "14px" }}>
            {project.category}
          </p>
          <p style={{
            color: "#8A93A6", fontSize: "0.9375rem", lineHeight: 1.7,
            fontFamily: "'DM Sans', sans-serif", maxWidth: "560px",
          }}>
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {project.techStack.slice(0, 6).map((t) => <TechPill key={t} label={t} />)}
          </div>
        </div>

        {/* Right: thumbnail */}
        <div>
          <ThumbnailArea project={project} />
        </div>
      </div>

      {/* "Click to view" hint */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
        style={{
          position: "absolute", bottom: "20px", right: "24px",
          fontSize: "0.72rem", color: "rgba(0,128,255,0.8)",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
          letterSpacing: "0.04em", pointerEvents: "none",
        }}
      >
        Click to view →
      </motion.span>
    </motion.div>
  );
}

/* ── Sections ──────────────────────────────────────────────── */

function SaaSSection({ onCardClick }: { onCardClick: (project: PortfolioProject, el: HTMLElement) => void }) {
  const [featured, ...rest] = SAAS_PROJECTS;
  return (
    <section aria-labelledby="saas-heading" style={{ marginBottom: "80px" }}>
      <motion.div {...FADE_UP} transition={{ duration: 0.5 }}>
        <SectionLabel>SaaS &amp; Product Development</SectionLabel>
        <SectionHeading id="saas-heading">Own products, shipped</SectionHeading>
      </motion.div>

      <FeaturedCard project={featured} onClick={onCardClick} />

      <div className="grid md:grid-cols-2 gap-5">
        {rest.map((project, i) => (
          <PortfolioCard
            key={project.id}
            project={project}
            onClick={onCardClick}
            delay={0.1 + i * 0.1}
          />
        ))}
      </div>
    </section>
  );
}

function SmallCardGrid({
  projects,
  sectionLabel,
  headingId,
  heading,
  delay = 0,
  onCardClick,
}: {
  projects: PortfolioProject[];
  sectionLabel: string;
  headingId: string;
  heading: string;
  delay?: number;
  onCardClick: (project: PortfolioProject, el: HTMLElement) => void;
}) {
  return (
    <section aria-labelledby={headingId} style={{ marginBottom: "80px" }}>
      <motion.div {...FADE_UP} transition={{ duration: 0.5, delay }}>
        <SectionLabel>{sectionLabel}</SectionLabel>
        <SectionHeading id={headingId}>{heading}</SectionHeading>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <PortfolioCard
            key={project.id}
            project={project}
            onClick={onCardClick}
            delay={delay + 0.05 + i * 0.08}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────── */

export function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleCardClick = useCallback((project: PortfolioProject, el: HTMLElement) => {
    triggerRef.current = el;
    setSelectedProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div style={{ background: "#0A0E1A", paddingTop: "68px" }}>
      {/* Page header */}
      <div style={{
        background: "linear-gradient(180deg, rgba(0,128,255,0.04) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "64px 0 56px",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-4 sm:px-6"
        >
          <p style={{
            color: "#0080FF", fontSize: "0.75rem", fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif", marginBottom: "14px",
          }}>
            All Work
          </p>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            color: "#ffffff", fontSize: "clamp(2.25rem, 6vw, 4rem)",
            letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 16px 0",
          }}>
            Portfolio
          </h1>
          <p style={{
            color: "#8A93A6", fontSize: "1.0625rem",
            fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65, maxWidth: "520px",
          }}>
            SaaS products, UI/UX design, branding, and digital experiences — built and designed in Tbilisi.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6" style={{ paddingTop: "72px", paddingBottom: "96px" }}>
        <SaaSSection onCardClick={handleCardClick} />
        <SmallCardGrid
          projects={UIUX_PROJECTS}
          sectionLabel="UI/UX Design"
          headingId="uiux-heading"
          heading="Design work"
          delay={0.05}
          onCardClick={handleCardClick}
        />
        <SmallCardGrid
          projects={BRANDING_PROJECTS}
          sectionLabel="Branding &amp; Graphic Design"
          headingId="branding-heading"
          heading="Brand identities"
          delay={0.08}
          onCardClick={handleCardClick}
        />
        <SmallCardGrid
          projects={CONCEPTS_PROJECTS}
          sectionLabel="Concepts &amp; Other"
          headingId="concepts-heading"
          heading="Concepts &amp; explorations"
          delay={0.1}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleClose}
        triggerRef={triggerRef}
      />
    </div>
  );
}
