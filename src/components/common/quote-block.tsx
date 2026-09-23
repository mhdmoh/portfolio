export function QuoteBlock({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-primary/40 pl-6 text-xl text-foreground italic">
      {children}
    </blockquote>
  );
}
