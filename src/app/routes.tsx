import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { AboutPage } from "./pages/AboutPage";
import { WorkPage } from "./pages/WorkPage";
import { ContactPage } from "./pages/ContactPage";
import { BookPage } from "./pages/BookPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceCategoryPage } from "./pages/ServiceCategoryPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "portfolio", Component: PortfolioPage },
      { path: "about", Component: AboutPage },
      { path: "work", Component: WorkPage },
      { path: "services", Component: ServicesPage },
      { path: "services/:category", Component: ServiceCategoryPage },
      { path: "services/:category/:service", Component: ServiceDetailPage },
      { path: "pricing", element: <Navigate to="/services" replace /> },
      { path: "contact", Component: ContactPage },
      { path: "book", Component: BookPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
