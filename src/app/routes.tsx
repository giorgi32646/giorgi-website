import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { AboutPage } from "./pages/AboutPage";
import { WorkPage } from "./pages/WorkPage";
import { PricingPage } from "./pages/PricingPage";
import { ContactPage } from "./pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "portfolio", Component: PortfolioPage },
      { path: "about", Component: AboutPage },
      { path: "work", Component: WorkPage },
      { path: "pricing", Component: PricingPage },
      { path: "contact", Component: ContactPage },
    ],
  },
]);
