'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import heroBg    from '@/assets/herosection.png'
import heroBg1   from '@/assets/utmb.png'
import trail     from '@/assets/livio.png'
import stopwatch from '@/assets/stopwatch.png'
import time      from '@/assets/time.png'
import heroicon  from '@/assets/heroicon.png'
import group     from '@/assets/group.png'

// ── Types ──────────────────────────────────────────────────────────────────

type HeroProps = {
  bg_desktop:      string | null
  bg_mobile:       string | null
  overlay_opacity: number
  event_name:      string
  race_title:      string
  race_date:       Date | null
  description:     string
  sidebar_stats:   unknown
  cta_buttons:     unknown
  bottom_stats:    unknown
  tagline?:        string | null
}

type MenuProps = {
  brand_name:  string
  brand_logo:  string | null
  event_name:  string
  event_logo:  string | null
}

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
  label:  string
  url?:   string
  link?:  string
  style?: 'primary' | 'secondary'
  type?:  'primary' | 'secondary'
}

// ── Helpers ────────────────────────────────────────────────────────────────

function parseJson<T>(raw: unknown, fallback: T): T {
  if (!raw) return fallback
  if (typeof raw !== 'string') {
    try { return raw as T } catch { return fallback }
  }
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

export default function HeroSectionEvent({
  menu,
  hero,
}: {
  menu: MenuProps
  hero: HeroProps
}) {
  const sidebarStats = parseJson<SidebarStat[]>(hero.sidebar_stats, [])
  const ctaButtons   = parseJson<CtaButton[]>(hero.cta_buttons, [])
  const bottomStats  = parseJson<BottomStat[]>(hero.bottom_stats, [
    { label: 'Start',                value: '—', sub: formatDate(hero.race_date) },
    { label: 'Cut-Off',              value: '—', sub: '—' },
    { label: 'Aid Station',          value: '—', sub: 'Incl. Finish' },
    { label: 'Maximum Participants', value: '—', sub: '—' },
  ])

  // Images already resolved by page.tsx (full URLs)
  const bgImgUrl       = hero.bg_desktop
  const mobileBgImgUrl = hero.bg_mobile ?? bgImgUrl

  const overlayColor   = '#0D1F35'
  const overlayOpacity = hero.overlay_opacity / 100

  const groupedStats: BottomStat[][] = []
  for (let i = 0; i < bottomStats.length; i += 2) {
    groupedStats.push(bottomStats.slice(i, i + 2))
  }

  return (
    <>
      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <section className="relative w-full min-h-screen lg:min-h-[850px] lg:h-screen lg:max-h-[900px] overflow-hidden">

        {/* Mobile background */}
        {mobileBgImgUrl ? (
          <img src={mobileBgImgUrl} alt="Hero background"
               className="absolute inset-0 w-full h-full object-cover object-center animate-hero-zoom lg:hidden" />
        ) : (
          <Image src={heroBg} alt="Trail runners" fill priority
                 className="object-cover object-center animate-hero-zoom lg:hidden" />
        )}

        {/* Desktop background */}
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

                {/* Brand name */}
                <p className="text-white/80 text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-3">
                  {hero.event_name || menu.brand_name}
                </p>

                {/* H1: race title */}
                <h1 className="font-black leading-none text-white">
                  <span className="block" style={{ fontSize: 'clamp(36px, 9vw, 72px)' }}>
                    {hero.race_title || menu.event_name}
                  </span>
                </h1>

                {/* Date */}
                <div className="flex items-center gap-2 mt-4 justify-center lg:justify-start">
                  <i className="fa-regular fa-calendar text-[#36A5DD] text-base md:text-lg" />
                  <span className="text-white/90 text-base md:text-xl font-bold">
                    {formatDate(hero.race_date)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/80 text-[13px] md:text-base italic max-w-md mx-auto lg:mx-0 mt-4 leading-relaxed">
                  {hero.description || 'A demanding trail race. Expect technical terrain, unpredictable conditions and breathtaking scenery.'}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 justify-center lg:justify-start items-center sm:items-start">
                  {ctaButtons.length > 0 ? ctaButtons.map((btn, i) => {
                    const isPrimary = i === 0 || (btn.style ?? btn.type) === 'primary'
                    const href = btn.url ?? btn.link ?? '#'
                    return (
                      <a key={i} href={href}
                        className={`relative overflow-hidden inline-flex items-center justify-center font-bold px-6 py-3 rounded-full whitespace-nowrap
                          ${isPrimary ? 'bg-[#36A5DD] text-white' : 'border border-white/60 text-white'}
                          before:absolute before:inset-0 before:bg-white before:rounded-full
                          before:-translate-x-[110%] hover:before:translate-x-0
                          before:transition-transform before:duration-[600ms] before:ease-in-out
                          transition-colors duration-[600ms] hover:text-[#36A5DD]`}
                      >
                        <span className="relative z-10">{btn.label}</span>
                      </a>
                    )
                  }) : (
                    <>
                      <a href="/register"
                        className="group flex items-center justify-between gap-3 bg-[#36A5DD] text-white font-bold text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full w-full sm:w-auto max-w-[260px] sm:max-w-none transition-all duration-300 active:bg-white active:text-[#36A5DD] sm:hover:bg-white sm:hover:text-[#36A5DD]">
                        <span className="transition-all duration-300 group-active:translate-x-1 sm:group-hover:translate-x-1">Register Now</span>
                        <span className="flex h-7 w-10 sm:h-8 sm:w-12 items-center justify-center rounded-full bg-white transition-all duration-300 group-active:bg-[#36A5DD] sm:group-hover:bg-[#36A5DD]">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#36A5DD] transition-all duration-300 group-active:text-white group-active:-rotate-45 sm:group-hover:text-white sm:group-hover:-rotate-45"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
                          </svg>
                        </span>
                      </a>
                      <a href="/race-guide"
                        className="group flex items-center justify-between gap-3 border border-white/60 text-white font-bold text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full w-full sm:w-auto max-w-[260px] sm:max-w-none transition-all duration-300 active:bg-white active:text-[#36A5DD] sm:hover:bg-white sm:hover:text-[#36A5DD]">
                        <span className="transition-all duration-300 group-active:translate-x-1 sm:group-hover:translate-x-1">Download Race Guide</span>
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
              </div>

              {/* ── Right: sidebar card ── */}
              <div className="flex justify-center lg:justify-end items-start pt-0 lg:pt-16">
                <div className="w-full max-w-[280px] lg:w-72 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.2)] px-4 py-4 flex flex-col gap-3"
                  style={{ marginTop: '20px' }}>

                  {/* Fixed UTMB badge (always shown) */}
                  <div className="flex items-center gap-4">
                    <span className="w-10 flex-shrink-0" />
                    <div className="rounded-xl bg-white/15 border border-white/15 px-4 py-2 flex-1">
                      <Image src={heroBg1} alt="UTMB" width={90}
                             className="block w-full h-auto object-contain" />
                    </div>
                  </div>

                  {/* Dynamic sidebar stats */}
                  {(sidebarStats.length > 0 ? sidebarStats : [
                    { icon: 'fa-solid fa-star',          value: '4.7/5',   label: '350 Reviews',           show_star_rating: true },
                    { icon: 'fa-solid fa-users',         value: '2,250+',  label: 'Participants in 2024',  show_star_rating: false },
                    { icon: 'fa-solid fa-person-running',value: '91%',     label: 'Finish Rate',           show_star_rating: false },
                  ]).map(({ icon, value, label, show_star_rating }, index) => (
                    <div key={index} className="group flex items-center gap-4">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white flex-shrink-0 transition-all duration-300 group-hover:bg-[#36A5DD] group-hover:scale-110">
                        <i className={`${icon} text-lg text-[#36A5DD] transition-all duration-300 group-hover:text-white`} />
                      </span>
                      <div className="rounded-xl bg-white border border-white/40 px-4 py-2 flex-1 transition-all duration-300 group-hover:bg-blue-50">
                        {show_star_rating && <StarRating value={value} />}
                        <p className="text-[#36A5DD] font-bold text-xl leading-tight">{value}</p>
                        <p className="text-[#36A5DD] text-sm">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom shape mobile */}
        <div className="absolute -bottom-[2px] left-0 w-full h-[60px] md:hidden z-20 pointer-events-none">
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

        {/* Livio Live logo */}
        <div className="absolute -bottom-3 md:bottom-0 left-1/2 -translate-x-1/2 z-30">
          <Link href="https://www.liviolive.com/" target="_blank" rel="noopener noreferrer"
                className="relative flex items-center justify-center group">
            <span className="absolute w-12 h-12 rounded-full bg-white/40 animate-ping-slow" />
            <span className="absolute w-12 h-12 rounded-full bg-white/30 animate-ping-slow animation-delay-1000" />
            <span className="absolute w-[60px] h-[60px] rounded-full bg-white md:hidden" />
            <Image src={trail} alt="Trail Running" width={60} height={60}
                   className="relative z-10 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
          </Link>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="bg-white pt-6 pb-0 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Desktop */}
          <div className={`hidden lg:flex ${bottomStats.length < 4 ? 'justify-center gap-10 xl:gap-16' : 'lg:grid lg:grid-cols-4'}`}>
            {bottomStats.map((stat, index, arr) => {
              const label    = stat.title ?? stat.label ?? ''
              const iconInfo = resolveBottomIcon(label, stat.icon)
              const isFirst  = index === 0
              const isLast   = index === arr.length - 1
              return (
                <div key={index}
                  className={`group flex items-center justify-between gap-3 transition-all duration-300 ${
                    isFirst ? 'pr-6 xl:pr-10 border-r border-[#8ED9EE]'
                    : isLast ? 'pl-6 xl:pl-10'
                    : 'px-6 xl:px-10 border-r border-[#8ED9EE]'
                  }`}>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[#0A2A4A] text-sm xl:text-[18px] font-extrabold uppercase whitespace-nowrap transition-colors duration-300 group-hover:text-[#8ED9EE]">
                      {label}
                    </h4>
                    <h2 className="text-[#0A2A4A] text-4xl xl:text-[54px] font-black leading-none mt-1 transition-transform duration-300 group-hover:translate-x-1">
                      {stat.value}
                    </h2>
                    <div className="w-[80px] xl:w-[110px] h-[2px] bg-[#8AA0BC] mt-2 mb-2 transition-all duration-300 group-hover:w-[140px] group-hover:bg-[#8ED9EE]" />
                    <p className="text-[#0A2A4A] text-sm xl:text-[16px] whitespace-nowrap font-medium">{stat.sub}</p>
                  </div>
                  <div className="flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {iconInfo.type === 'fa' ? (
                      <i className={`${iconInfo.src} text-[#0A2A4A] text-3xl xl:text-4xl`} />
                    ) : (
                      <Image src={iconInfo.src} alt="" width={64} height={64}
                             className="w-10 h-10 xl:w-16 xl:h-16 object-contain" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile + Tablet Slider */}
          <div className="lg:hidden">
            <style jsx global>{`
              .statsSwiper { padding-bottom: 0px; }
              .statsSwiper .swiper-pagination { position: static; margin-top: 16px; }
              .statsSwiper .swiper-pagination-bullet { background: #8AA0BC; opacity: 0.3; width: 6px; height: 6px; transition: all 0.3s ease; }
              .statsSwiper .swiper-pagination-bullet-active { background: #0A2A4A; opacity: 1; width: 16px; border-radius: 4px; }
            `}</style>
            <Swiper modules={[Pagination]} slidesPerView={1} spaceBetween={20}
                    pagination={{ clickable: true }} className="statsSwiper">
              {groupedStats.map((grp, slideIndex) => (
                <SwiperSlide key={slideIndex}>
                  <div className={`grid bg-white ${grp.length === 1 ? 'grid-cols-1 justify-items-center' : 'grid-cols-2'}`}>
                    {grp.map((stat, index) => {
                      const label    = stat.title ?? stat.label ?? ''
                      const iconInfo = resolveBottomIcon(label, stat.icon)
                      return (
                        <div key={index}
                          className={`group px-4 transition-all duration-200 active:bg-slate-50/50 rounded-lg ${index === 0 ? 'border-r border-[#8ED9EE]' : ''}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex-shrink-0 transition-all duration-300 group-active:scale-110 group-active:rotate-3">
                              {iconInfo.type === 'fa' ? (
                                <i className={`${iconInfo.src} text-[#5E7391] text-sm transition-colors duration-300 group-active:text-[#8ED9EE]`} />
                              ) : (
                                <Image src={iconInfo.src} alt="" width={18} height={18} className="object-contain" />
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
                          <p className="text-[#0A2A4A] text-sm font-medium">{stat.sub}</p>
                        </div>
                      )
                    })}
                  </div>
</SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Tagline below bottom stats */}
          {hero.tagline && (
            <p className="text-center text-[#0A2A4A] text-base md:text-lg font-semibold italic mx-auto pt-6 pb-8">
              {hero.tagline}
            </p>
          )}

           </div>
      </div>
    </>
  )
}