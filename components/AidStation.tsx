"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import arrowImg from "@/assets/Group 27_blue.png";
import aidBg from "@/assets/aidbg.png";

const stations = [
    { name: "MARKSTEIN", km: "9 km", spectators: false, cutoff: "--", finish: false },
    { name: "GRAND BALLON", km: "18 km", spectators: true, cutoff: "11:00", finish: false },
    { name: "HAAG", km: "28 km", spectators: false, cutoff: "--", finish: false },
    { name: "STORKENKOPF", km: "38 km", spectators: true, cutoff: "16:00", finish: false },
    { name: "LE MARKSTEIN", km: "46 km", spectators: true, cutoff: "--", finish: false },
    { name: "LE TSCHIPPE", km: "60 km", spectators: false, cutoff: "20:00", finish: false },
    { name: "SCHLUCHT", km: "72 km", spectators: true, cutoff: "24:00", finish: false },
    { name: "SCHLUCHT", km: "52 km", spectators: true, cutoff: "22:00", finish: false },
    { name: "FINISH LINE", km: "100 km", spectators: true, cutoff: "14:00", finish: true },
];

interface CheckIconProps {
    blue?: boolean;
}

const CheckIcon = ({ blue }: CheckIconProps) => (
    <svg
        className={`w-5 h-5 mx-auto ${blue ? "text-[#36A5DD]" : "text-white/80"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const AidStations = () => {
    const totalStations = stations.length;
    const scrollRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        const thumb = thumbRef.current;
        if (!el || !thumb) return;

        const updateThumb = () => {
            const scrollable = el.scrollWidth - el.clientWidth;
            const ratio = el.clientWidth / el.scrollWidth;
            const thumbWidth = Math.max(ratio * el.clientWidth, 40);
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
                backgroundImage: `url(${aidBg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
            }}
        >
            {/* Dark overlay */}
            <div
              style={{
                background:
                  "linear-gradient(to bottom, rgba(5,20,50,0.55) 0%, rgba(5,20,50,0.85) 30%, rgba(5,20,50,0.97) 55%)",
              }}
            >
              <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 pb-16">
                {/* TITLE */}
                <div className="text-center mb-10">
                    <h2
                        className="text-white uppercase font-black tracking-[4px] leading-none"
                        style={{ fontSize: "clamp(40px,6vw,64px)", fontStyle: "italic" }}
                    >
                        Aid Stations
                    </h2>
                    <p
                        className="text-[#36A5DD] mt-1"
                        style={{
                            fontSize: "clamp(20px,3vw,30px)",
                            fontFamily: "Georgia, serif",
                            fontStyle: "italic",
                        }}
                    >
                        8 aid stations + finish
                    </p>
                </div>

                {/* TABLE */}
                <div
                    ref={scrollRef}
                    className="w-full overflow-x-auto aid-scroll"
                >
                    <style>{`
                        /* Hide native scrollbar on all devices */
                        .aid-scroll {
                            overflow-x: auto;
                            -webkit-overflow-scrolling: touch;
                            scrollbar-width: none;
                        }
                        .aid-scroll::-webkit-scrollbar {
                            display: none !important;
                        }
                    `}</style>
                    <table className="w-full min-w-[700px] border-collapse">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="text-left pb-4 pt-2 pr-4 w-[22%]">
                                    <div className="flex items-center gap-2 text-white/90 text-[13px] font-bold uppercase tracking-wide">
                                        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                        </svg>
                                        Stations
                                    </div>
                                </th>
                                <th className="pb-4 pt-2 px-2 text-center">
                                    <div className="flex flex-col items-center gap-1 text-white/90 text-[12px] font-bold uppercase tracking-wide">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                                        </svg>
                                        KM
                                    </div>
                                </th>
                                <th className="pb-4 pt-2 px-2 text-center">
                                    <div className="flex flex-col items-center gap-1 text-white/90 text-[12px] font-bold uppercase tracking-wide">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                                            <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
                                        </svg>
                                        Drinks
                                    </div>
                                </th>
                                <th className="pb-4 pt-2 px-2 text-center">
                                    <div className="flex flex-col items-center gap-1 text-white/90 text-[12px] font-bold uppercase tracking-wide">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path d="M3 11l19-9-9 19-2-8-8-2z" />
                                        </svg>
                                        Food
                                    </div>
                                </th>
                                <th className="pb-4 pt-2 px-2 text-center">
                                    <div className="flex flex-col items-center gap-1 text-white/90 text-[12px] font-bold uppercase tracking-wide">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                                        </svg>
                                        Drop Bag
                                    </div>
                                </th>
                                <th className="pb-4 pt-2 px-2 text-center">
                                    <div className="flex flex-col items-center gap-1 text-white/90 text-[12px] font-bold uppercase tracking-wide">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                        Spectators Allowed
                                    </div>
                                </th>
                                <th className="pb-4 pt-2 pl-2 text-center">
                                    <div className="flex flex-col items-center gap-1 text-white/90 text-[12px] font-bold uppercase tracking-wide">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        Cut-Off
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {stations.map((station, index) => {
                                // Dot opacity: 1.0 at top → 0.25 at bottom
                                const dotOpacity = Math.max(0.25, 1 - (index / (totalStations - 1)) * 0.75);
                                // Line opacity between this dot and the next: average of the two dot opacities
                                const lineOpacity = index < totalStations - 1
                                    ? (dotOpacity + Math.max(0.25, 1 - ((index + 1) / (totalStations - 1)) * 0.75)) / 2
                                    : 0;

                                return (
                                    <tr
                                        key={station.name}
                                        className=""
                                    >
                                        {/* Station name + dot + segment line */}
                                        <td className="py-0 pr-4" style={{ height: "1px" }}>
                                            <div className="flex items-center gap-3 h-full">
                                                <div className="relative shrink-0 w-[10px] h-full flex flex-col items-center justify-center">
                                                    {/* Line from top of cell to dot center — skip first row */}
                                                    {index > 0 && (
                                                        <div
                                                            className="w-[2px] flex-1"
                                                            style={{
                                                                backgroundColor: `rgba(54,165,221,${lineOpacity + 0.1})`,
                                                            }}
                                                        />
                                                    )}
                                                    {/* Spacer on first row so dot stays vertically centered */}
                                                    {index === 0 && <div className="flex-1" />}

                                                    {/* Dot */}
                                                    <div
                                                        className="w-[10px] h-[10px] rounded-full shrink-0 z-10"
                                                        style={{
                                                            backgroundColor: `rgba(54,165,221,${dotOpacity})`,
                                                            boxShadow: index === 0 ? `0 0 8px rgba(54,165,221,0.8)` : "none",
                                                        }}
                                                    />

                                                    {/* Line from dot center to bottom of cell — skip last row */}
                                                    {index < totalStations - 1 && (
                                                        <div
                                                            className="w-[2px] flex-1"
                                                            style={{
                                                                backgroundColor: `rgba(54,165,221,${lineOpacity})`,
                                                            }}
                                                        />
                                                    )}
                                                    {/* Spacer on last row */}
                                                    {index === totalStations - 1 && <div className="flex-1" />}
                                                </div>

                                                {/* Station label — border starts here, skipping the dot column */}
                                                <div className={`flex-1 flex items-center py-3 ${index < totalStations - 1 ? "border-b border-white/[0.08]" : ""}`}>
                                                    <span
                                                        className={`text-[13px] font-bold tracking-wide ${
                                                            station.finish ? "text-[#36A5DD]" : "text-white"
                                                        }`}
                                                    >
                                                        {station.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* KM */}
                                        <td className={`py-3 px-2 text-center text-[14px] font-semibold align-middle ${index < totalStations - 1 ? "border-b border-white/[0.08]" : ""} ${station.finish ? "text-[#36A5DD]" : "text-white/80"}`}>
                                            {station.km}
                                        </td>

                                        {/* Drinks */}
                                        <td className={`py-3 px-2 text-center align-middle ${index < totalStations - 1 ? "border-b border-white/[0.08]" : ""}`}>
                                            <CheckIcon blue={station.finish} />
                                        </td>

                                        {/* Food */}
                                        <td className={`py-3 px-2 text-center align-middle ${index < totalStations - 1 ? "border-b border-white/[0.08]" : ""}`}>
                                            <CheckIcon blue={station.finish} />
                                        </td>

                                        {/* Drop Bag */}
                                        <td className={`py-3 px-2 text-center align-middle ${index < totalStations - 1 ? "border-b border-white/[0.08]" : ""}`}>
                                            <CheckIcon blue={station.finish} />
                                        </td>

                                        {/* Spectators */}
                                        <td className={`py-3 px-2 text-center align-middle ${index < totalStations - 1 ? "border-b border-white/[0.08]" : ""}`}>
                                            {station.spectators ? (
                                                <span className="text-[#36A5DD] font-bold text-[13px]">YES</span>
                                            ) : (
                                                <span className="text-white/60 text-[13px]">No</span>
                                            )}
                                        </td>

                                        {/* Cut-Off */}
                                        <td className={`py-3 pl-2 text-center text-[14px] font-semibold align-middle ${
                                            station.finish ? "text-[#36A5DD]" : station.cutoff === "--" ? "text-white/40" : "text-white/80"
                                        } ${index < totalStations - 1 ? "border-b border-white/[0.08]" : ""}`}>
                                            {station.cutoff}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Custom scrollbar — mobile only */}
                <div className="block md:hidden mt-3 mx-1 h-[6px] rounded-full bg-[rgba(54,165,221,0.15)] border border-[rgba(54,165,221,0.3)] relative overflow-hidden">
                    <div
                        ref={thumbRef}
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{ background: "linear-gradient(to right, #36A5DD, #5bc4f5)", width: "40px" }}
                    />
                </div>

                {/* BOTTOM CTA */}
                <div className="text-center mt-10">
                    <p className="text-white/75 text-[14px] mb-4">
                        Use Livio to navigate the course and find the aid stations as a spectator,
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-[#36A5DD] text-white font-bold rounded-full px-7 py-3 hover:opacity-90 transition-opacity text-[15px]"
                    >
                        Use Livio
                        <Image src={arrowImg} alt="arrow" width={22} height={22} />
                    </a>
                </div>
              </div>
            </div>

            {/* Small centered down-arrow — 46x23px as per Figma, color #002248 */}
            <div className="relative w-full h-0">
                <svg
                    width="46"
                    height="23"
                    viewBox="0 0 46 23"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-1/2 -translate-x-1/2 -top-px"
                >
                    <path
                        d="M0,0 Q11.5,0 23,23 Q34.5,0 46,0 Z"
                        fill="#002248"
                    />
                </svg>
            </div>
        </section>
    );
};

export default AidStations;