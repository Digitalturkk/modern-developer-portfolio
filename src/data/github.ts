export interface Repo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars?: number;
}

/**
 * Repositories shown in the GitHub section, in display order.
 * Stars and language are refreshed from the public GitHub API; the values here
 * are the fallback when the API is unavailable. Set `description` to override
 * the one on GitHub.
 */
export const featuredRepos: Repo[] = [
  {
    name: "DuckVest",
    description: "Investment brokerage platform backend built with Java and Spring Boot.",
    url: "https://github.com/digisamu/DuckVest",
    language: "Java",
    stars: 21,
  },
  {
    name: "azlib",
    description: "Full-stack app about books and libraries in Azerbaijan.",
    url: "https://github.com/digisamu/azlib",
    language: "TypeScript",
    stars: 15,
  },
  {
    name: "Getman-Postman-Clone",
    description: "An offline-first API client designed as a lightweight alternative to traditional API development tools.",
    url: "https://github.com/digisamu/Getman-Postman-Clone",
    language: "Rust",
  },
  {
    name: "BARSDAG-Bar-Stock-Exchange",
    description: "Spring Boot REST API for a bar where drinks are traded like stocks, priced by supply and demand.",
    url: "https://github.com/digisamu/BARSDAG-Bar-Stock-Exchange",
    language: "Java",
  },
  {
    name: "FinDuck",
    description: "Personal finance app for iOS.",
    url: "https://github.com/digisamu/FinDuck",
    language: "Swift",
    stars: 1,
  },
  {
    name: "MyNamae",
    description: "Animated 3D dice that build names from Turkic, Arabic and Japanese naming traditions.",
    url: "https://github.com/digisamu/MyNamae",
    language: "TypeScript",
  },
  {
    name: "MacFolioOS",
    description: "Interactive portfolio styled as a macOS desktop.",
    url: "https://github.com/digisamu/MacFolioOS",
    language: "TypeScript",
  },
  {
    name: "algorithms",
    description: "Classic algorithms (binary search, Fibonacci, min/max) implemented in several languages.",
    url: "https://github.com/digisamu/algorithms",
    language: "Java",
    stars: 11,
  },
];
