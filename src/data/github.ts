export interface Repo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars?: number;
}

/** Shown when the GitHub API is unavailable. Only verified repositories. */
export const fallbackRepos: Repo[] = [
  {
    name: "Getman-Postman-Clone",
    description: "An offline-first API client designed as a lightweight alternative to traditional API development tools.",
    url: "https://github.com/Digitalturkk/Getman-Postman-Clone",
    language: null,
  },
];
