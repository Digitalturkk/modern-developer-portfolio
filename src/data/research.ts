import type { ResearchItem } from "./types";

export const research: ResearchItem[] = [
  {
    slug: "microservice-architecture",
    title: "Microservice architecture in government information systems: technical, economic and organizational aspects",
    status: "Finished",
    question: "What are the technical, economic, and organizational aspects of implementing microservice architecture in government information systems?",
    summary:
      "This research investigates the technical, economic, and organizational aspects of implementing microservice architecture in government information systems. It aims to provide insights into the benefits, challenges, and best practices associated with adopting microservices in the public sector.",
    tech: ["Microservices", "Cloud Computing", "DevOps", "API Management", "Containerization", "Service Mesh"],
    datasets: ["Government Information Systems", "Microservice Architecture Case Studies", "Performance Metrics", "Cost Analysis Data"],
    methodology: {
      items: ["The research methodology involves a combination of qualitative and quantitative approaches. It includes literature review, case studies of government information systems that have adopted microservice architecture, interviews with IT professionals and stakeholders, and analysis of performance metrics and cost data."],
    },
    results: {
      items: ["The research highlights that benefits of microservice architecture in government information systems depend on the specific context and requirements of each system.", "The research identifies key technical, economic, and organizational factors that influence the successful implementation of microservices in government information systems.", "The research provides recommendations for government agencies considering the adoption of microservice architecture, including best practices for design, deployment, and management."],
    },
  },
];

export const getResearch = (slug: string) => research.find((r) => r.slug === slug);
