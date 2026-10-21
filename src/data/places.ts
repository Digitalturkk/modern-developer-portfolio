export type PlaceStatus = "home" | "visited" | "goal";

export interface Place {
  id: string;
  name: string;
  /** Country name used by the map dataset (Natural Earth calls Türkiye "Turkey"). */
  mapName: string;
  flag: string;
  status: PlaceStatus;
}

export const places: Place[] = [
  { id: "azerbaijan", name: "Azerbaijan", mapName: "Azerbaijan", flag: "🇦🇿", status: "home" },
  { id: "turkiye", name: "Türkiye", mapName: "Turkey", flag: "🇹🇷", status: "visited" },
  { id: "georgia", name: "Georgia", mapName: "Georgia", flag: "🇬🇪", status: "visited" },
  { id: "uzbekistan", name: "Uzbekistan", mapName: "Uzbekistan", flag: "🇺🇿", status: "visited" },
  { id: "kazakhstan", name: "Kazakhstan", mapName: "Kazakhstan", flag: "🇰🇿", status: "visited" },
  { id: "japan", name: "Japan", mapName: "Japan", flag: "🇯🇵", status: "goal" },
  { id: "qatar", name: "Qatar", mapName: "Qatar", flag: "🇶🇦", status: "goal" },
];

const NUMBERS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const count = (n: number) => NUMBERS[n] ?? String(n);
const names = (list: Place[]) =>
  list.length > 1 ? `${list.slice(0, -1).map((p) => p.name).join(", ")} and ${list[list.length - 1].name}` : (list[0]?.name ?? "");

const homeCountry = places.find((p) => p.status === "home");
const visitedCount = places.filter((p) => p.status === "visited").length;
const goalPlaces = places.filter((p) => p.status === "goal");

// Built from the list above, so it stays right when places change.
export const placesIntro = [
  `${count(visitedCount)} ${visitedCount === 1 ? "country" : "countries"} visited${homeCountry ? ` from home in ${homeCountry.name}` : ""}.`,
  goalPlaces.length ? `${names(goalPlaces)} ${goalPlaces.length === 1 ? "is" : "are"} next.` : "",
]
  .join(" ")
  .trim();
