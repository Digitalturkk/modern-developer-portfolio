import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { research } from "@/data/research";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "",
    "/research",
    ...projects.map((p) => `/projects/${p.slug}`),
    ...research.map((r) => `/research/${r.slug}`),
  ];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
