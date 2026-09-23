import * as React from "react";

import { cn, withBase } from "@/lib/utils";

/**
 * Global studio atmosphere: pattern veil + soft ambient light.
 * Evolved from the original forest-green portfolio — quieter, systems-themed,
 * and respectful of prefers-reduced-motion / coarse pointers.
 */
export function Atmosphere({ className }: { className?: string }) {
  const glowRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number>(0);
  const targetRef = React.useRef({ x: 0.5, y: 0.35 });

  React.useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    if (motionQuery.matches || !pointerQuery.matches) {
      glow.style.setProperty("--gx", "50%");
      glow.style.setProperty("--gy", "28%");
      return;
    }

    const onMove = (event: PointerEvent) => {
      targetRef.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
    };

    const tick = () => {
      const currentX = Number.parseFloat(glow.style.getPropertyValue("--gx")) || 50;
      const currentY = Number.parseFloat(glow.style.getPropertyValue("--gy")) || 28;
      const nextX = currentX + (targetRef.current.x * 100 - currentX) * 0.08;
      const nextY = currentY + (targetRef.current.y * 100 - currentY) * 0.08;
      glow.style.setProperty("--gx", `${nextX}%`);
      glow.style.setProperty("--gy", `${nextY}%`);
      frameRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 opacity-[0.045] dark:opacity-[0.055]"
        style={{
          backgroundImage: `url(${withBase("/images/pattern.svg")})`,
          backgroundRepeat: "repeat",
          backgroundSize: "120px 120px",
        }}
      />
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-70 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 50vw 50vw at var(--gx, 50%) var(--gy, 28%), var(--glow), transparent 70%)",
        }}
      />
    </div>
  );
}
