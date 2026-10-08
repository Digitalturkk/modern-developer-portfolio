import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "duckvest",
    title: "DuckVest",
    tagline: "Java / Spring Boot brokerage simulation platform",
    description:
      "A brokerage simulation platform built around market data, authentication, and portfolio functionality.",
    categories: ["Backend", "Full Stack", "Fintech"],
    tech: ["Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "Twelve Data API", "React"],
    // github: "https://github.com/...",  // add when you want to link the source
    overview: {
      items: [
        "A brokerage simulation platform built around market data, authentication, and portfolio functionality.",
      ],
    },
    architecture: {
      items: [
        "Backend: Java, Spring Boot",
        "Authentication: Spring Security with JWT",
        "Persistence: PostgreSQL",
        "Market data: Twelve Data API",
        "Client: React",
      ],
    },
    decisions: { placeholder: "TODO: key technical decisions (e.g. why JWT, how market data is cached, schema design)." },
    challenges: { placeholder: "TODO: real challenges you hit while building DuckVest." },
    learned: { placeholder: "TODO: what you learned from DuckVest." },
  },
  {
    slug: "getman",
    title: "Getman",
    tagline: "Open-source offline-first API client",
    description:
      "An offline-first API client designed as a lightweight alternative to traditional API development tools.",
    categories: ["Open Source"],
    tech: ["Tauri", "JavaScript/TypeScript", "API tooling", "Local storage"],
    github: "https://github.com/Digitalturkk/Getman-Postman-Clone",
    overview: {
      items: [
        "An offline-first API client designed as a lightweight alternative to traditional API development tools.",
      ],
    },
    architecture: {
      items: [
        "Desktop shell: Tauri",
        "Application code: JavaScript/TypeScript",
        "Persistence: local storage, so it works offline",
      ],
    },
    decisions: { placeholder: "TODO: key technical decisions (e.g. why Tauri, how requests are stored)." },
    challenges: { placeholder: "TODO: real challenges you hit while building Getman." },
    learned: { placeholder: "TODO: what you learned from Getman." },
  },
  {
    slug: "barsdag",
    title: "BARSDAG",
    tagline: "Stock exchange simulation platform",
    description:
      "A backend-focused stock exchange simulation exploring financial workflows and trading-system concepts.",
    categories: ["Backend", "Fintech"],
    tech: ["Java", "Spring Boot", "PostgreSQL"],
    overview: {
      items: [
        "A backend-focused stock exchange simulation exploring financial workflows and trading-system concepts.",
      ],
    },
    architecture: {
      items: ["Backend: Java, Spring Boot", "Persistence: PostgreSQL"],
    },
    decisions: { placeholder: "TODO: key technical decisions (e.g. order handling, data model)." },
    challenges: { placeholder: "TODO: real challenges you hit while building BARSDAG." },
    learned: { placeholder: "TODO: what you learned from BARSDAG." },
  },
  {
    slug: "qisajobs",
    title: "QisaJobs",
    tagline: "Freelance marketplace project",
    description: "A marketplace concept designed around the Azerbaijani freelance ecosystem.",
    categories: [],
    tech: [],
    overview: {
      items: ["A marketplace concept designed around the Azerbaijani freelance ecosystem."],
    },
    architecture: { placeholder: "TODO: stack and architecture of QisaJobs." },
    decisions: { placeholder: "TODO: key technical decisions." },
    challenges: { placeholder: "TODO: real challenges." },
    learned: { placeholder: "TODO: what you learned." },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
