'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'   // ← ADDED: useRef, useEffect, useState for animation components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import heroBg from '@/assets/herosection.png'
import heroBg1 from '@/assets/20K_bg.png'

import stopwatch from '@/assets/stopwatch.png'
import time from '@/assets/time.png'
import heroicon from '@/assets/heroicon.png'
import group from '@/assets/group.png'
import trail from '@/assets/livio.png'

// ── Base URL for relative image paths stored in DB ─────────────────────────
const BASE_URL = 'http://91.99.229.154'

function imgUrl(path: string | null | undefined): string | null {
  if (!path) return null
  if (path.startsWith('http') || path.startsWith('//')) return path
  return `${BASE_URL}${path}`
}

// ── Types ──────────────────────────────────────────────────────────────────

type Menu = {
  menu_id: number
  brand_name: string
  brand_logo: string
  event_name: string | null
  event_logo: string | null
}

type HeroBuilder = {
  hero_id: number
  brand_id: number
  event_id: number
  distance_id: number | null
  distance_name: string | null
  mobile_background_image: string | null
  bg_img: string | null
  race_photo: string | null
  badge_img: string | null
  brand_logo_img: string | null
  overlay_color: string | null
  overlay_opacity: number | null
  event_name: string | null
  breadcrumb: string | null
  distance: string | null
  elevation: string | null
  description: string | null
  tagline: string | null
  badge_bg: string | null
  show_brand_logo: boolean | null
  dist_color: string | null
  sidebar_stats: string | null
  bottom_stats: string | null
  cta_buttons: string | null
  race_date: Date | null
  race_time: string | null
  race_waves: number
  sold_out: boolean
}

type Props = {
  menu: Menu
  hero: HeroBuilder
}

// ── JSON types ─────────────────────────────────────────────────────────────

type SidebarStat = {
  icon: string
  value: string
  label: string
  show_star_rating?: boolean
}

type BottomStat = {
  icon?: string
  title?: string
  label?: string
  value: string
  sub: string
}

type CtaButton = {
  label: string
  url?: string
  link?: string
  style?: 'primary' | 'secondary'
  type?: 'primary' | 'secondary'
}

// ── Helpers ────────────────────────────────────────────────────────────────

function parseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try { return JSON.parse(raw) as T } catch { return fallback }
}

function formatDate(date: Date | null): string {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const BOTTOM_ICON_MAP: Record<string, typeof time> = {
  'start': time,
  'cutoff': stopwatch,
  'cut-off': stopwatch,
  'aid station': heroicon,
  'aid_station': heroicon,
  'participants': group,
}

function resolveBottomIcon(label: string, faIcon?: string) {
  if (faIcon && faIcon.startsWith('fa-')) return { type: 'fa' as const, src: faIcon }
  const key = label.toLowerCase()
  for (const [k, v] of Object.entries(BOTTOM_ICON_MAP)) {
    if (key.includes(k)) return { type: 'static' as const, src: v }
  }
  return { type: 'static' as const, src: time }
}

// ── Star rating ────────────────────────────────────────────────────────────

function StarRating({ value }: { value: string }) {
  const num = parseFloat(value)
  const score = isNaN(num) ? 0 : num
  return (
    <div className="flex gap-0.5 mb-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.floor(score)
        const partial = !filled && i === Math.ceil(score)
        return (
          <svg key={i} className="w-4 h-4" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`star-${i}`}>
                <stop offset={`${partial ? Math.round((score % 1) * 100) : filled ? 100 : 0}%`} stopColor="#FACC15" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
              </linearGradient>
            </defs>
            <path fill={`url(#star-${i})`}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      })}
    </div>
  )
}

// ── ADDED: Animation components (same pattern as TerritorySection / Footer) ──

function ScrollInLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 md:-translate-x-16'
        }`}
    >
      {children}
    </div>
  )
}

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
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 md:translate-y-8'
        }`}
    >
      {children}
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────

