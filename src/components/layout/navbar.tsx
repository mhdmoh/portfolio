import * as React from "react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { contentService } from "@/services/content";

import { ThemeToggle } from "./theme-toggle";

const navigation = contentService.getNavigation();
const site = contentService.getSite();

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

function NavLinks({
  items,
  onNavigate,
  className,
}: {
  items: typeof navigation.primary;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav aria-label="Primary" className={cn("flex items-center gap-0.5", className)}>
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={item.href === "/"}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "relative rounded-md px-3 py-2 text-sm transition-colors duration-200",
              isActive
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )
          }
        >
          {({ isActive }) => (
            <>
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-200",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export function Navbar() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-250",
        scrolled
          ? "border-b border-border/80 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <NavLink
          to="/"
          className="group flex items-baseline gap-2 tracking-tight"
        >
          <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
            {site.name}
          </span>
        </NavLink>

        <NavLinks
          items={navigation.primary.filter((item) => item.href !== "/")}
          className="hidden md:flex"
        />

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <NavLink to={navigation.cta.href}>{navigation.cta.label}</NavLink>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <icons.menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <div className="mt-10 flex flex-col gap-1 px-4">
                <NavLinks
                  items={navigation.mobile}
                  onNavigate={() => setMobileOpen(false)}
                  className="flex-col items-start gap-0"
                />
                <Button asChild className="mt-6" onClick={() => setMobileOpen(false)}>
                  <NavLink to={navigation.cta.href}>{navigation.cta.label}</NavLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
