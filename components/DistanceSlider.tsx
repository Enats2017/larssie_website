'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { StaticImageData } from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


type DistanceItem = {
    id: number
    label: string
    color: string
    initial: string
    distance: string
    elevation: string
    date: string
    time: string
    waves: string
    image: string
    badgeImg: string | null
    brandId: number      // ← added
    eventId: number      // ← added
    distanceId: number   // ← added
}

type Props = {
    distances: DistanceItem[]
}


// ── Animation ────────────────────────────────────────────────────────────────

function ScrollFadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { setVisible(entry.isIntersecting) },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
            className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
        >
            {children}
        </div>
    )
}

// ── Card ─────────────────────────────────────────────────────────────────────

function DistanceCard({ d }: { d: DistanceItem }) {
    const url = `http://91.99.229.154/larssie_website?brand_id=${d.brandId}&event_id=${d.eventId}&distance_id=${d.distanceId}&lang=en`
    console.log('distance item:', d)
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-[20px] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.08)] border border-gray-100 w-full max-w-[320px] mx-auto select-none cursor-pointer hover:shadow-[0_4px_32px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300"
        >
            {/* Image */}
            <div className="relative w-full h-[200px] overflow-hidden rounded-t-[20px]">
                <img
                    src={d.image}
                    alt={d.distance}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
            </div>

            {/* Body */}
            <div className="px-5 py-4 flex flex-col gap-2 items-center text-center min-h-[280px] justify-between">{/* ← items-center + text-center */}

                {/* Date + time row */}
                <div className="flex items-center gap-1.5 text-[#4B6B94] text-[13px] font-medium">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{d.date}</span>
                    <span className="text-gray-300 mx-0.5">•</span>
                    <span>{d.time}</span>
                </div>

                {/* Distance */}
                <h3
                    className="font-black leading-tight text-center"
                    style={{ color: '#0D2A4A', fontSize: 'clamp(28px, 6vw, 42px)' }}
                >
                    {d.distance}
                </h3>

                {/* Elevation */}
                <div className="flex items-center gap-1.5 text-[#4B6B94] text-[13px] font-semibold">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    <span>{d.elevation}</span>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-100 my-1" />

                {/* Badge + waves row */}
                <div className="flex items-center justify-center gap-3">  {/* ← justify-center */}
                    {d.badgeImg ? (
                        <img
                            src={d.badgeImg}
                            alt={d.label}
                            className="h-6 object-contain"
                        />
                    ) : (
                        <span
                            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-black tracking-wide"
                            style={{ background: d.color, color: '#fff' }}
                        >
                            {d.label}
                            <span className="text-white/80">{d.initial}</span>
                        </span>
                    )}
                    <span className="text-[#0D2A4A] text-[13px] font-semibold">{d.waves}</span>
                </div>

            </div>
        </a>
    )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function DistanceSlider({ distances }: Props) {
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef<SwiperType | null>(null)

    return (
        <section className="w-full bg-white py-12 px-4 md:px-10 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <ScrollFadeUp delay={0}>
                    <div className="mb-10 xl:pl-16">
                        <p className="font-playlist text-[28px] md:text-[40px] text-sky-500 -mb-4 transition-all duration-300 hover:translate-x-1">
                            Choose your favorite
                        </p>
                        <h2 className="font-black text-3xl md:text-4xl text-gray-900 tracking-wide mb-0">
                            DISTANCE
                        </h2>
                    </div>
                </ScrollFadeUp>

                {/* Slider */}
                <ScrollFadeUp delay={100}>
                    <div className="relative xl:pl-16">

                        <style jsx global>{`
          .distanceSwiper {
            padding-bottom: 48px !important;
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
          .distanceSwiper .swiper-pagination { bottom: 0; }
          .distanceSwiper .swiper-pagination-bullet {
            background: #8AA0BC;
            opacity: 0.35;
            width: 7px;
            height: 7px;
            transition: all 0.3s ease;
          }
          .distanceSwiper .swiper-pagination-bullet-active {
            background: #0D2A4A;
            opacity: 1;
            width: 20px;
            border-radius: 4px;
          }
        `}</style>

                        {/* ── Flex layout when cards fit on screen (≤3 cards) ── */}
                        {distances.length <= 3 ? (
                            <div className="hidden md:flex justify-center gap-8 pb-4">
                                {distances.map((d) => (
                                    <div key={d.id} className="w-[300px] flex-shrink-0">
                                        <DistanceCard d={d} />
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        {/* ── Swiper for mobile always, or when 4+ cards on desktop ── */}
                        <div className={distances.length <= 3 ? 'md:hidden' : ''}>
                            <Swiper
                                modules={[Pagination, Navigation]}
                                slidesPerView={1}
                                spaceBetween={20}
                                pagination={{ clickable: true }}
                                onSwiper={(swiper) => { swiperRef.current = swiper }}
                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                breakpoints={{
                                    480: { slidesPerView: 1.4 },
                                    640: { slidesPerView: 2, spaceBetween: 20 },
                                    900: { slidesPerView: 3, spaceBetween: 24 },
                                    1200: { slidesPerView: 4, spaceBetween: 24 },
                                }}
                                className="distanceSwiper"
                            >
                                {distances.map((d) => (
                                    <SwiperSlide key={d.id}>
                                        <DistanceCard d={d} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Prev / Next arrows — only show for swiper */}
                        {distances.length > 3 && (
                            <div className="flex gap-3 mt-4 justify-center">
                                <button
                                    onClick={() => swiperRef.current?.slidePrev()}
                                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#0D2A4A] text-[#0D2A4A] hover:bg-[#0D2A4A] hover:text-white transition-all duration-300"
                                    aria-label="Previous"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => swiperRef.current?.slideNext()}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0D2A4A] text-white hover:bg-[#36A5DD] transition-all duration-300"
                                    aria-label="Next"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}

                    </div>
                </ScrollFadeUp>
            </div>
        </section>
    )
}