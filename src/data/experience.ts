import type { ExperienceItem } from "./types";

/**
 * Selected Experience. Add only verified entries. Template:
 *
 * {
 *   role: "Backend Engineering Intern",
 *   org: "Company name",
 *   period: "Mon YYYY — Mon YYYY",
 *   summary: "One sentence.",
 *   points: ["Concrete, verifiable contribution"],
 * },
 */


export const experience: ExperienceItem[] = [
    {
    role: "Software Engineer",
    org: "Brain Solutions",
    period: "Oct 2026 – Present",
    summary: "Just started :)",
    points: ["Part-Time"],
    },
    /*{
    role: "Software Engineer Intern (Remote)",
    org: "Rakuten Ichiba Division",
    period: "Feb 2026 – Apr 2026",
    summary: "Worked with Kubernetes-based R-Cloud to run and deploy containerized microservices.",
    points: ["Internship"],
    },*/
    {
    role: "Backend Engineer",
    org: "Aeronexus LLC",
    period: "May 2025 – Nov 2025",
    summary: "During integration testing I found a feature that ran more than 100 database queries per request. I traced it to repeated entity fetching, an N+1 query pattern.",
    points: ["Internship"],
    },
    {
    role: "Backend Developer",
    org: "Khazar University Dunya School",
    period: "Oct 2024 – Mar 2025",
    summary: "Designed and built REST APIs in ASP.NET for the school's courses, students and class schedules.",
    points: ["Internship"],
    },
    {
    role: "Web Developer",
    org: "Caspian Spirit LLC",
    period: "Apr 2024 – Oct 2024",
    summary: "Proposed a custom SQL query in the repository layer. It replaced repeated entity fetching and removed an N+1 query problem.",
    points: ["Internship"],
    },
    {
    role: "Web Developer",
    org: "RRAeroparts LLC",
    period: "Sep 2023 – Mar 2024",
    summary: "Found and fixed a contact form bug that stopped messages from reaching the company's inbox.",
    points: ["Internship"],
}]
