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
The map is framed around the countries in `src/data/places.ts`, so adding a place there also re-zooms the map.
It runs automatically before `npm run dev` and `npm run build`, and is skipped while the generated file already matches those countries, so commit the generated file.
Run `npm run map` to force a rebuild.

## Spotify playlist ("Beyond Code")

The playlist card tries three sources in order, so it always shows tracks:

1. The official Spotify Web API, when `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are set (create an app at developer.spotify.com and add both as Vercel environment variables).
2. Spotify's public embed page, which needs no keys.
3. `src/data/playlist-snapshot.json`, refreshed before every `npm run build`. Run `npm run playlist` to refresh it by hand.

## Search and AI visibility

- `src/lib/structured-data.ts` builds the schema.org JSON-LD (Person, ProfilePage, projects, research) from the data files.
- `/llms.txt` is a plain-text summary for AI assistants, also built from the data files.
- `src/app/robots.ts` explicitly allows AI search crawlers.
