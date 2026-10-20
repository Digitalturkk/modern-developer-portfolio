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

const fetchPage = (url: string) =>
  fetch(url, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(5000) }).then((r) => (r.ok ? r.text() : ""));

/**
 * Reads a public playlist from Spotify's embed page, which needs no API key.
 * The embed lists at most 100 tracks, so the total comes from the playlist page.
 * Returns null when Spotify is unreachable or the page format changes.
 */
export async function getPlaylist(id: string): Promise<Playlist | null> {
  try {
    const [embed, page] = await Promise.all([
      fetchPage(`https://open.spotify.com/embed/playlist/${id}`),
      fetchPage(`https://open.spotify.com/playlist/${id}`),
    ]);

    const json = embed.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
    if (!json) return null;
    const entity: EmbedEntity | undefined = JSON.parse(json)?.props?.pageProps?.state?.data?.entity;
    if (!entity?.name) return null;

    const count = page.match(/property="og:description" content="[^"]*?(\d+) items"/)?.[1];
    const cover = entity.coverArt?.sources?.find((s) => s.width === 300) ?? entity.coverArt?.sources?.[0];

    return {
      name: entity.name,
      owner: entity.subtitle ?? null,
      cover: cover?.url ?? null,
      trackCount: count ? Number(count) : null,
      tracks: (entity.trackList ?? []).map((t) => ({
        title: t.title,
        artist: t.subtitle,
        durationMs: t.duration,
        url: `https://open.spotify.com/track/${t.uri.split(":").pop()}`,
      })),
    };
  } catch {
    return null;
  }
}
