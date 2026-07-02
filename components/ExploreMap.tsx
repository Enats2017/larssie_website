"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceDot, ReferenceLine, Label, CartesianGrid } from "recharts";
import trailGeoJson from "@/assets/trail_24km.json";
import startIcon from "@/assets/start-line.png";
import finishIcon from "@/assets/start-line.png";
import checkpointIcon from "@/assets/flag.png";
import sidebarAdImage from "@/assets/aidbg.png";
import sidebarHeroImage from "@/assets/herosection.png";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface RoutePoint { lon: number; lat: number; ele: number; distanceKm: number; gainFromStart: number; }
interface Checkpoint { lon: number; lat: number; ele: number | null; plotEle: number; name: string; type: "depart" | "arrivee" | "ravitoc" | "waypoint"; distanceKm: number; gainFromStart: number; }

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dphi = toRad(lat2 - lat1);
  const dlambda = toRad(lon2 - lon1);
  const a = Math.sin(dphi / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dlambda / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function buildRoutePoints(coords: [number, number, number][]): RoutePoint[] {
  let cumDist = 0, cumGain = 0;
  return coords.map((c, i) => {
    if (i > 0) {
      const [plon, plat, pele] = coords[i - 1];
      cumDist += haversine(plat, plon, c[1], c[0]);
      const de = c[2] - pele;
      if (de > 0) cumGain += de;
    }
    return { lon: c[0], lat: c[1], ele: c[2], distanceKm: cumDist / 1000, gainFromStart: cumGain };
  });
}

function nearestPointToLatLon(points: RoutePoint[], lat: number, lon: number) {
  let best = points[0], bestDist = Infinity;
  for (const p of points) {
    const d = haversine(lat, lon, p.lat, p.lon);
    if (d < bestDist) { bestDist = d; best = p; }
  }
  return best;
}

function buildKmMarkers(points: RoutePoint[], stepKm = 5): RoutePoint[] {
  const markers: RoutePoint[] = [];
  let nextTarget = stepKm;
  for (const p of points) {
    if (p.distanceKm >= nextTarget) { markers.push(p); nextTarget += stepKm; }
  }
  return markers;
}

function niceAxisBounds(min: number, max: number, step = 50) {
  const lo = Math.floor((min - 20) / step) * step;
  const hi = Math.ceil((max + 20) / step) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= hi; v += step) ticks.push(v);
  return { lo, hi, ticks };
}

function makeCheckpointPinEl() {
  const el = document.createElement("div");
  el.style.width = "32px"; el.style.height = "38px"; el.style.cursor = "pointer";
  const img = document.createElement("img");
  img.src = checkpointIcon.src; img.alt = "Checkpoint";
  img.style.width = "100%"; img.style.height = "100%"; img.style.display = "block";
  img.style.filter = "drop-shadow(0 4px 6px rgba(15, 23, 42, 0.25))";
  el.appendChild(img);
  return el;
}

function makeStartFinishEl(label: "START" | "FINISH") {
  const el = document.createElement("div");
  el.style.display = "flex"; el.style.flexDirection = "column"; el.style.alignItems = "center"; el.style.cursor = "pointer";
  const text = document.createElement("div");
  text.textContent = label;
  text.style.fontFamily = "ui-sans-serif, system-ui, sans-serif";
  text.style.fontWeight = "800"; text.style.fontSize = "12px"; text.style.letterSpacing = "0.05em";
  text.style.color = "#ffffff"; text.style.background = label === "START" ? "#10b981" : "#ef4444";
  text.style.padding = "3px 8px"; text.style.borderRadius = "4px"; text.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  text.style.marginBottom = "4px"; text.style.whiteSpace = "nowrap";
  const img = document.createElement("img");
  img.src = (label === "START" ? startIcon : finishIcon).src; img.alt = label;
  img.style.width = "48px"; img.style.height = "48px"; img.style.display = "block";
  img.style.filter = "drop-shadow(0 4px 6px rgba(0,0,0,0.15))";
  el.appendChild(text); el.appendChild(img);
  return el;
}

