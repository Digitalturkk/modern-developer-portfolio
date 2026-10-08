# faridhuseynov.dev

Next.js (App Router) + TypeScript + Tailwind CSS 3 + Lucide. No animation library: motion is CSS-only and respects `prefers-reduced-motion`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## Edit content (no UI changes needed)

| File | What it controls |
|---|---|
| `src/data/site.ts` | name, hero copy, links, **email, LinkedIn, CV path** |
| `src/data/projects.ts` | projects and detail pages (`placeholder` entries show "Coming soon") |
| `src/data/research.ts` | research items |
| `src/data/experience.ts` | timeline (empty until you add verified entries) |
| `src/data/skills.ts`, `education.ts`, `activities.ts`, `about.ts`, `github.ts` | the rest |

## Before deploying

1. Replace the `TODO` email and LinkedIn in `src/data/site.ts`.
2. Add your CV at `public/Farid-Huseynov-CV.pdf`.
3. Replace each `placeholder` in `projects.ts` / `research.ts` with real content.

## Deploy

Push to GitHub, import the repo in Vercel (framework preset: Next.js), then add the domain `faridhuseynov.dev`. No environment variables needed. The GitHub section uses the public API and falls back to static data on failure.

## World map ("Beyond Code")

The map is generated from Natural Earth data (`world-atlas`) by `scripts/generate-world-map.mjs` into `src/data/world-map.json`.
It runs automatically before `npm run dev` and `npm run build` and is skipped once the file has content, so commit the generated file.
Run `npm run map` to force a rebuild. Edit the countries in `src/data/places.ts`.
