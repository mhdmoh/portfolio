import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/layout";
import { ThemeProvider } from "@/hooks/use-theme";

const HomePage = lazy(() => import("@/pages/home").then((m) => ({ default: m.HomePage })));
const EngineeringPage = lazy(() =>
  import("@/pages/engineering").then((m) => ({ default: m.EngineeringPage })),
);
const EngineeringDetailPage = lazy(() =>
  import("@/pages/engineering-detail").then((m) => ({ default: m.EngineeringDetailPage })),
);
const LabPage = lazy(() => import("@/pages/lab").then((m) => ({ default: m.LabPage })));
const PublicationDetailPage = lazy(() =>
  import("@/pages/publication-detail").then((m) => ({ default: m.PublicationDetailPage })),
);
const ExperiencePage = lazy(() =>
  import("@/pages/experience").then((m) => ({ default: m.ExperiencePage })),
);
const AboutPage = lazy(() => import("@/pages/about").then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() =>
  import("@/pages/contact").then((m) => ({ default: m.ContactPage })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/not-found").then((m) => ({ default: m.NotFoundPage })),
);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <TooltipProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Suspense fallback={null}>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="engineering" element={<EngineeringPage />} />
                  <Route path="engineering/:slug" element={<EngineeringDetailPage />} />
                  <Route path="lab" element={<LabPage />} />
                  <Route path="lab/publications/:slug" element={<PublicationDetailPage />} />
                  <Route path="experience" element={<ExperiencePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
