import { icons } from "@/lib/icons";
import { contentService } from "@/services/content";

const site = contentService.getSite();
const social = contentService.getSocialLinks();

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{site.name}</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {site.role} · Budapest
          </p>
        </div>
        <div className="flex items-center gap-0.5">
          {social.map((link) => {
            const Icon = icons[link.icon];
            return (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={link.label}
                className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
        <p className="font-mono text-xs text-muted-foreground sm:order-none">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
