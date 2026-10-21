import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getPlaylist } from "@/lib/spotify";
import { site } from "@/data/site";

const formatDuration = (ms: number) => {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

function Equalizer() {
  return (
    <span aria-hidden="true" className="flex h-3 items-end gap-0.5">
      {[0, 300, 150].map((delay) => (
        <span
          key={delay}
          className="h-full w-0.5 origin-bottom scale-y-50 rounded-full bg-accent motion-safe:animate-eq"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

export async function Playlist() {
  const { name: fallbackName, id } = site.spotifyPlaylist;
  const url = `https://open.spotify.com/playlist/${id}`;
  const playlist = await getPlaylist(id);
  const name = playlist.name || fallbackName;
  const meta = ["Playlist", playlist?.owner, playlist?.trackCount ? `${playlist.trackCount} tracks` : null].filter(Boolean);

  const openLink = (
    <a href={url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
      Open in Spotify
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );

  return (
    <div className="mt-4 rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center gap-4">
        {playlist?.cover ? (
          <Image
            src={playlist.cover}
            alt=""
            width={64}
            height={64}
            unoptimized
            className="h-16 w-16 shrink-0 rounded-md border border-border object-cover"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-mono text-xs text-muted">
            <Equalizer />
            What I listen to while coding
          </p>
          <h4 className="mt-1 text-lg font-semibold tracking-tight">{name}</h4>
          <p className="font-mono text-xs text-muted">{meta.join(" · ")}</p>
        </div>
        <div className="hidden sm:block">{openLink}</div>
      </div>

      {playlist && playlist.tracks.length > 0 ? (
        <ol className="mt-5 divide-y divide-border border-t border-border" aria-label={`First tracks of ${name}`}>
          {playlist.tracks.slice(0, 5).map((t, i) => (
            <li key={t.url}>
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-2.5 text-sm"
              >
                <span className="w-5 font-mono text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 truncate">
                  <span className="transition-colors group-hover:text-accent">{t.title}</span>
                  <span className="text-muted"> · {t.artist}</span>
                </span>
                <span className="font-mono text-xs tabular-nums text-muted">{formatDuration(t.durationMs)}</span>
              </a>
            </li>
          ))}
        </ol>
      ) : null}

      <div className="mt-4 sm:hidden">{openLink}</div>
    </div>
  );
}
