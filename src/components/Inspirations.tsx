import { ArrowUpRight } from "lucide-react";
import { inspirations } from "@/data/inspirations";

export function Inspirations() {
  return (
    <>
      <h3 className="mt-12 text-lg font-semibold">People who inspire me</h3>
      <p className="mb-5 mt-1 text-sm text-muted">Two founders of modern states, and the scientist who invented fuzzy logic.</p>
      <ul className="grid gap-4 md:grid-cols-3">
        {inspirations.map((p) => (
          <li key={p.name} className="flex flex-col rounded-lg border border-border bg-surface p-6">
            <p className="font-mono text-xs text-muted">{p.years}</p>
            <h4 className="mt-2 text-lg font-semibold">{p.name}</h4>
            <p className="mt-1 text-sm text-accent">{p.role}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{p.about}</p>
            {p.why ? <p className="mt-4 border-l-2 border-shu pl-3 text-sm italic">{p.why}</p> : null}
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-1.5 self-start text-sm text-muted transition-colors hover:text-fg"
            >
              Read more
              <span className="sr-only"> about {p.name} on Wikipedia</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
