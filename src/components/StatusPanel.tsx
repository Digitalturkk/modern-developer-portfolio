"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { about } from "@/data/about";
import { projects } from "@/data/projects";
import { research } from "@/data/research";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";

type Line = { text: string; href?: string; strong?: boolean };
type Entry = { id: number; cmd: string; lines: Line[] };

const rows = [
  ["name", "Farid Huseynov"],
  ["role", "Software Engineer"],
  ["focus", "Java backend engineering"],
  ["stack", "Spring Boot, PostgreSQL"],
  ["study", "UNEC, 2023–2027"],
] as const;

const COMMANDS = ["help", "about", "projects", "skills", "research", "github", "contact", "clear"] as const;
type Command = (typeof COMMANDS)[number];

const DESCRIPTIONS: Record<Command, string> = {
  help: "list commands",
  about: "short introduction",
  projects: "list my projects",
  skills: "my technical stack",
  research: "current research",
  github: "link to my GitHub",
  contact: "how to reach me",
  clear: "clear the terminal",
};

const isCommand = (s: string): s is Command => (COMMANDS as readonly string[]).includes(s);

// Placeholder values in site.ts are never printed as real contact details.
const hasEmail = !site.email.endsWith("example.com");
const hasLinkedin = !site.linkedin.includes("your-handle");
const short = (url: string) => url.replace("https://", "");

/** Returns output lines, or null for `clear`. */
function execute(raw: string): Line[] | null {
  const input = raw.trim().toLowerCase();
  if (!isCommand(input)) {
    return [{ text: `command not found: ${raw.trim()}. Type "help" to list commands.` }];
  }
  switch (input) {
    case "help":
      return COMMANDS.map((c) => ({ text: `${c.padEnd(9)} ${DESCRIPTIONS[c]}` }));
    case "about":
      return [
        { text: `${site.name}, ${site.role}.`, strong: true },
        { text: about.paragraphs[0] },
        { text: "Focus: Backend Engineering. Primary language: Java / C#." },
      ];
    case "projects":
      return projects.map((p) => ({ text: `${p.title}: ${p.tagline}`, href: `/projects/${p.slug}` }));
    case "skills":
      return skillGroups.map((g) => ({ text: `${g.title}: ${g.items.join(", ")}` }));
    case "research":
      return research.flatMap((r) => [
        { text: r.title, strong: true },
        { text: `Status: ${r.status}. ${r.question}` },
        { text: "Open research page", href: `/research/${r.slug}` },
      ]);
    case "github":
      return [{ text: short(site.github), href: site.github }];
    case "contact":
      return [
        hasEmail ? { text: `Email: ${site.email}`, href: `mailto:${site.email}` } : { text: "Email: not published yet" },
        { text: `GitHub: ${short(site.github)}`, href: site.github },
        hasLinkedin ? { text: "LinkedIn: open profile", href: site.linkedin } : { text: "LinkedIn: not published yet" },
      ];
    case "clear":
      return null;
  }
}

