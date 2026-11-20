import { EXTRA_CATEGORIES } from "./services-rest";

export const PRICE_DISCLAIMER =
  "All prices are indicative estimates. Final project investment depends on scope, complexity, integrations, infrastructure, and technical requirements. Enterprise solutions are quoted individually.";

export type TierLevel = "Starter" | "Professional" | "Enterprise";

export type PricingTier = {
  level: TierLevel;
  range: string;
  scope: string;
  includes: string[];
};

export type Question = {
  id: string;
  label: string;
  kind: "select" | "text" | "textarea";
  options?: string[];
  required: boolean;
  placeholder?: string;
};

export type FeatureGroup = { title: string; items: string[] };

export type ServiceItem = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  problems: string[];
  capabilities: string[];
  technical: string[];
  deliverables: string[];
  starting: string;
  range: string;
  complexity: string;
  tiers: PricingTier[];
  addons: string[];
  faqs: { q: string; a: string }[];
  questions?: Question[];
  features?: FeatureGroup[];
  priced: boolean;
};

export type Category = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  starting: string;
  questions: Question[];
  services: ServiceItem[];
};

const yesNo = ["Required", "Not required", "Not sure yet"];

const mobileQuestions: Question[] = [
  { id: "platforms", label: "Platforms", kind: "select", required: true, options: ["iOS", "Android", "iOS and Android", "Not sure yet"] },
  { id: "accounts", label: "Accounts and roles", kind: "select", required: true, options: ["Single user type", "Multiple roles", "Not sure yet"] },
  { id: "offline", label: "Offline use", kind: "select", required: true, options: yesNo },
  { id: "stores", label: "App store release", kind: "select", required: true, options: ["Yes, public stores", "Private distribution", "Not sure yet"] },
];

const softwareQuestions: Question[] = [
  { id: "audience", label: "Who uses the system", kind: "select", required: true, options: ["Internal team", "Customers", "Both", "Not sure yet"] },
  { id: "users", label: "Expected users", kind: "select", required: true, options: ["Under 50", "50–500", "500–5,000", "5,000+", "Not sure yet"] },
  { id: "integrations", label: "Systems to integrate", kind: "textarea", required: true, placeholder: "Payments, CRM, ERP, auth, or none yet" },
];

const marketplaceQuestions: Question[] = [
  { id: "buyers", label: "Buyer interface", kind: "select", required: true, options: yesNo },
  { id: "sellers", label: "Seller dashboard", kind: "select", required: true, options: yesNo },
  { id: "vendors", label: "Multi-vendor architecture", kind: "select", required: true, options: yesNo },
  { id: "payments", label: "Payment integration", kind: "select", required: true, options: yesNo },
  { id: "catalog", label: "What is being listed", kind: "text", required: true, placeholder: "Products, services, properties, or other" },
];

const aiQuestions: Question[] = [
  { id: "data", label: "Data the system should use", kind: "textarea", required: true, placeholder: "Documents, product data, tickets, or a new dataset" },
  { id: "review", label: "Human review", kind: "select", required: true, options: ["Required before action", "Optional", "Not required", "Not sure yet"] },
  { id: "tools", label: "Existing tools to connect", kind: "text", required: true, placeholder: "CRM, helpdesk, database, or none yet" },
];

const enterpriseQuestions: Question[] = [
  { id: "users", label: "Number of users", kind: "select", required: true, options: ["Under 100", "100–1,000", "1,000–10,000", "10,000+", "Not sure yet"] },
  { id: "infrastructure", label: "Existing infrastructure", kind: "textarea", required: true, placeholder: "Cloud, on-prem, current stack, or greenfield" },
  { id: "integrations", label: "Integrations", kind: "textarea", required: true, placeholder: "Identity, payments, data warehouses, internal APIs" },
  { id: "security", label: "Security requirements", kind: "textarea", required: true, placeholder: "SSO, audit logs, data residency, compliance constraints" },
  { id: "scale", label: "Scalability", kind: "textarea", required: true, placeholder: "Tenants, regions, peak load, or availability needs" },
];

const taxiQuestions: Question[] = [
  { id: "passenger", label: "Passenger application", kind: "select", required: true, options: yesNo },
  { id: "driver", label: "Driver application", kind: "select", required: true, options: yesNo },
  { id: "admin", label: "Admin dashboard", kind: "select", required: true, options: yesNo },
  { id: "gps", label: "GPS tracking", kind: "select", required: true, options: yesNo },
  { id: "payments", label: "Payment systems", kind: "select", required: true, options: yesNo },
  { id: "countries", label: "Target countries", kind: "text", required: true, placeholder: "Where the service needs to operate" },
];

const rideQuestions: Question[] = [
  ...taxiQuestions,
  { id: "matching", label: "Ride matching and dispatch", kind: "select", required: true, options: yesNo },
  { id: "pricingModel", label: "Pricing model", kind: "select", required: true, options: ["Fixed fares", "Dynamic pricing", "Both", "Not sure yet"] },
];

const deliveryQuestions: Question[] = [
  { id: "customer", label: "Customer application", kind: "select", required: true, options: yesNo },
  { id: "provider", label: "Restaurant or merchant application", kind: "select", required: true, options: yesNo },
  { id: "courier", label: "Courier application", kind: "select", required: true, options: yesNo },
  { id: "admin", label: "Admin dashboard", kind: "select", required: true, options: yesNo },
  { id: "tracking", label: "Live order tracking", kind: "select", required: true, options: yesNo },
  { id: "payments", label: "Payment systems", kind: "select", required: true, options: yesNo },
  { id: "cities", label: "Target cities or countries", kind: "text", required: true, placeholder: "Where the service launches" },
];

function tier(level: TierLevel, range: string, scope: string, includes: string[]): PricingTier {
  return { level, range, scope, includes };
}

type Seed = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  problems: string[];
  capabilities: string[];
  technical: string[];
  deliverables: string[];
  starting: string;
  range: string;
  complexity: string;
  tiers: PricingTier[];
  addons: string[];
  questions?: Question[];
  features?: FeatureGroup[];
  priced?: boolean;
};

function service(seed: Seed): ServiceItem {
  return {
    ...seed,
    priced: seed.priced !== false,
    faqs: [
      {
        q: `What does the starting range for ${seed.name} cover?`,
        a: `${seed.tiers[0].scope} Included at that level: ${seed.tiers[0].includes.join(" ")}`,
      },
      {
        q: "Is this a fixed package?",
        a: "No. The figures are indicative estimates for a custom quote. Final investment depends on scope, complexity, integrations, infrastructure, and technical requirements.",
      },
    ],
  };
}

