"use client";

import Link from "next/link";
import { Minus, Square, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { about } from "@/data/about";
import { projects } from "@/data/projects";
import { research } from "@/data/research";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";

type Line = { text: string; href?: string; strong?: boolean };
type Entry = { id: number; cmd: string; lines: Line[] };

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
    return [{ text: `bash: ${raw.trim()}: command not found` }];
  }
  switch (input) {
    case "help":
      return COMMANDS.map((c) => ({ text: `${c.padEnd(9)} ${DESCRIPTIONS[c]}` }));
    case "about":
      return [
        { text: `${site.name}, ${site.role}.`, strong: true },
        { text: about.paragraphs[0] },
        { text: "Focus: backend engineering. Main languages: Java and C#." },
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
  const [caret, setCaret] = useState(0);
  const [motd, setMotd] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);
  const draft = useRef("");
  const nextId = useRef(0);
  const inputId = useId();

  // Keep the prompt visible. Scrolls the terminal screen only, never the page.
  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries, motd]);

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
      setMotd(false);
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

  const syncCaret = (el: HTMLInputElement) => setCaret(el.selectionStart ?? el.value.length);

  const prompt = (
    <span aria-hidden="true">
      <span className="term-user font-semibold">farid@portfolio</span>
      <span className="text-fg">:</span>
      <span className="term-path font-semibold">~</span>
      <span className="text-fg">$ </span>
    </span>
  );

  const cursor = <span className="inline-block h-[1.15em] w-[0.6em] translate-y-[0.2em] bg-fg/80 motion-safe:animate-blink" />;

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface font-mono text-sm transition-colors duration-150 focus-within:border-accent/60">
      <div className="flex items-center gap-3 border-b border-border bg-bg/60 px-3 py-2 text-xs text-muted sm:grid sm:grid-cols-[1fr_auto_1fr]">
        <span className="hidden sm:block" />
        <span className="min-w-0 flex-1 truncate">farid@portfolio: ~</span>
        <span className="flex shrink-0 justify-end gap-2.5 sm:gap-3" aria-hidden="true">
          <Minus className="h-3 w-3" />
          <Square className="h-2.5 w-2.5" />
          <X className="h-3 w-3" />
        </span>
      </div>

      {/* Fixed height keeps the panel the same size; output scrolls inside like a real terminal. */}
      <div
        ref={screenRef}
        className="h-[254px] cursor-text overflow-y-auto overscroll-contain px-4 py-3 text-xs leading-5"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a, button") || window.getSelection()?.toString()) return;
          inputRef.current?.focus({ preventScroll: true });
        }}
      >
        <div role="log" aria-label="Terminal output" aria-live="polite">
          {motd ? (
            <div className="mb-3 text-muted">
              <p className="text-fg">Welcome to {site.domain} (GNU/Linux x86_64)</p>
              <p className="mt-3">
                {" * Commands: "}
                {COMMANDS.map((c, i) => (
                  <span key={c}>
                    <button type="button" onClick={() => submit(c)} className="text-fg underline-offset-2 hover:underline">
                      {c}
                    </button>
                    {i < COMMANDS.length - 1 ? " " : null}
                  </span>
                ))}
              </p>
              <p>{" * Tab completes, ↑↓ browses history"}</p>
            </div>
          ) : null}
          {entries.map((e) => (
            <div key={e.id} className="mb-2">
              <p className="break-words text-fg">
                {prompt}
                {e.cmd}
              </p>
              {e.lines.map((l, i) => (
                <OutputLine key={i} line={l} />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-baseline">
          <label htmlFor={inputId} className="sr-only">
            Terminal command. Type help to list commands.
          </label>
          <span className="shrink-0 whitespace-pre">{prompt}</span>
          <div className="relative min-w-0 flex-1 text-base sm:text-xs">
            <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden whitespace-pre" aria-hidden="true">
              {value ? (
                <>
                  <span className="invisible">{value}</span>
                  {suffix ? <span className="text-muted/50">{suffix}</span> : null}
                </>
              ) : (
                <span className="text-xs">
                  {cursor}
                  <span className="ml-2 text-muted/60">type help</span>
                </span>
              )}
            </div>
            {value && focused ? (
              <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden whitespace-pre" aria-hidden="true">
                <span className="invisible">{value.slice(0, caret)}</span>
                {cursor}
              </div>
            ) : null}
            <input
              ref={inputRef}
              id={inputId}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                syncCaret(e.target);
                historyIndex.current = -1;
              }}
              onSelect={(e) => syncCaret(e.currentTarget)}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              enterKeyHint="send"
              className="relative block w-full bg-transparent text-fg caret-transparent outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
