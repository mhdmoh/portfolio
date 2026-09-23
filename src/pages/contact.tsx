import { PageHeader } from "@/components/common/page-header";
import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { routes } from "@/config/routes";
import { icons } from "@/lib/icons";
import { contentService } from "@/services/content";

const contact = contentService.getContact();
const social = contentService.getSocialLinks();

export function ContactPage() {
  return (
    <>
      <Seo path={routes.contact} title="Contact" description={contact.description} />

      <Section className="pt-12 md:pt-16">
        <PageHeader
          eyebrow="Contact"
          title={contact.heading}
          description={contact.description}
        />

        <ul className="mt-14 max-w-md divide-y divide-border/70 border-y border-border/70">
          {social.map((link) => {
            const Icon = icons[link.icon];
            const isExternal = link.href.startsWith("http");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 py-5 transition-colors"
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    <span className="font-medium tracking-tight transition-colors group-hover:text-primary">
                      {link.label}
                    </span>
                  </span>
                  <icons.arrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </a>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
