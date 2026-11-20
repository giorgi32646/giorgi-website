import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { OG_IMAGE, absolute, allIndexablePages, notFoundSeo } from "../src/lib/seo.ts";

const project = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(project, "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function seoBlock(page, { canonical } = { canonical: true }) {
  const url = absolute(page.path === "/404" ? "/" : page.path);
  const robots = page.robots ?? "index, follow";
  const canonicalTag = canonical
    ? `\n      <link data-rh="true" rel="canonical" href="${escapeHtml(absolute(page.path))}" />`
    : "";
  return `<!--seo-->
      <title>${escapeHtml(page.title)}</title>
      <meta data-rh="true" name="description" content="${escapeHtml(page.description)}" />
      <meta data-rh="true" name="robots" content="${escapeHtml(robots)}" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />${canonicalTag}
      <meta property="og:type" content="website" />
      <meta data-rh="true" property="og:url" content="${escapeHtml(canonical ? absolute(page.path) : url)}" />
      <meta data-rh="true" property="og:title" content="${escapeHtml(page.title)}" />
      <meta data-rh="true" property="og:description" content="${escapeHtml(page.description)}" />
      <meta data-rh="true" property="og:image" content="${OG_IMAGE}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta data-rh="true" name="twitter:title" content="${escapeHtml(page.title)}" />
      <meta data-rh="true" name="twitter:description" content="${escapeHtml(page.description)}" />
      <meta data-rh="true" name="twitter:image" content="${OG_IMAGE}" />
      <script type="application/ld+json" id="seo-jsonld">${JSON.stringify(page.jsonLd).replaceAll("<", "\\u003c")}</script>
      <!--/seo-->`;
}

function crawlableRoot(page) {
  const links = page.links
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
    .join(" ");
  return `<div id="root"><header><nav aria-label="Main">${links}</nav></header><main><h1>${escapeHtml(page.h1)}</h1><p>${escapeHtml(page.description)}</p></main></div>`;
}

function render(page, options) {
  const block = seoBlock(page, options);
  const withHead = template.includes("<!--seo-->")
    ? template.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, block)
    : template.replace(/<title>[\s\S]*?<\/title>/, block);
  return withHead.replace('<div id="root"></div>', crawlableRoot(page));
}

const pages = allIndexablePages();
for (const page of pages) {
  const html = render(page, { canonical: true });
  const file = page.path === "/" ? join(dist, "index.html") : join(dist, page.path.slice(1), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const missing = notFoundSeo();
const notFoundHtml = render(missing, { canonical: false }).replace(
  /\n\s*<meta data-rh="true" property="og:url" content="[^"]*" \/>/,
  "",
);
writeFileSync(join(dist, "404.html"), notFoundHtml);

const urls = pages
  .map((page) => `  <url><loc>${escapeHtml(absolute(page.path))}</loc></url>`)
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);
writeFileSync(join(project, "public", "sitemap.xml"), sitemap);

const home = readFileSync(join(dist, "index.html"), "utf8");
const services = readFileSync(join(dist, "services", "index.html"), "utf8");
if (home === services) {
  throw new Error("Homepage and services HTML are identical.");
}
if (!services.includes("https://www.giorgilortkipanidze.online/services")) {
  throw new Error("Services canonical is missing.");
}
if (!readFileSync(join(dist, "sitemap.xml"), "utf8").includes("/services/additional/seo-analytics")) {
  throw new Error("Sitemap is missing service URLs.");
}
if (!notFoundHtml.includes("noindex")) {
  throw new Error("404 page is missing noindex.");
}

console.log(`Prerendered ${pages.length} pages and wrote sitemap.xml`);
