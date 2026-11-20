import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { FooterSection } from "./components/FooterSection";

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
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
