export const about = {
  paragraphs: [
    "I'm a fourth-year Information Technologies student at Azerbaijan State University of Economics (UNEC), and I work on backend systems.",
    "Most of my work is on the data side of a backend. At Aeronexus I traced a feature that ran more than 100 database queries per request back to an N+1 query pattern.",
  ],
  interests: [
    "Backend architecture",
    "Databases",
    "Distributed systems",
    "Performance",
    "Security",
    "Fintech",
    "Developer tools",
  ],
  currently: [
    { label: "Studying", value: "Information Technologies at UNEC" },
    { label: "Focus", value: "Backend engineering" },
    { label: "Primary language", value: "Java / C#" },
    { label: "Learning", value: "System design · JVM · distributed systems" },
  ],
  languages: [
    { name: "English", level: "C1" },
    { name: "Turkish", level: "Native" },
    { name: "Russian", level: "Native" },
    { name: "Japanese", level: "N5 / Basic" },
  ],
} as const;
