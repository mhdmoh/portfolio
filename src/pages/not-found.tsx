import { Link } from "react-router-dom";

import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export function NotFoundPage() {
  return (
    <>
      <Seo path="/404" title="Page Not Found" description="This page doesn't exist." />
      <Section className="flex flex-col items-center py-32 text-center">
        <p className="font-mono text-sm text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Button asChild className="mt-6">
          <Link to={routes.home}>Back home</Link>
        </Button>
      </Section>
    </>
  );
}
