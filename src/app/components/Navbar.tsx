import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Portfolio", href: "/portfolio" },
];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMobileOpen(false);
    navigate(href);
  };

  const isLinkActive = (href: string) =>
    href === "/services" ? location.pathname.startsWith("/services") : location.pathname === href;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2"
        style={{ background: "var(--ink)", color: "var(--paper)", fontWeight: 560 }}
      >
        Skip to content
      </a>

      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? "rgba(10,14,26,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
          transition: "background 0.25s, border-color 0.25s",
        }}
      >
        <div
          className="studio-wrap"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px", gap: "1.5rem" }}
        >
          <button
            onClick={() => handleLink("/")}
            aria-label="Giorgi Lortkipanidze — home"
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.55rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "var(--ink)",
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: isMobile ? "0.95rem" : "0.82rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              The Giorgi Lortki
            </span>
          </button>

          {!isMobile && (
            <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "1.35rem" }}>
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <button
                    key={link.href}
                    onClick={() => handleLink(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0.35rem 0",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.92rem",
                      fontWeight: active ? 560 : 460,
                      color: active ? "var(--ink)" : "var(--muted)",
                      borderBottom: active ? "1.5px solid var(--accent)" : "1.5px solid transparent",
                    }}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {!isMobile && (
              <a href="/book" onClick={(e) => { e.preventDefault(); handleLink("/book"); }} className="btn btn-ink" style={{ minHeight: "42px", padding: "0.55rem 0.95rem" }}>
                Book a call
              </a>
            )}
            {isMobile && (
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-menu"
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "1px solid var(--line)",
                  color: "var(--ink)",
                  cursor: "pointer",
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileOpen ? "close" : "open"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "flex" }}
                  >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav-menu"
              role="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ background: "var(--paper)", borderBottom: "1px solid var(--line)" }}
            >
              <div className="studio-wrap" style={{ display: "flex", flexDirection: "column", padding: "0.5rem 0 1.25rem" }}>
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    role="menuitem"
                    onClick={() => handleLink(link.href)}
                    style={{
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid var(--line)",
                      cursor: "pointer",
                      padding: "0.95rem 0",
                      fontFamily: "var(--font-display)",
                      fontSize: "1.65rem",
                      color: isLinkActive(link.href) ? "var(--accent)" : "var(--ink)",
                    }}
                  >
                    {link.label}
                  </button>
                ))}
                <a href="/book" onClick={(e) => { e.preventDefault(); handleLink("/book"); }} className="btn btn-ink" style={{ marginTop: "1rem" }}>
                  Book a call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