function OutputLine({ line }: { line: Line }) {
  const base = "block whitespace-pre-wrap break-words";
  if (!line.href) return <p className={`${base} ${line.strong ? "text-fg" : "text-muted"}`}>{line.text}</p>;
  if (line.href.startsWith("/")) {
    return (
      <Link href={line.href} className={`${base} link`}>
        {line.text}
      </Link>
    );
  }
  const external = line.href.startsWith("http");
  return (
    <a href={line.href} className={`${base} link`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {line.text}
    </a>
  );
}

export function StatusPanel() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);
  const draft = useRef("");
  const nextId = useRef(0);
  const inputId = useId();

  // Keep the newest output visible. Scrolls the log box only, never the page.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const typed = value.toLowerCase();
  const suggestion = typed ? (COMMANDS.find((c) => c.startsWith(typed) && c !== typed) ?? "") : "";
  const suffix = focused && suggestion ? suggestion.slice(typed.length) : "";

  function submit(raw: string) {
    const text = raw.trim();
    setValue("");
    historyIndex.current = -1;
    draft.current = "";
    if (!text) return;
    if (history.current[history.current.length - 1] !== text) history.current.push(text);
    const lines = execute(text);
    if (lines === null) {
      setEntries([]);
      return;
    }
    const id = nextId.current++;
    setEntries((prev) => [...prev, { id, cmd: text, lines }].slice(-20));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const h = history.current;
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        submit(value);
        break;
      case "Tab":
        // Only intercepted while a completion is available, so Tab never traps focus.
        if (suffix) {
          e.preventDefault();
          setValue(suggestion);
        }
        break;
      case "ArrowRight":
        if (suffix && e.currentTarget.selectionStart === value.length) {
          e.preventDefault();
          setValue(suggestion);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (h.length === 0) break;
        if (historyIndex.current === -1) draft.current = value;
        historyIndex.current = Math.min(h.length - 1, historyIndex.current + 1);
        setValue(h[h.length - 1 - historyIndex.current]);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (historyIndex.current === -1) break;
        historyIndex.current -= 1;
        setValue(historyIndex.current === -1 ? draft.current : h[h.length - 1 - historyIndex.current]);
        break;
      case "Escape":
        e.currentTarget.blur(); // lets keyboard users leave the terminal
        break;
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface font-mono text-sm transition-colors duration-150 focus-within:border-accent/60">
      <div className="border-b border-border px-4 py-2 text-xs text-muted">profile.yml</div>
      <dl className="space-y-2 px-4 py-4">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-3">
            <dt className="w-14 shrink-0 text-muted">{k}:</dt>
            <dd className="text-fg">{v}</dd>
          </div>
        ))}
      </dl>

      <div
        ref={logRef}
        role="log"
        aria-label="Terminal output"
        aria-live="polite"
        className={
          entries.length
            ? "max-h-44 space-y-3 overflow-y-auto overscroll-contain border-t border-border px-4 py-3 text-xs"
            : "sr-only"
        }
      >
        {entries.map((e) => (
          <div key={e.id} className="space-y-1 motion-safe:animate-page-in">
            <p className="break-words text-fg">
              <span className="text-muted" aria-hidden="true">~ $ </span>
              {e.cmd}
            </p>
            {e.lines.map((l, i) => (
              <OutputLine key={i} line={l} />
            ))}
          </div>
        ))}
      </div>

      <div
        className="flex cursor-text items-center gap-2 border-t border-border px-4 py-2.5 text-base sm:text-xs"
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        <label htmlFor={inputId} className="sr-only">
          Terminal command. Type help to list commands.
        </label>
        <span className="text-muted" aria-hidden="true">~ $</span>
        <div className="relative min-w-0 flex-1">
          <div className="pointer-events-none absolute left-0 top-0 max-w-full overflow-hidden whitespace-pre" aria-hidden="true">
            <span className="invisible">{value}</span>
            {suffix ? <span className="text-muted/50">{suffix}</span> : null}
            {!value && !focused ? (
              <>
                <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.15em] bg-accent motion-safe:animate-blink" />
                <span className="ml-2 text-muted/60">type help</span>
              </>
            ) : null}
            {!value && focused ? <span className="text-muted/60">type help</span> : null}
          </div>
          <input
            ref={inputRef}
            id={inputId}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              historyIndex.current = -1;
            }}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            enterKeyHint="send"
            className="relative block w-full bg-transparent text-fg caret-accent outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border px-4 py-2 text-xs text-muted">
        <div role="group" aria-label="Available commands" className="flex flex-wrap gap-x-3 gap-y-1">
          {COMMANDS.map((c) => (
            <button key={c} type="button" onClick={() => submit(c)} className="transition-colors hover:text-fg">
              {c}
            </button>
          ))}
        </div>
        <span className="hidden text-muted/60 sm:inline" aria-hidden="true">tab complete · ↑↓ history</span>
      </div>
    </div>
  );
}
