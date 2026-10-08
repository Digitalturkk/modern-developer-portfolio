"use client";

import { useState } from "react";
import { filters, type FilterName, type Project } from "@/data/types";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./Section";

export function Projects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<FilterName>("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <Section id="projects" title="Projects" intro="Selected projects across backend, full-stack, open-source, and fintech work.">
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              active === f ? "border-fg bg-fg text-bg" : "border-border text-muted hover:text-fg"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      {visible.length > 0 ? (
        <ul className="grid gap-4 md:grid-cols-2">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No projects in this category yet.</p>
      )}
    </Section>
  );
}
