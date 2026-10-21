import { activities } from "@/data/activities";
import { Section } from "./Section";

export function Activities() {
  return (
    <Section id="activities" kanji="活動" title="Activities">
      <ul className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 md:grid-cols-3">
        {activities.map((a) => (
          <li key={a} className="border-b border-border pb-3">{a}</li>
        ))}
      </ul>
    </Section>
  );
}
