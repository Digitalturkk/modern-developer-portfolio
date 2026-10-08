import { skillGroups } from "@/data/skills";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="Technical stack">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skillGroups.map((g) => (
          <div key={g.title}>
            <h3 className="mb-3 text-sm font-medium text-muted">{g.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((i) => (
                <li key={i} className="tag text-fg">{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
