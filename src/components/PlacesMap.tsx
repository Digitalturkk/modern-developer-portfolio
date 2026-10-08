"use client";

import { useState } from "react";
import { places, type Place } from "@/data/places";
import world from "@/data/world-map.json";

interface MapCountry {
  name: string;
  d: string;
  cx: number;
  cy: number;
}
interface WorldMap {
  width: number;
  height: number;
  dots: string;
  countries: MapCountry[];
}

const map = world as WorldMap;
const visited = places.filter((p) => p.status === "visited");
const goal = places.find((p) => p.status === "goal");

const label = (p: Place) => (p.status === "visited" ? "Visited" : "Goal destination");

function shapeClass(p: Place, active: boolean) {
  if (p.status === "visited") return `stroke-accent transition-[fill] duration-150 ${active ? "fill-accent/70" : "fill-accent/35"}`;
  return `stroke-accent transition-[fill] duration-150 ${active ? "fill-accent/25" : "fill-transparent"}`;
}

function tooltipPosition(c: MapCountry): React.CSSProperties {
  const x = (c.cx / map.width) * 100;
  const y = (c.cy / map.height) * 100;
  const shift = x > 72 ? "-100%" : x < 20 ? "0" : "-50%";
  return { left: `${x}%`, top: `${y}%`, transform: `translate(${shift}, -140%)` };
}

export function PlacesMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const activeId = hovered ?? selected;

  const shapes = places.map((place) => ({ place, shape: map.countries.find((c) => c.name === place.mapName) }));
  const active = shapes.find((s) => s.place.id === activeId);

  const hoverProps = (id: string) => ({
    onPointerEnter: () => setHovered(id),
    onPointerLeave: () => setHovered(null),
  });

  return (
    <div className="grid gap-6 md:grid-cols-[1.7fr_1fr]">
      <div className="rounded-lg border border-border bg-surface p-4">
        <div className="relative">
          <svg
            viewBox={`0 0 ${map.width} ${map.height}`}
            role="img"
            aria-label="World map. Visited: Azerbaijan, Türkiye, Georgia, Uzbekistan. Goal destination: Japan."
            className="block h-auto w-full"
            onClick={() => setSelected(null)}
          >
            <path
              d={map.dots}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              className="text-fg/25"
            />
            {shapes.map(({ place, shape }) =>
              shape ? (
                <g
                  key={place.id}
                  className="cursor-pointer"
                  {...hoverProps(place.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected((s) => (s === place.id ? null : place.id));
                  }}
                >
                  <path
                    d={shape.d}
                    strokeWidth={1.2}
                    strokeLinejoin="round"
                    strokeDasharray={place.status === "goal" ? "4 3" : undefined}
                    className={shapeClass(place, activeId === place.id)}
                  />
                  {/* wider invisible stroke makes small countries easier to hit */}
                  <path d={shape.d} fill="none" stroke="transparent" strokeWidth={10} pointerEvents="stroke" />
                </g>
              ) : null,
            )}
          </svg>

          {active?.shape ? (
            <div aria-hidden="true" className="pointer-events-none absolute z-10" style={tooltipPosition(active.shape)}>
              <div className="whitespace-nowrap rounded border border-border bg-bg px-2 py-1 font-mono text-xs motion-safe:animate-page-in">
                <span>{active.place.flag} {active.place.name}</span>
                <span className="text-muted"> · {label(active.place)}</span>
              </div>
            </div>
          ) : null}
        </div>

        <ul aria-label="Map legend" className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            Visited
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rotate-45 border border-accent" />
            Future destination
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-5">
        <div>
          <h3 className="text-sm font-medium">{"Places I've been"}</h3>
          <p className="mt-1 font-mono text-xs text-muted">
            {visited.length} {visited.length === 1 ? "country" : "countries"}
          </p>
          <ul className="mt-4 space-y-1 text-sm">
            {visited.map((p) => (
              <li
                key={p.id}
                {...hoverProps(p.id)}
                className={`flex items-center gap-3 rounded px-2 py-1 transition-colors ${activeId === p.id ? "bg-bg" : ""}`}
              >
                <span aria-hidden="true">{p.flag}</span>
                {p.name}
              </li>
            ))}
          </ul>
        </div>

        {goal ? (
          <div className="border-t border-border pt-5">
            <h3 className="text-sm font-medium">Next destination</h3>
            <p
              {...hoverProps(goal.id)}
              className={`mt-3 flex items-center gap-3 rounded px-2 py-1 text-sm transition-colors ${activeId === goal.id ? "bg-bg" : ""}`}
            >
              {goal.name} <span aria-hidden="true">{goal.flag}</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
