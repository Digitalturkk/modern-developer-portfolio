import { ArrowUpRight, Star } from "lucide-react";
import { featuredRepos, type Repo } from "@/data/github";
import { site } from "@/data/site";
import { GithubIcon } from "./Icons";
import { Section } from "./Section";

interface ApiRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}

/** Featured repos with stars and language refreshed from the GitHub API when it responds. */
async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${site.githubUser}/repos?sort=pushed&per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) return featuredRepos;
    const data = (await res.json()) as ApiRepo[];
    const live = new Map(data.map((r) => [r.name.toLowerCase(), r]));
    return featuredRepos.map((repo) => {
      const r = live.get(repo.name.toLowerCase());
      if (!r) return repo;
      return {
        ...repo,
        description: repo.description ?? r.description,
        url: r.html_url,
        language: r.language ?? repo.language,
        stars: r.stargazers_count,
      };
    });
  } catch {
    return featuredRepos;
  }
}

export async function GitHubSection() {
  const repos = await getRepos();

  return (
    <Section id="github" title="GitHub" intro="Selected public repositories, with live star counts from GitHub.">
      <ul className="grid gap-4 md:grid-cols-2">
        {repos.map((r) => (
          <li key={r.url}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/50"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm font-medium">{r.name}</span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-[color,transform] group-hover:text-accent motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="mt-2 flex-1 text-sm text-muted">{r.description ?? "No description provided."}</span>
              <span className="mt-4 flex items-center gap-4 font-mono text-xs text-muted">
                {r.language ? <span>{r.language}</span> : null}
                {typeof r.stars === "number" && r.stars > 0 ? (
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3" aria-hidden="true" />
                    {r.stars}
                    <span className="sr-only"> stars</span>
                  </span>
                ) : null}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-8">
        <GithubIcon className="h-4 w-4" />
        View GitHub profile
      </a>
    </Section>
  );
}
