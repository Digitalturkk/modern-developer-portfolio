import { about } from "@/data/about";
import { activities } from "@/data/activities";
import { education } from "@/data/education";
import travel from "@/data/cities.json";
import { experience } from "@/data/experience";
import { inspirations } from "@/data/inspirations";
import { places } from "@/data/places";
import { projects } from "@/data/projects";
import { research } from "@/data/research";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";

// /llms.txt: a plain-Markdown summary of who this site is about, for AI assistants and LLM crawlers
// (https://llmstxt.org). Built from the same data files as the site, so it stays current.
export const dynamic = "force-static";

const list = (items: readonly string[]) => items.map((i) => `- ${i}`).join("\n");

function build() {
  const visited = places.filter((p) => p.status === "visited").map((p) => p.name);
  return `# ${site.name}

> ${site.description}

${about.paragraphs.join("\n\n")}

## Facts

- Name: ${site.name} (Azerbaijani: Fərid Hüseynov)
- Role: ${site.role}
- From: Azerbaijan
- Website: ${site.url}
- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
- Email: ${site.email}
- Languages: ${about.languages.map((l) => `${l.name} (${l.level})`).join(", ")}
- Interests: ${about.interests.join(", ")}
- Home city: ${travel.home.name}
- Countries visited: ${visited.join(", ")}
- Cities visited: ${travel.cities.filter((c) => places.find((p) => p.id === c.country)?.status === "visited").map((c) => c.name).join(", ")}
- Next destinations: ${travel.cities.filter((c) => places.find((p) => p.id === c.country)?.status === "goal").map((c) => c.name).join(", ")}

## Experience

${list(experience.map((e) => `${e.role} at ${e.org} (${[...(e.points ?? []), e.period].join(", ")})${e.summary ? `: ${e.summary}` : ""}`))}

## Education

${list(education.map((e) => `${e.field} at ${e.school}, ${e.status} (${e.period})`))}

## Projects

${list(projects.map((p) => `[${p.title}](${site.url}/projects/${p.slug}): ${p.description}${p.tech.length ? ` Built with ${p.tech.join(", ")}.` : ""}`))}

## Research

${list(research.map((r) => `[${r.title}](${site.url}/research/${r.slug}) (${r.status}): ${r.summary}`))}

## Skills

${list(skillGroups.map((g) => `${g.title}: ${g.items.join(", ")}`))}

## People who inspire him

${list(inspirations.map((p) => `${p.name} (${p.years}), ${p.role}: ${p.about}`))}

## Activities and achievements

${list(activities)}
`;
}

export function GET() {
  return new Response(build(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
