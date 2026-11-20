import type { Category, PricingTier, Question, ServiceItem, TierLevel } from "./services-catalog";

const yesNo = ["Required", "Not required", "Not sure yet"];

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
  { id: "provider", label: "Merchant or restaurant application", kind: "select", required: true, options: yesNo },
  { id: "courier", label: "Courier application", kind: "select", required: true, options: yesNo },
  { id: "admin", label: "Admin dashboard", kind: "select", required: true, options: yesNo },
  { id: "tracking", label: "Live tracking", kind: "select", required: true, options: yesNo },
  { id: "payments", label: "Payment systems", kind: "select", required: true, options: yesNo },
  { id: "cities", label: "Target cities or countries", kind: "text", required: true, placeholder: "Where the service launches" },
];

function tier(level: TierLevel, range: string, scope: string, includes: string[]): PricingTier {
  return { level, range, scope, includes };
}

function service(seed: Omit<ServiceItem, "faqs" | "priced"> & { priced?: boolean }): ServiceItem {
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

const marketBands = [
  tier("Starter", "$15,000–$30,000", "A first marketplace with buyers, sellers, and a basic catalog.", ["Buyer browsing.", "Seller listings.", "An admin list of accounts and orders."]),
  tier("Professional", "$30,000–$60,000", "Payments, search, and operational tools.", ["Payments.", "Search and filters.", "Order and transaction views."]),
  tier("Enterprise", "$60,000+", "A marketplace with deeper rules, payouts, or several categories.", ["Payout rules.", "Richer vendor tools.", "Quoted from the operating model."]),
];

const aiBands = {
  integration: [
    tier("Starter", "$3,000–$6,000", "One AI capability connected to an existing product.", ["A defined task.", "A human can see the output.", "Connection to one system."]),
    tier("Professional", "$6,000–$10,000", "A more complete integration with review and history.", ["Review step.", "History of runs.", "Clear failure behavior."]),
    tier("Enterprise", "From $10,000, quoted", "Several workflows or stricter controls.", ["More than one workflow.", "Access control.", "Individual quote."]),
  ],
  app: [
    tier("Starter", "$10,000–$18,000", "An application around one intelligent task.", ["The primary flow.", "Accounts.", "A visible result."]),
    tier("Professional", "$18,000–$30,000", "Richer data, review, and one integration.", ["Review queue.", "One system connection.", "Usage visibility."]),
    tier("Enterprise", "$30,000–$80,000+", "An AI product with operational depth.", ["Multiple tasks.", "Admin controls.", "Quoted if it becomes a platform."]),
  ],
  platform: [
    tier("Starter", "$20,000–$40,000", "A first AI SaaS with one job and tenants.", ["Tenant accounts.", "One intelligent workflow.", "Operator view."]),
    tier("Professional", "$40,000–$80,000", "A broader AI product.", ["More workflows.", "Billing or teams.", "Evaluation basics."]),
    tier("Enterprise", "$50,000–$150,000+", "Advanced AI systems.", ["Heavier data pipelines.", "Stricter review and access.", "Custom proposal."]),
  ],
};

const enterpriseBands = [
  tier("Starter", "$50,000–$100,000", "Discovery and an advanced first release.", ["Technical discovery.", "A production slice.", "Access and environment plan."]),
  tier("Professional", "$100,000–$250,000", "An enterprise platform phase.", ["Broader system scope.", "Integrations.", "Operational handover."]),
  tier("Enterprise", "$250,000–$400,000+", "A large-scale system, quoted individually.", ["Architecture program.", "Several releases.", "Custom proposal after discovery."]),
];

const quoteTiers = [
  tier("Starter", "Quoted to scope", "A focused engagement with a written scope.", ["One defined question or surface.", "A concrete outcome for that scope.", "Written handover."]),
  tier("Professional", "Quoted to scope", "Work across more than one surface or system.", ["A broader area of the product.", "Recommendations tied to the current system.", "Implementation when the scope includes it."]),
  tier("Enterprise", "Quoted individually", "Ongoing or large-scale work.", ["Discovery before a proposal.", "Several systems or teams.", "A custom proposal."]),
];

export const EXTRA_CATEGORIES: Category[] = [
  {
    slug: "marketplaces",
    number: "04",
    title: "Marketplaces & On-Demand Platforms",
    summary: "Buyer and seller products, delivery networks, and ride platforms.",
    description: "Multi-sided products where each role has its own interface and the transaction has a real lifecycle.",
    starting: "From $15,000",
    questions: marketplaceQuestions,
    services: [
      service({
        slug: "multi-vendor",
        name: "Multi-Vendor Marketplaces",
        summary: "Many sellers, one catalog, one checkout.",
        description: "A marketplace where more than one vendor lists, sells, and is administered from a shared platform.",
        problems: ["Vendors sell in separate shops.", "Orders have no shared status.", "The operator cannot see the whole catalog."],
        capabilities: ["Buyer browsing", "Vendor catalog tools", "Order lifecycle", "Operator administration"],
        technical: ["Vendor tenancy", "Product and order models", "Payment integration when in scope", "Admin permissions"],
        deliverables: ["Buyer interface", "Seller dashboard", "Admin management", "The transaction flow in scope"],
        starting: "$15,000",
        range: "$15,000–$60,000+",
        complexity: "Complex",
        tiers: marketBands,
        addons: ["Payouts", "Reviews", "Promotions"],
        features: [
          { title: "Buyer interface", items: ["Browse and search", "Product pages", "Cart and checkout path"] },
          { title: "Seller dashboard", items: ["Product management", "Order handling", "A view of their own catalog"] },
          { title: "Admin management", items: ["Vendor accounts", "Catalog oversight", "Orders and transactions"] },
          { title: "Platform", items: ["Multi-vendor architecture", "Search and filtering", "Payment integration when in scope", "Analytics for the operator"] },
        ],
      }),
      service({ slug: "product-marketplace", name: "Product Marketplaces", summary: "A catalog marketplace for physical or digital goods.", description: "A product marketplace with listings, search, and an order path designed around the goods being sold.", problems: ["Listings are inconsistent.", "Buyers cannot filter to a decision.", "Sellers have no tools."], capabilities: ["Structured listings", "Search and filters", "Purchase path", "Seller tools"], technical: ["Catalog model", "Search indexes for the agreed fields", "Order records", "Media for listings"], deliverables: ["Buyer catalog", "Seller product management", "Admin oversight", "Order flow"], starting: "$15,000", range: "$15,000–$60,000+", complexity: "Complex", tiers: marketBands, addons: ["Reviews", "Shipping rules", "Returns"] }),
      service({ slug: "real-estate-marketplace", name: "Real Estate Marketplaces", summary: "Listings from many agents or owners.", description: "A property marketplace with search, listing ownership, and enquiry or transaction steps that match how the market works.", problems: ["Inventory is fragmented.", "Lead ownership is unclear.", "Search does not match buyer intent."], capabilities: ["Property search", "Lister tools", "Enquiry routing", "Operator controls"], technical: ["Listing schema", "Geo filters when coordinates exist", "Lead records", "Role separation"], deliverables: ["Search and listing pages", "Lister dashboard", "Lead flow", "Admin tools"], starting: "$15,000", range: "$15,000–$60,000+", complexity: "Complex", tiers: marketBands, addons: ["Saved searches", "Featured placement", "CRM export"] }),
      service({ slug: "service-marketplace", name: "Service Marketplaces", summary: "People book a service from many providers.", description: "A marketplace for services, with provider profiles, availability, and a booking or request path.", problems: ["Providers are listed but cannot be booked.", "Availability is a message thread.", "The operator cannot moderate supply."], capabilities: ["Provider profiles", "Request or booking", "Customer account", "Moderation"], technical: ["Provider and customer roles", "Availability model", "Notifications", "Payments when in scope"], deliverables: ["Customer flow", "Provider dashboard", "Booking records", "Admin moderation"], starting: "$15,000", range: "$15,000–$60,000+", complexity: "Complex", tiers: marketBands, addons: ["Reviews", "Payouts", "Verification"] }),
      service({ slug: "freelance-platform", name: "Freelance Platforms", summary: "Briefs, proposals, and a way to hire.", description: "A freelance platform for posting work, receiving proposals, and moving a hire into an agreed engagement.", problems: ["Hiring happens in scattered messages.", "Proposals cannot be compared.", "There is no record of the agreement."], capabilities: ["Briefs", "Proposals", "Hire state", "Profiles"], technical: ["Two-sided accounts", "Proposal model", "Messaging or comments in scope", "Payment hold if in scope"], deliverables: ["Client and freelancer flows", "Proposal handling", "Admin oversight", "Profile system"], starting: "$15,000", range: "$15,000–$60,000+", complexity: "Complex", tiers: marketBands, addons: ["Escrow", "Milestones", "Dispute path"] }),
      service({
        slug: "food-delivery",
        name: "Food Delivery Platforms",
        summary: "Customer, restaurant, and courier in one order lifecycle.",
        description: "A food delivery platform with a defined launch area and the roles required to take, prepare, and deliver an order.",
        problems: ["Orders are phoned in.", "Restaurants and couriers do not share status.", "The operator cannot see live demand."],
        capabilities: ["Customer ordering", "Restaurant acceptance", "Courier assignment", "Operator view"],
        technical: ["Order state machine", "Multi-role clients", "Payments when in scope", "Location updates when in scope"],
        deliverables: ["Customer experience", "Restaurant tools", "Courier tools if in scope", "Admin dashboard"],
        starting: "$20,000",
        range: "$20,000–$80,000",
        complexity: "Complex",
        questions: deliveryQuestions,
        tiers: [
          tier("Starter", "$20,000–$40,000", "Ordering for a small set of restaurants.", ["Menu and order.", "Restaurant acceptance.", "Admin order list."]),
          tier("Professional", "$40,000–$70,000", "Couriers, payments, and live status.", ["Courier flow.", "Payments.", "Tracking."]),
          tier("Enterprise", "$70,000+", "A multi-zone delivery operation.", ["Dispatch rules.", "Several zones.", "Quoted from operations."]),
        ],
        addons: ["Promotions", "Ratings", "Scheduled orders"],
        features: [
          { title: "Customer", items: ["Browse restaurants", "Cart and checkout", "Order status"] },
          { title: "Restaurant", items: ["Menu management", "Accept or reject", "Preparation status"] },
          { title: "Courier", items: ["Assigned orders", "Status updates", "Location when in scope"] },
          { title: "Admin", items: ["Orders", "Restaurants and couriers", "Issues and refunds in scope"] },
        ],
      }),
      service({ slug: "logistics", name: "Logistics Platforms", summary: "Shipments, carriers, and status for a logistics operation.", description: "Software for moving goods: jobs, carriers, and the status a customer or dispatcher needs to see.", problems: ["Shipments are tracked in spreadsheets.", "Customers ask for status.", "Exceptions have no owner."], capabilities: ["Shipment records", "Status lifecycle", "Dispatcher tools", "Customer tracking when in scope"], technical: ["Job model", "Role permissions", "Event history", "Carrier updates if an integration is in scope"], deliverables: ["Dispatcher interface", "Shipment lifecycle", "Customer status if in scope", "Admin controls"], starting: "$20,000", range: "$20,000–$80,000", complexity: "Complex", questions: deliveryQuestions, tiers: [tier("Starter", "$20,000–$40,000", "Jobs and status for one operation.", ["Create and assign jobs.", "Status history.", "A dispatcher list."]), tier("Professional", "$40,000–$70,000", "Customer tracking and carrier tools.", ["Tracking view.", "Carrier role.", "Exceptions."]), tier("Enterprise", "$70,000+", "A multi-node logistics system.", ["Hubs or zones.", "Integrations.", "Custom quote."])], addons: ["Proof of delivery", "Rate cards", "Label generation"] }),
      service({
        slug: "taxi-booking",
        name: "Taxi Booking Platform",
        summary: "Passenger, driver, and dispatch for a taxi operation.",
        description: "A taxi platform with the applications and the booking controls the operation actually uses. GPS, fares, and payments are included only when the scope says so.",
        problems: ["Bookings are radio and phone.", "Drivers and passengers have no shared status.", "Fares and payments are reconciled later."],
        capabilities: ["Passenger booking", "Driver job handling", "Admin control", "The location and payment features in scope"],
        technical: ["Trip state machine", "Role-specific clients", "Location updates when in scope", "Fare and payment hooks when in scope"],
        deliverables: ["Passenger application", "Driver application", "Admin dashboard", "Booking management for the agreed rules"],
        starting: "$20,000",
        range: "$20,000–$70,000+",
        complexity: "Complex",
        questions: taxiQuestions,
        tiers: [
          tier("Starter", "$20,000–$40,000", "Booking for passengers and drivers with an admin list.", ["Passenger request.", "Driver accept.", "Admin view of trips."]),
          tier("Professional", "$40,000–$70,000", "GPS, fares, payments, and driver management.", ["Live location.", "Fare calculation.", "Payments and notifications.", "Driver management."]),
          tier("Enterprise", "$70,000+", "A broader fleet operation.", ["More dispatch rules.", "Reporting.", "Quoted from the fleet."]),
        ],
        addons: ["Scheduled rides", "Corporate accounts", "Driver payouts"],
        features: [
          { title: "Passenger application", items: ["Request a ride", "See status", "Trip history"] },
          { title: "Driver application", items: ["Incoming jobs", "Trip status", "Availability"] },
          { title: "Admin dashboard", items: ["Booking management", "Driver management", "A view of active trips"] },
          { title: "Trip infrastructure", items: ["GPS tracking when in scope", "Real-time location when in scope", "Fare calculation when in scope", "Payment integration when in scope", "Notifications"] },
        ],
      }),
      service({
        slug: "ride-hailing",
        name: "Ride-Hailing Applications",
        summary: "An Uber-like platform: match, dispatch, track, and charge.",
        description: "A ride-hailing product with passenger and driver applications, matching, and an admin control center. Dynamic pricing and payments are scoped explicitly.",
        problems: ["There is demand and supply but no matching system.", "Location and price are handled outside the product.", "Operations cannot see the network."],
        capabilities: ["Passenger and driver apps", "Matching and dispatch", "Trip lifecycle", "Admin control center"],
        technical: ["Real-time location when in scope", "Matching service", "Pricing rules when in scope", "Payment infrastructure when in scope"],
        deliverables: ["Passenger iOS and Android scope as agreed", "Driver applications as agreed", "Dispatch and admin", "Backend and API for the trip lifecycle"],
        starting: "$50,000",
        range: "$50,000–$150,000+",
        complexity: "Large-scale",
        questions: rideQuestions,
        tiers: [
          tier("Starter", "$50,000–$80,000", "A first city release with matching and trip status.", ["Passenger and driver flows.", "Basic matching.", "Admin visibility."]),
          tier("Professional", "$80,000–$120,000", "Live GPS, payments, ratings, and reporting.", ["Real-time GPS.", "Payments.", "Ratings and reviews.", "Analytics."]),
          tier("Enterprise", "$120,000–$150,000+", "Dynamic pricing, deeper dispatch, and scale.", ["Dynamic pricing.", "Dispatch rules.", "A custom architecture quote."]),
        ],
        addons: ["Scheduled rides", "Multi-city", "Fleet accounts"],
        features: [
          { title: "Passenger application", items: ["iOS and Android as scoped", "Request and track", "Ratings"] },
          { title: "Driver application", items: ["iOS and Android as scoped", "Job offer and navigation status", "Earnings view when in scope"] },
          { title: "Dispatch and matching", items: ["Ride matching", "Dispatch system", "Trip state"] },
          { title: "Admin control center", items: ["Live operations", "Driver management", "Analytics and reporting"] },
          { title: "Infrastructure", items: ["Real-time GPS tracking", "Dynamic pricing when in scope", "Payment infrastructure", "Backend architecture", "API infrastructure"] },
        ],
      }),
      service({ slug: "super-app", name: "Multi-Service Super Apps", summary: "Several on-demand services in one product.", description: "A super app only makes sense after the first service works. The engagement defines which services are in the first release and which are later.", problems: ["Several apps were planned before one service was real.", "Accounts and payments would be rebuilt each time.", "There is no shared design system."], capabilities: ["Shared account", "The services named for the first release", "A home that can hold later services", "Operator tools"], technical: ["Modular service boundaries", "Shared identity and payments", "Separate fulfillment flows", "Admin per service"], deliverables: ["Architecture for the first release", "The services in that release", "Shared shell", "Admin"], starting: "$50,000", range: "$50,000–$150,000+", complexity: "Large-scale", questions: rideQuestions, tiers: [tier("Starter", "$50,000–$80,000", "One service inside a shell that can grow.", ["Shared account.", "One fulfillment flow.", "Admin for that service."]), tier("Professional", "$80,000–$120,000", "A second service on the same platform.", ["Another vertical.", "Shared payments.", "Cross-service home."]), tier("Enterprise", "$120,000–$150,000+", "A broader super-app program.", ["Several services.", "Deeper dispatch.", "Individual proposal."])], addons: ["Extra vertical", "Loyalty", "City expansion"] }),
    ],
  },
  {
    slug: "ai",
    number: "05",
    title: "AI & Intelligent Digital Solutions",
    summary: "AI products, assistants, automation, and intelligent operations tools.",
    description: "AI work with a defined task, a defined data source, and a person who can tell whether the output is acceptable.",
    starting: "From $3,000",
    questions: aiQuestions,
    services: [
      service({ slug: "ai-applications", name: "AI-Powered Applications", summary: "A product whose main job is an intelligent task.", description: "Applications where the model is in the workflow, with an interface for input, result, and correction.", problems: ["The team pastes text into a chat tool.", "Results are not saved.", "No one reviews a bad answer."], capabilities: ["A defined intelligent task", "Saved results", "A review path", "Accounts"], technical: ["Model integration", "Prompt and context boundaries", "Persistence", "Access control"], deliverables: ["Task design", "Application", "Connection to the chosen model", "Notes on limits"], starting: "$10,000", range: "$10,000–$30,000", complexity: "Advanced", tiers: aiBands.app, addons: ["Extra task", "File upload", "Usage dashboard"] }),
      service({ slug: "ai-saas", name: "AI SaaS Platforms", summary: "A multi-tenant AI product.", description: "AI SaaS with tenant separation, a core intelligent workflow, and the operator tools needed to run it.", problems: ["A prototype has one shared workspace.", "There is no way to charge.", "Customers can see each other's data."], capabilities: ["Tenants", "The core AI workflow", "Operator controls", "A commercial path"], technical: ["Tenant isolation", "Model calls with limits", "Auth", "Usage records"], deliverables: ["Multi-tenant product", "The workflow in scope", "Operator view", "Handover"], starting: "$20,000", range: "$20,000–$80,000+", complexity: "Complex", tiers: aiBands.platform, addons: ["Billing", "Team seats", "Evaluation set"] }),
      service({ slug: "ai-chatbots", name: "AI Chatbots", summary: "A chatbot with a job, a knowledge boundary, and a handoff.", description: "Chatbots that answer from an agreed source and hand off when they should not guess.", problems: ["The bot answers outside its knowledge.", "Conversations disappear.", "There is no human handoff."], capabilities: ["Bounded answers", "Conversation history", "Handoff", "A place to correct content"], technical: ["Retrieval or a fixed knowledge set", "Session storage", "Escalation path", "Content update path"], deliverables: ["Bot interface", "Knowledge connection", "Handoff", "Transcript access"], starting: "$3,000", range: "$3,000–$10,000", complexity: "Focused", tiers: aiBands.integration, addons: ["Channel extra", "Analytics", "Multilingual content"] }),
      service({ slug: "ai-support", name: "AI Customer Support Systems", summary: "Support that drafts, routes, and remembers.", description: "Support systems that help agents or customers with replies grounded in your help content and ticket history.", problems: ["Agents retype the same answer.", "Tickets land in the wrong queue.", "Customers wait on known issues."], capabilities: ["Suggested replies", "Routing rules in scope", "Agent review", "Ticket context"], technical: ["Helpdesk integration", "Retrieval over approved content", "Human approval before send when required", "Logs"], deliverables: ["Agent or customer interface", "Content connection", "Routing in scope", "Review controls"], starting: "$10,000", range: "$10,000–$30,000", complexity: "Advanced", tiers: aiBands.app, addons: ["Extra helpdesk", "Deflection widget", "QA sampling"] }),
      service({ slug: "ai-automation", name: "AI Business Automation", summary: "Repeatable work with a model in the middle and a person at the edge.", description: "Automation for a business process that is too variable for a rigid script and too frequent to stay manual.", problems: ["A person classifies the same documents daily.", "Exceptions get stuck.", "There is no record of what the system decided."], capabilities: ["A defined process", "Model-assisted step", "Exception queue", "History"], technical: ["Workflow runner", "Model step", "Human queue", "Audit of decisions"], deliverables: ["Process map", "Working automation", "Exception view", "Operating notes"], starting: "$10,000", range: "$10,000–$30,000", complexity: "Advanced", tiers: aiBands.app, addons: ["Extra document type", "Downstream integration", "Alerts"] }),
      service({ slug: "ai-agents", name: "AI Agents", summary: "An agent that can take agreed actions, not only chat.", description: "Agents with an explicit list of tools and an explicit rule for when a human must approve an action.", problems: ["A chatbot cannot do the task.", "An agent with unlimited tools is a risk.", "Actions are not logged."], capabilities: ["A bounded tool set", "Approval rules", "Action log", "A way to stop a run"], technical: ["Tool contracts", "Permission checks", "Run logs", "Human approval gate"], deliverables: ["Agent specification", "The tools in scope", "Approval interface", "Run history"], starting: "$10,000", range: "$10,000–$80,000", complexity: "Advanced to complex", tiers: [aiBands.app[0], aiBands.app[1], aiBands.platform[2]], addons: ["Extra tool", "Scheduled runs", "Evaluation cases"] }),
      service({ slug: "ai-integrations", name: "Custom AI Integrations", summary: "Add a specific AI task to software you already run.", description: "Integrations that put one intelligent step inside a CRM, helpdesk, CMS, or internal tool.", problems: ["Staff copy data into a model and back.", "The output never reaches the system of record.", "There is no control over who can run it."], capabilities: ["One integration point", "Mapped input and output", "Access limits", "A visible failure"], technical: ["API connection", "Field mapping", "Auth", "Logs"], deliverables: ["Working integration", "Field map", "Access setup", "Failure notes"], starting: "$3,000", range: "$3,000–$10,000", complexity: "Focused", tiers: aiBands.integration, addons: ["Second system", "Batch runs", "Review UI"] }),
      service({ slug: "intelligent-data", name: "Intelligent Data Processing", summary: "Turn documents or records into structured data.", description: "Pipelines that extract, classify, or summarize data, with a review step for anything that should not be automatic.", problems: ["Documents are read by hand.", "Extracted fields are inconsistent.", "Bad extractions enter the database."], capabilities: ["Ingestion", "Extraction or classification", "Review", "Export to the destination"], technical: ["Document or record intake", "Model extraction", "Validation", "Destination write"], deliverables: ["Pipeline", "Field schema", "Review queue", "Export"], starting: "$10,000", range: "$10,000–$30,000", complexity: "Advanced", tiers: aiBands.app, addons: ["Extra document type", "Human correction memory", "Scheduled import"] }),
      service({ slug: "ai-analytics", name: "AI Analytics Dashboards", summary: "Ask questions of operational data and see the answer in context.", description: "Dashboards where a person can ask a question of an agreed dataset and see both the answer and the underlying view.", problems: ["Answers require an analyst.", "Charts and questions live apart.", "People do not trust a number they cannot trace."], capabilities: ["Agreed datasets", "Question interface", "Linked charts", "Access limits"], technical: ["Read-only data connection", "Query boundaries", "Chart views", "Permissions"], deliverables: ["Connected dataset", "Question interface", "Dashboard views", "Access notes"], starting: "$10,000", range: "$10,000–$30,000", complexity: "Advanced", tiers: aiBands.app, addons: ["Extra source", "Scheduled digest", "Saved questions"] }),
      service({ slug: "ai-mvp", name: "AI Product MVPs", summary: "The smallest AI product that can be shown to a real user.", description: "An MVP that proves one intelligent job with real accounts and a path to learn from use.", problems: ["The demo only works in a notebook.", "There is no account or saved work.", "The team cannot tell if users succeed."], capabilities: ["One job", "Accounts", "Saved outputs", "A basic success signal"], technical: ["Deployed app", "Model integration", "Persistence", "Minimal analytics"], deliverables: ["MVP build", "Deployed environment", "The core flow", "A short limit list"], starting: "$10,000", range: "$10,000–$40,000", complexity: "Advanced", tiers: [aiBands.app[0], tier("Professional", "$18,000–$40,000", "An MVP with billing or a second workflow.", ["Stronger onboarding.", "A second path or billing.", "Operator view."]), aiBands.platform[2]], addons: ["Billing", "Waitlist", "Feedback capture"] }),
      service({ slug: "ai-workflows", name: "AI Workflow Systems", summary: "Multi-step work with models, people, and systems.", description: "Workflow systems where several steps may be manual, automatic, or model-assisted, and the handoff is explicit.", problems: ["A single prompt is being asked to run a whole process.", "Steps have no owner.", "Failures are invisible."], capabilities: ["Step map", "Human and model steps", "State", "Failure visibility"], technical: ["Workflow state", "Tool and model steps", "Queues", "Logs"], deliverables: ["Workflow specification", "Running system", "Operator view", "Handover"], starting: "$20,000", range: "$20,000–$80,000+", complexity: "Complex", tiers: aiBands.platform, addons: ["Extra step", "External system", "Evaluation"] }),
      service({ slug: "custom-ai-software", name: "Custom AI Software", summary: "AI software that does not fit a chatbot or a single integration.", description: "Custom AI systems for a domain-specific job, scoped from the data, the action, and the cost of a wrong answer.", problems: ["Generic tools miss the domain.", "The cost of a wrong action is high.", "There is no evaluation."], capabilities: ["Domain workflow", "Model use with limits", "Review", "An evaluation approach for the scope"], technical: ["Custom application", "Model and data boundaries", "Permissions", "Logs"], deliverables: ["System design", "Build for the agreed job", "Review tools", "Limit notes"], starting: "$10,000", range: "$10,000–$150,000+", complexity: "Scales with the system", tiers: [aiBands.app[0], aiBands.platform[1], aiBands.platform[2]], addons: ["Private deployment constraints", "Extra domain", "Ongoing evaluation"] }),
    ],
  },
  {
    slug: "enterprise",
    number: "06",
    title: "Enterprise & Large-Scale Digital Systems",
    summary: "Architecture, multi-tenant platforms, and systems that have to stay up.",
    description: "Enterprise work starts with technical discovery. The ranges show the level of investment. The proposal is individual.",
    starting: "From $50,000",
    questions: enterpriseQuestions,
    services: [
      service({ slug: "architecture", name: "Enterprise Software Architecture", summary: "A technical plan before a large build.", description: "Architecture work that produces a decision: boundaries, risks, and a build sequence a team can follow.", problems: ["A rebuild is being funded without a map.", "Integrations are undefined.", "Teams disagree on what is shared."], capabilities: ["Current-state reading", "Target boundaries", "Risk list", "A sequenced plan"], technical: ["Context and container view", "Integration map", "Data ownership", "Environment outline"], deliverables: ["Architecture notes", "Diagrams of the agreed system", "A phased recommendation", "Open questions"], starting: "$50,000", range: "$50,000–$150,000", complexity: "Enterprise", tiers: [enterpriseBands[0], tier("Professional", "$100,000–$180,000", "Architecture plus a reference implementation.", ["The plan.", "A thin working slice.", "Team handover."]), enterpriseBands[2]], addons: ["Vendor comparison", "Security review", "Delivery oversight"] }),
      service({ slug: "large-scale-saas", name: "Large-Scale SaaS Platforms", summary: "SaaS with many tenants, teams, and operational needs.", description: "Large SaaS platforms where tenancy, admin, and reliability are part of the product from the architecture onward.", problems: ["The product cannot onboard another large customer.", "Admin is a database.", "One tenant's load affects the others."], capabilities: ["Tenant model", "Operator controls", "The product modules in scope", "A rollout plan"], technical: ["Isolation strategy", "Background work", "Observability hooks", "Environment separation"], deliverables: ["Architecture", "The release in the proposal", "Operator tools in scope", "Handover"], starting: "$100,000", range: "$100,000–$400,000+", complexity: "Large-scale", tiers: enterpriseBands, addons: ["SSO", "Data residency options", "Usage billing"] }),
      service({ slug: "enterprise-applications", name: "Custom Enterprise Applications", summary: "Applications for a specific enterprise process.", description: "Custom applications for a process that is too specific for a suite and too important to leave in spreadsheets.", problems: ["A suite was configured until it became unusable.", "The process has exceptions the suite cannot hold.", "Audit needs are unmet."], capabilities: ["Process application", "Permissions", "Audit of sensitive actions", "Integration to the systems of record"], technical: ["Enterprise auth options", "Domain model", "Integration boundaries", "Audit events"], deliverables: ["Process specification", "Application", "Integration in scope", "Admin notes"], starting: "$50,000", range: "$50,000–$250,000", complexity: "Enterprise", tiers: enterpriseBands, addons: ["Data migration", "Training", "Extra module"] }),
      service({ slug: "multi-tenant", name: "Multi-Tenant Platforms", summary: "One product, many organizations, strict separation.", description: "Multi-tenant platforms where organization boundaries, roles, and configuration are designed before features pile up.", problems: ["Customers share a database by accident of history.", "Configuration is hardcoded.", "A large customer needs isolation."], capabilities: ["Organization model", "Role matrix", "Tenant configuration", "Operator override"], technical: ["Tenant keys on data access", "Config model", "Background jobs per tenant", "Admin impersonation rules if in scope"], deliverables: ["Tenancy design", "Platform build for the scope", "Operator console", "Access notes"], starting: "$50,000", range: "$50,000–$250,000", complexity: "Enterprise", tiers: enterpriseBands, addons: ["SSO per tenant", "Custom domains", "Tenant analytics"] }),
      service({ slug: "api-ecosystems", name: "Complex API Ecosystems", summary: "Many consumers, one set of contracts.", description: "API ecosystems for products or partners that need versioned contracts, access, and a way to see failures.", problems: ["Each integration is bespoke.", "Breaking changes are silent.", "Partners cannot test safely."], capabilities: ["Contract design", "Access control", "The resources in scope", "A way to observe failures"], technical: ["Versioned APIs", "Credentials", "Idempotency where writes exist", "Logs"], deliverables: ["Contracts", "Implemented resources", "Credential setup", "Consumer notes"], starting: "$50,000", range: "$50,000–$200,000", complexity: "Enterprise", tiers: [enterpriseBands[0], tier("Professional", "$100,000–$200,000", "A broader partner surface.", ["More resources.", "Sandbox.", "Partner documentation."]), enterpriseBands[2]], addons: ["Developer portal", "Webhooks", "Rate limits"] }),
      service({ slug: "cloud-infrastructure", name: "Cloud Infrastructure", summary: "The environments a product needs to run in production.", description: "Infrastructure for a product that already has a direction: environments, deployment, and the minimum observability to operate it.", problems: ["Production is a single machine someone set up.", "There is no separation between test and live.", "Deploys are manual and nervous."], capabilities: ["Environment plan", "Deployment path", "Secrets handling", "Basic operational signals"], technical: ["Cloud environments", "Repeatable deploy", "Secret storage", "Health and error visibility"], deliverables: ["Environment setup", "Deploy path", "Access list", "Operating notes"], starting: "$50,000", range: "$50,000–$150,000", complexity: "Enterprise", tiers: [enterpriseBands[0], tier("Professional", "$100,000–$180,000", "Hardened environments for a larger system.", ["More environments.", "Stronger access.", "Recovery notes."]), tier("Enterprise", "$180,000–$400,000+", "Infrastructure for a large-scale system.", ["Multi-environment program.", "Deeper resilience.", "Individual proposal."])], addons: ["Extra region", "Staging parity", "Cost review"] }),
      service({ slug: "business-automation", name: "Business Automation Systems", summary: "Company processes that should run without a person retyping them.", description: "Automation across business systems, with exceptions routed to a person and a record of what ran.", problems: ["People retype between tools.", "Failures are noticed by customers first.", "No one can say what ran yesterday."], capabilities: ["Process definition", "System connections", "Exception queue", "Run history"], technical: ["Workers", "Idempotent steps", "Alerts", "Audit"], deliverables: ["Automated process", "Exception handling", "History", "Handover"], starting: "$50,000", range: "$50,000–$150,000", complexity: "Enterprise", tiers: [enterpriseBands[0], tier("Professional", "$100,000–$180,000", "Several processes on one system.", ["More processes.", "Shared monitoring.", "Richer exceptions."]), tier("Enterprise", "Quoted above $180,000", "Automation across the company.", ["Program scope.", "Many systems.", "Custom proposal."])], addons: ["Extra system", "Manual review UI", "Replay"] }),
      service({ slug: "data-platforms", name: "Data Platforms", summary: "A reliable path from operational data to a decision.", description: "Data platforms that collect agreed sources, model them, and present them to the people who decide.", problems: ["Each team exports a different number.", "Sources are undocumented.", "There is no place a new report should live."], capabilities: ["Source map", "Modeled datasets in scope", "A way to read them", "Ownership"], technical: ["Ingestion for the named sources", "Modeled tables", "Access control", "Refresh visibility"], deliverables: ["Source list", "Model for the scope", "Reading interface or warehouse handoff", "Notes"], starting: "$50,000", range: "$50,000–$250,000", complexity: "Enterprise", tiers: enterpriseBands, addons: ["Extra source", "Semantic definitions", "Access reviews"] }),
      service({ slug: "enterprise-ai", name: "Enterprise AI Systems", summary: "AI inside a large organization, with access and review.", description: "Enterprise AI where the data, the audience, and the approval rule are decided before the model is connected.", problems: ["Staff use personal accounts on company data.", "There is no review.", "Access is all or nothing."], capabilities: ["Approved data sources", "A defined task", "Review and access", "Trace of use"], technical: ["Private integration path", "Permission checks", "Logs", "Human gate when required"], deliverables: ["System for the agreed task", "Access model", "Review tools", "Limit notes"], starting: "$50,000", range: "$50,000–$250,000", complexity: "Enterprise", tiers: [enterpriseBands[0], tier("Professional", "$100,000–$200,000", "Several tasks and stricter controls.", ["More workflows.", "Admin.", "Evaluation."]), enterpriseBands[2]], addons: ["Extra source", "Redaction", "Ongoing evaluation"] }),
      service({ slug: "high-availability", name: "High-Availability Applications", summary: "Applications that have to stay available when a dependency fails.", description: "Work on availability: failure modes, redundancy for the agreed components, and a way to know the system is unhealthy.", problems: ["A single failure takes the product down.", "Nobody knows until a customer writes.", "Recovery steps are in one person's head."], capabilities: ["Failure review", "The redundancy in scope", "Health signals", "A recovery note"], technical: ["Redundant components as scoped", "Health checks", "Deploy safety", "Documented recovery"], deliverables: ["Availability plan", "The changes in scope", "Signals", "Recovery note"], starting: "$50,000", range: "$50,000–$250,000", complexity: "Enterprise", tiers: enterpriseBands, addons: ["Load testing", "Extra region", "On-call runbook"] }),
      service({ slug: "modernization", name: "System Modernization", summary: "Replace or wrap a system without stopping the business.", description: "Modernization in slices. The first slice is chosen because it can go live while the old system still runs.", problems: ["The old system is risky to touch.", "A full rewrite keeps slipping.", "Data has to move without a weekend of downtime as the plan."], capabilities: ["Slice selection", "A parallel path", "Data mapping for the slice", "Cutover notes"], technical: ["New application slice", "Integration with what remains", "Migration for the agreed data", "Rollback note"], deliverables: ["Modernization map", "The live slice", "Data mapping", "Cutover note"], starting: "$50,000", range: "$50,000–$250,000", complexity: "Enterprise", tiers: enterpriseBands, addons: ["Extra slice", "Interface redesign", "Staff training"] }),
      service({ slug: "digital-infrastructure", name: "Custom Digital Infrastructure", summary: "The shared technical base several products will use.", description: "Shared infrastructure for identity, APIs, environments, and the conventions a growing product organization needs.", problems: ["Every project reinvents auth and deploy.", "There is no shared contract.", "Teams cannot see each other's systems."], capabilities: ["Shared foundations in scope", "Conventions", "A first consumer", "Access"], technical: ["Identity or API base", "Environments", "Observability hooks", "Documentation"], deliverables: ["The foundation in the proposal", "One consuming path", "Access model", "Notes for the next team"], starting: "$50,000", range: "$50,000–$400,000+", complexity: "Large-scale", tiers: enterpriseBands, addons: ["Extra consumer", "Partner access", "Security review"] }),
    ],
  },
  {
    slug: "additional",
    number: "07",
    title: "Additional Services",
    summary: "Strategy, audits, integrations, and care for products that already exist.",
    description: "These can be hired on their own or added to a larger project. They are quoted to the actual surface, so they do not carry a fixed package price.",
    starting: "Quoted to scope",
    questions: [],
    services: [
      service({ slug: "product-strategy", name: "Product Strategy", summary: "What to build first, and what to leave out.", description: "A strategy engagement that ends with a sequenced product decision, not a slide archive.", problems: ["The roadmap is a wish list.", "Stakeholders disagree on the first release.", "Scope and budget are not in the same conversation."], capabilities: ["Problem framing", "Release sequence", "Scope boundaries", "A recommendation"], technical: ["Constraints from the current stack when relevant", "No speculative architecture beyond the decision"], deliverables: ["Written recommendation", "A first-release outline", "Open risks"], starting: "Custom quote", range: "Quoted to scope", complexity: "Advisory", priced: false, tiers: quoteTiers, addons: ["Workshop with stakeholders", "Follow-on specification"] }),
      service({ slug: "technical-consulting", name: "Technical Consulting", summary: "A technical decision with the tradeoffs written down.", description: "Consulting for a specific technical question: architecture, vendor, or approach.", problems: ["A decision is stuck.", "Options are being compared on slogans.", "The team needs an outside read."], capabilities: ["Option comparison", "Recommendation", "Risks"], technical: ["Review of the current system relevant to the question"], deliverables: ["Written recommendation", "Risks", "Suggested next step"], starting: "Custom quote", range: "Quoted to scope", complexity: "Advisory", priced: false, tiers: quoteTiers, addons: ["Follow-on design", "Vendor conversations"] }),
      service({ slug: "ui-ux-audit", name: "UI/UX Audits", summary: "A structured read of an existing interface.", description: "An audit of a product people already use, focused on the tasks that matter and the friction in them.", problems: ["The product is hard to use and the reason is argued.", "A redesign is about to start without a diagnosis.", "Support themes are not in the design."], capabilities: ["Task review", "Findings ordered by impact", "Direction for the next change"], technical: ["Review of the live interface and the flows you name"], deliverables: ["Findings", "Recommended changes", "A suggested sequence"], starting: "Custom quote", range: "Quoted to scope", complexity: "Advisory", priced: false, tiers: quoteTiers, addons: ["Prototype of the top issue", "Stakeholder readout"] }),
      service({ slug: "website-redesign", name: "Website Redesign", summary: "Replace the site without losing what already works.", description: "A redesign of an existing site: structure, interface, and the build, with the current content accounted for.", problems: ["The site no longer matches the company.", "Content is trapped in the old build.", "A visual refresh would leave the structure broken."], capabilities: ["New structure", "Interface", "Rebuild", "Content mapping"], technical: ["Frontend rebuild", "Redirect map", "Performance pass"], deliverables: ["Redesigned site", "Redirect list", "Content mapping", "Launch"], starting: "Custom quote", range: "Quoted to scope", complexity: "Project", priced: false, tiers: quoteTiers, addons: ["CMS move", "New content", "Localization"] }),
      service({ slug: "application-modernization", name: "Application Modernization", summary: "Bring an existing application forward in a slice.", description: "Modernization of an application that has to keep running. The slice is chosen so the business can ship before the whole rewrite.", problems: ["The stack is hard to change.", "A rewrite has no first release.", "Users cannot wait for a big-bang cutover."], capabilities: ["Slice plan", "New interface or service for that slice", "A bridge to what remains"], technical: ["Incremental replacement", "Integration with the current system"], deliverables: ["Slice in production", "Bridge notes", "Next-slice recommendation"], starting: "Custom quote", range: "Quoted to scope", complexity: "Project", priced: false, tiers: quoteTiers, addons: ["Further slices", "Data cleanup"] }),
      service({ slug: "api-development", name: "API Development", summary: "A contract other software can rely on.", description: "Design and build of an API for a product, partner, or internal team.", problems: ["Consumers are reading the database.", "There is no contract.", "Changes break clients."], capabilities: ["Contract", "Implementation", "Access"], technical: ["Authenticated endpoints", "Validation", "Documentation"], deliverables: ["API", "Docs for the contract", "Access setup"], starting: "Custom quote", range: "Quoted to scope", complexity: "Project", priced: false, tiers: quoteTiers, addons: ["Sandbox", "Webhooks"] }),
      service({ slug: "third-party-integrations", name: "Third-Party Integrations", summary: "Connect a product to a system it should already talk to.", description: "Integrations with payment, CRM, map, messaging, or other providers, including the failure case.", problems: ["Data is exported by hand.", "The integration fails quietly.", "Secrets sit in the wrong place."], capabilities: ["Field mapping", "The happy path", "A visible failure"], technical: ["Provider API", "Retries where appropriate", "Secret handling"], deliverables: ["Working integration", "Failure behavior", "Notes"], starting: "Custom quote", range: "Quoted to scope", complexity: "Project", priced: false, tiers: quoteTiers, addons: ["Second object", "Monitoring"] }),
      service({ slug: "performance", name: "Performance Optimization", summary: "Make a slow product specific and faster.", description: "Performance work that starts from a measured problem: a page, an API, or a job.", problems: ["A view is slow and the cause is guessed.", "Mobile users leave.", "A job blocks the product."], capabilities: ["Measurement", "The fixes in scope", "A before-and-after note"], technical: ["Profiling of the named path", "Targeted changes"], deliverables: ["Findings", "Implemented fixes", "Comparison note"], starting: "Custom quote", range: "Quoted to scope", complexity: "Project", priced: false, tiers: quoteTiers, addons: ["Further paths", "Budget alerts"] }),
      service({ slug: "security", name: "Security Improvements", summary: "Close specific security gaps in a product you own.", description: "Security work against a named risk: access, secrets, headers, dependencies, or a flow that should not be public.", problems: ["Access is broader than it should be.", "A review produced findings and they are still open.", "Secrets or public endpoints are unclear."], capabilities: ["Findings for the named surface", "Fixes in scope", "A remaining-risk note"], technical: ["Changes to auth, configuration, or the vulnerable path"], deliverables: ["Fix list", "Implemented items", "What remains"], starting: "Custom quote", range: "Quoted to scope", complexity: "Project", priced: false, tiers: quoteTiers, addons: ["Retest", "Staff session"] }),
      service({ slug: "maintenance", name: "Ongoing Maintenance", summary: "Keep a shipped product healthy.", description: "Maintenance for a product the studio or your team already runs: updates, small fixes, and a clear channel.", problems: ["Dependencies age.", "Small bugs wait for a new project.", "Nobody owns the production app."], capabilities: ["Agreed maintenance window", "Bug fixes in that window", "Dependency updates as scoped"], technical: ["Access to the repository and host", "A list of what is in bounds"], deliverables: ["The changes in the maintenance scope", "A short log"], starting: "Custom quote", range: "Quoted to scope", complexity: "Retainer", priced: false, tiers: quoteTiers, addons: ["On-call", "Small features"] }),
      service({ slug: "technical-support", name: "Technical Support", summary: "A named channel for a product in production.", description: "Support for incidents and questions on a product, with response expectations written into the agreement.", problems: ["Issues arrive in personal chat.", "There is no severity.", "Fixes and questions are mixed together."], capabilities: ["A channel", "Severity", "Response within the agreed window"], technical: ["Access sufficient to diagnose"], deliverables: ["Responses and fixes that the support scope includes", "A record of the request"], starting: "Custom quote", range: "Quoted to scope", complexity: "Retainer", priced: false, tiers: quoteTiers, addons: ["Extended hours", "Status page help"] }),
    ],
  },
];
