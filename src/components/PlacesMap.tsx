"use client";

import { useEffect, useId, useRef, useState } from "react";
import { places, type Place } from "@/data/places";
import world from "@/data/world-map.json";

interface MapCountry {
  name: string;
  d: string;
  cx: number;
  cy: number;
}
interface MapPoint {
  name: string;
  x: number;
  y: number;
}
interface MapCity extends MapPoint {
  country: string;
}
interface WorldMap {
  width: number;
  height: number;
  dots: string;
  countries: MapCountry[];
  home: MapPoint;
  cities: MapCity[];
}

const map = world as WorldMap;
const home = places.find((p) => p.status === "home");
const visited = places.filter((p) => p.status === "visited");
const goals = places.filter((p) => p.status === "goal");

const LABELS = { home: "Home", visited: "Visited", goal: "Goal destination" } as const;
const label = (p: Place) => LABELS[p.status];

const citiesOf = (id: string) => map.cities.filter((c) => c.country === id).map((c) => c.name);

/** Curved route from home to a city: a quadratic Bézier bowed upwards, flatter for short hops. */
function routePath(a: MapPoint, b: MapPoint) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy);
  let nx = -dy / length;
  let ny = dx / length;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const bow = Math.min(length * 0.3, 140);
  const cx = (a.x + b.x) / 2 + nx * bow;
  const cy = (a.y + b.y) / 2 + ny * bow;
  return `M${a.x} ${a.y}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`;
}

// Draw order: nearest routes first, so the animation spreads outwards from home.
const routes = map.cities
  .map((city) => ({ city, place: places.find((p) => p.id === city.country), d: routePath(map.home, city) }))
  .sort((a, b) => Math.hypot(a.city.x - map.home.x, a.city.y - map.home.y) - Math.hypot(b.city.x - map.home.x, b.city.y - map.home.y));

const ROUTE_MS = 1100;
const STAGGER_MS = 90;

/**
 * "static": routes fully drawn (no JavaScript yet, or reduced motion).
 * "waiting": hidden until the map scrolls into view. "drawn": animating in.
 */
type DrawState = "static" | "waiting" | "drawn";

function useDrawOnView(ref: React.RefObject<Element | null>) {
  const [state, setState] = useState<DrawState>("static");
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("waiting");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("drawn");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return state;
}