function buildCheckpointPopupHTML(cp: Checkpoint) {
  const title = cp.name.toUpperCase();
  return `<div class="lt-popup"><div class="lt-body"><div class="lt-title">${title}</div>
    <div class="lt-grid">
      <div class="lt-cell lt-border-bottom"><span class="lt-label">DIST. FROM THE START</span><span class="lt-value">${cp.distanceKm.toFixed(1)} KM</span></div>
      <div class="lt-cell lt-border-bottom"><span class="lt-label">ALTITUDE</span><span class="lt-value">${cp.ele != null ? `${Math.round(cp.ele)} M` : "—"}</span></div>
      <div class="lt-cell"><span class="lt-label">M+ FROM THE START</span><span class="lt-value font-green">+${Math.round(cp.gainFromStart)} M</span></div>
      <div class="lt-cell"><span class="lt-label">MARKER TYPE</span><span class="lt-value">${cp.type.toUpperCase()}</span></div>
    </div></div></div>
    <style>
      .mapboxgl-popup { max-width: none !important; }
      .mapboxgl-popup-content { padding: 0 !important; border-radius: 8px !important; overflow: hidden; box-shadow: 0 15px 30px rgba(15,23,42,0.15) !important; border: 1px solid #e2e8f0; }
      .mapboxgl-popup-close-button { font-size: 18px; color: #94a3b8; top: 12px; right: 12px; font-weight: 300; z-index: 10; }
      .lt-popup { width: 320px; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; background: #ffffff; color: #1e293b; }
      .lt-body { padding: 20px; }
      .lt-title { font-size: 14px; font-weight: 900; color: #0f172a; letter-spacing: 0.02em; margin-bottom: 16px; padding-right: 24px; }
      .lt-grid { display: grid; grid-template-columns: 1fr 1fr; row-gap: 12px; column-gap: 16px; }
      .lt-cell { display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 8px; }
      .lt-border-bottom { border-bottom: 1px solid #f1f5f9; }
      .lt-label { font-size: 9.5px; font-weight: 700; color: #94a3b8; letter-spacing: 0.03em; margin-bottom: 2px; }
      .lt-value { font-size: 13px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em; }
      .font-green { color: #10b981 !important; }
    </style>`;
}

function makeKmMarkerEl(km: number) {
  const el = document.createElement("div");
  el.style.width = "24px"; el.style.height = "24px"; el.style.borderRadius = "50%";
  el.style.background = "#0f172a"; el.style.border = "2px solid #ffffff";
  el.style.display = "flex"; el.style.alignItems = "center"; el.style.justifyContent = "center";
  el.style.fontSize = "10px"; el.style.fontWeight = "800"; el.style.color = "#ffffff";
  el.style.fontFamily = "ui-sans-serif, system-ui, sans-serif";
  el.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)";
  el.textContent = `${km}`;
  return el;
}

// Custom chart dot: bigger colored ring, used for start/end/peak markers on the elevation profile
function ChartMarkerDot({ cx, cy, color }: { cx?: number; cy?: number; color: string }) {
  if (cx == null || cy == null) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={9} fill="#ffffff" fillOpacity={0.1} />
      <circle cx={cx} cy={cy} r={4.5} fill={color} stroke="#ffffff" strokeOpacity={0.9} strokeWidth={1.5} />
    </g>
  );
}

// Small white dot marking a regular checkpoint directly on the elevation line
function CheckpointDot({ cx, cy }: { cx?: number; cy?: number }) {
  if (cx == null || cy == null) return null;
  return <circle cx={cx} cy={cy} r={3.5} fill="#ffffff" stroke="#0f172a" strokeWidth={1.5} />;
}

// Floating pill label used above/below a dashed checkpoint guide line
function GuidePill({ viewBox, text, side }: { viewBox?: any; text: string; side: "top" | "bottom" }) {
  if (!viewBox) return null;
  const { x, y } = viewBox;
  const w = Math.max(46, text.length * 6.5 + 16);
  const boxY = side === "top" ? y - 20 : y + 4;
  const textY = boxY + 13;
  return (
    <g>
      <rect x={x - w / 2} y={boxY} width={w} height={18} rx={5} fill="#0f172a" stroke="#334155" strokeWidth={1} />
      <text x={x} y={textY} textAnchor="middle" fontSize={10} fontWeight={800} fill="#f8fafc">{text}</text>
    </g>
  );
}

