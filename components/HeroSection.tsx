'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import heroBg    from '@/assets/herosection.png'
import heroBg1   from '@/assets/20K_bg.png'
import trail     from '@/assets/trail.png'
import stopwatch from '@/assets/stopwatch.png'
import time      from '@/assets/time.png'
import heroicon  from '@/assets/heroicon.png'
import group     from '@/assets/group.png'

// ── Base URL for relative image paths stored in DB ─────────────────────────
const BASE_URL = 'http://91.99.229.154'

function imgUrl(path: string | null | undefined): string | null {
  if (!path) return null
  if (path.startsWith('http') || path.startsWith('//')) return path
  return `${BASE_URL}${path}`
}

// ── Types ──────────────────────────────────────────────────────────────────

type Menu = {
  menu_id:    number
  brand_name: string
  brand_logo: string
  event_name: string | null
  event_logo: string | null
}

type HeroBuilder = {
  hero_id:         number
  brand_id:        number
  event_id:        number
  distance_id:     number | null
  distance_name:   string | null
  bg_img:          string | null
  race_photo:      string | null
  badge_img:       string | null
  brand_logo_img:  string | null
  overlay_color:   string | null
  overlay_opacity: number | null
  event_name:      string | null
  breadcrumb:      string | null
  distance:        string | null
  elevation:       string | null
  description:     string | null
  tagline:         string | null
  badge_bg:        string | null
  show_brand_logo: boolean | null
  dist_color:      string | null
  sidebar_stats:   string | null
  bottom_stats:    string | null
  cta_buttons:     string | null
  race_date:       Date   | null
  race_time:       string | null
  race_waves:      number
  sold_out:        boolean
}

type Props = {
  menu: Menu
  hero: HeroBuilder
}

// ── JSON types ─────────────────────────────────────────────────────────────

type SidebarStat = {
  icon:              string
  value:             string
  label:             string
  show_star_rating?: boolean
}

type BottomStat = {
  icon?:  string
  title?: string
  label?: string
  value:  string
  sub:    string
}

