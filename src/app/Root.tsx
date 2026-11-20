import { Outlet, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { FooterSection } from "./components/FooterSection";
import { trackPage } from "../lib/analytics";

export function Root() {
  const { pathname } = useLocation();
  const firstView = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    trackPage(pathname);
  }, [pathname]);

  return (
      <div style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}>
      <Navbar />
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
}
