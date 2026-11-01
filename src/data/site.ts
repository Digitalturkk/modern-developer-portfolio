export const site = {
  name: "Farid Huseynov",
  role: "Software Engineer",
  domain: "faridhuseynov.dev",
  url: "https://faridhuseynov.dev",
  title: "Farid Huseynov, software engineer",
  // Used for search results, social previews and structured data, so it states the key facts plainly.
  description:
    "Farid Huseynov is a software engineer from Azerbaijan focused on backend systems with Java/C#, Spring Boot and ASP.NET. He studies Information Technologies at UNEC and works part-time as a software engineer at Brain Solutions.",
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
    eyebrow: "Software engineer",
    heading: "I build backend systems in Java and C#.",
    text: "I'm Farid Huseynov, a software engineer from Azerbaijan. I write APIs with Spring Boot and ASP.NET, and most of my work is on the database side: queries, schemas and performance.",
    stackLine: "Java · Spring Boot · PostgreSQL · Docker · Linux",
  },
  contact: {
    heading: "Get in touch",
    text: "Write to me about backend work, databases, developer tools or fintech projects.",
  },
} as const;
