import type { ResearchItem } from "./types";

export const research: ResearchItem[] = [
  {
    slug: "database-indexing",
    title: "The Impact of Database Indexing on Query Performance Under Different Data Volumes",
    status: "In progress",
    question: "How does indexing affect query performance as database size increases?",
    summary:
      "A benchmarking study of how indexes change query performance in PostgreSQL as the number of rows grows.",
    tech: ["PostgreSQL", "SQL", "Performance benchmarking", "Database indexing"],
    datasets: ["10K", "100K", "1M", "10M"],
    methodology: {
      placeholder: "TODO: describe schema, query types, index types, hardware, and measurement approach once decided.",
    },
    results: {
      items: ["No results yet. This research is in progress and no findings are claimed."],
    },
  },
];

export const getResearch = (slug: string) => research.find((r) => r.slug === slug);
