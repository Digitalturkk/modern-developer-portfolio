export const site = {
  name: "Farid Huseynov",
  role: "Software Engineer",
  domain: "faridhuseynov.dev",
  url: "https://faridhuseynov.dev",
  title: "Farid Huseynov — Software Engineer",
  // Used for search results, social previews and structured data, so it states the key facts plainly.
  description:
    "Farid Huseynov is a software engineer from Azerbaijan focused on backend systems with Java/C#, Spring Boot and ASP.NET. He studies Information Technologies at UNEC and is a Software Engineer intern at Brain Solutions.",
  github: "https://github.com/digisamu",
  githubUser: "digisamu",
  spotify: "https://open.spotify.com/user/Digitalturk",
  spotifyUser: "Digitalturk",
  spotifyPlaylist: { name: "Code Mode", id: "1diZ8Ey6JLonrclKNVok1y" },
  linkedin: "https://www.linkedin.com/in/husfarid/",
  email: "huseynovfarid1111@gmail.com",
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
    text: "I'm Farid Huseynov, a software engineer focused on Java/C#, Spring Boot/ASP.NET, databases, and backend architecture.",
    stackLine: "Java · Spring Boot · PostgreSQL · Docker · Linux",
  },
  contact: {
    heading: "Let's build something useful.",
    text: "Interested in software engineering, backend systems, developer tools, or fintech? Feel free to get in touch.",
  },
} as const;
