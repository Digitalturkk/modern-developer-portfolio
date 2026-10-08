export const filters = ["All", "Backend", "Full Stack", "Open Source", "Fintech"] as const;
export type FilterName = (typeof filters)[number];
export type Category = Exclude<FilterName, "All">;

/** Either real content, or a TODO note for you (shown to visitors as "Coming soon"). */
export type Detail = { items: string[] } | { placeholder: string };

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  categories: Category[];
  tech: string[];
  github?: string;
  demo?: string;
  overview: Detail;
  architecture: Detail;
  decisions: Detail;
  challenges: Detail;
  learned: Detail;
}

export interface ResearchItem {
  slug: string;
  title: string;
  status: string;
  question: string;
  summary: string;
  tech: string[];
  datasets: string[];
  methodology: Detail;
  results: Detail;
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  summary?: string;
  points?: string[];
}
