// Generates src/data/world-map.json (dot-matrix land + outlines of the highlighted countries),
// framed around the countries listed in src/data/places.ts.
// Runs automatically before `npm run dev` and `npm run build`. Skips if the file is already generated
// for the same countries. Force a rebuild with: npm run map
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../src/data/world-map.json", import.meta.url));
const require = createRequire(import.meta.url);

const PLACES = fileURLToPath(new URL("../src/data/places.ts", import.meta.url));

// `mapName` values in places.ts, as they appear in world-atlas (Natural Earth). Türkiye is "Turkey" there.
const TARGETS = [...readFileSync(PLACES, "utf8").matchAll(/mapName: "([^"]+)"/g)].map((m) => m[1]);
const WIDTH = 1000;
const HEIGHT = 440;
const PADDING = 48; // space around the highlighted countries, in map units
const STEP = 8; // dot spacing in map units

function alreadyGenerated() {
  try {
    const map = JSON.parse(readFileSync(OUT, "utf8"));
    return map.dots.length > 0 && JSON.stringify(map.targets) === JSON.stringify(TARGETS);
  } catch {
    return false;
  }
}

async function main() {
  if (!process.argv.includes("--force") && alreadyGenerated()) {
    console.log("[map] src/data/world-map.json already generated, skipping.");
    return;
  }
  const { geoNaturalEarth1, geoPath, geoContains, geoCentroid } = await import("d3-geo");
  const { feature, merge } = await import("topojson-client");
  // 50m detail: the map is zoomed in, so the coarser 110m outlines would look blocky.
  const topology = require("world-atlas/countries-50m.json");

  const land = merge(topology, topology.objects.countries.geometries);
  const features = feature(topology, topology.objects.countries).features;

  const targets = TARGETS.map((name) => {
    const f = features.find((c) => c.properties.name === name);
    if (!f) throw new Error(`country not found in dataset: ${name}`);
    return f;
  });
  const region = { type: "FeatureCollection", features: targets };

  // Centre the projection on the region so it is not skewed, then fit the region inside the frame.
  const projection = geoNaturalEarth1().rotate([-geoCentroid(region)[0], 0]);
  projection.fitExtent(
    [
      [PADDING, PADDING],
      [WIDTH - PADDING, HEIGHT - PADDING],
    ],
    region,
  );
  const path = geoPath(projection).digits(0);
  const height = HEIGHT;

  let dots = "";
  for (let y = STEP / 2; y < height; y += STEP) {
    for (let x = STEP / 2; x < WIDTH; x += STEP) {
      const ll = projection.invert([x, y]);
      if (!ll || Number.isNaN(ll[0]) || Number.isNaN(ll[1])) continue;
      if (!geoContains(land, ll)) continue;
      if (targets.some((t) => geoContains(t, ll))) continue; // highlighted countries are drawn as outlines
      dots += `M${x} ${y}h.01`;
    }
  }

  const countries = targets.map((f) => {
    const [cx, cy] = path.centroid(f);
    return { name: f.properties.name, d: path(f), cx: Math.round(cx * 10) / 10, cy: Math.round(cy * 10) / 10 };
  });

  writeFileSync(OUT, JSON.stringify({ width: WIDTH, height, targets: TARGETS, dots, countries }));
  console.log(`[map] wrote world-map.json (${Math.round((dots.length + countries.reduce((n, c) => n + c.d.length, 0)) / 1024)} KB of path data)`);
}

main().catch((e) => {
  console.warn(`[map] could not generate world-map.json: ${e.message}`);
  console.warn("[map] the map will be blank until `npm install` finishes and `npm run map` succeeds.");
});
