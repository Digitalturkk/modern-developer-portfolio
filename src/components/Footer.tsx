import { site } from "@/data/site";

export function Footer() {
  const link = "text-muted transition-colors hover:text-fg";
  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col justify-between gap-6 text-sm sm:flex-row">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="text-muted">{site.role}</p>
          <p className="font-mono text-xs text-muted">{site.domain}</p>
        </div>
        <nav aria-label="Footer" className="flex gap-5">
          <a href={site.github} className={link} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.linkedin} className={link} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${site.email}`} className={link}>Email</a>
        </nav>
      </div>
      <div className="container-page mt-8 flex items-end justify-between gap-6">
        <p className="text-xs text-muted">Built with ♥ from Azerbaijan</p>
        {/* Artist's seal, as on a Japanese woodblock print */}
        <span
          lang="ja"
          aria-hidden="true"
          className="select-none rounded-[3px] bg-shu px-1 py-1.5 font-mincho text-xs leading-tight text-bg [writing-mode:vertical-rl]"
        >
          ファリド
        </span>
      </div>
    </footer>
  );
}
