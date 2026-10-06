import { Dialog as DialogPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Certificate } from "@/schemas/certificate";

interface CertificateLightboxProps {
  certificate: Certificate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Accessible certificate inspector — larger image, Escape / overlay / close.
 */
export function CertificateLightbox({
  certificate,
  open,
  onOpenChange,
}: CertificateLightboxProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-foreground/40",
            "data-open:animate-in data-open:fade-in-0",
            "data-closed:animate-out data-closed:fade-out-0",
            "motion-reduce:animate-none",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-4 z-50 m-auto flex max-h-[calc(100dvh-2rem)] max-w-4xl flex-col overflow-hidden rounded-md border border-border bg-background shadow-sm outline-none sm:inset-8",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "motion-reduce:animate-none motion-reduce:data-open:zoom-in-100 motion-reduce:data-closed:zoom-out-100",
          )}
          aria-describedby={undefined}
        >
          {certificate ? (
            <>
              <div className="flex items-start justify-between gap-4 border-b border-border/70 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <DialogPrimitive.Title className="truncate text-sm font-medium tracking-tight sm:text-base">
                    {certificate.title}
                  </DialogPrimitive.Title>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {certificate.provider}
                    {certificate.year ? ` · ${certificate.year}` : ""}
                  </p>
                </div>
                <DialogPrimitive.Close asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Close certificate">
                    <XIcon className="size-4" />
                  </Button>
                </DialogPrimitive.Close>
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-muted/30 p-3 sm:p-6">
                <img
                  src={certificate.image}
                  alt={certificate.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
