import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = { id: string; title: string; intro?: string; children: ReactNode };

export function Section({ id, title, intro, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-14 border-t border-border py-16 md:py-24">
      <Reveal className="container-page">
        <header className="mb-10 max-w-2xl">
          <h2 id={`${id}-heading`} className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
          {intro ? <p className="mt-3 text-muted">{intro}</p> : null}
        </header>
        {children}
      </Reveal>
    </section>
  );
}
