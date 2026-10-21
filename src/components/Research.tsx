import Link from "next/link";
import { research } from "@/data/research";
import { ResearchCard } from "./ResearchCard";
import { Section } from "./Section";

export function Research() {
  return (
    <Section id="research" kanji="研究" title="Research & Experiments" intro="Self-directed investigations into how systems behave. No results are claimed until the work is finished.">
      <div className="space-y-4">
        {research.map((r) => (
          <ResearchCard key={r.slug} item={r} />
        ))}
      </div>
      <p className="mt-6 text-sm">
        <Link href="/research" className="link">All research</Link>
      </p>
    </Section>
  );
}
