import { CATEGORIES } from "./services-catalog.ts";

export const SITE = "https://www.giorgilortkipanidze.online";
export const OG_IMAGE = `${SITE}/og.png`;

const HOME_DESCRIPTION =
  "The Giorgi Lortki designs, engineers, and delivers digital products — websites, software, mobile apps, marketplaces, and enterprise systems.";

export type SeoLink = { href: string; label: string };

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  h1: string;
  robots?: string;
  jsonLd: Record<string, unknown>;
  links: SeoLink[];
};

const MAIN_LINKS: SeoLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book a call" },
];

function clip(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

function absolute(path: string) {
  return path === "/" ? `${SITE}/` : `${SITE}${path}`;
}

function business() {
  return {
    "@type": "ProfessionalService",
    name: "The Giorgi Lortki",
    url: `${SITE}/`,
    image: OG_IMAGE,
    email: "thegiorgilortki@gmail.com",
    description: HOME_DESCRIPTION,
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    },
    sameAs: [
      "https://x.com/Thegiorgilortki",
      "https://www.facebook.com/profile.php?id=61580678950143",
      "https://www.instagram.com/thegiorgilortki",
    ],
  };
}

function withLinks(extra: SeoLink[] = []): SeoLink[] {
  const seen = new Set<string>();
  return [...MAIN_LINKS, ...extra].filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

function page(input: Omit<PageSeo, "links" | "jsonLd"> & { links?: SeoLink[]; jsonLd: Record<string, unknown> }): PageSeo {
  return { ...input, links: withLinks(input.links) };
}

const STATIC: PageSeo[] = [
  page({
    path: "/",
    title: "The Giorgi Lortki | Premium Digital Product Studio",
    description: HOME_DESCRIPTION,
    h1: "We design. We engineer. We deliver.",
    jsonLd: { "@context": "https://schema.org", ...business() },
    links: CATEGORIES.filter((category) => category.slug !== "additional").map((category) => ({
      href: `/services/${category.slug}`,
      label: category.title,
    })),
  }),
  page({
    path: "/services",
    title: "Services & Solutions | The Giorgi Lortki",
    description: "Digital product design and engineering, from a premium website to enterprise platforms. Indicative ranges from $1,000 to $400,000+. Every project is a custom quote.",
    h1: "Services and solutions",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Services and solutions",
      url: absolute("/services"),
      isPartOf: { "@type": "WebSite", name: "The Giorgi Lortki", url: `${SITE}/` },
      about: business(),
    },
    links: CATEGORIES.map((category) => ({ href: `/services/${category.slug}`, label: category.title })),
  }),
  page({
    path: "/work",
    title: "Selected Work | The Giorgi Lortki",
    description: "Own products designed and built from zero to production — Universal Drone OS, RedFlag.ai, and SecureShare.",
    h1: "Products designed and built",
    jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", name: "Selected work", url: absolute("/work"), about: business() },
  }),
  page({
    path: "/portfolio",
    title: "Portfolio | The Giorgi Lortki",
    description: "SaaS products, interface design, and brand work designed and built end to end. Browse the project archive.",
    h1: "Portfolio",
    jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", name: "Portfolio", url: absolute("/portfolio"), about: business() },
  }),
  page({
    path: "/about",
    title: "About | The Giorgi Lortki",
    description: "A designer-developer studio in Tbilisi. Creative direction, interface design, and frontend engineering in one practice.",
    h1: "A designer who builds the work",
    jsonLd: { "@context": "https://schema.org", ...business() },
  }),
  page({
    path: "/contact",
    title: "Contact | The Giorgi Lortki",
    description: "Start a project with The Giorgi Lortki. Tell us the product, the budget range, and the timeline. Replies within one weekday.",
    h1: "Start a project",
    jsonLd: { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact", url: absolute("/contact"), about: business() },
  }),
  page({
    path: "/book",
    title: "Book a Call | The Giorgi Lortki",
    description: "Book a 30-minute intro call to discuss the product, the constraints, and whether the studio is the right fit.",
    h1: "Book a call",
    jsonLd: { "@context": "https://schema.org", "@type": "ContactPage", name: "Book a call", url: absolute("/book"), about: business() },
  }),
];

function categoryPage(category: (typeof CATEGORIES)[number]): PageSeo {
  return page({
    path: `/services/${category.slug}`,
    title: `${category.title} | The Giorgi Lortki`,
    description: clip(`${category.description} Starting ${category.starting}. Quoted to scope.`),
    h1: category.title,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: category.title,
      description: category.description,
      url: absolute(`/services/${category.slug}`),
      provider: business(),
      areaServed: "Worldwide",
    },
    links: category.services.map((service) => ({
      href: `/services/${category.slug}/${service.slug}`,
      label: service.name,
    })),
  });
}

function detailPage(category: (typeof CATEGORIES)[number], service: (typeof category.services)[number]): PageSeo {
  return page({
    path: `/services/${category.slug}/${service.slug}`,
    title: `${service.name} | The Giorgi Lortki`,
    description: clip(service.priced ? `${service.summary} Indicative range ${service.range}. Final investment is quoted to scope.` : `${service.summary} Quoted to the scope of the work.`),
    h1: service.name,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      description: service.description,
      url: absolute(`/services/${category.slug}/${service.slug}`),
      provider: business(),
      areaServed: "Worldwide",
      category: category.title,
    },
    links: [{ href: `/services/${category.slug}`, label: category.title }, { href: "/contact", label: "Request a proposal" }],
  });
}

export function allIndexablePages(): PageSeo[] {
  return [
    ...STATIC,
    ...CATEGORIES.flatMap((category) => [categoryPage(category), ...category.services.map((service) => detailPage(category, service))]),
  ];
}

export function pageByPath(path: string): PageSeo | undefined {
  return allIndexablePages().find((item) => item.path === path);
}

export function categorySeo(slug: string) {
  const category = CATEGORIES.find((item) => item.slug === slug);
  return category ? categoryPage(category) : undefined;
}

export function detailSeo(categorySlug: string, serviceSlug: string) {
  const category = CATEGORIES.find((item) => item.slug === categorySlug);
  const service = category?.services.find((item) => item.slug === serviceSlug);
  return category && service ? detailPage(category, service) : undefined;
}

export function notFoundSeo(): PageSeo {
  return {
    path: "/404",
    title: "Page not found | The Giorgi Lortki",
    description: "This address is not part of The Giorgi Lortki site.",
    h1: "This page does not exist.",
    robots: "noindex, follow",
    jsonLd: { "@context": "https://schema.org", ...business() },
    links: MAIN_LINKS,
  };
}

export { absolute };
