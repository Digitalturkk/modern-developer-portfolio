import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResearchCard } from "@/components/ResearchCard";
import { research } from "@/data/research";

export const metadata: Metadata = {
  title: "Research",
  description: "Research by Farid Huseynov, including a study of microservice architecture in government information systems.",
  alternates: { canonical: "/research" },
};

export default function ResearchIndexPage() {
  return (
    <div className="container-page max-w-3xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Home
      </Link>
      <h1 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">Research &amp; Experiments</h1>
      <p className="mt-3 text-muted">
        Self-directed investigations into how systems behave. No results are claimed until the work is finished.
      </p>
      <div className="mt-10 space-y-4">
        {research.map((r) => (
          <ResearchCard key={r.slug} item={r} />
        ))}
      </div>
    </div>
  );
}
