import { About } from "@/components/About";
import { Activities } from "@/components/Activities";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { GitHubSection } from "@/components/GitHubSection";
import { Hero } from "@/components/Hero";
import { Places } from "@/components/Places";
import { Projects } from "@/components/Projects";
import { TechMarquee } from "@/components/TechMarquee";
import { Research } from "@/components/Research";
import { Skills } from "@/components/Skills";
import { projects } from "@/data/projects";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Places />
      <Projects projects={projects} />
      <Research />
      <Experience />
      <Skills />
      <Education />
      <Activities />
      <GitHubSection />
      <Contact />
    </>
  );
}
