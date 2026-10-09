export type PlaceStatus = "visited" | "goal";

export interface Place {
  id: string;
  name: string;
  /** Country name used by the map dataset (Natural Earth calls Türkiye "Turkey"). */
  mapName: string;
  flag: string;
  status: PlaceStatus;
}

export const places: Place[] = [
  { id: "azerbaijan", name: "Azerbaijan", mapName: "Azerbaijan", flag: "🇦🇿", status: "visited" },
  { id: "turkiye", name: "Türkiye", mapName: "Turkey", flag: "🇹🇷", status: "visited" },
  { id: "georgia", name: "Georgia", mapName: "Georgia", flag: "🇬🇪", status: "visited" },
  { id: "uzbekistan", name: "Uzbekistan", mapName: "Uzbekistan", flag: "🇺🇿", status: "visited" },
  { id: "kazakhstan", name: "Kazakhstan", mapName: "Kazakhstan", flag: "🇰🇿", status: "visited" },
  { id: "japan", name: "Japan", mapName: "Japan", flag: "🇯🇵", status: "goal" },
];

export const placesIntro = "Four countries visited. Japan is next.";
