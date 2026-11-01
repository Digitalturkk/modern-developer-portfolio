import Link from "next/link";
import { research } from "@/data/research";
import { ResearchCard } from "./ResearchCard";
import { Section } from "./Section";

export function Research() {
  return (
    <Section id="research" kanji="研究" title="Research" intro="My research on software architecture. Each entry lists its question, method and results.">
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