const quoteTiers = [
  tier("Starter", "Quoted to scope", "A focused advisory or improvement engagement with a written scope.", [
    "A defined question or surface to improve.",
    "Findings or a working change for that scope.",
    "A written handover of what was decided.",
  ]),
  tier("Professional", "Quoted to scope", "A broader engagement across more than one surface or system.", [
    "More than one product area in the same engagement.",
    "Recommendations tied to the current product.",
    "Implementation support where the scope includes it.",
  ]),
  tier("Enterprise", "Quoted individually", "Ongoing or large-scale work, quoted after discovery.", [
    "A dedicated discovery before a proposal.",
    "Work across several teams or systems.",
    "A custom proposal rather than a published range.",
  ]),
];

export const PROCESS = [
  { step: "01", title: "Discovery", body: "Business requirements, objectives, and market understanding." },
  { step: "02", title: "Strategy & Architecture", body: "Product planning, technical architecture, and feature definition." },
  { step: "03", title: "UI/UX Design", body: "Research, user flows, wireframes, visual design, and prototyping." },
  { step: "04", title: "Engineering", body: "Frontend, backend, database, APIs, and integrations." },
  { step: "05", title: "Testing & Quality Assurance", body: "Functional testing, security considerations, and performance testing." },
  { step: "06", title: "Deployment & Launch", body: "Infrastructure, production deployment, and handover." },
  { step: "07", title: "Ongoing Development", body: "Maintenance, improvements, scaling, and additional features." },
];

export const STACK = [
  { name: "Interface", items: "React, TypeScript, Next.js, Tailwind CSS" },
  { name: "Product design", items: "User flows, interface systems, prototypes" },
  { name: "Application logic", items: "Node.js, Python, FastAPI" },
  { name: "Data", items: "PostgreSQL and structured APIs" },
  { name: "Integrations", items: "Payments, auth, maps, messaging, third-party APIs" },
  { name: "Delivery", items: "Cloud hosting, production handover, monitoring hooks" },
];

export const WHY = [
  { title: "Design and engineering in one practice", body: "The studio defines the product, designs the interface, and builds the software. The same standard runs through all three." },
  { title: "Scope before a price", body: "Published ranges are starting points. A proposal follows a written scope, not a fixed package." },
  { title: "From a site to a platform", body: "The same studio can take a focused website or a large multi-tenant system, and says which one a brief actually is." },
  { title: "Clear commercial language", body: "You can see the service, the complexity, what a level includes, and how to request a custom quote." },
];

export const SERVICES_FAQ = [
  { q: "Are the prices fixed?", a: PRICE_DISCLAIMER },
  { q: "Can a project start as a website and grow into a product?", a: "Yes. A marketing site, a portal, and a full platform are scoped as different products. We can start with the first release and plan the next one separately." },
  { q: "Do you only design, or do you also engineer?", a: "Both. UI/UX can be commissioned on its own. Most engagements include design and engineering for the agreed scope." },
  { q: "What is included before a contract?", a: "A conversation about the product, the users, and the constraints, followed by a written scope and a custom quote. Discovery for large systems is part of the proposal, not an informal promise." },
  { q: "How are enterprise projects quoted?", a: "Enterprise work needs technical discovery, architecture planning, and a custom proposal. The published bands show the level of investment, not a package you can buy off the page." },
  { q: "Can additional services be hired on their own?", a: "Yes. Strategy, audits, redesign, integrations, performance, security, maintenance, and support can stand alone or sit inside a larger build." },
];

const webTiers = {
  landing: [
    tier("Starter", "$1,000–$2,000", "A single page for one offer, ready to publish.", ["One responsive page.", "A clear enquiry or conversion path.", "Basic on-page structure for search."]),
    tier("Professional", "$2,000–$3,000", "A landing page with richer sections, motion, and one integration.", ["Designed sections beyond a single screen.", "Considered motion.", "One integration such as analytics, forms, or scheduling."]),
    tier("Enterprise", "From $3,000, quoted", "Several variants, locales, or campaign systems.", ["More than one page variant.", "Shared components for a campaign set.", "A custom quote if the work leaves this band."]),
  ],
  business: [
    tier("Starter", "$2,000–$4,000", "A concise business site with the core pages.", ["A small set of marketing pages.", "Responsive layout.", "Contact or enquiry path."]),
    tier("Professional", "$4,000–$7,000", "A fuller site with custom sections and light functionality.", ["Custom page design.", "A content structure your team can extend.", "One or two functional additions such as search, booking enquiry, or a journal."]),
    tier("Enterprise", "Quoted above $7,000", "A business site that behaves more like a product.", ["Multiple audiences or regions.", "Deeper integrations.", "Scoped individually once the functionality is clear."]),
  ],
  corporate: [
    tier("Starter", "$4,000–$7,000", "A corporate presence with a structured information architecture.", ["Primary company pages.", "A consistent visual system.", "Responsive build and a contact path."]),
    tier("Professional", "$7,000–$12,000", "A broader corporate site with richer content types.", ["Additional sections such as careers, news, or locations.", "CMS-ready structure.", "Performance and SEO foundations."]),
    tier("Enterprise", "From $12,000, quoted", "Multi-brand, multi-region, or integration-heavy corporate sites.", ["Shared systems across properties.", "Integrations with existing company tools.", "A custom proposal."]),
  ],
  commerce: [
    tier("Starter", "$4,000–$8,000", "A focused store for a defined catalog.", ["Product listing and product pages.", "Cart and checkout through a payment provider.", "Responsive storefront."]),
    tier("Professional", "$8,000–$15,000", "A store with merchandising, accounts, and operational basics.", ["Collections and search.", "Customer accounts.", "Order notifications and an admin path."]),
    tier("Enterprise", "$15,000+", "Complex catalogs, multi-region commerce, or heavy integrations.", ["Custom commerce rules.", "ERP, inventory, or tax integrations.", "Quoted from the operational requirements."]),
  ],
  interactive: [
    tier("Starter", "$5,000–$9,000", "A custom site with a distinct interactive idea.", ["Original interface design.", "Interactive sections scoped in advance.", "Responsive engineering."]),
    tier("Professional", "$9,000–$20,000", "A richer experience with motion, 3D, or advanced interaction.", ["Story-led or product-led interaction.", "Performance budget for the effects.", "A documented way to edit the content."]),
    tier("Enterprise", "$20,000+", "Installations, campaigns, or product experiences beyond a single site.", ["Multiple scenes or environments.", "Custom engineering.", "Quoted after the concept is defined."]),
  ],
};

