import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion } from "motion/react";
import { Loader2, CalendarX, Mail } from "lucide-react";

export const CAL_LINK = "thegiorgilortki/30min";

const FALLBACK_EMAIL = "thegiorgilortki@gmail.com";

// Namespaced so this embed's UI config can't collide with any other Cal
// instance mounted elsewhere on the site.
const CAL_NAMESPACE = "booking";

const BRAND = {
  bg: "#0A0E1A",
  surface: "#0C1220",
  surfaceRaised: "#141828",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.16)",
  accent: "#0080FF",
  text: "#F5F7FA",
  textMuted: "#8A93A6",
};

type BookingWidgetProps = {
  calLink?: string;
};

type Status = "loading" | "ready" | "failed";

export function BookingWidget({ calLink = CAL_LINK }: BookingWidgetProps) {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;

      // Cal renders its own bare "Error Code: 404" inside the iframe when the
      // link is wrong. Catch it so we can show something on-brand instead.
      cal("on", {
        action: "linkFailed",
        callback: () => setStatus("failed"),
      });

      cal("on", {
        action: "linkReady",
        callback: () => setStatus("ready"),
      });

      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: {
            "cal-brand": BRAND.accent,
            "cal-bg": BRAND.surface,
            "cal-bg-emphasis": BRAND.surfaceRaised,
            "cal-bg-subtle": BRAND.surfaceRaised,
            "cal-bg-muted": BRAND.bg,
            "cal-border": BRAND.border,
            "cal-border-subtle": BRAND.border,
            "cal-border-emphasis": BRAND.borderStrong,
            "cal-text": BRAND.text,
            "cal-text-emphasis": "#ffffff",
            "cal-text-subtle": BRAND.textMuted,
          },
          light: {},
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "failed") {
    return <BookingUnavailable />;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: BRAND.surface,
        border: `1px solid ${BRAND.border}`,
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      {status === "loading" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            background: BRAND.surface,
          }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
            style={{ display: "flex", color: BRAND.accent }}
            aria-hidden="true"
          >
            <Loader2 size={22} />
          </motion.span>
          <p
            style={{
              color: BRAND.textMuted,
              fontSize: "0.875rem",
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
            }}
          >
            Loading available times…
          </p>
        </div>
      )}

      {/* Bounded height keeps the page from stretching to the embed's full
          content height; the embed scrolls internally instead. */}
      <div
        style={{
          width: "100%",
          height: "clamp(620px, 82vh, 940px)",
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={calLink}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", theme: "dark" }}
        />
      </div>
    </div>
  );
}

function BookingUnavailable() {
  return (
    <div
      style={{
        width: "100%",
        background: BRAND.surface,
        border: `1px solid ${BRAND.border}`,
        borderRadius: "20px",
        padding: "56px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "rgba(0,128,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <CalendarX size={20} style={{ color: BRAND.accent }} aria-hidden="true" />
      </div>

      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          color: "#ffffff",
          fontSize: "1.05rem",
          margin: "0 0 10px",
        }}
      >
        The calendar isn't available right now
      </h3>

      <p
        style={{
          color: BRAND.textMuted,
          fontSize: "0.9rem",
          lineHeight: 1.7,
          fontFamily: "'DM Sans', sans-serif",
          margin: "0 0 24px",
          maxWidth: "380px",
        }}
      >
        Email me instead and I'll send over a few times that work — you'll get a reply
        within 24 hours on weekdays.
      </p>

      <a
        href={`mailto:${FALLBACK_EMAIL}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: BRAND.accent,
          color: "#0A0E1A",
          borderRadius: "12px",
          padding: "13px 28px",
          fontSize: "0.9rem",
          fontWeight: 700,
          textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <Mail size={16} aria-hidden="true" />
        {FALLBACK_EMAIL}
      </a>
    </div>
  );
}

export default BookingWidget;
