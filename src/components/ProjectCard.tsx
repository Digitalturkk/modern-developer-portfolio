import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border bg-surface p-6 overflow-hidden transition-all duration-150 focus-within:border-accent/60 hover:border-accent/50 motion-safe:hover:-translate-y-0.5">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100" />
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">
          <Link href={`/projects/${project.slug}`} className="transition-colors group-hover:text-accent after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:text-accent motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
      <p className="mt-1 text-sm text-muted">{project.tagline}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed">{project.description}</p>

      {project.tech.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
          {project.tech.map((t) => (
            <li key={t} className="tag transition-colors group-hover:border-accent/30">{t}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm">
        {project.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="link relative z-10">
            GitHub
          </a>
        ) : (
          <span className="text-muted">Source available on request</span>
        )}
        {project.demo ? (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link relative z-10">
            Live demo
          </a>
        ) : null}
        <span aria-hidden="true" className="ml-auto translate-x-1 text-xs text-muted opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">View details</span>
      </div>
    </article>
  );
}