type CtaButton = {
  label: string
  url?:  string
  link?: string
  style?: 'primary' | 'secondary'
  type?:  'primary' | 'secondary'
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
  'start':        time,
  'cutoff':       stopwatch,
  'cut-off':      stopwatch,
  'aid station':  heroicon,
  'aid_station':  heroicon,
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
  const num   = parseFloat(value)
  const score = isNaN(num) ? 0 : num
  return (
    <div className="flex gap-0.5 mb-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled  = i <= Math.floor(score)
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

// ── Component ──────────────────────────────────────────────────────────────

export default function HeroSection({ menu, hero }: Props) {

  const sidebarStats = parseJson<SidebarStat[]>(hero.sidebar_stats, [])
  const ctaButtons   = parseJson<CtaButton[]>(hero.cta_buttons, [])
  const bottomStats  = parseJson<BottomStat[]>(hero.bottom_stats, [
    { label: 'Start',                value: hero.race_time ?? '—', sub: formatDate(hero.race_date) },
    { label: 'Cut-Off',              value: '—',                   sub: '—' },
    { label: 'Aid Station',          value: '—',                   sub: 'Incl. Finish' },
    { label: 'Maximum Participants', value: '—',                   sub: `${hero.race_waves} Wave${hero.race_waves > 1 ? 's' : ''}` },
  ])

  const bgImgUrl        = imgUrl(hero.bg_img)
  const badgeImgUrl     = imgUrl(hero.badge_img)
  const brandLogoImgUrl = imgUrl(hero.brand_logo_img) ?? imgUrl(menu.brand_logo)

  const overlayColor   = hero.overlay_color   ?? '#0D1F35'
  const overlayOpacity = (hero.overlay_opacity ?? 40) / 100

  return (
    <>
      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <section className="relative w-full min-h-[700px] md:min-h-[850px] h-[750px] md:h-screen md:max-h-[900px] overflow-hidden">

        {/* Background image */}
        {bgImgUrl ? (
          <img src={bgImgUrl} alt="Hero background"
               className="absolute inset-0 w-full h-full object-cover object-center md:object-top animate-hero-zoom" />
        ) : (
          <Image src={heroBg} alt="Trail runners" fill priority
                 className="object-cover object-center md:object-top animate-hero-zoom" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0"
             style={{ background: `linear-gradient(to right, ${overlayColor}dd, ${overlayColor}66, ${overlayColor}1a)` }} />
        <div className="absolute inset-0"
             style={{ background: overlayColor, opacity: overlayOpacity * 0.15 }} />

        {/* Brand logo overlay */}
        {brandLogoImgUrl && (
          <div className="absolute hidden lg:block z-10" style={{ right: '34%', top: '45%' }}>
            <img src={brandLogoImgUrl} alt={menu.brand_name} width={160} height={80} className="object-contain" />
          </div>
        )}

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full px-5 md:px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center">

              {/* ── Left: text ── */}
              <div className="text-center lg:text-left">

                {/* Breadcrumb */}
                {hero.breadcrumb && (
                  <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-2">
                    {hero.breadcrumb}
                  </p>
                )}

                {/* Event name */}
                <p className="text-white/80 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
                  {hero.event_name ?? menu.event_name ?? menu.brand_name}
                </p>

                <h1 className="font-black leading-none" style={{ color: hero.dist_color ?? '#FFFFFF' }}>
                  <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl">
                    {hero.distance ?? '50 KM'}
                  </span>
                  <span className="block mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    {hero.elevation ?? '3200 D+'}
                  </span>
                </h1>

                <p className="text-white/80 text-sm md:text-base italic max-w-md mx-auto lg:mx-0 mt-5 leading-relaxed">
                  {hero.description ?? 'A demanding trail race. Expect technical terrain, unpredictable conditions and breathtaking scenery.'}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
                  {ctaButtons.length > 0 ? ctaButtons.map((btn, i) => {
                    const isPrimary = i === 0 || (btn.style ?? btn.type) === 'primary'
                    const href = btn.url ?? btn.link ?? '#'
                    return (
                      <a key={i} href={href}
                         className={`flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-full transition-colors ${
                           isPrimary
                             ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg'
                             : 'border border-white/60 text-white hover:bg-white/10'
                         }`}>
                        {btn.label}
                        <span className={`rounded-full p-1.5 flex items-center justify-center ${isPrimary ? 'bg-white' : 'bg-sky-500'}`}>
                          <svg className={`w-10 h-4 ${isPrimary ? 'text-[#36A5DD]' : 'text-white'}`}
                               fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                          </svg>
                        </span>
                      </a>
                    )
                  }) : (
                    <>
                      <a href="/register" className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-lg">
                        Register Now
                        <span className="bg-white rounded-full p-1.5 flex items-center justify-center">
                          <svg className="w-10 h-4 text-[#36A5DD]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                          </svg>
                        </span>
                      </a>
                      <a href="/race-guide" className="flex items-center justify-center gap-2 border border-white/60 text-white font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                        Download Race Guide
                        <span className="bg-sky-500 rounded-full p-1.5 flex items-center justify-center">
                          <svg className="w-10 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                          </svg>
                        </span>
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* ── Right: sidebar card ── */}
              <div className="hidden lg:flex justify-end items-start pt-16">
                 <div className="w-72 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-[4px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                  {/* Badge image */}
                  {badgeImgUrl ? (
                    <img src={badgeImgUrl} alt={hero.event_name ?? 'Badge'} width={180} className="block object-cover mx-auto" style={{ marginTop: '10px' }} />
                  ) : (
                    <Image src={heroBg1} alt="Race" width={180} className="block object-cover mx-auto" style={{ marginTop: '10px' }} />
                  )}

                       <div className="mx-6 h-px bg-white/20 my-3" />

                  {/* Sidebar stats */}
                  <div className="px-6 py-5">
                    {(sidebarStats.length > 0 ? sidebarStats : [
                      { icon: 'fa-solid fa-star',           value: '4.7/5',  label: '350 Reviews',         show_star_rating: true  },
                      { icon: 'fa-solid fa-users',          value: '2,250+', label: 'Participants in 2024', show_star_rating: false },
                      { icon: 'fa-solid fa-person-running', value: '91%',    label: 'Finish Rate',          show_star_rating: false },
                    ]).map(({ icon, value, label, show_star_rating }, index, arr) => (
                      <div key={index}>
                        <div className="flex items-center gap-4 py-4">
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 flex-shrink-0">

<i
  className={`${icon} text-lg`}
  style={{ color: '#36A5DD' }}
/>
                          </span>
                          <div>
                            {show_star_rating && <StarRating value={value} />}
                            <p className="text-white font-bold text-xl leading-tight">{value}</p>
                            <p className="text-white/60 text-sm">{label}</p>
                          </div>
                        </div>
                        {index < arr.length - 1 && <div className="h-px bg-white/20 w-full" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom shape mobile */}
        <div className="absolute bottom-0 left-0 w-full h-[60px] md:hidden z-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 390 60" preserveAspectRatio="none">
            <path fill="#fff" d="M0,0 Q195,120 390,0 L390,60 L0,60 Z" />
          </svg>
        </div>

        {/* Bottom shape desktop */}
        <div className="absolute bottom-0 left-0 w-full h-[90px] hidden md:block z-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 89" preserveAspectRatio="none">
            <path fill="#fff" d="M0,5 C250,50 500,82 640,82 C655,82 670,75 680,60 C700,20 740,20 760,60 C770,75 785,82 800,82 C940,82 1190,50 1440,5 L1440,90 L0,90 Z" />
          </svg>
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30">
          <Image src={trail} alt="Trail Running" width={45} height={45} className="object-contain drop-shadow-md" />
        </div>
      </section>

      {/* ── Stats Bar (ported from static, now data-driven) ── */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Desktop (lg and up — this row needs real width to avoid overlap) */}
          <div className="hidden lg:grid lg:grid-cols-4">
            {bottomStats.map((stat, index, arr) => {
              const label    = stat.title ?? stat.label ?? ''
              const iconInfo = resolveBottomIcon(label, stat.icon)
              const isFirst  = index === 0
              const isLast   = index === arr.length - 1

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-3 ${
                    isFirst
                      ? 'pr-6 xl:pr-10 border-r border-[#8ED9EE]'
                      : isLast
                        ? 'pl-6 xl:pl-10'
                        : 'px-6 xl:px-10 border-r border-[#8ED9EE]'
                  }`}
                >
                  <div className="min-w-0">
                    <h4 className="text-[#0A2A4A] text-sm xl:text-[18px] font-extrabold uppercase whitespace-nowrap">
                      {label}
                    </h4>

                    <h2 className="text-[#0A2A4A] text-4xl xl:text-[54px] font-black leading-none mt-1">
                      {stat.value}
                    </h2>

                    <div className="w-[80px] xl:w-[110px] h-[2px] bg-[#8AA0BC] mt-2 mb-2" />

                    <p className="text-[#0A2A4A] text-sm xl:text-[16px] whitespace-nowrap">
                      {stat.sub}
                    </p>
                  </div>

                  {iconInfo.type === 'fa' ? (
                    <i className={`${iconInfo.src} text-[#0A2A4A] text-3xl xl:text-4xl flex-shrink-0`} />
                  ) : (
                    <Image
                      src={iconInfo.src}
                      alt=""
                      width={64}
                      height={64}
                      className="w-10 h-10 xl:w-16 xl:h-16 object-contain flex-shrink-0"
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile + Tablet Slider (covers the range the 4-col row can't fit in) */}
          <div className="lg:hidden">

            <style jsx global>{`
              .statsSwiper {
                padding-bottom: 44px;
              }
              .statsSwiper .swiper-pagination {
                position: static;
                margin-top: 20px;
              }
            `}</style>

            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 2 },
              }}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="statsSwiper"
            >
              {bottomStats.map((stat, index) => {
                const label    = stat.title ?? stat.label ?? ''
                const iconInfo = resolveBottomIcon(label, stat.icon)

                return (
                  <SwiperSlide key={index}>
                    <div className="flex items-start justify-between rounded-2xl border border-[#8ED9EE] p-6">
                      <div>
                        <h4 className="text-[#0A2A4A] text-[16px] font-extrabold uppercase">
                          {label}
                        </h4>

                        <h2 className="text-[#0A2A4A] text-[42px] font-black leading-none mt-1">
                          {stat.value}
                        </h2>

                        <div className="w-[90px] h-[2px] bg-[#8AA0BC] mt-2 mb-2" />

                        <p className="text-[#0A2A4A] text-sm">
                          {stat.sub}
                        </p>
                      </div>

                      {iconInfo.type === 'fa' ? (
                        <i className={`${iconInfo.src} text-[#0A2A4A] text-2xl`} />
                      ) : (
                        <Image src={iconInfo.src} alt="" width={52} height={52} />
                      )}
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>

          </div>
        </div>
      </div>
    </>
  )
}
