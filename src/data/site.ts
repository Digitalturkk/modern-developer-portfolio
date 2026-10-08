export const site = {
  name: "Farid Huseynov",
  role: "Software Engineer",
  domain: "faridhuseynov.dev",
  url: "https://faridhuseynov.dev",
  title: "Farid Huseynov — Software Engineer",
  description:
    "Personal portfolio of Farid Huseynov, a software engineer focused on Java, Spring Boot, backend systems, databases, and software engineering.",
  github: "https://github.com/Digitalturkk",
  githubUser: "Digitalturkk",
  // TODO: replace with your real LinkedIn URL.
  linkedin: "https://www.linkedin.com/in/your-handle",
  // TODO: replace with your real email address.
  email: "email@example.com",
  // TODO: put your CV at public/Farid-Huseynov-CV.pdf (or change this path).
  cv: "/Farid-Huseynov-CV.pdf",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Research", href: "/#research" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
  hero: {
    eyebrow: "Software Engineer",
    heading: "Building reliable software and backend systems.",
    text: "I'm Farid Huseynov, a software engineer focused on Java, Spring Boot, databases, and backend architecture.",
    stackLine: "Java · Spring Boot · PostgreSQL · Docker · Linux",
  },
  contact: {
    heading: "Let's build something useful.",
    text: "Interested in software engineering, backend systems, developer tools, or fintech? Feel free to get in touch.",
  },
} as const;
