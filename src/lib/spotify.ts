import snapshot from "@/data/playlist-snapshot.json";

export interface PlaylistTrack {
  title: string;
  artist: string;
  durationMs: number;
  url: string;
}

export interface Playlist {
  name: string;
  owner: string | null;
  cover: string | null;
  trackCount: number | null;
  tracks: PlaylistTrack[];
}

interface EmbedTrack {
  uri: string;
  title: string;
  subtitle: string;
  duration: number;
}

interface EmbedEntity {
  name: string;
  subtitle?: string;
  coverArt?: { sources?: { url: string; width: number }[] };
  trackList?: EmbedTrack[];
}

interface ApiPlaylist {
  name: string;
  owner?: { display_name?: string };
  images?: { url: string; width: number | null }[];
  tracks?: {
    total: number;
    items: {
      track: { name: string; duration_ms: number; external_urls: { spotify: string }; artists: { name: string }[] } | null;
    }[];
  };
}

const DAY = 86400;
const TIMEOUT = 5000;

/** Official Web API. Used only when SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are set. */
async function fromApi(id: string): Promise<Playlist | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!tokenRes.ok) return null;
  const { access_token: token } = (await tokenRes.json()) as { access_token?: string };
  if (!token) return null;

  const fields = "name,owner(display_name),images,tracks(total,items(track(name,duration_ms,external_urls,artists(name))))";
  const res = await fetch(`https://api.spotify.com/v1/playlists/${id}?fields=${encodeURIComponent(fields)}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: DAY },
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) return null;
  const p = (await res.json()) as ApiPlaylist;
  if (!p.name) return null;

  const cover = p.images?.find((i) => i.width === 300) ?? p.images?.[0];
  return {
    name: p.name,
    owner: p.owner?.display_name ?? null,
    cover: cover?.url ?? null,
    trackCount: p.tracks?.total ?? null,
    tracks: (p.tracks?.items ?? []).flatMap(({ track }) =>
      track
        ? [
            {
              title: track.name,
              artist: track.artists.map((a) => a.name).join(", "),
              durationMs: track.duration_ms,
              url: track.external_urls.spotify,
            },
          ]
        : [],
    ),
  };
}

const fetchPage = (url: string) =>
  fetch(url, { next: { revalidate: DAY }, signal: AbortSignal.timeout(TIMEOUT) }).then((r) => (r.ok ? r.text() : ""));

/**
 * Spotify's public embed page, which needs no API key but is not an official API.
 * The embed lists at most 100 tracks, so the total comes from the playlist page.
 */
async function fromEmbed(id: string): Promise<Playlist | null> {
  const [embed, page] = await Promise.all([
    fetchPage(`https://open.spotify.com/embed/playlist/${id}`),
    fetchPage(`https://open.spotify.com/playlist/${id}`),
  ]);

  const json = embed.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
  if (!json) return null;
  const entity: EmbedEntity | undefined = JSON.parse(json)?.props?.pageProps?.state?.data?.entity;
  if (!entity?.name || !entity.trackList?.length) return null;

  const count = page.match(/property="og:description" content="[^"]*?(\d+) items"/)?.[1];
  const cover = entity.coverArt?.sources?.find((s) => s.width === 300) ?? entity.coverArt?.sources?.[0];

  return {
    name: entity.name,
    owner: entity.subtitle ?? null,
    cover: cover?.url ?? null,
    trackCount: count ? Number(count) : null,
    tracks: entity.trackList.map((t) => ({
      title: t.title,
      artist: t.subtitle,
      durationMs: t.duration,
      url: `https://open.spotify.com/track/${t.uri.split(":").pop()}`,
    })),
  };
}

/**
 * Reads a public playlist, trying the official API first, then the embed page, then the snapshot
 * saved at build time (src/data/playlist-snapshot.json), so the card always has tracks to show.
 */
export async function getPlaylist(id: string): Promise<Playlist> {
  const saved: Playlist | null = snapshot.id === id ? snapshot : null;
  for (const source of [fromApi, fromEmbed]) {
    try {
      const live = await source(id);
      if (live && live.tracks.length > 0) {
        return { ...live, trackCount: live.trackCount ?? saved?.trackCount ?? null };
      }
    } catch {
      // try the next source
    }
  }
  return saved ?? { name: "", owner: null, cover: null, trackCount: null, tracks: [] };
}