export default function HeroSection({ menu, hero }: Props) {

  const sidebarStats = parseJson<SidebarStat[]>(hero.sidebar_stats, [])
  const ctaButtons = parseJson<CtaButton[]>(hero.cta_buttons, [])
  const bottomStats = parseJson<BottomStat[]>(hero.bottom_stats, [
    { label: 'Start', value: hero.race_time ?? '—', sub: formatDate(hero.race_date) },
    { label: 'Cut-Off', value: '—', sub: '—' },
    { label: 'Aid Station', value: '—', sub: 'Incl. Finish' },
    { label: 'Maximum Participants', value: '—', sub: `${hero.race_waves} Wave${hero.race_waves > 1 ? 's' : ''}` },
  ])

  const bgImgUrl = imgUrl(hero.bg_img)
  const mobileBgImgUrl = imgUrl(hero.mobile_background_image) ?? bgImgUrl
  const badgeImgUrl = imgUrl(hero.badge_img)
  const brandLogoImgUrl = imgUrl(hero.brand_logo_img) ?? imgUrl(menu.brand_logo)

  const overlayColor = hero.overlay_color ?? '#0D1F35'
  const overlayOpacity = (hero.overlay_opacity ?? 40) / 100
  const groupedStats = [];

  for (let i = 0; i < bottomStats.length; i += 2) {
    groupedStats.push(bottomStats.slice(i, i + 2));
  }

  return (
    <>
      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <section
        className="
          relative
          w-full
          min-h-screen
          lg:min-h-[850px]
          lg:h-screen
          lg:max-h-[900px]
          overflow-hidden
        "
      >

        {/* Background image — NO animation wrapper (it's a bg, not a content element) */}
        {/* Background image — responsive: mobile vs desktop */}
        {mobileBgImgUrl ? (
          <img src={mobileBgImgUrl} alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover object-center animate-hero-zoom lg:hidden" />
        ) : (
          <Image src={heroBg} alt="Trail runners" fill priority
            className="object-cover object-center animate-hero-zoom lg:hidden" />
        )}

        {bgImgUrl ? (
          <img src={bgImgUrl} alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover object-center md:object-top animate-hero-zoom hidden lg:block" />
        ) : (
          <Image src={heroBg} alt="Trail runners" fill priority
            className="object-cover object-center md:object-top animate-hero-zoom hidden lg:block" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${overlayColor}dd, ${overlayColor}66, ${overlayColor}1a)` }} />
        <div className="absolute inset-0"
          style={{ background: overlayColor, opacity: overlayOpacity * 0.15 }} />

        <div className="relative z-10 flex items-center py-10 lg:h-full xl:pl-16">
          <div className="max-w-7xl mx-auto w-full px-5 md:px-6">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">

              {/* ── Left: text ── */}
              <div className="text-center lg:text-left pt-24 md:pt-28 lg:pt-0">

                {/* Breadcrumb */}
                {/* ADDED: ScrollFadeUp delay=0 */}
                {hero.breadcrumb && (
                  <ScrollFadeUp delay={0}>
                    <p className="text-white/60 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-2">
                      {hero.breadcrumb}
                    </p>
                  </ScrollFadeUp>
                )}

                {/* Event name */}
                {/* ADDED: ScrollFadeUp delay=80 */}
                <ScrollFadeUp delay={80}>
                  <p className="text-white/80 text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-3">
                    {hero.event_name ?? menu.event_name ?? menu.brand_name}
                  </p>
                </ScrollFadeUp>

                {/* Distance + Elevation heading */}
                {/* ADDED: ScrollInLeft delay=150 */}
                <ScrollInLeft delay={150}>
                  <h1 className="font-black leading-none" style={{ color: hero.dist_color ?? '#FFFFFF' }}>
                    <span
                      className="block"
                      style={{ fontSize: 'clamp(48px, 14vw, 96px)' }}
                    >
                      {hero.distance ?? '50 KM'}
                    </span>
                    <span
                      className="block mt-2"
                      style={{ fontSize: 'clamp(22px, 7vw, 72px)' }}
                    >
                      {hero.elevation ?? '3200 D+'}
                    </span>
                  </h1>
                </ScrollInLeft>

                {/* Description */}
                {/* ADDED: ScrollFadeUp delay=250 */}
                <ScrollFadeUp delay={250}>
                  <p className="text-white/80 text-[13px] md:text-base italic max-w-md mx-auto lg:mx-0 mt-4 leading-relaxed">
                    {hero.description ?? 'A demanding trail race. Expect technical terrain, unpredictable conditions and breathtaking scenery.'}
                  </p>
                </ScrollFadeUp>

                {/* CTA Buttons */}
                {/* ADDED: ScrollInLeft delay=350 */}
                <ScrollInLeft delay={350}>
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 justify-center lg:justify-start items-center sm:items-start">
                    {ctaButtons.length > 0 ? ctaButtons.map((btn, i) => {
                      const isPrimary = i === 0 || (btn.style ?? btn.type) === 'primary'
                      const href = btn.url ?? btn.link ?? '#'

                      return (
                        <a
                          key={i}
                          href={href}
                          className={`relative overflow-hidden inline-flex items-center justify-center font-bold px-6 py-3 rounded-full whitespace-nowrap ${isPrimary
                            ? 'bg-[#36A5DD] text-white'
                            : 'border border-white/60 text-white'
                            }
                          before:absolute before:inset-0 before:bg-white before:rounded-full
                          before:-translate-x-[110%] hover:before:translate-x-0
                          before:transition-transform before:duration-[600ms] before:ease-in-out
                          transition-colors duration-[600ms]
                          hover:text-[#36A5DD]
                          `}
                        >
                          <span className="relative z-10">
                            {btn.label}
                          </span>
                        </a>
                      )
                    }) : (
                      <>
                        {/* Register */}
                        <a href="/register"
                          className="
                            group
                            flex items-center justify-between gap-3
                            bg-[#36A5DD]
                            text-white
                            font-bold
                            text-sm
                            px-4 sm:px-6 py-2.5 sm:py-3
                            rounded-full
                            w-full sm:w-auto
                            max-w-[260px] sm:max-w-none
                            transition-all duration-300
                            active:bg-white active:text-[#36A5DD]
                            sm:hover:bg-white sm:hover:text-[#36A5DD]
                          "
                        >
                          <span className="transition-all duration-300 group-active:translate-x-1 sm:group-hover:translate-x-1">
                            Register Now
                          </span>
                          <span className="flex h-7 w-10 sm:h-8 sm:w-12 items-center justify-center rounded-full bg-white transition-all duration-300 group-active:bg-[#36A5DD] sm:group-hover:bg-[#36A5DD]">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#36A5DD] transition-all duration-300 group-active:text-white group-active:-rotate-45 sm:group-hover:text-white sm:group-hover:-rotate-45"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
                            </svg>
                          </span>
                        </a>

                        {/* Race Guide */}
                        <a href="/race-guide"
                          className="
                            group
                            flex items-center justify-between gap-3
                            border border-white/60
                            text-white
                            font-bold
                            text-sm
                            px-4 sm:px-6 py-2.5 sm:py-3
                            rounded-full
                            w-full sm:w-auto
                            max-w-[260px] sm:max-w-none
                            transition-all duration-300
                            active:bg-white active:text-[#36A5DD]
                            sm:hover:bg-white sm:hover:text-[#36A5DD]
                          "
                        >
                          <span className="transition-all duration-300 group-active:translate-x-1 sm:group-hover:translate-x-1">
                            Download Race Guide
                          </span>
                          <span className="flex h-7 w-10 sm:h-8 sm:w-12 items-center justify-center rounded-full bg-[#36A5DD] transition-all duration-300 group-active:bg-white sm:group-hover:bg-white">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-all duration-300 group-active:text-[#36A5DD] group-active:-rotate-45 sm:group-hover:text-[#36A5DD] sm:group-hover:-rotate-45"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
                            </svg>
                          </span>
                        </a>
                      </>
                    )}
                  </div>
                </ScrollInLeft>

              </div>

              {/* ── Right: sidebar card ── */}
              {/* ADDED: ScrollFadeUp delay=200 wrapping the entire right card */}
              <ScrollFadeUp delay={200}>
                <div className="flex justify-center lg:justify-end items-start pt-0 lg:pt-16">
                  <div className="w-full max-w-[280px] lg:w-72 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.2)] px-4 py-4 flex flex-col gap-3"
                    style={{ marginTop: '20px' }}
                  >
                    {/* Badge image */}
                    <div className="flex items-center gap-4">
                      <span className="w-10 flex-shrink-0" />
                      <div className="rounded-xl bg-white/15 border border-white/15 px-4 py-2 flex-1">
                        {badgeImgUrl ? (
                          <img
                            src={badgeImgUrl}
                            alt={hero.event_name ?? 'Badge'}
                            className="block w-full h-auto object-contain transition-transform duration-300 ease-out hover:scale-110"
                          />
                        ) : (
                          <Image
                            src={heroBg1}
                            alt="Race"
                            width={90}
                            className="block w-full h-auto object-contain transition-transform duration-300 ease-out hover:scale-110"
                          />
                        )}
                      </div>
                    </div>



                    {/* Sidebar stats */}
                    {(sidebarStats.length > 0
                      ? sidebarStats
                      : [
                        { icon: 'fa-solid fa-star', value: '4.7/5', label: '350 Reviews', show_star_rating: true },
                        { icon: 'fa-solid fa-users', value: '2,250+', label: 'Participants in 2024', show_star_rating: false },
                        { icon: 'fa-solid fa-person-running', value: '91%', label: 'Finish Rate', show_star_rating: false },
                      ]
                    ).map(({ icon, value, label, show_star_rating }, index) => (
                      <div key={index} className="group flex items-center gap-4">
                        <span
                          className="
        flex items-center justify-center
        w-10 h-10 rounded-full
        bg-white
        flex-shrink-0
        transition-all duration-300
        group-hover:bg-[#36A5DD]
        group-hover:scale-110
      "
                        >
                          <i
                            className={`
          ${icon}
          text-lg
          text-[#36A5DD]
          transition-all duration-300
          group-hover:text-white
        `}
                          />
                        </span>

                        <div className="rounded-xl bg-white border border-white/40 px-4 py-2 flex-1 transition-all duration-300 group-hover:bg-blue-50">
                          {show_star_rating && <StarRating value={value} />}
                          <p className="text-[#36A5DD] font-bold text-xl leading-tight">{value}</p>
                          <p className="text-[#36A5DD] text-sm transition-colors duration-300">{label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollFadeUp>

            </div>
          </div>
        </div>

        {/* Bottom shape mobile — no animation (decorative SVG shape) */}
        <div className="absolute -bottom-[2px] left-0 w-full h-[60px] md:hidden z-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 390 60" preserveAspectRatio="none">
            <path fill="#fff" d="M0,0 Q195,120 390,0 L390,60 L0,60 Z" />
          </svg>
        </div>

        {/* Bottom shape desktop — no animation (decorative SVG shape) */}
        <div className="absolute bottom-0 left-0 w-full h-[90px] hidden md:block z-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 89" preserveAspectRatio="none">
            <path fill="#fff" d="M0,5 C250,50 500,82 640,82 C655,82 670,75 680,60 C700,20 740,20 760,60 C770,75 785,82 800,82 C940,82 1190,50 1440,5 L1440,90 L0,90 Z" />
          </svg>
        </div>

        {/* Trail logo link — no animation (it's a fixed anchor element) */}
        <div className="absolute -bottom-3 md:bottom-0 left-1/2 -translate-x-1/2 z-30">
          <Link
            href="https://www.liviolive.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center group"
          >
            <span className="absolute w-12 h-12 rounded-full bg-white/40 animate-ping-slow" />
            <span className="absolute w-12 h-12 rounded-full bg-white/30 animate-ping-slow animation-delay-1000" />
            <span className="absolute w-[60px] h-[60px] rounded-full bg-white md:hidden" />
            <Image
              src={trail}
              alt="Trail Running"
              width={60}
              height={60}
              className="relative z-10 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
            />
          </Link>
        </div>

      </section>

      {/* ── Stats Bar ── */}
      <div className="bg-white pt-6 pb-0 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Desktop stats (lg and up) */}
          {/* ADDED: ScrollFadeUp delay=0 wrapping the entire desktop stats row */}
          <ScrollFadeUp delay={0}>
            <div className="hidden lg:grid lg:grid-cols-4">
              {bottomStats.map((stat, index, arr) => {
                const label = stat.title ?? stat.label ?? ''
                const iconInfo = resolveBottomIcon(label, stat.icon)
                const isFirst = index === 0
                const isLast = index === arr.length - 1

                return (
                  <div
                    key={index}
                    className={`group flex items-center justify-between gap-3 transition-all duration-300 ${isFirst
                      ? 'pr-6 xl:pr-10 border-r border-[#8ED9EE]'
                      : isLast
                        ? 'pl-6 xl:pl-10'
                        : 'px-6 xl:px-10 border-r border-[#8ED9EE]'
                      }`}
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[#0A2A4A] text-sm xl:text-[18px] font-extrabold uppercase whitespace-nowrap transition-colors duration-300 group-hover:text-[#8ED9EE]">
                        {label}
                      </h4>
                      <h2 className="text-[#0A2A4A] text-4xl xl:text-[54px] font-black leading-none mt-1 transition-transform duration-300 group-hover:translate-x-1">
                        {stat.value}
                      </h2>
                      <div className="w-[80px] xl:w-[110px] h-[2px] bg-[#8AA0BC] mt-2 mb-2 transition-all duration-300 group-hover:w-[140px] group-hover:bg-[#8ED9EE]" />
                      <p className="text-[#0A2A4A] text-sm xl:text-[16px] whitespace-nowrap font-medium">
                        {stat.sub}
                      </p>
                    </div>

                    <div className="flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {iconInfo.type === 'fa' ? (
                        <i className={`${iconInfo.src} text-[#0A2A4A] text-3xl xl:text-4xl`} />
                      ) : (
                        <Image
                          src={iconInfo.src}
                          alt=""
                          width={64}
                          height={64}
                          className="w-10 h-10 xl:w-16 xl:h-16 object-contain"
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollFadeUp>

          {/* Mobile + Tablet Slider */}
          {/* ADDED: ScrollFadeUp delay=0 wrapping the mobile swiper */}
          <ScrollFadeUp delay={0}>
            <div className="lg:hidden">
              <style jsx global>{`
                .statsSwiper {
                  padding-bottom: 0px;
                }
                .statsSwiper .swiper-pagination {
                  position: static;
                  margin-top: 16px;
                }
                .statsSwiper .swiper-pagination-bullet {
                  background: #8AA0BC;
                  opacity: 0.3;
                  width: 6px;
                  height: 6px;
                  transition: all 0.3s ease;
                }
                .statsSwiper .swiper-pagination-bullet-active {
                  background: #0A2A4A;
                  opacity: 1;
                  width: 16px;
                  border-radius: 4px;
                }
              `}</style>

              <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={20}
                pagination={{ clickable: true }}
                className="statsSwiper"
              >
                {groupedStats.map((group, slideIndex) => (
                  <SwiperSlide key={slideIndex}>
                    <div className="grid grid-cols-2 bg-white">
                      {group.map((stat, index) => {
                        const label = stat.title ?? stat.label ?? '';
                        const iconInfo = resolveBottomIcon(label, stat.icon);

                        return (
                          <div
                            key={index}
                            className={`group px-4 transition-all duration-200 active:bg-slate-50/50 rounded-lg ${index === 0 ? 'border-r border-[#8ED9EE]' : ''
                              }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex-shrink-0 transition-all duration-300 group-active:scale-110 group-active:rotate-3">
                                {iconInfo.type === 'fa' ? (
                                  <i className={`${iconInfo.src} text-[#5E7391] text-sm transition-colors duration-300 group-active:text-[#8ED9EE]`} />
                                ) : (
                                  <Image
                                    src={iconInfo.src}
                                    alt=""
                                    width={18}
                                    height={18}
                                    className="object-contain"
                                  />
                                )}
                              </div>
                              <span className="text-[#5E7391] text-sm font-medium uppercase transition-colors duration-300 group-active:text-[#8ED9EE]">
                                {label}
                              </span>
                            </div>

                            <h2 className="text-[#0A2A4A] text-[26px] font-black leading-none transition-transform duration-300 group-active:translate-x-0.5">
                              {stat.value}
                            </h2>

                            <div className="w-full h-px bg-[#8AA0BC] my-2 transition-all duration-300 ease-out group-active:bg-[#8ED9EE] group-active:h-[2px]" />

                            <p className="text-[#0A2A4A] text-sm font-medium">
                              {stat.sub}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </ScrollFadeUp>

        </div>
      </div>

    </>
  )
}