function shapeClass(p: Place, active: boolean) {
  if (p.status === "home") return `stroke-shu transition-[fill] duration-150 ${active ? "fill-shu/60" : "fill-shu/30"}`;
  if (p.status === "visited") return `stroke-accent transition-[fill] duration-150 ${active ? "fill-accent/70" : "fill-accent/35"}`;
  return `stroke-accent transition-[fill] duration-150 ${active ? "fill-accent/30" : "fill-accent/10"}`;
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
  const svgRef = useRef<SVGSVGElement>(null);
  const draw = useDrawOnView(svgRef);
  const maskId = useId();

  /** Stroke-dash styles that draw a path (pathLength 1) from home to its end. */
  const drawStyle = (i: number): React.CSSProperties =>
    draw === "static"
      ? {}
      : {
          strokeDasharray: 1,
          strokeDashoffset: draw === "waiting" ? 1 : 0,
          transition: draw === "drawn" ? `stroke-dashoffset ${ROUTE_MS}ms cubic-bezier(0.65, 0, 0.35, 1) ${i * STAGGER_MS}ms` : undefined,
        };
  const popStyle = (i: number): React.CSSProperties =>
    draw === "static"
      ? {}
      : {
          opacity: draw === "waiting" ? 0 : 1,
          transition: draw === "drawn" ? `opacity 300ms ease-out ${i * STAGGER_MS + ROUTE_MS - 150}ms` : undefined,
        };

  const shapes = places.map((place) => ({ place, shape: map.countries.find((c) => c.name === place.mapName) }));
  const active = shapes.find((s) => s.place.id === activeId);

  const hoverProps = (id: string) => ({
    onPointerEnter: () => setHovered(id),
    onPointerLeave: () => setHovered(null),
  });

  return (
    <div className="grid gap-6 md:grid-cols-[1.7fr_1fr]">
      {/* Centred vertically, since the city lists can make the side panel taller than the map */}
      <div className="flex flex-col justify-center rounded-lg border border-border bg-surface p-4">
        <div className="relative">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${map.width} ${map.height}`}
            role="img"
            aria-label={`Map of trips from ${map.home.name}${home ? `, ${home.name}` : ""}. Visited: ${visited.map((p) => p.name).join(", ")}. Goal destinations: ${goals.map((p) => p.name).join(" and ")}.`}
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
                    strokeDasharray={place.status === "goal" ? "3 2" : undefined}
                    className={shapeClass(place, activeId === place.id)}
                  />
                  {/* wider invisible stroke makes small countries easier to hit */}
                  <path d={shape.d} fill="none" stroke="transparent" strokeWidth={10} pointerEvents="stroke" />
                  {/* diamond marker (as in the legend) keeps small goal countries like Qatar visible */}
                  {place.status === "goal" ? (
                    <rect
                      x={shape.cx - 4}
                      y={shape.cy - 4}
                      width={8}
                      height={8}
                      transform={`rotate(45 ${shape.cx} ${shape.cy})`}
                      strokeWidth={1.5}
                      className="fill-surface stroke-accent"
                    />
                  ) : null}
                </g>
              ) : null,
            )}

            {/* Routes from home. Goal routes are dashed, so they are revealed through a mask that draws in. */}
            <g fill="none" strokeLinecap="round" pointerEvents="none">
              {routes.map(({ city, place, d }, i) => {
                // Hovering a country highlights its routes; hovering home keeps them all, since every route starts there.
                const dim = activeId !== null && activeId !== city.country && activeId !== home?.id;
                const goal = place?.status === "goal";
                return (
                  <g key={city.name} className="transition-opacity duration-200" opacity={dim ? 0.15 : 1}>
                    {goal ? (
                      <>
                        <mask id={`${maskId}-${i}`} maskUnits="userSpaceOnUse" x={0} y={0} width={map.width} height={map.height}>
                          <path d={d} stroke="white" strokeWidth={4} pathLength={1} style={drawStyle(i)} />
                        </mask>
                        <path d={d} strokeWidth={1.2} strokeDasharray="4 3" mask={`url(#${maskId}-${i})`} className="stroke-accent" />
                      </>
                    ) : (
                      <path d={d} strokeWidth={1.3} pathLength={1} style={drawStyle(i)} className="stroke-accent" />
                    )}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={2.4}
                      strokeWidth={1.2}
                      style={popStyle(i)}
                      className={goal ? "fill-surface stroke-accent" : "fill-accent stroke-surface"}
                    >
                      <title>{city.name}</title>
                    </circle>
                  </g>
                );
              })}
            </g>

            {/* Home: Baku, in vermilion, with a soft pulse */}
            <g pointerEvents="none">
              <circle
                cx={map.home.x}
                cy={map.home.y}
                r={3.5}
                className="fill-shu/40 motion-safe:animate-ping"
                style={{ transformBox: "fill-box", transformOrigin: "center", animationDuration: "2.4s" }}
              />
              <circle cx={map.home.x} cy={map.home.y} r={3.5} strokeWidth={1.2} className="fill-shu stroke-surface">
                <title>{`${map.home.name} (home)`}</title>
              </circle>
            </g>
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
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-shu" />
            Home ({map.home.name}{home ? `, ${home.name}` : ""})
          </li>
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
        {home ? (
          <div className="border-b border-border pb-5">
            <h4 className="text-sm font-medium">Home</h4>
            <p
              {...hoverProps(home.id)}
              className={`mt-3 flex items-start gap-3 rounded px-2 py-1 text-sm transition-colors ${activeId === home.id ? "bg-bg" : ""}`}
            >
              <span aria-hidden="true">{home.flag}</span>
              <span>
                {home.name}
                <span className="block font-mono text-xs text-muted">{map.home.name}</span>
              </span>
            </p>
          </div>
        ) : null}
        <div>
          <h4 className="text-sm font-medium">{"Places I've been"}</h4>
          <p className="mt-1 font-mono text-xs text-muted">
            {visited.length} {visited.length === 1 ? "country" : "countries"}
          </p>
          <ul className="mt-4 space-y-1 text-sm">
            {visited.map((p) => (
              <li
                key={p.id}
                {...hoverProps(p.id)}
                className={`flex items-start gap-3 rounded px-2 py-1 transition-colors ${activeId === p.id ? "bg-bg" : ""}`}
              >
                <span aria-hidden="true">{p.flag}</span>
                <span>
                  {p.name}
                  {citiesOf(p.id).length > 0 ? (
                    <span className="block font-mono text-xs text-muted">{citiesOf(p.id).join(" · ")}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {goals.length > 0 ? (
          <div className="border-t border-border pt-5">
            <h4 className="text-sm font-medium">Next destinations</h4>
            <ul className="mt-3 space-y-1">
              {goals.map((goal) => (
                <li
                  key={goal.id}
                  {...hoverProps(goal.id)}
                  className={`flex items-start gap-3 rounded px-2 py-1 text-sm transition-colors ${activeId === goal.id ? "bg-bg" : ""}`}
                >
                  <span>
                    {goal.name} <span aria-hidden="true">{goal.flag}</span>
                    {citiesOf(goal.id).length > 0 ? (
                      <span className="block font-mono text-xs text-muted">{citiesOf(goal.id).join(" · ")}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
