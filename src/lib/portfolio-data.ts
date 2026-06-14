export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string[];
  techStack: string[];
  highlights?: string[];
  thumbnailGradient: string;
  thumbnailImage?: string;
  behanceUrl?: string;
  year?: string;
  featured?: boolean;
  section: "saas" | "uiux" | "branding" | "concepts";
  tag?: string;
  statusBadge?: { label: string; color: string; bg: string; border: string };
}

const portfolioProjects: PortfolioProject[] = [

  /* ── SaaS & Products ─────────────────────────────────────── */
  {
    id: "universal-drone-os",
    section: "saas",
    featured: true,
    year: "2024–present",
    title: "Universal Drone OS",
    category: "Full-Stack Product · Drone Fleet Management",
    shortDescription:
      "In development — multi-tenant fleet management platform built for up to 8,000 simultaneous drones with real-time telemetry and mission planning.",
    fullDescription: [
      "Universal Drone OS is a multi-tenant fleet management platform currently in active development, engineered to coordinate up to 8,000 simultaneous drones across complex airspace environments. The system handles real-time telemetry ingestion, mission planning with geofencing, and automated incident triage — all from a unified web interface.",
      "The backend is built on FastAPI with NATS JetStream as the message broker, enabling sub-50ms telemetry updates via MAVLink protocol parsing. WebSocket connections push live state to the React + MapLibre GL JS frontend, rendering drone positions, flight paths, and sensor overlays on a 3D map canvas.",
      "Built with multi-tenancy at its core — each operator gets an isolated workspace with role-based access control. Supabase powers auth, row-level security, and the PostgreSQL data layer. Actively in development, being designed and built end-to-end.",
    ],
    techStack: ["Python", "FastAPI", "MAVLink", "NATS JetStream", "React", "MapLibre GL JS", "WebSocket", "Supabase", "PostgreSQL"],
    highlights: [
      "Sub-50ms real-time telemetry via NATS JetStream message broker",
      "Designed to scale to 8,000 simultaneous drones with full multi-tenant isolation",
      "3D airspace map with geofencing and mission planning overlays",
      "Automated incident triage with per-operator alerting system",
    ],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(0,128,255,0.2) 60%, rgba(0,200,255,0.08) 100%)",
  },
  {
    id: "redflag-ai",
    section: "saas",
    year: "2025",
    statusBadge: { label: "Launching Soon", color: "#F5A623", bg: "rgba(255,160,0,0.1)", border: "rgba(255,160,0,0.25)" },
    title: "RedFlag.ai",
    category: "AI SaaS · Contract Analysis",
    shortDescription:
      "Launching in ~1 month — AI-powered contract red flag scanner. Paste any contract and get a plain-English risk breakdown in seconds.",
    fullDescription: [
      "RedFlag.ai is an AI-powered contract analysis tool that turns any legal document into a plain-English risk report in seconds. Upload a PDF or paste the contract text, and Gemini 2.0 Flash identifies critical clauses, hidden liabilities, and negotiation red flags.",
      "Built on Next.js 14 with a full authentication suite — Google OAuth, Facebook OAuth, and magic-link email — all via Supabase Auth. Payments and subscriptions are handled through Polar.sh, giving users access to tiered analysis depth.",
      "The product was designed to be instantly usable by non-lawyers: no jargon, no legalese — just a prioritized list of what to watch out for.",
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Gemini 2.0 Flash", "Supabase Auth", "Polar.sh"],
    highlights: [
      "Google, Facebook OAuth + magic-link auth via Supabase",
      "Gemini 2.0 Flash for sub-5s full contract analysis",
      "Tiered subscription billing via Polar.sh",
      "Plain-English risk output — zero legal expertise required",
    ],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(220,50,50,0.14) 60%, rgba(255,80,80,0.06) 100%)",
  },
  {
    id: "secureshare",
    section: "saas",
    year: "2024",
    statusBadge: { label: "Complete", color: "#3DD68C", bg: "rgba(0,200,100,0.1)", border: "rgba(0,200,100,0.25)" },
    title: "SecureShare",
    category: "Full-Stack Product · Encrypted File Sharing",
    shortDescription:
      "Complete — zero-knowledge encrypted file sharing with AES-256-GCM client-side encryption. The server never sees plaintext.",
    fullDescription: [
      "SecureShare is a zero-knowledge encrypted file sharing platform where the server never touches plaintext. Files are encrypted client-side using AES-256-GCM before upload — the encryption key lives only in the share link, never on the server.",
      "The backend uses FastAPI with chunked resumable uploads, so large files survive flaky connections. JWT authentication secures all API endpoints, with refresh token rotation for session security.",
      "The architecture was designed around the threat model of a fully compromised server: even with full database and storage access, an attacker cannot read any uploaded file. The share link is the decryption key.",
    ],
    techStack: ["FastAPI", "AES-256-GCM", "Python", "JWT", "Chunked Uploads", "PostgreSQL"],
    highlights: [
      "Client-side AES-256-GCM encryption — server sees only ciphertext",
      "Chunked resumable uploads for large-file reliability",
      "Zero-knowledge architecture: share link = decryption key",
      "JWT auth with refresh token rotation for session security",
    ],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(0,200,150,0.14) 60%, rgba(0,255,180,0.05) 100%)",
  },

  /* ── UI/UX Design ────────────────────────────────────────── */
  {
    id: "atelier-lili",
    section: "uiux",
    tag: "UI/UX · E-commerce",
    year: "2026",
    title: "Atelier Lili",
    category: "UI/UX Design · Luxury Fashion E-commerce",
    shortDescription:
      "Conceptual luxury fashion e-commerce platform featuring independent designers and sustainable pieces — full brand identity, responsive web and mobile design.",
    fullDescription: [
      "Atelier Lili is a conceptual luxury fashion e-commerce platform designed to elevate the way independent designers and collectors interact. The project encompasses brand identity, responsive website design, packaging, and a full design system built end-to-end in Figma.",
      "The visual language prioritises restraint — generous whitespace, editorial typography, and a curated colour palette communicate luxury without noise. Mobile-first responsive layouts ensure a seamless experience across devices.",
      "Delivered as a portfolio case study covering: brand mark, design system, product listing UX, checkout flow, and packaging mockups.",
    ],
    techStack: ["Figma", "UI/UX Design", "Brand Identity", "Design System", "Mobile Design"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(180,150,100,0.18) 60%, rgba(220,190,140,0.07) 100%)",
    thumbnailImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/caaff6244487051.699869b8a7bd0.png",
    behanceUrl: "https://www.behance.net/gallery/244487051/Atelier-Lili-Luxury-Fashion-E-commerce",
  },
  {
    id: "artspace-v2",
    section: "uiux",
    tag: "UI/UX · Marketplace",
    year: "2025",
    title: "ArtSpace 2.0",
    category: "UI/UX Design · Digital Art Marketplace",
    shortDescription:
      "Premium digital art marketplace with real-time auctions, creator analytics, and blockchain-based ownership verification.",
    fullDescription: [
      "ArtSpace 2.0 is a premium digital art marketplace designed to elevate the way creators and collectors interact. The platform centres artwork as the primary focus through clean aesthetics, soft gradients, minimal typography, and smooth visual hierarchy.",
      "Key platform features include immersive gallery experiences, real-time auctions, creator analytics dashboards, and blockchain-based ownership verification — all designed with a collector-first UX philosophy.",
      "This is the second iteration of the ArtSpace concept, with a refined design system, improved information architecture, and expanded feature set over the original.",
    ],
    techStack: ["Figma", "UI/UX Design", "Design System", "Crypto/Web3 UI"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(100,60,200,0.18) 60%, rgba(140,100,255,0.07) 100%)",
    thumbnailImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/5272ba239693307.692eef6ad8aeb.png",
    behanceUrl: "https://www.behance.net/gallery/239693307/ArtSpace-The-Future-of-Digital-Art-20",
  },
  {
    id: "ai-agency",
    section: "uiux",
    tag: "UI/UX · Landing Page",
    year: "2025",
    title: "AI Marketing Agency",
    category: "UI/UX Design · Agency Landing Page",
    shortDescription:
      "AI-powered digital marketing agency landing page — data-driven growth strategies, SEO, PPC, and brand storytelling.",
    fullDescription: [
      "A fully designed landing page for an AI marketing agency specialising in data-driven growth strategies. The design positions the agency around measurable impact — SEO optimisation, PPC advertising, content marketing, social media management, and brand strategy.",
      "The visual design uses dark, high-contrast layouts with bold typographic hierarchy to convey authority and technological capability. Key metrics ('300% Average Growth', '500+ Successful Projects') are surfaced prominently through custom data visualisation components.",
    ],
    techStack: ["Figma", "UI/UX Design", "Landing Page Design", "Data Visualisation"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(0,128,255,0.18) 60%, rgba(0,180,255,0.07) 100%)",
    thumbnailImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/786eb6229705597.68698a239643e.png",
    behanceUrl: "https://www.behance.net/gallery/229705597/AI-agency-part-1",
  },
  {
    id: "koenigsegg",
    section: "uiux",
    tag: "UI/UX · Automotive",
    year: "2025",
    title: "Koenigsegg Concept UI",
    category: "UI/UX Design · Automotive Brand Experience",
    shortDescription:
      "High-performance brand experience concept for Koenigsegg hypercars — Jesko, CCX, and Regera showcased through an immersive web UI.",
    fullDescription: [
      "A conceptual web UI designed for Koenigsegg, the Swedish hypercar manufacturer behind the Jesko, CCX, and Regera. The design language reflects the brand's obsession with engineering precision — dark surfaces, sharp geometric forms, and cinematic car photography.",
      "Built as an interactive Figma prototype (accessible live), the experience focuses on communicating performance and exclusivity through motion, typography, and layout — rather than information overload.",
    ],
    techStack: ["Figma", "UI/UX Design", "Interactive Prototype", "Motion Design"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(200,50,50,0.16) 60%, rgba(255,80,40,0.06) 100%)",
    thumbnailImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/3ab95c227625483.6843414631e62.png",
    behanceUrl: "https://www.behance.net/gallery/227625483/koenigsegg-new",
  },
  {
    id: "crypto-mining",
    section: "uiux",
    tag: "UI/UX · Mobile App",
    year: "2025",
    title: "Crypto Mining App",
    category: "UI/UX Design · Mobile Application",
    shortDescription:
      "Mobile app UI for a crypto mining platform — real-time earnings dashboard, rig monitoring, and wallet management.",
    fullDescription: [
      "A mobile application UI design for a cryptocurrency mining platform. The interface surfaces real-time earnings, rig performance metrics, hash rates, and wallet management in a clean, data-dense layout optimised for quick scanning.",
      "The dark colour scheme with electric green and blue accents creates a high-tech aesthetic appropriate for the crypto audience. Charts and data visualisations are central to the UX, built to feel powerful without being overwhelming.",
    ],
    techStack: ["Figma", "Photoshop", "Illustrator", "After Effects", "Mobile UI"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(0,200,100,0.16) 60%, rgba(0,255,140,0.06) 100%)",
    thumbnailImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/0e7dad226412515.682df06771a83.png",
    behanceUrl: "https://www.behance.net/gallery/226412515/CRYPTO-MINING",
  },
  {
    id: "furnispace",
    section: "uiux",
    tag: "UI/UX · E-commerce",
    year: "2025",
    title: "FURNISPACE",
    category: "UI/UX Design · Furniture E-commerce",
    shortDescription:
      "Futuristic furniture e-commerce platform merging sportswear brand aesthetics (Nike, Adidas) with contemporary home design.",
    fullDescription: [
      "FURNISPACE is a conceptual UI design for a futuristic furniture e-commerce platform that merges sportswear brand aesthetics with contemporary interior design. Furniture pieces inspired by Nike and Adidas visual language are presented in a unified shopping interface.",
      "The UX emphasises comfort, style, and spatial elegance — product cards, category navigation, and the checkout flow were all designed with a premium consumer experience in mind. Client: Zolve. Services: Art Direction, UX/UI, Web Design.",
    ],
    techStack: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Premiere Pro", "UI/UX Design"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(255,140,0,0.16) 60%, rgba(255,180,60,0.06) 100%)",
    behanceUrl: "https://www.behance.net/gallery/221212163/FURNISPACE-Futuristic-Furniture-UI-Design",
  },
  {
    id: "infiniti-war",
    section: "uiux",
    tag: "UI/UX · Gaming",
    year: "2025",
    title: "INFINITI WAR",
    category: "UI/UX Design · Sci-Fi Gaming Experience",
    shortDescription:
      "Sci-fi universe landing page where technology, strategy, and power collide — futuristic warriors, advanced AI, interstellar conflict.",
    fullDescription: [
      "INFINITI WAR is a sci-fi universe concept landing page where technology, strategy, and power collide in an immersive digital experience. The design features futuristic warriors, advanced AI imagery, and interstellar conflict narratives that determine civilisations' fates.",
      "The visual language draws from game UI conventions — dramatic lighting, layered depth, cinematic character art, and bold typographic treatments. Built as a Figma design exploring the intersection of editorial web design and gaming aesthetics.",
    ],
    techStack: ["Figma", "UI/UX Design", "Character Design", "Landing Page"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(120,0,180,0.18) 60%, rgba(180,60,255,0.07) 100%)",
    thumbnailImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/c095f0219067773.67abce1bb6a30.png",
    behanceUrl: "https://www.behance.net/gallery/219067773/INFINITI-WAR-The-Future-of-Warfare-Begins-Here",
  },
  {
    id: "ilarutech",
    section: "uiux",
    tag: "UI/UX · Branding",
    year: "2026",
    title: "ILARUTECH",
    category: "UI/UX Design · Tech Brand & Web",
    shortDescription:
      "Web design, visual identity, and social media system for a tech brand — landing page, branding, and content templates.",
    fullDescription: [
      "A comprehensive digital identity project for ILARUTECH covering web design, visual identity, and social media content. The landing page design communicates technological authority through clean grid layouts, strong typography, and purposeful use of negative space.",
      "Deliverables included: hero landing page, brand colour system, typography guidelines, and a set of social media post templates — all designed in Figma with consistency across digital touchpoints.",
    ],
    techStack: ["Figma", "Adobe Photoshop", "Web Design", "Visual Identity", "Social Media Design"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(0,128,255,0.16) 60%, rgba(60,180,255,0.07) 100%)",
    thumbnailImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/e900b8245010939.69a469fb476c6.png",
    behanceUrl: "https://www.behance.net/gallery/245010939/ILARUTECH",
  },
  {
    id: "artspace-v1",
    section: "uiux",
    tag: "UI/UX · Platform",
    year: "2025",
    title: "ArtSpace",
    category: "UI/UX Design · Digital Art Platform",
    shortDescription:
      "Digital art platform where creators showcase work, collectors discover talent, and the next era of art comes to life.",
    fullDescription: [
      "ArtSpace is an innovative online platform where digital art and technology come together. Designed for artists, it offers a space to showcase their work, discover new talents, and immerse themselves in the next era of digital art.",
      "The original ArtSpace concept established the visual identity and core UX patterns later refined in version 2.0 — a portfolio and collector experience built around the artwork itself, with minimal chrome and maximum focus.",
    ],
    techStack: ["Figma", "UI/UX Design", "E-commerce", "Brand Identity"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(80,60,180,0.18) 60%, rgba(120,100,255,0.07) 100%)",
    thumbnailImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/13e0d2219066813.67abc910eb1c9.png",
    behanceUrl: "https://www.behance.net/gallery/219066813/ArtSpace-The-Future-of-Digital-Art",
  },

  /* ── Branding & Graphic Design ───────────────────────────── */
  {
    id: "just-energy-drink",
    section: "branding",
    tag: "Branding · Packaging",
    year: "2025",
    title: "JUST Energy Drink",
    category: "Branding · Product Design · Packaging",
    shortDescription:
      "Premium energy drink brand merging ancient mythology with contemporary design — 7 mythological characters, collectible cans.",
    fullDescription: [
      "JUST is a premium energy drink brand built around the philosophy 'Believe in Yourself.' Each of the seven variants represents a mythological character archetype — Zeus, Athena, Apollo, Aphrodite, Azrael, Medusa, and Suzuna — with its own flavour, caffeine level, and visual identity.",
      "The visual language employs monochromatic backgrounds with gold metallic accents for premium positioning, dynamic fluid forms conveying movement, and minimalist typography. Each can is designed as a collectible art object — a wearable identity.",
      "Targeting ages 22–35: fitness enthusiasts, creative professionals, nightlife lovers, adventure seekers, and collectors. Positioning: Georgian market with international shelf appeal.",
    ],
    techStack: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Lightroom", "Packaging Design", "Brand Identity"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(200,160,20,0.2) 60%, rgba(255,200,60,0.07) 100%)",
    thumbnailImage: "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/907ce2236308783.68e8e1f40217d.jpg",
    behanceUrl: "https://www.behance.net/gallery/236308783/JUST-Energy-Drink-Mythological-Power-Reimagined",
  },
  {
    id: "brand-book",
    section: "branding",
    tag: "Branding · Identity",
    year: "2025",
    title: "Brand Book",
    category: "Branding · Visual Identity · Illustration",
    shortDescription:
      "Complete brand book and visual identity system with illustration — logo, colour palette, typography, and usage guidelines.",
    fullDescription: [
      "A comprehensive brand book project covering logo design, colour palette, typography system, and illustration style guide. The project demonstrates the full scope of a visual identity system built for consistency across print and digital touchpoints.",
      "Custom illustration work is integrated into the identity, giving the brand a distinctive handcrafted character that scales from business card to billboard.",
    ],
    techStack: ["Adobe Illustrator", "Brand Identity", "Logo Design", "Illustration", "Typography"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(220,80,60,0.18) 60%, rgba(255,120,80,0.07) 100%)",
    behanceUrl: "https://www.behance.net/gallery/240859055/Brend-Book",
  },
  {
    id: "rachareuli",
    section: "branding",
    tag: "Branding · Packaging",
    title: "Rachareuli",
    category: "Branding · Wine & Packaging",
    shortDescription: "Wine branding and packaging design for a Georgian natural winery.",
    fullDescription: [
      "Complete visual identity and packaging design for Rachareuli, a Georgian natural wine producer. The brand concept draws from traditional Georgian script and winemaking heritage — translated into a contemporary, shelf-ready aesthetic.",
      "Delivered a full brand system: logotype, label design across three wine SKUs, colour palette rooted in earthy terracotta and gold, and photography direction for launch materials.",
    ],
    techStack: ["Adobe Illustrator", "Adobe Photoshop", "Typography Design", "Print & Packaging"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(150,30,60,0.2) 60%, rgba(180,80,40,0.08) 100%)",
  },
  {
    id: "vellura",
    section: "branding",
    tag: "Brand · Video",
    title: "Vellura",
    category: "Brand Identity · Video Production",
    shortDescription: "Luxury cosmetics brand identity system and video content production.",
    fullDescription: [
      "Brand identity and video content production for Vellura, a luxury cosmetics label. Developed the full visual language — wordmark, colour system, packaging guidelines — and produced a series of product launch videos for social media.",
      "Shot and edited three hero product videos plus story-format assets optimised for Instagram and TikTok performance.",
    ],
    techStack: ["Adobe After Effects", "Adobe Premiere Pro", "DaVinci Resolve", "Brand Identity", "Video Production"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(180,100,200,0.16) 60%, rgba(220,140,255,0.06) 100%)",
  },
  {
    id: "nekeas",
    section: "branding",
    tag: "E-commerce",
    title: "Nekeas",
    category: "E-commerce · Brand System",
    shortDescription: "E-commerce branding for a multi-category fashion and electronics retail store.",
    fullDescription: [
      "E-commerce branding for Nekeas, a multi-category retail store selling fashion, electronics, and home goods. Built a flexible brand system that works across all categories without losing cohesion.",
      "Delivered wordmark, icon mark, colour system, packaging guidelines, and a social media template kit. The identity was also applied to email marketing templates and product photography styling guides.",
    ],
    techStack: ["Adobe Illustrator", "Figma", "Adobe Photoshop", "E-commerce Design"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(200,160,50,0.16) 60%, rgba(255,200,80,0.06) 100%)",
  },

  /* ── Concepts & Explorations ─────────────────────────────── */
  {
    id: "ai-voice-book-reader",
    section: "concepts",
    tag: "Mobile Concept",
    title: "AI Voice Book Reader",
    category: "Concept · Mobile Application",
    shortDescription: "Subscription app that reads any text aloud using on-demand AI voice synthesis.",
    fullDescription: [
      "A subscription app concept that replaces audiobook services with on-demand AI voice synthesis. Users paste any text — a book, article, or document — and choose from a library of natural-sounding AI voices to read it aloud.",
      "The concept targets commuters and people with reading difficulties. Core differentiator: any text, any voice, instantly — no waiting for human narrators.",
    ],
    techStack: ["React Native", "Text-to-Speech AI", "Subscription Billing", "Mobile UX Design"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(50,180,200,0.16) 60%, rgba(100,220,255,0.06) 100%)",
  },
  {
    id: "ai-dating-app",
    section: "concepts",
    tag: "Product Concept",
    title: "AI Dating App",
    category: "Concept · Social / Dating",
    shortDescription:
      "Gen-Z focused dating platform with an AI matching algorithm that learns from conversation patterns.",
    fullDescription: [
      "A dating app concept built for Gen-Z with a custom AI matching algorithm at its core. Instead of pure swipe mechanics, the app learns user preferences from conversation patterns and builds a compatibility model over time.",
      "Key differentiators: AI-generated conversation starters tailored to shared interests, a 'vibe check' pre-match mini-game, and a transparency layer showing users what the algorithm is learning about them.",
    ],
    techStack: ["React Native", "Machine Learning", "Product Design", "Figma"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(220,80,120,0.16) 60%, rgba(255,120,160,0.06) 100%)",
  },
  {
    id: "digiframe",
    section: "concepts",
    tag: "Studio / Agency",
    title: "Digiframe",
    category: "Concept · Digital Studio",
    shortDescription:
      "Digital products studio for SMBs — branding, advertising, web design, and digital transformation.",
    fullDescription: [
      "Digiframe is a digital products studio concept positioned for SMBs looking to establish or modernise their online presence. Services span branding, digital advertising, web design, and e-commerce buildouts — all under one roof.",
      "Developed the full studio identity: name, wordmark, brand system, and pitch deck. Positioning targets small business owners who need comprehensive digital transformation without enterprise complexity.",
    ],
    techStack: ["Brand Strategy", "Adobe Illustrator", "Figma", "Agency Positioning"],
    thumbnailGradient: "linear-gradient(135deg, #0A0E1A 0%, rgba(80,140,255,0.16) 60%, rgba(120,180,255,0.06) 100%)",
  },
];

export default portfolioProjects;
export const SAAS_PROJECTS    = portfolioProjects.filter((p) => p.section === "saas");
export const UIUX_PROJECTS    = portfolioProjects.filter((p) => p.section === "uiux");
export const BRANDING_PROJECTS = portfolioProjects.filter((p) => p.section === "branding");
export const CONCEPTS_PROJECTS = portfolioProjects.filter((p) => p.section === "concepts");