export const CATEGORIES: Category[] = [
  {
    slug: "websites",
    number: "01",
    title: "Websites & Digital Experiences",
    summary: "Landing pages, corporate sites, stores, and interactive web experiences.",
    description: "Sites designed and engineered as products: clear structure, a precise interface, and only the functionality the business actually needs.",
    starting: "From $1,000",
    questions: [],
    services: [
      service({ slug: "landing-page", name: "Landing Page Development", summary: "A single, precise page for one offer.", description: "A landing page built around one decision: enquire, book, or buy. The page is designed for that action, then engineered to stay fast on mobile.", problems: ["An offer is spread across a generic template.", "The page loads slowly and the action is unclear.", "Campaigns need a page that can be launched without rebuilding the whole site."], capabilities: ["Offer structure and page narrative", "Responsive layout", "Enquiry, booking, or purchase path", "On-page SEO foundations"], technical: ["Semantic HTML", "Responsive CSS", "Form or checkout handoff", "Analytics hookup when required"], deliverables: ["Designed page", "Production build", "Mobile and desktop states", "Handover notes"], starting: "$1,000", range: "$1,000–$3,000", complexity: "Focused", tiers: webTiers.landing, addons: ["Extra language", "Booking embed", "A/B-ready section variants"] }),
      service({ slug: "corporate-website", name: "Corporate Website Development", summary: "A structured company site for several audiences.", description: "A corporate website that organizes the company, its proof, and its next step without looking like a brochure template.", problems: ["Investors, clients, and candidates land in the same undifferentiated page.", "Content is hard to update.", "The site no longer matches the company."], capabilities: ["Information architecture", "Section design for each audience", "Content model", "Performance and SEO foundations"], technical: ["Component-based frontend", "CMS-ready content structure", "Metadata and sharing cards", "Accessible navigation"], deliverables: ["Sitemap and page designs", "Built site", "Editable content structure", "Launch checklist"], starting: "$4,000", range: "$4,000–$12,000", complexity: "Advanced", tiers: webTiers.corporate, addons: ["Careers integration", "Localization", "Newsroom"] }),
      service({ slug: "business-website", name: "Business Website Development", summary: "A company site with the pages a working business needs.", description: "A business website with a clear service story, proof, and a way to start a conversation. Built custom, not assembled from a theme.", problems: ["The current site does not explain the offer.", "Leads arrive with the wrong expectations.", "The business has outgrown a template."], capabilities: ["Service and company pages", "Enquiry path", "Responsive build", "Search-ready structure"], technical: ["Custom frontend", "Form delivery", "Fast initial load", "Indexable pages"], deliverables: ["Page designs", "Production site", "Enquiry flow", "Handover"], starting: "$2,000", range: "$2,000–$7,000", complexity: "Focused to advanced", tiers: webTiers.business, addons: ["Journal or resources", "Booking enquiry", "Multi-location pages"] }),
      service({ slug: "premium-brand-website", name: "Premium Brand Websites", summary: "A brand site where the interface is part of the identity.", description: "For brands that need the site itself to carry the identity: typography, motion, and art direction, engineered so it still feels exact.", problems: ["The brand exists in a deck but not online.", "A template fights the identity.", "The site looks expensive in stills and cheap in use."], capabilities: ["Art direction for the web", "Custom interface", "Motion with restraint", "Content structure for campaigns"], technical: ["Custom layout system", "Considered motion", "Optimized media", "Accessible type and contrast"], deliverables: ["Visual direction", "Designed and built site", "Motion specification", "Content guidance"], starting: "$4,000", range: "$4,000–$12,000", complexity: "Advanced", tiers: webTiers.corporate, addons: ["Campaign landing pages", "Lookbook", "Editorial templates"] }),
      service({ slug: "ecommerce", name: "E-commerce Websites", summary: "A store designed around the product, not a theme.", description: "Storefront, catalog, and checkout engineered for the way the product is actually sold.", problems: ["The theme decides the merchandising.", "Checkout is generic and slow.", "Operations sit outside the store."], capabilities: ["Catalog and product pages", "Cart and checkout", "Merchandising structure", "Order path"], technical: ["Storefront frontend", "Payment provider integration", "Product data model", "Transactional email hookup"], deliverables: ["Store design", "Working catalog and checkout", "Admin path for products and orders", "Launch checklist"], starting: "$4,000", range: "$4,000–$15,000+", complexity: "Advanced", tiers: webTiers.commerce, addons: ["Subscriptions", "Multi-currency", "Inventory sync"] }),
      service({ slug: "booking-reservation", name: "Booking & Reservation Websites", summary: "A site that takes a reservation, not only a message.", description: "Websites for businesses that sell time: appointments, tables, rooms, or sessions, with the booking rules made explicit.", problems: ["Requests arrive by email and get lost.", "Availability is unclear.", "The public site and the booking tool feel like two products."], capabilities: ["Service presentation", "Availability and request or booking flow", "Confirmation path", "Staff view of incoming bookings"], technical: ["Booking state model", "Calendar or slot logic", "Notifications", "Payment if a deposit is required"], deliverables: ["Marketing pages", "Booking flow", "Confirmation messages", "A way for staff to see bookings"], starting: "$4,000", range: "$4,000–$12,000", complexity: "Advanced", tiers: webTiers.corporate, addons: ["Deposits", "Staff calendars", "Reminders"] }),
      service({ slug: "real-estate-website", name: "Real Estate Websites", summary: "Listings, search, and enquiry for a property business.", description: "A property site with listings that can be filtered, read, and enquired on, designed for the way people actually search.", problems: ["Listings are PDFs or social posts.", "Search does not match how buyers decide.", "Enquiries have no owner."], capabilities: ["Listing pages", "Search and filters", "Enquiry on a property", "Agent or agency presence"], technical: ["Listing data model", "Filterable index", "Map display when coordinates exist", "Enquiry routing"], deliverables: ["Listing and search UI", "Property pages", "Enquiry flow", "A way to add and retire listings"], starting: "$4,000", range: "$4,000–$15,000", complexity: "Advanced", tiers: webTiers.commerce, addons: ["Saved searches", "CRM handoff", "Multi-office structure"] }),
      service({ slug: "hospitality-website", name: "Restaurant & Hospitality Websites", summary: "Menus, reservations, and the feel of the room.", description: "A hospitality site that carries the place: the offer, the menu or rooms, and a reservation path that matches service.", problems: ["The site looks nothing like the room.", "Menus are images that cannot be updated.", "Reservations depend on a third tool that feels bolted on."], capabilities: ["Story and visit information", "Menu or room presentation", "Reservation or enquiry", "Location and hours"], technical: ["Editable menu or room content", "Reservation handoff or built-in request", "Fast image delivery", "Mobile-first layout"], deliverables: ["Designed site", "Menu or inventory content model", "Reservation path", "Launch support"], starting: "$2,000", range: "$2,000–$7,000", complexity: "Focused to advanced", tiers: webTiers.business, addons: ["Online ordering", "Events calendar", "Multi-venue pages"] }),
      service({ slug: "portfolio-website", name: "Portfolio Websites", summary: "A portfolio structured as a practice, not a gallery dump.", description: "A site for a studio, practice, or individual body of work, with case structure and a clear way to commission.", problems: ["Work is a grid of images with no context.", "The practice is hard to hire.", "Projects cannot be added without a developer."], capabilities: ["Project structure", "Practice pages", "Commission path", "Selected-work editing"], technical: ["Case-study content model", "Image treatment", "Fast galleries", "Accessible project navigation"], deliverables: ["Site design", "Project templates", "Built site", "Editing notes"], starting: "$1,000", range: "$1,000–$5,000", complexity: "Focused", tiers: webTiers.landing, addons: ["Passworded projects", "Journal", "Index filters"] }),
      service({ slug: "interactive-website", name: "Custom Interactive Websites", summary: "A site with interaction that belongs to the subject.", description: "Interactive websites where the behavior is designed for the content, then engineered so it remains usable.", problems: ["A standard page cannot explain the product.", "Interaction is decoration.", "The idea works in a prototype and fails on a phone."], capabilities: ["Interaction concept", "Interface design", "Responsive behavior", "Content structure"], technical: ["Custom frontend", "Input and motion engineering", "Performance limits agreed up front", "Fallback states"], deliverables: ["Interaction model", "Designed and built site", "Reduced-motion behavior", "Handover"], starting: "$5,000", range: "$5,000–$20,000+", complexity: "Advanced", tiers: webTiers.interactive, addons: ["CMS for scenes", "Localization", "Campaign variants"] }),
      service({ slug: "webgl-website", name: "Advanced 3D / WebGL Websites", summary: "3D in the browser, used only where it earns its place.", description: "WebGL and 3D scenes for products, spaces, or stories that need a spatial interface, with a performance budget.", problems: ["The product is physical and the site is flat.", "A 3D file exists but there is no web experience.", "Heavy scenes make the page unusable."], capabilities: ["Scene direction", "Product or space presentation", "Interaction with the model", "A non-3D fallback"], technical: ["WebGL scene", "Asset optimization", "Responsive camera and input", "Loading strategy"], deliverables: ["Scene and interface", "Optimized assets", "Production page", "Performance notes"], starting: "$5,000", range: "$5,000–$20,000+", complexity: "Complex", tiers: webTiers.interactive, addons: ["Configurators", "AR handoff", "Additional products"] }),
      service({ slug: "web-animations", name: "Web Animations & Creative Experiences", summary: "Motion and creative development for pages that need to move.", description: "Animation and creative development for launches, campaigns, and product stories. Motion is specified, then built.", problems: ["The launch needs a sequence, not a template.", "Motion is added late and fights the layout.", "There is no reduced-motion path."], capabilities: ["Motion direction", "Sequence design", "Interface animation", "Campaign pages"], technical: ["Timeline-based motion", "Scroll or input-linked scenes", "Reduced-motion alternatives", "Asset budgets"], deliverables: ["Motion specification", "Built sequences", "Page integration", "Notes for later edits"], starting: "$3,000", range: "$3,000–$12,000", complexity: "Advanced", tiers: webTiers.business, addons: ["Additional scenes", "Video integration", "Localization of sequences"] }),
    ],
  },
  {
    slug: "mobile",
    number: "02",
    title: "Mobile Application Development",
    summary: "iOS, Android, and cross-platform products, from a first release to a platform.",
    description: "Mobile products designed around a real job-to-be-done, then engineered for the platforms the audience actually uses.",
    starting: "From $5,000",
    questions: mobileQuestions,
    services: [
      service({ slug: "ios", name: "iOS Applications", summary: "Native-feeling iPhone and iPad products.", description: "iOS applications for a defined user and a defined first release, with the App Store path included when the scope says so.", problems: ["The product only exists on the web.", "An iOS build was started and stalled.", "The interface ignores how iOS actually behaves."], capabilities: ["iOS interface", "Account and core flows", "Device capabilities the scope requires", "Release preparation"], technical: ["iOS client", "API integration", "Push notifications when required", "Test build distribution"], deliverables: ["Product flows", "iOS build", "API contract", "Release notes"], starting: "$5,000", range: "$5,000–$100,000+", complexity: "Scales with the product", tiers: [tier("Starter", "$5,000–$15,000", "A simple application with one primary job.", ["Core screens for that job.", "Basic accounts if needed.", "A testable iOS build."]), tier("Professional", "$10,000–$30,000", "A business application with roles, notifications, and integrations.", ["Multiple flows.", "One or more integrations.", "A release candidate."]), tier("Enterprise", "$20,000–$100,000+", "Advanced or platform-scale iOS products.", ["Complex domain logic.", "Operational tooling around the app.", "Quoted from the architecture."])], addons: ["iPad layout", "Offline mode", "App Store submission support"] }),
      service({ slug: "android", name: "Android Applications", summary: "Android products for the devices your users carry.", description: "Android applications engineered for a realistic device range, not a single flagship screenshot.", problems: ["Users are on Android and the product is not.", "The app breaks on common screen sizes.", "Distribution is unclear."], capabilities: ["Android interface", "Core product flows", "Device-appropriate layout", "Distribution plan"], technical: ["Android client", "API integration", "Notification support when required", "Build variants for test and production"], deliverables: ["Flows and UI", "Android build", "API integration", "Handover"], starting: "$5,000", range: "$5,000–$100,000+", complexity: "Scales with the product", tiers: [tier("Starter", "$5,000–$15,000", "A simple Android application.", ["Primary user flow.", "Responsive layouts for common phones.", "A testable build."]), tier("Professional", "$10,000–$30,000", "A business application with accounts and integrations.", ["Role-based flows.", "Backend integration.", "Release candidate."]), tier("Enterprise", "$20,000–$100,000+", "Advanced Android products or one half of a larger platform.", ["Deeper device features.", "Operational scale.", "Custom quote."])], addons: ["Tablet layouts", "Offline sync", "Store listing support"] }),
      service({ slug: "cross-platform", name: "Cross-Platform Applications", summary: "One product, released on iOS and Android.", description: "Cross-platform applications when sharing one codebase is the right tradeoff, with platform differences designed rather than ignored.", problems: ["Two native apps would miss the budget.", "A wrapped website feels wrong on both platforms.", "iOS and Android have drifted apart."], capabilities: ["Shared product design", "iOS and Android release", "Platform-specific details where they matter", "One API"], technical: ["Cross-platform client", "Shared design system", "Native modules only where required", "Unified release process"], deliverables: ["Shared UI", "Both platform builds", "API integration", "Release notes"], starting: "$5,000", range: "$5,000–$100,000+", complexity: "Scales with the product", tiers: [tier("Starter", "$5,000–$15,000", "A simple product on both platforms.", ["One primary flow.", "Shared interface.", "Test builds for iOS and Android."]), tier("Professional", "$10,000–$60,000", "A business or advanced application on both stores.", ["Accounts, roles, and notifications.", "Integrations.", "Store-ready builds."]), tier("Enterprise", "$50,000–$100,000+", "A complex cross-platform product.", ["Multiple apps or roles.", "Heavier offline or device needs.", "Quoted as a platform."])], addons: ["Tablet support", "Offline", "Extra native modules"] }),
      service({ slug: "business-app", name: "Business Applications", summary: "Mobile tools for a company and its customers.", description: "Business applications for field teams, clients, or both, with the workflows written down before the interface.", problems: ["Work still happens in chat and spreadsheets.", "Staff need the system away from a desk.", "A generic app does not match the operation."], capabilities: ["Role-based mobile workflows", "Status and task visibility", "Capture of field data", "Connection to the system of record"], technical: ["Authenticated mobile client", "Role permissions", "API to the business system", "Audit-friendly records"], deliverables: ["Workflow specification", "Mobile application", "Admin or back-office path if in scope", "Handover"], starting: "$10,000", range: "$10,000–$60,000", complexity: "Advanced", tiers: [tier("Starter", "$10,000–$20,000", "One team workflow on mobile.", ["A single role.", "The core task flow.", "A testable build."]), tier("Professional", "$20,000–$40,000", "Several roles and one integration.", ["More than one role.", "Notifications.", "A connected back office."]), tier("Enterprise", "$40,000–$100,000+", "A business platform with mobile at the edge.", ["Many workflows.", "Deeper integrations.", "Quoted individually."])], addons: ["Offline capture", "Barcode or camera capture", "SSO"] }),
      service({ slug: "social-app", name: "Social Networking Applications", summary: "Profiles, relationships, and a feed with a reason to exist.", description: "Social products with a specific community, not a clone of a network. The first release is the smallest loop that is worth opening.", problems: ["The community lives in a group chat.", "A feed was built before the reason to post.", "Trust and moderation were left for later."], capabilities: ["Profiles and relationships", "A defined content loop", "Notifications", "Moderation basics"], technical: ["Identity", "Content and graph data", "Media upload", "Report and block paths"], deliverables: ["Core social loop", "Mobile client", "Moderation basics", "API"], starting: "$10,000", range: "$10,000–$100,000+", complexity: "Advanced to complex", tiers: [tier("Starter", "$10,000–$30,000", "A closed community with one content type.", ["Profiles.", "Posting and reading.", "Basic reporting."]), tier("Professional", "$30,000–$60,000", "A richer network with media and notifications.", ["Follow or membership model.", "Media.", "Push notifications."]), tier("Enterprise", "$60,000–$100,000+", "A scaled social product.", ["Moderation tooling.", "Growth and abuse controls.", "Custom architecture quote."])], addons: ["Direct messages", "Live updates", "Creator tools"] }),
      service({ slug: "delivery-app", name: "Delivery Applications", summary: "Ordering and delivery across customer, merchant, and courier.", description: "Delivery applications for a defined city and a defined catalog, with tracking only if the operation can support it.", problems: ["Orders are taken on the phone.", "Couriers and merchants do not share a status.", "Customers cannot see where an order is."], capabilities: ["Customer ordering", "Merchant acceptance", "Courier assignment", "Status updates"], technical: ["Multi-role clients", "Order state machine", "Location when in scope", "Payments"], deliverables: ["Role-specific apps or views", "Order lifecycle", "Admin view", "Payment path if in scope"], starting: "$20,000", range: "$20,000–$100,000+", complexity: "Complex", questions: deliveryQuestions, tiers: [tier("Starter", "$20,000–$40,000", "Ordering for one merchant side and one courier side.", ["Customer order flow.", "Acceptance and status.", "A basic admin list."]), tier("Professional", "$40,000–$70,000", "Multi-party delivery with payments and tracking.", ["Merchant and courier views.", "Payments.", "Live status."]), tier("Enterprise", "$70,000–$100,000+", "A delivery network with dispatch rules.", ["Dispatch logic.", "Multiple zones.", "Quoted from operations."])], addons: ["Ratings", "Promotions", "Fleet analytics"] }),
      service({ slug: "booking-app", name: "Booking Applications", summary: "Mobile booking for time, places, or people.", description: "A booking product for customers and the people who fulfill the booking, with rules for availability written into the scope.", problems: ["Bookings collide.", "Customers cannot reschedule.", "Staff keep a parallel calendar."], capabilities: ["Search and book", "Availability rules", "Customer and provider views", "Reminders"], technical: ["Slot or inventory model", "Notifications", "Payment or hold if required", "Calendar integrity"], deliverables: ["Booking flows", "Provider tools", "Confirmation path", "Admin oversight"], starting: "$10,000", range: "$10,000–$60,000", complexity: "Advanced", tiers: [tier("Starter", "$10,000–$20,000", "A single-location booking flow.", ["Browse and book.", "Confirmations.", "A staff list of bookings."]), tier("Professional", "$20,000–$40,000", "Multiple resources, payments, and reminders.", ["Resource rules.", "Deposits or full payment.", "Reminders."]), tier("Enterprise", "$40,000–$100,000+", "A booking platform for many providers.", ["Provider onboarding.", "Payouts.", "Custom quote."])], addons: ["Waitlists", "Memberships", "Map discovery"] }),
      service({ slug: "fitness-healthcare-app", name: "Fitness & Healthcare Applications", summary: "Programs, records, and follow-through for health and fitness products.", description: "Fitness and healthcare applications for programs, clinics, or coaching. Sensitive data is treated as a requirement, not a later patch.", problems: ["Programs live in PDFs.", "Patients or members cannot see the plan.", "Staff have no record of what happened."], capabilities: ["Plans or programs", "Progress tracking", "Practitioner or coach view", "Consent-aware accounts"], technical: ["Private account data", "Role separation", "Media or record upload", "Reminder hooks"], deliverables: ["Member and staff flows", "Data model for the program", "Application build", "Access notes"], starting: "$10,000", range: "$10,000–$80,000", complexity: "Advanced", tiers: [tier("Starter", "$10,000–$25,000", "A program or coaching app for one organization.", ["Member plan.", "Check-ins.", "A coach view."]), tier("Professional", "$25,000–$50,000", "Scheduling, records, and more than one role.", ["Appointments.", "Structured records.", "Notifications."]), tier("Enterprise", "$50,000–$100,000+", "A multi-clinic or regulated product, quoted with its constraints.", ["Organization hierarchy.", "Stricter access control.", "Discovery before a fixed range."])], addons: ["Wearable input", "Telehealth session link", "Billing"] }),
      service({ slug: "fintech-app", name: "Fintech Applications", summary: "Accounts, money movement, and the controls around them.", description: "Fintech products where balances, transfers, and permissions are specified before screens. Licensing and custody stay with the regulated partners you choose.", problems: ["Money movement is described vaguely.", "Users cannot see status.", "Controls are missing from the first design."], capabilities: ["Account overview", "A defined money action", "Status and history", "Admin controls"], technical: ["Ledger-aware data model", "Partner or bank API integration", "Authentication and step-up when required", "Audit events"], deliverables: ["Product specification for the money flow", "Client application", "Integration with the chosen provider", "Operational notes"], starting: "$20,000", range: "$20,000–$100,000+", complexity: "Complex", tiers: [tier("Starter", "$20,000–$40,000", "A focused money action on top of an existing provider.", ["Balances or a single transfer type.", "History.", "Secure sign-in."]), tier("Professional", "$40,000–$70,000", "Several financial actions and an admin console.", ["More than one product flow.", "Admin review.", "Alerts."]), tier("Enterprise", "$70,000–$100,000+", "A broader financial platform.", ["Multiple products.", "Deeper controls.", "Quoted with compliance constraints."])], addons: ["Cards", "Multi-currency", "Dispute workflow"] }),
      service({ slug: "on-demand-app", name: "On-Demand Applications", summary: "Request, match, and fulfill in the same product.", description: "On-demand applications that connect a person who needs something with a person who provides it, including the status in between.", problems: ["Requests have no lifecycle.", "Providers and customers use different tools.", "Dispatch is a group chat."], capabilities: ["Request flow", "Provider acceptance", "Status tracking", "Admin oversight"], technical: ["Multi-role model", "Matching rules agreed in scope", "Notifications", "Payments if in scope"], deliverables: ["Customer and provider experiences", "Request lifecycle", "Admin view", "Integration notes"], starting: "$20,000", range: "$20,000–$100,000+", complexity: "Complex", questions: deliveryQuestions, tiers: [tier("Starter", "$20,000–$40,000", "One service type in one area.", ["Request and accept.", "Status.", "Basic admin."]), tier("Professional", "$40,000–$70,000", "Payments, tracking, and more than one provider type.", ["Payments.", "Location status.", "Provider tools."]), tier("Enterprise", "$70,000–$100,000+", "A multi-service on-demand system.", ["Several service lines.", "Dispatch rules.", "Custom quote."])], addons: ["Ratings", "Scheduled requests", "Promotions"] }),
      service({ slug: "custom-mobile-platform", name: "Custom Mobile Platforms", summary: "Several mobile applications on one platform.", description: "A mobile platform when the product is more than one app: customers, operators, and administration sharing one backend.", problems: ["Each role was going to be a separate project.", "There is no shared account or data model.", "The first release is trying to be the whole company."], capabilities: ["Role-specific applications", "Shared domain model", "Admin control", "A staged release plan"], technical: ["Multi-app architecture", "Shared API", "Permissions", "Environment separation"], deliverables: ["Architecture outline", "The applications in scope", "Admin tools in scope", "Handover"], starting: "$50,000", range: "$50,000–$100,000+", complexity: "Large-scale", questions: enterpriseQuestions, tiers: [tier("Starter", "$50,000–$70,000", "Two roles and the shared backend for a first release.", ["Two clients.", "Core domain.", "Admin basics."]), tier("Professional", "$70,000–$100,000", "A broader first platform.", ["Additional flows.", "Integrations.", "Operational dashboard."]), tier("Enterprise", "$100,000+", "A platform that needs its own discovery.", ["Architecture plan.", "Phased delivery.", "Individual proposal."])], addons: ["Extra role app", "Offline", "Analytics"] }),
    ],
  },
  {
    slug: "software",
    number: "03",
    title: "Custom Software & Web Applications",
    summary: "Internal systems, portals, CRMs, and SaaS products.",
    description: "Software designed around an operation or a customer workflow, then engineered as a system your team can run.",
    starting: "From $5,000",
    questions: softwareQuestions,
    services: [
      service({ slug: "custom-web-app", name: "Custom Web Applications", summary: "A web application for a job no off-the-shelf tool fits.", description: "Custom web applications when the workflow is specific enough that a template would become the bottleneck.", problems: ["Teams live in spreadsheets.", "A SaaS tool almost fits and fails on the exception.", "The process cannot be explained to a new hire."], capabilities: ["Workflow design", "Role-based interface", "Records and status", "The integrations the scope names"], technical: ["Authenticated web app", "Relational data model", "API", "Permission checks"], deliverables: ["Workflow specification", "Working application", "Admin access", "Handover"], starting: "$5,000", range: "$5,000–$50,000", complexity: "Focused to complex", tiers: [tier("Starter", "$5,000–$15,000", "One workflow for one team.", ["Core screens.", "Accounts.", "The primary record type."]), tier("Professional", "$15,000–$35,000", "Several workflows and an integration.", ["More roles.", "One external system.", "Reporting basics."]), tier("Enterprise", "$35,000–$50,000+", "A productized web application.", ["Richer permissions.", "Heavier integrations.", "Quoted if it becomes a platform."])], addons: ["Audit log", "File handling", "SSO"] }),
      service({ slug: "business-management", name: "Business Management Systems", summary: "One system for the work the company repeats.", description: "Business management software for the operations that currently sit across tools: jobs, clients, and status.", problems: ["No one can see the state of the work.", "Data is retyped.", "Reporting is a monthly reconstruction."], capabilities: ["Operational records", "Status pipelines", "Staff permissions", "Operational views"], technical: ["Multi-user web system", "Structured data", "Exports", "Role permissions"], deliverables: ["Process map", "Management system", "Staff accounts", "Operating notes"], starting: "$5,000", range: "$5,000–$25,000", complexity: "Advanced", tiers: [tier("Starter", "$5,000–$12,000", "One department's core records.", ["A primary pipeline.", "Staff login.", "Status history."]), tier("Professional", "$12,000–$25,000", "Cross-team operations.", ["Several record types.", "Assignments.", "Basic reports."]), tier("Enterprise", "From $25,000, quoted", "Company-wide operations software.", ["Deeper modules.", "Integrations.", "Individual proposal."])], addons: ["Client portal", "Invoicing handoff", "Automations"] }),
      service({ slug: "crm", name: "CRM Platforms", summary: "Pipeline, accounts, and the next action.", description: "A CRM shaped to the actual sales motion, instead of a generic pipeline with unused fields.", problems: ["Deals live in inboxes.", "Follow-up depends on memory.", "Leadership cannot see the pipeline."], capabilities: ["Accounts and contacts", "Pipeline", "Activity history", "Ownership"], technical: ["Relational CRM model", "Permissions", "Email or calendar hook when in scope", "Exports"], deliverables: ["Pipeline design", "CRM application", "User roles", "Import path for existing contacts"], starting: "$15,000", range: "$15,000–$50,000", complexity: "Advanced", tiers: [tier("Starter", "$15,000–$25,000", "A single pipeline and account record.", ["Contacts and deals.", "Stages.", "Owners."]), tier("Professional", "$25,000–$40,000", "Multiple pipelines and an integration.", ["Teams.", "One external sync.", "Activity views."]), tier("Enterprise", "$40,000–$50,000+", "A CRM that is part of a larger stack.", ["Custom objects.", "Several integrations.", "Quoted with the stack."])], addons: ["Quoting", "Lead capture forms", "Reporting"] }),
      service({ slug: "erp", name: "ERP Systems", summary: "Operational systems that connect several departments.", description: "ERP-style systems for companies whose finance, inventory, and delivery need one model. These are discovery-led.", problems: ["Each department has its own version of the truth.", "Inventory and orders disagree.", "Close and fulfillment depend on exports."], capabilities: ["Shared master data", "The modules agreed in discovery", "Approvals", "Operational reporting"], technical: ["Modular domain model", "Permissions by function", "Import from current tools", "Audit history"], deliverables: ["Module map", "The modules in the signed scope", "Data import for the agreed entities", "Admin documentation"], starting: "$50,000", range: "$50,000–$200,000+", complexity: "Enterprise", questions: enterpriseQuestions, tiers: [tier("Starter", "$50,000–$80,000", "A first module set after discovery.", ["Discovery.", "One operational core.", "Basic approvals."]), tier("Professional", "$80,000–$150,000", "Several departments on one system.", ["Additional modules.", "Integrations.", "Reporting."]), tier("Enterprise", "$150,000–$200,000+", "A broad operational platform.", ["Architecture plan.", "Phased rollout.", "Custom proposal."])], addons: ["Additional modules", "EDI or partner feeds", "Multi-entity"] }),
      service({ slug: "admin-dashboard", name: "Admin Dashboards", summary: "An operational view of a system you already have.", description: "Admin dashboards for teams who need to see, filter, and act on data without asking an engineer for a query.", problems: ["Operations asks engineering for every number.", "Actions happen in a database client.", "There is no permission model."], capabilities: ["Operational views", "Filters", "The actions named in scope", "Role-limited access"], technical: ["Authenticated dashboard", "Read models", "Safe write actions", "Audit of sensitive actions"], deliverables: ["Dashboard IA", "Built views", "Action set", "Access setup"], starting: "$5,000", range: "$5,000–$25,000", complexity: "Focused to advanced", tiers: [tier("Starter", "$5,000–$10,000", "A read-mostly view of one domain.", ["Key lists and detail.", "Filters.", "Staff login."]), tier("Professional", "$10,000–$20,000", "Views plus operational actions.", ["Edits and status changes.", "Exports.", "Roles."]), tier("Enterprise", "$20,000–$25,000+", "A control center across systems.", ["Several sources.", "Sensitive actions.", "Quoted with the sources."])], addons: ["Saved views", "Alerts", "CSV import"] }),
      service({ slug: "customer-portal", name: "Customer Portals", summary: "A private place for customers to see their work.", description: "Portals where a customer can sign in, see status, and take the actions you want them to take without emailing the team.", problems: ["Status requests fill the inbox.", "Customers send files in threads.", "Each account manager has a different process."], capabilities: ["Customer sign-in", "Status and documents", "Requests or approvals", "Staff-side visibility"], technical: ["Separate customer permissions", "Secure file access", "Notification of new activity", "Link to the internal record"], deliverables: ["Customer flows", "Portal build", "Staff connection", "Access notes"], starting: "$5,000", range: "$5,000–$25,000", complexity: "Advanced", tiers: [tier("Starter", "$5,000–$12,000", "Status and documents for one customer type.", ["Login.", "A case or project view.", "File access."]), tier("Professional", "$12,000–$25,000", "Requests, approvals, and more than one relationship.", ["Actions.", "Multiple contacts per account.", "Notifications."]), tier("Enterprise", "From $25,000, quoted", "A portal across products or regions.", ["Complex entitlements.", "SSO.", "Custom quote."])], addons: ["E-sign", "Billing view", "Multi-language"] }),
      service({ slug: "internal-software", name: "Internal Business Software", summary: "Tools your own team uses every day.", description: "Internal software for a painful internal job, scoped tightly so it gets used.", problems: ["A process depends on one person.", "Errors come from retyping.", "Off-the-shelf software adds more steps than it removes."], capabilities: ["The internal workflow", "Permissions", "History", "A simple reporting view"], technical: ["Internal authentication", "Data validation", "Backups via the chosen host", "Role limits"], deliverables: ["Working internal tool", "Staff roles", "Short operating note", "Handover"], starting: "$5,000", range: "$5,000–$25,000", complexity: "Focused to advanced", tiers: [tier("Starter", "$5,000–$12,000", "One internal job, done in software.", ["The primary form and list.", "Accounts.", "History."]), tier("Professional", "$12,000–$25,000", "Several related internal jobs.", ["More record types.", "Approvals.", "Exports."]), tier("Enterprise", "From $25,000, quoted", "An internal platform.", ["Multiple departments.", "Integrations.", "Individual scope."])], addons: ["SSO", "Slack or email alerts", "Imports"] }),
      service({ slug: "workflow", name: "Workflow Management Systems", summary: "Work that moves through defined states.", description: "Workflow systems for approvals, handoffs, and SLAs that are currently tribal knowledge.", problems: ["Work stalls between teams.", "No one owns the next step.", "Exceptions have no path."], capabilities: ["States and transitions", "Assignments", "The exception paths in scope", "Visibility for leads"], technical: ["State machine", "Permissions per transition", "Notifications", "History"], deliverables: ["Workflow map", "Working system", "Role setup", "Handover"], starting: "$15,000", range: "$15,000–$50,000", complexity: "Advanced", tiers: [tier("Starter", "$15,000–$25,000", "One workflow with clear states.", ["States.", "Assignees.", "History."]), tier("Professional", "$25,000–$40,000", "Branches, deadlines, and an integration.", ["Conditional paths.", "Due states.", "One external system."]), tier("Enterprise", "$40,000–$50,000+", "Many workflows on one engine.", ["Shared engine.", "Reporting.", "Quoted if it becomes company-wide."])], addons: ["SLA clocks", "Forms builder for one extra type", "Audit export"] }),
      service({ slug: "saas", name: "SaaS Applications", summary: "A multi-customer product with accounts, billing, and a core job.", description: "SaaS products from a first sellable version through a fuller platform. Tenancy and billing are designed at the start.", problems: ["The product is a single-tenant prototype.", "Billing is manual.", "Customers can see each other's data if you are not careful."], capabilities: ["Tenant accounts", "The core product job", "Billing path", "Admin for the operator"], technical: ["Tenant isolation", "Auth", "Subscription integration when in scope", "Operator console"], deliverables: ["Product scope for the release", "Multi-tenant application", "Billing approach in the scope", "Operator notes"], starting: "$15,000", range: "$15,000–$100,000+", complexity: "Complex", tiers: [tier("Starter", "$15,000–$40,000", "A SaaS MVP with one core job.", ["Sign-up and tenants.", "The primary workflow.", "A way to charge or trial."]), tier("Professional", "$40,000–$70,000", "A fuller product with roles and integrations.", ["Team roles.", "Integrations.", "Operator tools."]), tier("Enterprise", "$70,000–$100,000+", "A full SaaS platform.", ["Advanced tenancy.", "Scale and admin depth.", "Custom proposal."])], addons: ["SSO", "Usage-based billing", "Public API"] }),
      service({ slug: "subscription-platform", name: "Subscription Platforms", summary: "Recurring access, plans, and the content or service behind them.", description: "Subscription products where plans, access, and failed payments are part of the product, not an afterthought.", problems: ["Access is granted by hand.", "Plans cannot change.", "Failed payments leave accounts in an unknown state."], capabilities: ["Plans and entitlements", "Customer account", "The subscribed experience", "Operator controls"], technical: ["Billing provider integration", "Entitlement checks", "Webhook handling", "Dunning states"], deliverables: ["Plan model", "Subscriber experience", "Billing integration", "Operator view"], starting: "$15,000", range: "$15,000–$100,000+", complexity: "Advanced to complex", tiers: [tier("Starter", "$15,000–$30,000", "One product with a small set of plans.", ["Checkout.", "Access control.", "Account page."]), tier("Professional", "$30,000–$60,000", "Trials, plan changes, and team access.", ["Plan changes.", "Seats or teams.", "Failed-payment states."]), tier("Enterprise", "$60,000–$100,000+", "A subscription platform with several products.", ["Multiple products.", "Custom entitlements.", "Quoted individually."])], addons: ["Coupons", "Invoicing", "Member community"] }),
      service({ slug: "api-integrations", name: "API Development & Integrations", summary: "APIs and the connections between systems you already run.", description: "API design and integrations when the product is the connection: a clean contract, then the implementation.", problems: ["Systems do not share data.", "An integration fails silently.", "Partners cannot build on you."], capabilities: ["API or integration design", "The connections named in scope", "Error handling", "Documentation for the contract"], technical: ["Authenticated endpoints or workers", "Idempotent writes where it matters", "Logging", "Secrets kept out of the client"], deliverables: ["Contract", "Working integration", "Failure notes", "Handover"], starting: "$5,000", range: "$5,000–$25,000", complexity: "Focused to advanced", tiers: [tier("Starter", "$5,000–$10,000", "One integration with a clear payload.", ["One system.", "Mapped fields.", "A visible failure state."]), tier("Professional", "$10,000–$18,000", "Several objects or a small public API.", ["More than one resource.", "Auth.", "Short documentation."]), tier("Enterprise", "$18,000–$25,000+", "An integration layer across many systems.", ["Several parties.", "Retries and monitoring.", "Quoted with the landscape."])], addons: ["Sandbox", "Webhooks", "Partner documentation"] }),
      service({ slug: "enterprise-software", name: "Enterprise Software", summary: "Large internal or customer systems, quoted from discovery.", description: "Enterprise software for organizations that need architecture, permissions, and a rollout plan before a build commitment.", problems: ["The current system cannot take another exception.", "Several vendors own pieces no one can change.", "A rewrite is being discussed without a map."], capabilities: ["Discovery", "Architecture options", "The application scope that follows", "Rollout considerations"], technical: ["Documented architecture", "Integration boundaries", "Access control", "Environments"], deliverables: ["Discovery output", "Proposal", "The build that the proposal defines", "Handover for that phase"], starting: "$50,000", range: "$50,000–$200,000+", complexity: "Enterprise", questions: enterpriseQuestions, tiers: [tier("Starter", "$50,000–$80,000", "Discovery plus a first production slice.", ["Technical discovery.", "One production slice.", "Access model."]), tier("Professional", "$80,000–$150,000", "A major system phase.", ["Broader modules.", "Integrations.", "Operational handover."]), tier("Enterprise", "$150,000–$200,000+", "A multi-phase enterprise program.", ["Program plan.", "Several releases.", "Individual proposal."])], addons: ["Data migration", "SSO", "Training sessions"] }),
    ],
  },
  ...EXTRA_CATEGORIES,
];

export const PRIMARY_CATEGORIES = CATEGORIES.filter((category) => category.slug !== "additional");

export function categoryBySlug(slug: string | undefined) {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function serviceBySlug(categorySlug: string | undefined, serviceSlug: string | undefined) {
  const category = categoryBySlug(categorySlug);
  const service = category?.services.find((item) => item.slug === serviceSlug);
  if (!category || !service) return null;
  return { category, service };
}

export function questionsFor(category: Category, service: ServiceItem) {
  return service.questions?.length ? service.questions : category.questions;
}
