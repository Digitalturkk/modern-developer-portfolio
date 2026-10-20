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
    summary: "Discovered excessive database queries in an existing feature during integration testing and traced the issue to repeated entity fetching, identifying an N+1 query pattern that generated more than 100 database queries per request.",
    points: ["Internship"],
    },
    {
    role: "Backend Developer",
    org: "Khazar University Dunya School",
    period: "Oct 2024 – Mar 2025",
    summary: "Designed and implemented RESTful APIs with ASP.NET to manage core educational data, including courses, students, and class schedules.",
    points: ["Internship"],
    },
    {
    role: "Web Developer",
    org: "Caspian Spirit LLC",
    period: "Apr 2024 – Oct 2024",
    summary: "Proposed a custom SQL query in the data repository layer, replacing inefficient entity fetching and eliminating the N+1 query issue.",
    points: ["Internship"],
    },
    {
    role: "Web Developer",
    org: "RRAeroparts LLC",
    period: "Sep 2023 – Mar 2024",
    summary: "Identified and fixed an issue in the contact form that prevented submitted messages from being delivered to the company’s email inbox.",
    points: ["Internship"],
}]
