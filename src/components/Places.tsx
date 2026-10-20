import { placesIntro } from "@/data/places";
import { site } from "@/data/site";
import { PlacesMap } from "./PlacesMap";
import { Section } from "./Section";

export function Places() {
  const { name, id } = site.spotifyPlaylist;

  return (
    <Section id="places" title="Beyond Code" intro={placesIntro}>
      <PlacesMap />
      <div className="mt-4 rounded-lg border border-border bg-surface p-5">
        <h3 className="text-sm font-medium">What I listen to while coding</h3>
        <p className="mt-1 font-mono text-xs text-muted">{name} playlist on Spotify</p>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${id}`}
          title={`Spotify playlist: ${name}`}
          className="mt-4 h-[152px] w-full rounded-xl border-0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </Section>
  );
}
