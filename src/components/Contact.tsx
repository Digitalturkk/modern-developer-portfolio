import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Section } from "./Section";

export function Contact() {
  const links = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: <Mail className="h-4 w-4" aria-hidden="true" /> },
    { label: "GitHub", value: site.githubUser, href: site.github, icon: <GithubIcon className="h-4 w-4" /> },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: site.linkedin, icon: <LinkedinIcon className="h-4 w-4" /> },
  ];

  return (
    <Section id="contact" kanji="連絡" title={site.contact.heading}>
      <p className="mb-8 max-w-xl text-muted">{site.contact.text}</p>
      <ul className="max-w-xl divide-y divide-border rounded-lg border border-border bg-surface">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-bg"
            >
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-muted">{l.icon}</span>
                {/* The icon carries the meaning on narrow phones, leaving room for the full email address */}
                <span className="sr-only text-sm text-muted sm:not-sr-only">{l.label}</span>
              </span>
              <span className="flex min-w-0 items-center gap-2 text-sm">
                <span className="min-w-0 break-all">{l.value}</span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-[color,transform] group-hover:text-accent motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
