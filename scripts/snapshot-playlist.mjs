// Saves a snapshot of the Spotify playlist to src/data/playlist-snapshot.json.
// The site shows this snapshot whenever Spotify can't be reached live, so the card never loses its tracks.
// Runs before `npm run build`; keeps the previous snapshot if Spotify is unreachable.
// Refresh by hand with: npm run playlist
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../src/data/playlist-snapshot.json", import.meta.url));
const SITE = fileURLToPath(new URL("../src/data/site.ts", import.meta.url));
const TRACKS = 5; // the card shows the first five tracks

const id = readFileSync(SITE, "utf8").match(/spotifyPlaylist: \{[^}]*id: "([^"]+)"/)?.[1];

const get = (url) =>
  fetch(url, { signal: AbortSignal.timeout(10000) }).then((r) => {
    if (!r.ok) throw new Error(`${url} returned ${r.status}`);
    return r.text();
  });

async function main() {
  if (!id) throw new Error("no spotifyPlaylist id found in src/data/site.ts");
  const [embed, page] = await Promise.all([
    get(`https://open.spotify.com/embed/playlist/${id}`),
    get(`https://open.spotify.com/playlist/${id}`),
  ]);
  const json = embed.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
  const entity = json && JSON.parse(json)?.props?.pageProps?.state?.data?.entity;
  if (!entity?.name || !entity.trackList?.length) throw new Error("embed page format changed");

  const count = page.match(/property="og:description" content="[^"]*?(\d+) items"/)?.[1];
  const cover = entity.coverArt?.sources?.find((s) => s.width === 300) ?? entity.coverArt?.sources?.[0];
  const snapshot = {
    id,
    savedAt: new Date().toISOString().slice(0, 10),
    name: entity.name,
    owner: entity.subtitle ?? null,
    cover: cover?.url ?? null,
    trackCount: count ? Number(count) : null,
    tracks: entity.trackList.slice(0, TRACKS).map((t) => ({
      title: t.title,
      artist: t.subtitle,
      durationMs: t.duration,
      url: `https://open.spotify.com/track/${t.uri.split(":").pop()}`,
    })),
  };
  writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(`[playlist] saved "${snapshot.name}" (${snapshot.tracks.length} tracks) to playlist-snapshot.json`);
}

main().catch((e) => {
  console.warn(`[playlist] could not refresh the snapshot: ${e.message}`);
  console.warn("[playlist] keeping the existing playlist-snapshot.json.");
});
