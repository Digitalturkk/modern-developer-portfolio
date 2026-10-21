import { about } from "@/data/about";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" kanji="自己紹介" title="About">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div className="max-w-prose space-y-4 leading-relaxed">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3 className="pt-2 text-sm font-medium text-muted">Interests</h3>
          <ul className="flex flex-wrap gap-2">
            {about.interests.map((i) => (
              <li key={i} className="tag">{i}</li>
            ))}
          </ul>
        </div>

        <aside aria-labelledby="currently-heading" className="space-y-6">
          <div className="rounded-lg border border-border bg-surface p-5">
            <h3 id="currently-heading" className="mb-4 text-sm font-medium">Currently</h3>
            <dl className="space-y-3 text-sm">
              {about.currently.map((r) => (
                <div key={r.label}>
                  <dt className="text-muted">{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <h3 className="mb-4 text-sm font-medium">Languages</h3>
            <dl className="space-y-2 text-sm">
              {about.languages.map((l) => (
                <div key={l.name} className="flex justify-between gap-4">
                  <dt>{l.name}</dt>
                  <dd className="font-mono text-muted">{l.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </Section>
  );
}
