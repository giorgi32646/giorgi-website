import { Link } from "react-router";
import { Seo } from "../components/Seo";
import { notFoundSeo } from "../../lib/seo";

export function NotFoundPage() {
  return (
    <div className="studio-wrap" style={{ paddingTop: "8rem", paddingBottom: "4rem" }}>
      <Seo page={notFoundSeo()} />
      <p className="kicker">404</p>
      <h1 className="display" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", maxWidth: "12ch" }}>This page does not exist.</h1>
      <p className="lede" style={{ marginTop: "1rem", maxWidth: "36rem" }}>The address is not part of the studio site. The catalog and the homepage are linked below.</p>
      <Link to="/" className="btn btn-ink" style={{ marginTop: "1.25rem" }}>Back home</Link>
    </div>
  );
}
