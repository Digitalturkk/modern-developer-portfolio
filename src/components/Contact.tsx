import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Section } from "./Section";

export function Contact() {
  const links = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: <Mail className="h-4 w-4" aria-hidden="true" /> },
    { label: "GitHub", value: "Digitalturkk", href: site.github, icon: <GithubIcon className="h-4 w-4" /> },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: site.linkedin, icon: <LinkedinIcon className="h-4 w-4" /> },
  ];

  return (
    <Section id="contact" title={site.contact.heading}>
      <p className="mb-8 max-w-xl text-muted">{site.contact.text}</p>
      <ul className="max-w-xl divide-y divide-border rounded-lg border border-border bg-surface">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-bg"
            >
              <span className="flex items-center gap-3">
                <span className="text-muted">{l.icon}</span>
                <span className="text-sm text-muted">{l.label}</span>
              </span>
              <span className="flex items-center gap-2 text-sm">
                {l.value}
                <ArrowUpRight className="h-4 w-4 text-muted transition-[color,transform] group-hover:text-accent motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
