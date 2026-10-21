import { about } from "@/data/about";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import type { Project, ResearchItem } from "@/data/types";

// schema.org structured data (JSON-LD). Search engines and AI assistants read this to
// understand who the site is about, so it is built from the same data files as the page.

const personId = `${site.url}/#person`;
const current = experience.find((e) => /present/i.test(e.period));

export const person = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  // Spellings of the name in Azerbaijani and Russian, so the person is recognised in those languages too
  alternateName: ["Fərid Hüseynov", "Фарид Гусейнов"],
  jobTitle: site.role,
  description: site.description,
  url: site.url,
  image: `${site.url}/opengraph-image`,
  email: `mailto:${site.email}`,
  homeLocation: { "@type": "Country", name: "Azerbaijan" },
  ...(current ? { worksFor: { "@type": "Organization", name: current.org } } : {}),
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  knowsAbout: [...new Set([...about.interests, ...skillGroups.flatMap((g) => g.items)])],
  knowsLanguage: about.languages.map((l) => l.name),
  sameAs: [site.github, site.linkedin],
};

/** Home page: the profile page, the person it is about, and the website. */
export const profileGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: site.title,
      inLanguage: "en",
      mainEntity: { "@id": personId },
    },
    person,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      author: { "@id": personId },
    },
  ],
};

const author = { "@type": "Person", "@id": personId, name: site.name, url: site.url };

export const projectData = (p: Project) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: p.title,
  description: p.description,
  url: `${site.url}/projects/${p.slug}`,
  ...(p.github ? { codeRepository: p.github } : {}),
  ...(p.demo ? { sameAs: p.demo } : {}),
  keywords: p.tech.join(", "),
  author,
});

export const researchData = (r: ResearchItem) => ({
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: r.title,
  abstract: r.summary,
  url: `${site.url}/research/${r.slug}`,
  keywords: r.tech.join(", "),
  author,
});
