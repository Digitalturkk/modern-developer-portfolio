import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ResearchItem } from "@/data/types";

export function ResearchCard({ item }: { item: ResearchItem }) {
  return (
    <article className="rounded-lg border border-border bg-surface p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded border border-border px-2 py-0.5 font-mono text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {item.status}
        </span>
      </div>
      <h3 className="mt-4 max-w-2xl text-xl font-semibold tracking-tight">{item.title}</h3>

      <dl className="mt-6 grid gap-6 text-sm md:grid-cols-2">
        <div>
          <dt className="text-muted">Research question</dt>
          <dd className="mt-1">{item.question}</dd>
        </div>
        <div>
          <dt className="text-muted">Potential datasets (rows)</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {item.datasets.map((d) => (
              <span key={d} className="tag">{d}</span>
            ))}
          </dd>
        </div>
      </dl>

      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Topics">
        {item.tech.map((t) => (
          <li key={t} className="tag">{t}</li>
        ))}
      </ul>

      <Link href={`/research/${item.slug}`} className="btn-secondary group mt-8">
        View Research
        <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </article>
  );
}
