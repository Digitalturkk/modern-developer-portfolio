"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function Ambient() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  // Scroll progress (rAF-throttled, transform only).
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Faint grid highlight near the cursor. Mouse only, never with reduced motion.
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = glow.current;
    if (!el || !fine.matches || reduce.matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        el.style.opacity = "1";
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={bar}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: "scaleX(0)" }}
      />
      <div aria-hidden="true" className="bg-light pointer-events-none fixed inset-0 -z-10" />
      <div aria-hidden="true" className="grid-dots pointer-events-none fixed inset-0 -z-10" />
      <div
        ref={glow}
        aria-hidden="true"
        className="grid-glow pointer-events-none fixed inset-0 -z-10 opacity-0 transition-opacity duration-300"
      />
      <div aria-hidden="true" className="bg-noise pointer-events-none fixed inset-0 -z-10" />
    </>
  );
}
