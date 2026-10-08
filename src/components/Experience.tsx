import { experience } from "@/data/experience";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" title="Selected Experience">
      {experience.length === 0 ? (
        <p className="max-w-xl text-muted">
          No professional roles to list yet. My project work is the best picture of what I build, so start with the projects above.
        </p>
      ) : (
        <ol className="relative space-y-8 border-l border-border pl-6">
          {experience.map((e) => (
            <li key={`${e.org}-${e.period}`} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <p className="font-mono text-xs text-muted">{e.period}</p>
              <h3 className="mt-1 font-semibold">{e.role} · {e.org}</h3>
              {e.summary ? <p className="mt-2 text-sm text-muted">{e.summary}</p> : null}
              {e.points?.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
