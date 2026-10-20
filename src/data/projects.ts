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
    github: "https://github.com/digisamu/DuckVest",
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
    tech: ["Tauri", "Rust", "JavaScript/TypeScript", "API tooling", "Local storage"],
    github: "https://github.com/digisamu/Getman-Postman-Clone",
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
    github: "https://github.com/digisamu/BARSDAG-Bar-Stock-Exchange",
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
    slug: "mynamae",
    title: "MyNamae",
    tagline: "3D dice name generator",
    description:
      "Rolls animated 3D dice to build names from Turkic (Azerbaijani), Arabic and Japanese naming traditions, or a blend of them.",
    categories: ["Frontend"],
    tech: ["Next.js", "TypeScript", "React Three Fiber", "Three.js", "Tailwind CSS", "Vitest", "Playwright"],
    github: "https://github.com/digisamu/MyNamae",
    demo: "https://my-namae.vercel.app",
    overview: {
      items: [
        "Namae (名前) means \"name\" in Japanese. Each roll of the dice builds a name from Turkic (Azerbaijani), Arabic or Japanese naming traditions, or a blend of them.",
        "Dice can be thrown with a button, a charged hold, a drag-and-flick, the keyboard, or by shaking the device. Individual dice can be locked and the rest rerolled.",
      ],
    },
    architecture: {
      items: [
        "App: Next.js and TypeScript",
        "3D scene: Three.js via React Three Fiber and drei",
        "Name data: one module per culture, checked by a dictionary validator",
        "Writing systems: a single pure formatting function that applies the script rules",
        "Tests: Vitest for unit tests, Playwright for end-to-end tests",
      ],
    },
    decisions: {
      items: [
        "The dice decide the name: the generator picks one component per die first, then builds the six faces around it, so the result never depends on physics.",
        "Dice motion is a set of pure functions of time (anticipation, flight with three bounces, staggered settle), so skipping ahead and reduced motion land on exactly the same faces.",
        "After settling, the scene reads each die's top face back from its real orientation, and unit tests check every face on all three animation paths.",
        "All cookie logic lives in one consent module, and analytics stay off unless a provider is configured.",
      ],
    },
    challenges: { placeholder: "TODO: real challenges you hit while building MyNamae." },
    learned: { placeholder: "TODO: what you learned from MyNamae." },
  },
  {
    slug: "macfolio-os",
    title: "MacFolioOS",
    tagline: "macOS-style interactive portfolio",
    description:
      "A portfolio that runs like a macOS desktop, with working windows, Spotlight search, a Control Center and built-in apps.",
    categories: ["Frontend", "Open Source"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI"],
    github: "https://github.com/digisamu/MacFolioOS",
    demo: "https://mac-folio-os.vercel.app",
    overview: {
      items: [
        "An interactive, macOS-inspired portfolio with a desktop of working windows, dark and light mode, and boot, login, sleep and shutdown sequences.",
        "Built-in apps present the content: Notes for the bio, an interactive Terminal, VSCode for code samples, Safari, Mail, Spotify, a resume viewer, Snake and Weather.",
        "Based on Daniel Prior's open-source macOS portfolio concept, and released under the MIT license.",
      ],
    },
    architecture: {
      items: [
        "App: Next.js and TypeScript",
        "Styling: Tailwind CSS",
        "UI primitives: Radix UI components",
        "Hosting: Vercel",
      ],
    },
    decisions: { placeholder: "TODO: key technical decisions (e.g. how windows and focus are managed)." },
    challenges: { placeholder: "TODO: real challenges you hit while building MacFolioOS." },
    learned: { placeholder: "TODO: what you learned from MacFolioOS." },
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
