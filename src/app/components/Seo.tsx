import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { OG_IMAGE, absolute, type PageSeo } from "../../lib/seo";

export function Seo({ page }: { page: PageSeo }) {
  const location = useLocation();
  const url = page.path === "/404" ? absolute(location.pathname) : absolute(page.path);

  useEffect(() => {
    let script = document.getElementById("seo-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-jsonld";
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(page.jsonLd);
  }, [page]);

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content={page.robots ?? "index, follow"} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}
