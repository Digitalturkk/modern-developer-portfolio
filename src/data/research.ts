import type { ResearchItem } from "./types";

export const research: ResearchItem[] = [
  {
    slug: "microservice-architecture",
    title: "Microservice architecture in government information systems: technical, economic and organizational aspects",
    status: "Finished",
    question: "What are the technical, economic, and organizational aspects of implementing microservice architecture in government information systems?",
    summary:
      "A study of what moving government information systems to microservices involves: the technical work, the costs, and the changes to how IT teams are organized. It looks at benefits, problems and recommended practices for the public sector.",
    tech: ["Microservices", "Cloud Computing", "DevOps", "API Management", "Containerization", "Service Mesh"],
    datasets: ["Government Information Systems", "Microservice Architecture Case Studies", "Performance Metrics", "Cost Analysis Data"],
    methodology: {
      items: ["The study combines qualitative and quantitative methods: a literature review, case studies of government systems that moved to microservices, interviews with IT professionals and stakeholders, and an analysis of performance and cost data."],
    },
    results: {
      items: ["The benefits of microservices in government systems depend on the context and requirements of each system.", "The study identifies the technical, economic and organizational factors that decide whether a microservices project in government succeeds.", "It gives government agencies recommendations for designing, deploying and managing microservices."],
    },
  },
];

export const getResearch = (slug: string) => research.find((r) => r.slug === slug);
