import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { icons } from "@/lib/icons";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const Icon = resolvedTheme === "dark" ? icons.sun : icons.moon;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
    >
      <Icon className="size-4" />
    </Button>
  );
}
