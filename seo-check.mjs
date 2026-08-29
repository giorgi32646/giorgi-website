import { chromium } from "@playwright/test";

const BASE = "http://localhost:4173";
const ORIGIN = "https://giorgilortkipanidze.online";

const ROUTES = [
  {
    nav: null,
    path: "/",
    title: "Giorgi Lortkipanidze | SaaS UI/UX Designer & Developer",
    descStart: "Designer-developer building production-ready SaaS interfaces",
  },
  {
    nav: "Work",
    path: "/work",
    title: "Selected Work | Giorgi Lortkipanidze",
    descStart: "Own products designed and developed solo",
  },
  {
    nav: "Pricing",
    path: "/pricing",
    title: "Pricing & Process | Giorgi Lortkipanidze",
    descStart: "Fixed-scope engagements, never hourly",
  },
  {
    nav: "About",
    path: "/about",
    title: "About | Giorgi Lortkipanidze",
    descStart: "From UI/UX designer to full-stack product builder",
  },
  {
    nav: "Contact",
    path: "/contact",
    title: "Contact | Giorgi Lortkipanidze",
    descStart: "Start a project or ask a question",
  },
  {
    nav: "Portfolio",
    path: "/portfolio",
    title: "Portfolio | Giorgi Lortkipanidze",
    descStart: "SaaS products, UI/UX design, brand identities",
  },
];

const canonicalFor = (path) => ORIGIN + path;

function collect(page) {
  return page.evaluate(() => {
    const attr = (sel, name) =>
      document.querySelector(sel)?.getAttribute(name) ?? null;
    const count = (sel) => document.querySelectorAll(sel).length;
    return {
      pathname: location.pathname,
      title: document.title,
      descCount: count('meta[name="description"]'),
      canonCount: count('link[rel="canonical"]'),
      ogUrlCount: count('meta[property="og:url"]'),
      ogTitleCount: count('meta[property="og:title"]'),
      ogDescCount: count('meta[property="og:description"]'),
      twTitleCount: count('meta[name="twitter:title"]'),
      twDescCount: count('meta[name="twitter:description"]'),
      robotsCount: count('meta[name="robots"]'),
      desc: attr('meta[name="description"]', "content"),
      canon: attr('link[rel="canonical"]', "href"),
      ogUrl: attr('meta[property="og:url"]', "content"),
      ogTitle: attr('meta[property="og:title"]', "content"),
      robots: attr('meta[name="robots"]', "content"),
      ogType: attr('meta[property="og:type"]', "content"),
      twCard: attr('meta[name="twitter:card"]', "content"),
    };
  });
}

// Wait for React to mount and for Helmet's deferred (rAF) commit to land.
async function settle(page, expectedTitle) {
  await page.waitForFunction(
    () => (document.querySelector("#root")?.children.length ?? 0) > 0
  );
  try {
    await page.waitForFunction(
      (t) => document.title === t,
      expectedTitle,
      { timeout: 5000 }
    );
  } catch {
    // Fall through and let the assertions report the actual value.
  }
  await page.waitForTimeout(250);
}

function check(route, m) {
  const expectedCanon = canonicalFor(route.path);
  return [
    ["title", m.title === route.title, m.title],
    ["description count", m.descCount === 1, m.descCount],
    ["canonical count", m.canonCount === 1, m.canonCount],
    ["og:url count", m.ogUrlCount === 1, m.ogUrlCount],
    ["og:title count", m.ogTitleCount === 1, m.ogTitleCount],
    ["og:description count", m.ogDescCount === 1, m.ogDescCount],
    ["twitter:title count", m.twTitleCount === 1, m.twTitleCount],
    ["twitter:description count", m.twDescCount === 1, m.twDescCount],
    [
      "description content",
      (m.desc ?? "").startsWith(route.descStart),
      (m.desc ?? "").slice(0, 60) + "...",
    ],
    ["canonical href", m.canon === expectedCanon, m.canon],
    ["og:url content", m.ogUrl === expectedCanon, m.ogUrl],
    ["og:title mirrors title", m.ogTitle === route.title, m.ogTitle],
    ["robots count", m.robotsCount === 1, m.robotsCount],
    ["robots value", m.robots === "index, follow", m.robots],
    ["og:type survived", m.ogType === "website", m.ogType],
    ["twitter:card survived", m.twCard === "summary_large_image", m.twCard],
  ];
}

function report(heading, route, m) {
  const results = check(route, m);
  const failed = results.filter(([, ok]) => !ok);
  const status = failed.length === 0 ? "PASS" : "FAIL";
  console.log(
    `\n[${status}] ${heading} ${route.path}` +
      `\n       title      : ${m.title}` +
      `\n       desc count : ${m.descCount}   canonical count: ${m.canonCount}` +
      `\n       robots     : ${m.robots}` +
      `\n       canonical  : ${m.canon}`
  );
  for (const [name, ok, actual] of failed) {
    console.log(`       -> FAILED ${name}: got ${JSON.stringify(actual)}`);
  }
  return failed.length === 0;
}

const browser = await chromium.launch();
let allPassed = true;

console.log("=".repeat(72));
console.log("PASS A — direct page load of each route (cold load + Helmet override)");
console.log("=".repeat(72));

// Each route gets its own context so this genuinely models a cold arrival
// from search, with no state carried over from the previous navigation.
for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const freshPage = await ctx.newPage();
  await freshPage.goto(BASE + route.path, { waitUntil: "load" });
  await settle(freshPage, route.title);
  const m = await collect(freshPage);
  allPassed = report("direct load", route, m) && allPassed;
  await ctx.close();
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

console.log("\n" + "=".repeat(72));
console.log("PASS B — client-side navigation in ONE session (tag accumulation test)");
console.log("=".repeat(72));

await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
await settle(page, ROUTES[0].title);
allPassed = report("spa nav", ROUTES[0], await collect(page)) && allPassed;

const nav = page.getByRole("navigation", { name: "Main navigation" });
// Two laps, so a tag that accumulates on repeat visits is caught too.
for (let lap = 1; lap <= 2; lap++) {
  for (const route of ROUTES.filter((r) => r.nav)) {
    await nav.getByRole("button", { name: route.nav, exact: true }).click();
    await page.waitForURL(`**${route.path}`);
    await settle(page, route.title);
    const m = await collect(page);
    allPassed = report(`spa nav lap ${lap}`, route, m) && allPassed;
  }
}

console.log("\n" + "=".repeat(72));
console.log(allPassed ? "RESULT: ALL CHECKS PASSED" : "RESULT: FAILURES DETECTED");
console.log("=".repeat(72));

await browser.close();
process.exit(allPassed ? 0 : 1);
