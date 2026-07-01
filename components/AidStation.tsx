"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import aidBg from "@/assets/aidbg.png";



type Column = { icon?: string; label: string; label_nl?: string; label_fr?: string; type: "text" | "check" | "yesno" };
type StationRow = { name: string; dotColor?: string; finish?: boolean; values: any[] };
type AidStationData = {
    titleWord: string;
    titleScript: string;
    stationColIcon: string;
    stationColLabel: string;
    ctaLabel: string;
    ctaUrl: string;
    ctaShow: boolean;
    bgImg?: string;
    overlayOpacity?: number;
    columns: Column[];
    rows: StationRow[];
};

const UPLOAD_BASE_URL = "http://91.99.229.154";
function resolveImg(path?: string) {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return path.startsWith("/") ? `${UPLOAD_BASE_URL}${path}` : `${UPLOAD_BASE_URL}/${path}`;
}



const CheckIcon = ({ blue }: { blue?: boolean }) => (
    <svg
        className={`w-5 h-5 mx-auto ${blue ? "[color:var(--active-color)]" : "text-white/80"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

function useScrollVisible() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { setVisible(entry.isIntersecting); },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return { ref, visible };
}

const AidStations = ({ data, activeColor = "#36A5DD" }: { data: AidStationData | null; activeColor?: string }) => {
    if (!data) return null;
    const d = data;
    const stations = d.rows;
    const totalStations = stations.length;
    const scrollRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const title = useScrollVisible();
    const table = useScrollVisible();
    const cta = useScrollVisible();

    const bgImgUrl = resolveImg(d.bgImg);
    const o = (d.overlayOpacity ?? 40) / 100;
    const ratio = o / 0.4; // keeps default (40) visually identical to original gradient

    // Parse activeColor (hex) into r,g,b for rgba() usage in dots/lines
    const hexToRgb = (hex: string) => {
        const clean = hex.replace('#', '')
        const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean
        const num = parseInt(full, 16)
        if (isNaN(num)) return { r: 54, g: 165, b: 221 } // fallback to original blue
        return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
    }
    const { r, g, b } = hexToRgb(activeColor)
    const rgb = `${r},${g},${b}`

    useEffect(() => {
        const el = scrollRef.current;
        const thumb = thumbRef.current;
        if (!el || !thumb) return;

        const updateThumb = () => {
            const scrollable = el.scrollWidth - el.clientWidth;
            const r = el.clientWidth / el.scrollWidth;
            const thumbWidth = Math.max(r * el.clientWidth, 40);
            const thumbLeft = scrollable > 0 ? (el.scrollLeft / scrollable) * (el.clientWidth - thumbWidth) : 0;
            thumb.style.width = `${thumbWidth}px`;
            thumb.style.transform = `translateX(${thumbLeft}px)`;
        };

        updateThumb();
        el.addEventListener("scroll", updateThumb);
        window.addEventListener("resize", updateThumb);
        return () => {
            el.removeEventListener("scroll", updateThumb);
            window.removeEventListener("resize", updateThumb);
        };
    }, []);

    return (
        <section
            className="w-full relative bg-[#0a1f3d]"
            style={{
                fontFamily: "'Metropolis', sans-serif",
                backgroundImage: `url(${bgImgUrl || aidBg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                ['--active-color' as any]: activeColor,
            }}
        >
            <div
                style={{
                    background: `linear-gradient(to bottom, rgba(5,20,50,${0.55 * ratio}) 0%, rgba(5,20,50,${0.85 * ratio}) 30%, rgba(5,20,50,${0.97 * ratio}) 55%)`,
                }}
            >
                <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 pb-16 xl:pl-24">
                    {/* TITLE */}
                    <div
                        ref={title.ref}
                        className={`text-center mb-10 transition-all duration-700 ease-out ${title.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 md:translate-y-8"
                            }`}
                    >
                        <p
                            className="text-white uppercase font-black tracking-[2px] leading-[0.9]"
                            style={{ fontSize: "clamp(20px,2.75vw,31px)" }}
                        >
                            {d.titleWord}
                        </p>

                        <p
                            className="font-playlist leading-none transition-all duration-300 hover:translate-x-1 [color:var(--active-color)]"
                            style={{ fontSize: "clamp(28px,4vw,40px)", marginTop: "-3px" }}
                        >
                            {d.titleScript}
                        </p>
                    </div>

                    {/* TABLE */}
                    <div
                        ref={table.ref}
                        style={{ transitionDelay: table.visible ? "150ms" : "0ms" }}
                        className={`transition-all duration-700 ease-out ${table.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 md:translate-y-8"
                            }`}
                    >
                        <div ref={scrollRef} className="w-full overflow-x-auto aid-scroll">
                            <style>{`
                .aid-scroll {
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                }
                .aid-scroll::-webkit-scrollbar {
                    display: none !important;
                }
              `}</style>
                            <table className="w-full min-w-[700px] border-collapse font-poppins">
                                <thead>
                                    <tr className="border-b border-white/20">
                                        <th className="text-left pb-4 pt-2 pr-4 w-[22%]">
                                            <div className="flex items-center gap-2 text-white/90 text-[13px] font-bold uppercase tracking-wide">
                                                <i className={`${d.stationColIcon} w-5 text-center shrink-0`} />
                                                {d.stationColLabel}
                                            </div>
                                        </th>
                                        {d.columns.map((col, colIndex) => (
                                            <th key={colIndex} className="pb-4 pt-2 px-2 text-center">
                                                <div className="flex flex-col items-center gap-1 text-white/90 text-[12px] font-bold uppercase tracking-wide">
                                                    {col.icon && <i className={`${col.icon} text-lg`} />}
                                                    {col.label}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {stations.map((station, index) => {
                                        const dotOpacity = Math.max(0.25, 1 - (index / (totalStations - 1)) * 0.75);
                                        const lineOpacity = index < totalStations - 1
                                            ? (dotOpacity + Math.max(0.25, 1 - ((index + 1) / (totalStations - 1)) * 0.75)) / 2
                                            : 0;

                                        return (
                                            <tr key={`${station.name}-${index}`}>
                                                {/* Station name + dot + segment line */}
                                                <td className="py-0 pr-4" style={{ height: "1px" }}>
                                                    <div className="flex items-center gap-3 h-full">
                                                        <div className="relative shrink-0 w-[10px] h-full flex flex-col items-center justify-center">
                                                            {index > 0 && (
                                                                <div
                                                                    className="w-[2px] flex-1"
                                                                    style={{ backgroundColor: `rgba(${rgb},${lineOpacity + 0.1})` }}
                                                                />
                                                            )}
                                                            {index === 0 && <div className="flex-1" />}

                                                            <div
                                                                className="w-[10px] h-[10px] rounded-full shrink-0 z-10"
                                                                style={{
                                                                    backgroundColor: `rgba(${rgb},${dotOpacity})`,
                                                                    boxShadow: index === 0 ? `0 0 8px rgba(${rgb},0.8)` : "none",
                                                                }}
                                                            />

                                                            {index < totalStations - 1 && (
                                                                <div
                                                                    className="w-[2px] flex-1"
                                                                    style={{ backgroundColor: `rgba(${rgb},${lineOpacity})` }}
                                                                />
                                                            )}
                                                            {index === totalStations - 1 && <div className="flex-1" />}
                                                        </div>

                                                        <div className={`flex-1 flex items-center py-3 ${index < totalStations - 1 ? "border-b border-white/[0.08]" : ""}`}>
                                                            <span
                                                                className="text-[13px] font-bold tracking-wide"
                                                                style={{ color: station.finish ? activeColor : '#ffffff' }}
                                                            >
                                                                {station.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Dynamic columns */}
                                                {d.columns.map((col, colIndex) => {
                                                    const val = station.values?.[colIndex];
                                                    const cellBorder = index < totalStations - 1 ? "border-b border-white/[0.08]" : "";

                                                    if (col.type === "check") {
                                                        return (
                                                            <td key={colIndex} className={`py-3 px-2 text-center align-middle ${cellBorder}`}>
                                                                {val ? <CheckIcon blue={station.finish} /> : <span className="text-white/30 text-[13px]">—</span>}
                                                            </td>
                                                        );
                                                    }
                                                    if (col.type === "yesno") {
                                                        const isYes = String(val).toLowerCase() === "yes";
                                                        return (
                                                            <td key={colIndex} className={`py-3 px-2 text-center align-middle ${cellBorder}`}>
                                                                {isYes ? (
                                                                    <span className="font-bold text-[13px] [color:var(--active-color)]">YES</span>
                                                                ) : (
                                                                    <span className="text-white/60 text-[13px]">{val || "No"}</span>
                                                                )}
                                                            </td>
                                                        );
                                                    }
                                                    return (
                                                        <td
                                                            key={colIndex}
                                                            className={`py-3 px-2 text-center text-[14px] font-semibold align-middle ${cellBorder} ${!val && !station.finish ? "text-white/40" : !station.finish ? "text-white/80" : ""
                                                                }`}
                                                            style={station.finish ? { color: activeColor } : undefined}
                                                        >
                                                            {val || "--"}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div
                            className="block md:hidden mt-3 mx-1 h-[6px] rounded-full relative overflow-hidden"
                            style={{
                                backgroundColor: `rgba(${rgb},0.15)`,
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderColor: `rgba(${rgb},0.3)`,
                            }}
                        >
                            <div
                                ref={thumbRef}
                                className="absolute top-0 left-0 h-full rounded-full"
                                style={{ background: `linear-gradient(to right, ${activeColor}, ${activeColor})`, width: "40px" }}
                            />
                        </div>

                        {/* BOTTOM CTA */}
                        {d.ctaShow && (
                            <div
                                ref={cta.ref}
                                style={{ transitionDelay: cta.visible ? "200ms" : "0ms" }}
                                className={`text-center mt-10 font-poppins transition-all duration-700 ease-out ${cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 md:translate-y-8"
                                    }`}
                            >
                                <p className="text-white/75 text-[14px] mb-4">
                                    Use Livio to navigate the course and find the aid stations as a spectator,
                                </p>

                                <a
                                    href={d.ctaUrl}
                                    className="
                    relative overflow-hidden
                    inline-flex items-center justify-center
                    bg-[var(--active-color)]
                    text-white font-bold
                    rounded-full
                    px-7 py-3
                    text-[15px]
                    before:absolute before:inset-0
                    before:bg-white
                    before:rounded-full
                    before:-translate-x-[110%]
                    hover:before:translate-x-0
                    before:transition-transform
                    before:duration-[600ms]
                    before:ease-in-out
                    transition-colors duration-[600ms]
                    hover:[color:var(--active-color)]
                  "
                                >
                                    <span className="relative z-10">{d.ctaLabel}</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="relative w-full h-0">
                <svg width="46" height="23" viewBox="0 0 46 23" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 -translate-x-1/2 -top-px">
                    <path d="M0,0 Q11.5,0 23,23 Q34.5,0 46,0 Z" fill={activeColor} />
                </svg>
            </div>
        </section >
    );
};

export default AidStations;
