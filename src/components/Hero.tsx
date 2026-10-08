import Link from "next/link";
import { Download } from "lucide-react";
import { site } from "@/data/site";
import { StatusPanel } from "./StatusPanel";

const enter = "motion-safe:animate-fade-up";
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="py-16 md:py-28">
      <div className="container-page grid items-center gap-12 md:grid-cols-[1.25fr_1fr]">
        <div>
          <p className={`font-mono text-sm text-accent ${enter}`}>{site.hero.eyebrow}</p>
          <h1
            id="hero-heading"
            className={`mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl ${enter}`}
            style={delay(60)}
          >
            {site.hero.heading}
          </h1>
          <p className={`mt-5 max-w-xl text-lg leading-relaxed text-muted ${enter}`} style={delay(120)}>
            {site.hero.text}
          </p>
          <div className={`mt-8 flex flex-wrap gap-3 ${enter}`} style={delay(180)}>
            <Link href="/#projects" className="btn-primary">
              View Projects
            </Link>
            <a href={site.cv} download className="btn-secondary group">
              <Download
                className="h-4 w-4 transition-transform motion-safe:group-hover:translate-y-0.5"
                aria-hidden="true"
              />
              Download CV
            </a>
          </div>
          <p className={`mt-8 font-mono text-xs text-muted ${enter}`} style={delay(240)}>
            {site.hero.stackLine}
          </p>
        </div>
        <div className={enter} style={delay(200)}>
          <StatusPanel />
        </div>
      </div>
    </section>
  );
}
