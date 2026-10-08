import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DetailBlock } from "@/components/DetailBlock";
import { getResearch, research } from "@/data/research";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getResearch(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/research/${item.slug}` },
    openGraph: { title: item.title, description: item.summary, url: `/research/${item.slug}` },
  };
}

export default async function ResearchPage({ params }: Props) {
  const { slug } = await params;
  const item = getResearch(slug);
  if (!item) notFound();

  return (
    <article className="container-page max-w-3xl py-12 md:py-20">
      <Link href="/research" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All research
      </Link>

      <header className="mt-8 pb-8">
        <span className="inline-flex items-center gap-2 rounded border border-border px-2 py-0.5 font-mono text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {item.status}
        </span>
        <h1 className="mt-4 text-balance text-2xl font-semibold tracking-tight md:text-3xl">{item.title}</h1>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
          {item.tech.map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
      </header>

      <DetailBlock title="Research question" detail={{ items: [item.question] }} />

      <section className="border-t border-border py-8">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Potential datasets</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-md border-collapse text-left text-sm">
            <caption className="sr-only">Planned dataset sizes</caption>
            <thead>
              <tr className="border-b border-border text-muted">
                <th scope="col" className="py-2 pr-6 font-medium">Rows</th>
                <th scope="col" className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {item.datasets.map((d) => (
                <tr key={d} className="border-b border-border">
                  <th scope="row" className="py-2 pr-6 font-normal">{d}</th>
                  <td className="py-2 text-muted">Planned</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <DetailBlock title="Methodology" detail={item.methodology} />
      <DetailBlock title="Results" detail={item.results} />
    </article>
  );
}
