import { education } from "@/data/education";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" title="Education">
      <ul className="space-y-4">
        {education.map((e) => (
          <li key={e.school} className="flex flex-col justify-between gap-2 rounded-lg border border-border bg-surface p-6 sm:flex-row">
            <div>
              <h3 className="font-semibold">{e.school}</h3>
              <p className="mt-1 text-sm text-muted">{e.field}</p>
              <p className="mt-1 text-sm">{e.status}</p>
            </div>
            <p className="font-mono text-sm text-muted">{e.period}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