export default function TrailMap(): React.ReactElement {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const hoverMarker = useRef<mapboxgl.Marker | null>(null);
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({ container: mapContainer.current!, style: "mapbox://styles/mapbox/outdoors-v12", center: [5.905, 50.365], zoom: 12 });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-left");
    map.current.on("load", () => {
      try {
        const geojson = trailGeoJson as any;
        const lineFeature = geojson.features.find((f: any) => f.geometry?.type === "LineString");
        const pointFeatures = geojson.features.filter((f: any) => f.geometry?.type === "Point");
        if (!lineFeature) throw new Error("No LineString feature found in geojson");

        const coords: [number, number, number][] = lineFeature.geometry.coordinates;
        const points = buildRoutePoints(coords);
        setRoutePoints(points);

        map.current!.addSource("trail-route", { type: "geojson", data: { type: "FeatureCollection", features: [lineFeature] } });
        const styleLayers = map.current!.getStyle()?.layers || [];
        const beforeId = styleLayers.find((l) => l.type === "symbol" && /label/i.test(l.id))?.id ?? styleLayers.find((l) => l.type === "symbol")?.id;
        map.current!.addLayer({ id: "trail-route-casing", type: "line", source: "trail-route", layout: { "line-join": "round", "line-cap": "round" }, paint: { "line-color": "#ffffff", "line-width": 6 } }, beforeId);
        map.current!.addLayer({ id: "trail-route-line", type: "line", source: "trail-route", layout: { "line-join": "round", "line-cap": "round" }, paint: { "line-color": "#10b981", "line-width": 3.5 } }, beforeId);

        const cps: Checkpoint[] = pointFeatures.map((f: any) => {
          const [lon, lat] = f.geometry.coordinates;
          const nearest = nearestPointToLatLon(points, lat, lon);
          return { lon, lat, ele: f.properties.ele ?? null, plotEle: nearest.ele, name: f.properties.name || f.properties.type, type: f.properties.type || "waypoint", distanceKm: nearest.distanceKm, gainFromStart: nearest.gainFromStart };
        });
        setCheckpoints(cps);

        cps.forEach((cp) => {
          const el = cp.type === "depart" ? makeStartFinishEl("START") : cp.type === "arrivee" ? makeStartFinishEl("FINISH") : makeCheckpointPinEl();
          const popup = new mapboxgl.Popup({ offset: 15, closeButton: true }).setHTML(buildCheckpointPopupHTML(cp));
          new mapboxgl.Marker({ element: el, anchor: "bottom" }).setLngLat([cp.lon, cp.lat]).setPopup(popup).addTo(map.current!);
        });

        buildKmMarkers(points, 5).forEach((m) => {
          new mapboxgl.Marker({ element: makeKmMarkerEl(Math.round(m.distanceKm)) }).setLngLat([m.lon, m.lat]).addTo(map.current!);
        });

        const hoverEl = document.createElement("div");
        hoverEl.style.width = "14px"; hoverEl.style.height = "14px"; hoverEl.style.borderRadius = "50%";
        hoverEl.style.background = "#3b82f6"; hoverEl.style.border = "2.5px solid white";
        hoverEl.style.boxShadow = "0 10px 15px -3px rgb(0 0 0 / 0.3)"; hoverEl.style.display = "none";
        hoverMarker.current = new mapboxgl.Marker({ element: hoverEl }).setLngLat([points[0].lon, points[0].lat]);
        hoverMarker.current.addTo(map.current!);

        const bounds = new mapboxgl.LngLatBounds();
        coords.forEach((c) => bounds.extend([c[0], c[1]] as [number, number]));
        map.current!.fitBounds(bounds, { padding: 50 });
      } catch (err) {
        console.error("Error loading trail route:", err);
        setLoadError(err instanceof Error ? err.message : "Unknown error loading route");
      }
    });
  }, []);

  useEffect(() => {
    if (!hoverMarker.current) return;
    if (hoverIdx === null || !routePoints[hoverIdx]) { hoverMarker.current.getElement().style.display = "none"; return; }
    const p = routePoints[hoverIdx];
    hoverMarker.current.setLngLat([p.lon, p.lat]);
    hoverMarker.current.getElement().style.display = "block";
  }, [hoverIdx, routePoints]);

  const stats = useMemo(() => {
    if (routePoints.length === 0) return null;
    let gain = 0, loss = 0;
    for (let i = 1; i < routePoints.length; i++) {
      const de = routePoints[i].ele - routePoints[i - 1].ele;
      if (de > 0) gain += de; else loss += -de;
    }
    return { distanceKm: routePoints[routePoints.length - 1].distanceKm, gain: Math.round(gain), loss: Math.round(loss), maxEle: Math.max(...routePoints.map((p) => p.ele)), minEle: Math.min(...routePoints.map((p) => p.ele)) };
  }, [routePoints]);

  const peakPoint = useMemo(() => routePoints.length ? routePoints.reduce((a, b) => (b.ele > a.ele ? b : a)) : null, [routePoints]);
  const startPoint = routePoints[0] ?? null;
  const endPoint = routePoints[routePoints.length - 1] ?? null;

  const chartCheckpoints = useMemo(() => checkpoints.filter((c) => c.type !== "depart" && c.type !== "arrivee"), [checkpoints]);

  const chartData = useMemo(() => {
    if (routePoints.length === 0) return [];
    const step = Math.max(1, Math.ceil(routePoints.length / 300));
    const sampled = routePoints.filter((_, i) => i % step === 0);
    const keyPoints: RoutePoint[] = [routePoints[0], peakPoint, routePoints[routePoints.length - 1]].filter(Boolean) as RoutePoint[];
    chartCheckpoints.forEach((cp) => keyPoints.push({ lon: cp.lon, lat: cp.lat, ele: cp.plotEle, distanceKm: cp.distanceKm, gainFromStart: cp.gainFromStart }));
    const merged = [...sampled];
    keyPoints.forEach((kp) => { if (!merged.some((p) => p.distanceKm === kp.distanceKm)) merged.push(kp); });
    return merged.sort((a, b) => a.distanceKm - b.distanceKm);
  }, [routePoints, peakPoint, chartCheckpoints]);

  const labeledCheckpoints = useMemo(() => {
    if (!stats || chartCheckpoints.length === 0) return [];
    const sorted = [...chartCheckpoints].sort((a, b) => a.distanceKm - b.distanceKm);
    const minGapKm = stats.distanceKm * 0.12;
    const selected: Checkpoint[] = [];
    let lastKm = -Infinity;
    sorted.forEach((cp) => { if (cp.distanceKm - lastKm >= minGapKm) { selected.push(cp); lastKm = cp.distanceKm; } });
    return selected;
  }, [chartCheckpoints, stats]);

  const yAxis = useMemo(() => stats ? niceAxisBounds(stats.minEle, stats.maxEle, 50) : null, [stats]);

  const handleChartMouseMove = useCallback((state: any) => {
    if (state && state.activeTooltipIndex != null && chartData[state.activeTooltipIndex]) {
      const chartPoint = chartData[state.activeTooltipIndex];
      const originalIdx = routePoints.findIndex((p) => p.distanceKm === chartPoint.distanceKm);
      setHoverIdx(originalIdx >= 0 ? originalIdx : null);
    }
  }, [chartData, routePoints]);

  const handleChartMouseLeave = useCallback(() => setHoverIdx(null), []);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between border-b border-slate-200 pb-6 gap-2">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">TRAIL EXPLORER</h2>
            <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Interactive Elevation Profile & Checkpoint Analytics</p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-semibold text-sm border border-emerald-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />24km Alpine Route
          </div>
        </div>

        {loadError && <div className="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm p-4 shadow-sm"><span className="font-semibold">Error Loading Route:</span> {loadError}</div>}

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-2/3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
            <div ref={mapContainer} className="w-full h-[420px]" />

            <div className="bg-slate-900 p-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Elevation Matrix</h3>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />Start</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />Peak</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" />Finish</span>
                </div>
              </div>

              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} onMouseMove={handleChartMouseMove} onMouseLeave={handleChartMouseLeave} margin={{ top: 28, right: 20, left: 4, bottom: 22 }}>
                    <defs>
                      <linearGradient id="eleFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="distanceKm" tickFormatter={(v: number) => `${v.toFixed(0)}km`} stroke="rgba(148, 163, 184, 0.5)" fontSize={11} tickLine={false} axisLine={false} minTickGap={30} />
                    <YAxis domain={yAxis ? [yAxis.lo, yAxis.hi] : ["auto", "auto"]} ticks={yAxis?.ticks} tickFormatter={(v: number) => `${v}m`} stroke="rgba(148, 163, 184, 0.5)" fontSize={11} tickLine={false} axisLine={false} width={52} tickMargin={4} />
                    <Tooltip cursor={{ stroke: "rgba(255, 255, 255, 0.2)", strokeWidth: 1 }} formatter={(value: any) => [`${Math.round(value)} m`, "Altitude"]} labelFormatter={(label: any) => `Progress: ${Number(label).toFixed(1)} km`} contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, color: "#f8fafc", fontSize: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.5)" }} />
                    <Area type="monotone" dataKey="ele" stroke="#10b981" strokeWidth={2.5} fill="url(#eleFill)" isAnimationActive={false} />
                    {chartCheckpoints.map((cp) => (
                      <ReferenceDot key={`dot-${cp.name}-${cp.distanceKm}`} x={cp.distanceKm} y={cp.plotEle} r={0} shape={(props: any) => <CheckpointDot {...props} />} />
                    ))}
                    {labeledCheckpoints.map((cp) => (
                      <ReferenceLine key={`line-${cp.name}-${cp.distanceKm}`} x={cp.distanceKm} stroke="rgba(255,255,255,0.25)" strokeDasharray="4 4">
                        <Label content={(p: any) => <GuidePill viewBox={p.viewBox} text={`${Math.round(cp.plotEle)}m`} side="top" />} position="top" />
                        <Label content={(p: any) => <GuidePill viewBox={p.viewBox} text={`${cp.distanceKm.toFixed(1)}km`} side="bottom" />} position="bottom" />
                      </ReferenceLine>
                    ))}
                    {startPoint && <ReferenceDot x={startPoint.distanceKm} y={startPoint.ele} r={0} shape={(props: any) => <ChartMarkerDot {...props} color="#10b981" />} />}
                    {endPoint && <ReferenceDot x={endPoint.distanceKm} y={endPoint.ele} r={0} shape={(props: any) => <ChartMarkerDot {...props} color="#ef4444" />} />}
                    {peakPoint && <ReferenceDot x={peakPoint.distanceKm} y={peakPoint.ele} r={0} shape={(props: any) => <ChartMarkerDot {...props} color="#f59e0b" />} />}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-4">
            {stats && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Distance</span>
                  <div className="mt-2 flex items-baseline gap-1"><span className="text-2xl font-extrabold text-slate-900">{stats.distanceKm.toFixed(1)}</span><span className="text-sm font-semibold text-slate-500">km</span></div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Elevation Gain</span>
                  <div className="mt-2 flex items-baseline gap-1"><span className="text-2xl font-extrabold text-emerald-600">+{stats.gain}</span><span className="text-sm font-semibold text-emerald-600/70">m</span></div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Elevation Loss</span>
                  <div className="mt-2 flex items-baseline gap-1"><span className="text-2xl font-extrabold text-rose-600">-{stats.loss}</span><span className="text-sm font-semibold text-rose-600/70">m</span></div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Peak Altitude</span>
                  <div className="mt-2 flex items-baseline gap-1"><span className="text-2xl font-extrabold text-amber-600">{stats.maxEle}</span><span className="text-sm font-semibold text-amber-600/70">m</span></div>
                </div>
              </div>
            )}
            <img src={sidebarAdImage.src} alt="Aid station" className="w-full rounded-2xl border border-slate-100 shadow-sm" />
            <img src={sidebarHeroImage.src} alt="Trail highlight" className="w-full rounded-2xl border border-slate-100 shadow-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}