// Generates src/data/world-map.json (dot-matrix land + outlines of the highlighted countries).
// Runs automatically before `npm run dev` and `npm run build`. Skips if the file is already generated.
// Force a rebuild with: npm run map
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../src/data/world-map.json", import.meta.url));
const require = createRequire(import.meta.url);

// Names as they appear in world-atlas (Natural Earth). Türkiye is "Turkey" there.
const TARGETS = ["Azerbaijan", "Turkey", "Georgia", "Uzbekistan", "Japan"];
const WIDTH = 1000;
const STEP = 8; // dot spacing in map units

function alreadyGenerated() {
  try {
    return JSON.parse(readFileSync(OUT, "utf8")).dots.length > 0;
  } catch {
    return false;
  }
}

async function main() {
  if (!process.argv.includes("--force") && alreadyGenerated()) {
    console.log("[map] src/data/world-map.json already generated, skipping.");
    return;
  }
  const { geoNaturalEarth1, geoPath, geoContains } = await import("d3-geo");
  const { feature, merge } = await import("topojson-client");
  const topology = require("world-atlas/countries-110m.json");

  const geometries = topology.objects.countries.geometries.filter((g) => g.properties.name !== "Antarctica");
  const land = merge(topology, geometries);
  const features = feature(topology, topology.objects.countries).features;

  const projection = geoNaturalEarth1();
  projection.fitWidth(WIDTH, land);
  const path = geoPath(projection).digits(1);
  const height = Math.ceil(path.bounds(land)[1][1]) + 2;

  const targets = TARGETS.map((name) => {
    const f = features.find((c) => c.properties.name === name);
    if (!f) throw new Error(`country not found in dataset: ${name}`);
    return f;
  });

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

  writeFileSync(OUT, JSON.stringify({ width: WIDTH, height, dots, countries }));
  console.log(`[map] wrote world-map.json (${Math.round((dots.length + countries.reduce((n, c) => n + c.d.length, 0)) / 1024)} KB of path data)`);
}

main().catch((e) => {
  console.warn(`[map] could not generate world-map.json: ${e.message}`);
  console.warn("[map] the map will be blank until `npm install` finishes and `npm run map` succeeds.");
});
