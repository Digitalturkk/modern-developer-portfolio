import type { Detail } from "@/data/types";

export function DetailBlock({ title, detail }: { title: string; detail: Detail }) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">{title}</h2>
      {"items" in detail ? (
        detail.items.length === 1 ? (
          <p className="max-w-prose leading-relaxed">{detail.items[0]}</p>
        ) : (
          <ul className="list-disc space-y-1.5 pl-5 leading-relaxed marker:text-muted">
            {detail.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )
      ) : (
        // detail.placeholder holds a TODO note for the site owner (see src/data). Not shown to visitors.
        <p className="text-muted">Coming soon.</p>
      )}
    </section>
  );
}
