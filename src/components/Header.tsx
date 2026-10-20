"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { WaveMark } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = "text-sm text-muted transition-colors hover:text-fg";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="container-page flex h-14 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5 font-semibold tracking-tight" onClick={() => setOpen(false)}>
          <WaveMark className="h-7 w-7 transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5" />
          {site.name}
          <span lang="ja" aria-hidden="true" className="hidden text-xs font-normal tracking-normal text-muted sm:inline">
            ファリド
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a href={site.github} className="icon-btn hidden md:inline-flex" aria-label="GitHub profile" target="_blank" rel="noopener noreferrer">
            <GithubIcon className="h-4 w-4" />
          </a>
          <a href={site.linkedin} className="icon-btn hidden md:inline-flex" aria-label="LinkedIn profile" target="_blank" rel="noopener noreferrer">
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-bg md:hidden">
          <ul className="container-page flex flex-col py-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block py-3 text-base text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-4 border-t border-border py-3 text-sm text-muted">
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">GitHub</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">LinkedIn</a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
