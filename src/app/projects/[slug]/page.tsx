import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DetailBlock } from "@/components/DetailBlock";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.description, url: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="container-page max-w-3xl py-12 md:py-20">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-8 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h1>
        <p className="mt-3 text-lg text-muted">{project.description}</p>
        {project.tech.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
            {project.tech.map((t) => (
              <li key={t} className="tag">{t}</li>
            ))}
          </ul>
        ) : null}
      </header>

      <DetailBlock title="Overview" detail={project.overview} />
      <DetailBlock title="Architecture" detail={project.architecture} />
      <DetailBlock title="Key technical decisions" detail={project.decisions} />
      <DetailBlock title="Challenges" detail={project.challenges} />
      <DetailBlock title="What I learned" detail={project.learned} />

      <section className="border-t border-border py-8">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Links</h2>
        <ul className="space-y-2 text-sm">
          <li>
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="link">GitHub repository</a>
            ) : (
              <span className="text-muted">Source available on request</span>
            )}
          </li>
          {project.demo ? (
            <li>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link">Live demo</a>
            </li>
          ) : null}
        </ul>
      </section>
    </article>
  );
}
