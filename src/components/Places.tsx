import { placesIntro } from "@/data/places";
import { PlacesMap } from "./PlacesMap";
import { Playlist } from "./Playlist";
import { Section } from "./Section";

export function Places() {
  return (
    <Section id="places" title="Beyond Code" intro={placesIntro}>
      <PlacesMap />
      <Playlist />
    </Section>
  );
}
