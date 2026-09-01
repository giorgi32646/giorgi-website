import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export const CAL_LINK = "thegiorgilortki/consultation";

// Namespaced so this embed's UI config can't collide with any other Cal
// instance mounted elsewhere on the site.
const CAL_NAMESPACE = "consultation";

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

export function BookingWidget({ calLink = CAL_LINK }: BookingWidgetProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;

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

      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

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
      {!ready && (
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

export default BookingWidget;
