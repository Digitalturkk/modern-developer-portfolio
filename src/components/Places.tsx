import { placesIntro } from "@/data/places";
import { Inspirations } from "./Inspirations";
import { PlacesMap } from "./PlacesMap";
import { Playlist } from "./Playlist";
import { Section } from "./Section";

export function Places() {
  return (
    <Section
      id="places"
      kanji="趣味"
      title="Beyond Code"
      intro="Get to know me better: the places I've traveled, the music I code to, and the people who inspire me."
    >
      <h3 className="text-lg font-semibold">Travels</h3>
      <p className="mb-5 mt-1 text-sm text-muted">{placesIntro}</p>
      <PlacesMap />
      <h3 className="mt-12 text-lg font-semibold">Music</h3>
      <Playlist />
      <Inspirations />
    </Section>
  );
}
