import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { FooterSection } from "./components/FooterSection";
import { CursorDot } from "./components/CursorDot";

export function Root() {
  const { pathname } = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div
      style={{
        background: "#0A0E1A",
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "hidden",
      }}
    >
      <CursorDot />
      <Navbar />
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
}
