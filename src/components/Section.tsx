import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** `kanji` is a short Japanese label shown as a vermilion seal next to the title. */
type Props = { id: string; title: string; kanji?: string; intro?: string; children: ReactNode };

export function Section({ id, title, kanji, intro, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="chapter scroll-mt-14 border-t border-border py-16 md:py-32">
      <Reveal className="container-page">
        <header className="relative mb-12 max-w-2xl">
          {/* Vertical chapter number in the margin (第一章, 第二章, ...), numbered by a CSS counter */}
          <span aria-hidden="true" className="chapter-label hidden xl:block" />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 id={`${id}-heading`} className="text-2xl font-semibold tracking-tight md:text-3xl">
              {title}
            </h2>
            {kanji ? (
              <span lang="ja" aria-hidden="true" className="seal">
                {kanji}
              </span>
            ) : null}
          </div>
          {intro ? <p className="mt-3 text-muted">{intro}</p> : null}
        </header>
        {children}
      </Reveal>
    </section>
  );
}
