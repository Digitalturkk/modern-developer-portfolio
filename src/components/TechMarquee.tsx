const items = [
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Spring Security",
  "React",
  "Next.js",
  "Docker",
  "Kubernetes",
  "Git",
  "Linux",
];

function List({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden ? true : undefined}
      className={`flex shrink-0 items-center gap-10 pr-10 font-mono text-xs text-muted motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-6 motion-reduce:gap-y-2 motion-reduce:pr-0 ${
        hidden ? "motion-reduce:hidden" : ""
      }`}
    >
      {items.map((i) => (
        <li key={i} className="whitespace-nowrap">{i}</li>
      ))}
    </ul>
  );
}

export function TechMarquee() {
  return (
    <section aria-label="Technologies I work with" className="border-t border-border py-3">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max motion-safe:animate-marquee motion-safe:hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:px-5">
          <List />
          <List hidden />
        </div>
      </div>
    </section>
  );
}
