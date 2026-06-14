import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LOGO_INITIALS = "GL";
const LOGO_NAME     = "Giorgi Lortkipanidze";
const MAILTO        = "mailto:thegiorgilortki@gmail.com";
const CTA_TEXT      = "Book a Call";

const NAV_LINKS = [
  { label: "Work",      href: "/work" },
  { label: "Pricing",   href: "/pricing" },
  { label: "About",     href: "/about" },
  { label: "Contact",   href: "/contact" },
  { label: "Portfolio", href: "/portfolio" },
];

export function Navbar() {
  const navigate   = useNavigate();
  const location   = useLocation();

  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);

  /* responsive */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  /* scroll opacity */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMobileOpen(false);
    navigate(href);
  };

  const isLinkActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href;
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
        style={{ background: "#0080FF", color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}
      >
        Skip to content
      </a>

      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
          background: scrolled ? "rgba(10,14,26,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px", gap: "1.5rem" }}
        >
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: "0.625rem", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}
            aria-label="Giorgi Lortkipanidze — home"
            onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "3px"; }}
            onBlur={(e)  => { e.currentTarget.style.outline = "none"; }}
          >
            <span
              style={{
                width: "34px", height: "34px", borderRadius: "8px",
                background: "linear-gradient(135deg, #0080FF, #4DA6FF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "0.8rem",
                color: "#fff", letterSpacing: "-0.03em", flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {LOGO_INITIALS}
            </span>
            {!isMobile && (
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F5F7FA", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
                {LOGO_NAME}
              </span>
            )}
          </button>

          {/* Desktop pill nav */}
          {!isMobile && (
            <nav role="navigation" aria-label="Main navigation"
              style={{
                display: "flex", alignItems: "center", gap: "0.25rem",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "9999px", padding: "0.25rem",
              }}
            >
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <button
                    key={link.href}
                    onClick={() => handleLink(link.href)}
                    style={{
                      position: "relative", padding: "0.375rem 0.875rem", borderRadius: "9999px",
                      fontFamily: "DM Sans, sans-serif", fontSize: "0.875rem", fontWeight: 500,
                      color: active ? "#F5F7FA" : "#8A93A6",
                      background: "none", border: "none", cursor: "pointer",
                      transition: "color 0.2s ease", zIndex: 1,
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "#D0D6E0"; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "#8A93A6"; }}
                    onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "2px"; e.currentTarget.style.borderRadius = "9999px"; }}
                    onBlur={(e)  => { e.currentTarget.style.outline = "none"; }}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        style={{
                          position: "absolute", inset: 0, borderRadius: "9999px",
                          background: "rgba(0,128,255,0.2)", border: "1px solid rgba(0,128,255,0.35)", zIndex: -1,
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    {link.label}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right: CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            {!isMobile && (
              <motion.a
                href={MAILTO}
                whileHover={{ scale: 1.04, boxShadow: "0 0 22px rgba(0,128,255,0.45)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.375rem",
                  padding: "0.5rem 1.125rem", background: "#0080FF", color: "#fff",
                  borderRadius: "9999px", fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                  boxShadow: "0 0 16px rgba(0,128,255,0.25)",
                }}
                onFocus={(e) => { e.currentTarget.style.outline = "2px solid #0080FF"; e.currentTarget.style.outlineOffset = "3px"; }}
                onBlur={(e)  => { e.currentTarget.style.outline = "none"; }}
              >
                {CTA_TEXT} <ArrowUpRight size={15} aria-hidden="true" />
              </motion.a>
            )}

            {isMobile && (
              <motion.button
                onClick={() => setMobileOpen((v) => !v)}
                whileTap={{ scale: 0.93 }}
                style={{
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px", color: "#F5F7FA", cursor: "pointer",
                  padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center",
                }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90,  opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "flex" }}
                  >
                    {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav-menu"
              role="menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{   opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              style={{ background: "rgba(10,14,26,0.98)", borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}
            >
              <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <button
                      key={link.href}
                      role="menuitem"
                      onClick={() => handleLink(link.href)}
                      style={{
                        padding: "12px 16px", borderRadius: "10px", textAlign: "left",
                        fontFamily: "DM Sans, sans-serif", fontSize: "1rem",
                        fontWeight: active ? 600 : 400,
                        color: active ? "#ffffff" : "#8A93A6",
                        background: active ? "rgba(0,128,255,0.1)" : "none",
                        border: active ? "1px solid rgba(0,128,255,0.2)" : "1px solid transparent",
                        cursor: "pointer", width: "100%", transition: "color 0.15s, background 0.15s",
                      }}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <a
                  href={MAILTO}
                  style={{
                    marginTop: "8px", display: "block", textAlign: "center",
                    padding: "12px 24px", borderRadius: "9999px", background: "#0080FF",
                    color: "#fff", fontFamily: "DM Sans, sans-serif", fontWeight: 700,
                    fontSize: "0.95rem", textDecoration: "none",
                  }}
                >
                  {CTA_TEXT}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
