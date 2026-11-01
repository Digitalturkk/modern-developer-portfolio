"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { site } from "@/data/site";
import { downloadCv } from "@/lib/cv";
import { toggleTheme } from "@/lib/theme";

const OPEN_EVENT = "open-command-palette";

type Action = { id: string; label: string; hint: string; run: () => void };

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const actions = useMemo<Action[]>(
    () => [
      { id: "home", label: "Go home", hint: "Navigate", run: () => router.push("/") },
      { id: "about", label: "About", hint: "Navigate", run: () => router.push("/#about") },
      { id: "projects", label: "Projects", hint: "Navigate", run: () => router.push("/#projects") },
      { id: "research", label: "Research", hint: "Navigate", run: () => router.push("/#research") },
      { id: "experience", label: "Experience", hint: "Navigate", run: () => router.push("/#experience") },
      { id: "contact", label: "Contact", hint: "Navigate", run: () => router.push("/#contact") },
      { id: "github", label: "GitHub", hint: "Opens in a new tab", run: () => window.open(site.github, "_blank", "noopener,noreferrer") },
      {
        id: "cv",
        label: "Download CV",
        hint: "Action",
        run: () => {
          void downloadCv().then((ok) => {
            if (!ok) window.alert("The CV file is not available yet.");
          });
        },
      },
      { id: "theme", label: "Toggle theme", hint: "Action", run: toggleTheme },
    ],
    [router],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? actions.filter((a) => a.label.toLowerCase().includes(q)) : actions;
  }, [actions, query]);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [open, show, close]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function run(action: Action) {
    setOpen(false);
    action.run();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) run(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus inside the dialog
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[15vh]">
      <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg overflow-hidden rounded-lg border border-border bg-surface shadow-2xl motion-safe:animate-page-in"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded={true}
            aria-controls="palette-list"
            aria-autocomplete="list"
            aria-activedescendant={results[active] ? `palette-opt-${results[active].id}` : undefined}
            aria-label="Search commands"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Type a command"
            autoComplete="off"
            spellCheck={false}
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </div>
        <ul id="palette-list" role="listbox" aria-label="Commands" className="max-h-72 overflow-y-auto p-2">
          {results.map((a, i) => (
            <li
              key={a.id}
              id={`palette-opt-${a.id}`}
              role="option"
              aria-selected={i === active}
              onMouseMove={() => setActive(i)}
              onClick={() => run(a)}
              className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm ${
                i === active ? "bg-bg text-fg" : "text-muted"
              }`}
            >
              <span>{a.label}</span>
              <span className="font-mono text-xs text-muted">{a.hint}</span>
            </li>
          ))}
          {results.length === 0 ? (
            <li role="presentation" className="px-3 py-6 text-center text-sm text-muted">
              No matching command.
            </li>
          ) : null}
        </ul>
        <p className="border-t border-border px-4 py-2 font-mono text-xs text-muted">
          ↑↓ navigate · enter select · esc close
        </p>
      </div>
    </div>
  );
}
