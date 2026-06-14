<div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>
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
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
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
                <p style={{ fontFamily: "DM Sans, sans-serif", color: "#8A93A6", fontSize: "1rem" }}>
                  Your message was sent successfully. Expect a reply within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
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
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}
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
                      (e.target as HTMLElement).style.borderColor = "#0080FF";
                      (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(0,128,255,0.15)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = errors.message ? "#d4183d" : "rgba(0,128,255,0.2)";
                      (e.target as HTMLElement).style.boxShadow = "none";
                    }}
                  />
                  {errors.message && (
                    <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.8125rem", color: "#d4183d", marginTop: "0.375rem" }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
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
                >
                  {status === "sending" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                        style={{ display: "flex" }}
                      >
                        <Loader2 size={18} />
                      </motion.span>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} />
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
            }}
          >
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, borderColor: "rgba(0,128,255,0.5)" }}
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
                    transition: "color 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F5F7FA"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8A93A6"; }}
                >
                  <Icon size={16} />
                  {social.label}
                  <ArrowUpRight size={14} style={{ opacity: 0.6 }} />
                </motion.a>
              );
            })}
          </motion.div>
        </div>