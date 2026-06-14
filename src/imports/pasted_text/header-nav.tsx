<div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "68px",
            gap: "1.5rem",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollTo("#"); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            {/* Monogram badge */}
            <span
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #0080FF, #4DA6FF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "0.8rem",
                color: "#fff",
                letterSpacing: "-0.03em",
                flexShrink: 0,
              }}
            >
              {LOGO_INITIALS}
            </span>
            {/* Full name — hidden on small screens */}
            {!isMobile && (
              <span
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#F5F7FA",
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {LOGO_NAME}
              </span>
            )}
          </a>

          {/* Desktop nav (center) */}
          {!isMobile && (
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "9999px",
                padding: "0.25rem",
              }}
            >
              {NAV_LINKS.map((link) => {
                const id       = link.href.slice(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLink(link.href); }}
                    style={{
                      position: "relative",
                      padding: "0.375rem 0.875rem",
                      borderRadius: "9999px",
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: isActive ? "#F5F7FA" : "#8A93A6",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      zIndex: 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.color = "#D0D6E0";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.color = "#8A93A6";
                    }}
                  >
                    {/* Animated active pill */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "9999px",
                          background: "rgba(0,128,255,0.2)",
                          border: "1px solid rgba(0,128,255,0.35)",
                          zIndex: -1,
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    {link.label}
                  </a>
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
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.5rem 1.125rem",
                  background: "#0080FF",
                  color: "#fff",
                  borderRadius: "9999px",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 0 16px rgba(0,128,255,0.25)",
                }}
              >
                {CTA_TEXT}
                <ArrowUpRight size={15} />
              </motion.a>
            )}

            {isMobile && (
              <motion.button
                onClick={() => setMobileOpen(v => !v)}
                whileTap={{ scale: 0.93 }}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#F5F7FA",
                  cursor: "pointer",
                  padding: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </div>