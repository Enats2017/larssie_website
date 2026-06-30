'use client'
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import rectangle from '@/assets/rectangle.png'
import rectangle1 from '@/assets/rectangle1.png'
import star1 from '@/assets/star1.png'

const UPLOAD_BASE = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL || ''


function ScrollInLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => { setVisible(entry.isIntersecting) }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    observer.observe(el); return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 md:-translate-x-16'}`}>
      {children}
    </div>
  )
}

function ScrollFadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => { setVisible(entry.isIntersecting) }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    observer.observe(el); return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 md:translate-y-8'}`}>
      {children}
    </div>
  )
}

type CourseData = {
  course_id: number
  title_word: string | null
  title_script: string | null
  title_word_nl?: string | null
  title_word_fr?: string | null
  title_script_nl?: string | null
  title_script_fr?: string | null
  description?: string | null
  description_nl?: string | null
  description_fr?: string | null
  tech_name: string | null
  tech_name_nl?: string | null
  tech_name_fr?: string | null
  tech_icon: string | null
  tech_stars: number | null
  tech_label: string | null
  tech_label_nl?: string | null
  tech_label_fr?: string | null
  terrain_name: string | null
  terrain_name_nl?: string | null
  terrain_name_fr?: string | null
  terrain_icon: string | null
  terrain_line1: string | null
  terrain_line1_nl?: string | null
  terrain_line1_fr?: string | null
  terrain_line2: string | null
  terrain_line2_nl?: string | null
  terrain_line2_fr?: string | null
  metric1_name: string | null
  metric1_name_nl?: string | null
  metric1_name_fr?: string | null
  metric1_value: string | null
  metric1_value_nl?: string | null
  metric1_value_fr?: string | null
  metric1_icon?: string | null
  metric2_icon?: string | null
  metric3_icon?: string | null
  metric4_icon?: string | null
  metric2_name: string | null
  metric2_name_nl?: string | null
  metric2_name_fr?: string | null
  metric2_value: string | null
  metric2_value_nl?: string | null
  metric2_value_fr?: string | null
  metric3_name: string | null
  metric3_name_nl?: string | null
  metric3_name_fr?: string | null
  metric3_value: string | null
  metric3_value_nl?: string | null
  metric3_value_fr?: string | null
  metric4_name: string | null
  metric4_name_nl?: string | null
  metric4_name_fr?: string | null
  metric4_value: string | null
  metric4_value_nl?: string | null
  metric4_value_fr?: string | null
} | null

type LinkCard = {
  card_title: string | null
  card_image: string | null
  card_url: string | null
}

type Props = {
  course?: CourseData
  linkCards?: LinkCard[]
  lang?: string
}

export default function CourseDetailsSection({ course, linkCards = [], lang = 'en' }: Props) {
  const [cardIndex, setCardIndex] = useState(0)
  const prevCard = () => setCardIndex((i) => (i - 1 + displayCards.length) % displayCards.length)
  const nextCard = () => setCardIndex((i) => (i + 1) % displayCards.length)

  const L = <T,>(en: T, nl?: T | null, fr?: T | null): T =>
    (lang === 'nl' ? nl : lang === 'fr' ? fr : null) ?? en

  const titleWord = L(course?.title_word ?? 'COURSE', course?.title_word_nl, course?.title_word_fr)
  const titleScript = L(course?.title_script ?? 'details', course?.title_script_nl, course?.title_script_fr)
  const techName = L(course?.tech_name ?? 'TECHNICAL', course?.tech_name_nl, course?.tech_name_fr)
  const techLabel = L(course?.tech_label ?? 'very technical', course?.tech_label_nl, course?.tech_label_fr)
  const terrainName = L(course?.terrain_name ?? 'TERRAINS', course?.terrain_name_nl, course?.terrain_name_fr)
  const terrainLine1 = L(course?.terrain_line1 ?? 'Mountain trails & singletrack', course?.terrain_line1_nl, course?.terrain_line1_fr)
  const terrainLine2 = L(course?.terrain_line2 ?? 'Snow, rocks, forest', course?.terrain_line2_nl, course?.terrain_line2_fr)
  const techStars = course?.tech_stars ?? 4

  const metrics = [
    { name: L(course?.metric1_name ?? '...', course?.metric1_name_nl, course?.metric1_name_fr), value: L(course?.metric1_value ?? '1.2', course?.metric1_value_nl, course?.metric1_value_fr), icon: course?.metric1_icon || 'fa-solid fa-droplet' },
    { name: L(course?.metric2_name ?? '...', course?.metric2_name_nl, course?.metric2_name_fr), value: L(course?.metric2_value ?? '85%', course?.metric2_value_nl, course?.metric2_value_fr), icon: course?.metric2_icon || 'fa-solid fa-route' },
    { name: L(course?.metric3_name ?? '...', course?.metric3_name_nl, course?.metric3_name_fr), value: L(course?.metric3_value ?? '100K', course?.metric3_value_nl, course?.metric3_value_fr), icon: course?.metric3_icon || 'fa-solid fa-mountain' },
    { name: L(course?.metric4_name ?? '...', course?.metric4_name_nl, course?.metric4_name_fr), value: L(course?.metric4_value ?? '1.1', course?.metric4_value_nl, course?.metric4_value_fr), icon: course?.metric4_icon || 'fa-solid fa-sun' },
  ]

  const displayCards = linkCards.length > 0
    ? linkCards.map(c => ({
      src: c.card_image ? `${UPLOAD_BASE}${c.card_image}` : rectangle1.src,
      title: c.card_title ?? '',
      url: c.card_url ?? '#',
    }))
    : [
      { src: rectangle1.src, title: 'Summer at Val Thorens', url: '#' },
      { src: rectangle1.src, title: 'Documentation and Brochures', url: '#' },
      { src: rectangle1.src, title: 'Frequently Asked Questions', url: '#' },
    ]

  return (
    <div className="relative z-0 w-full min-h-[560px] text-white bg-[#061831] -mt-px md:[margin-top:max(-15vw,-206.55px)]">

      <div className="hidden md:block absolute -top-0 left-0 w-full pointer-events-none" style={{ zIndex: 20, height: '8.55px', backgroundColor: '#35a8eb' }} />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={rectangle.src} alt="Mountain Background" className="w-full h-full object-cover opacity-35" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-10 md:pt-[155px] pb-14 md:pb-[85px] flex flex-col gap-2 md:gap-8">

        <div className="flex flex-col lg:flex-row justify-between items-start w-full pt-0 md:pt-[42px] lg:pt-[85px]">

          {/* LEFT */}
          <div className="w-full lg:w-[360px] text-center lg:text-left">
            <ScrollInLeft delay={0}>
              <h2 className="leading-[0.85]">
                <span className="block text-[32px] md:text-[51px] font-black uppercase text-white">{titleWord}</span>
                <span className="inline-block font-playlist text-[28px] md:text-[40px] text-sky-500 -mb-6 ml-10 md:ml-16 transition-all duration-300 hover:translate-x-1">
                  {titleScript}
                </span>
              </h2>
            </ScrollInLeft>
            <ScrollFadeUp delay={150}>
              <p className="mt-6 md:mt-8 text-white/80 text-[16px] md:text-[20px] leading-[1.4] max-w-[320px] mx-auto lg:mx-0">
                {L(course?.description ?? 'Explore the course metrics and essential information to help you prepare for your adventure', course?.description_nl, course?.description_fr)}
              </p>
            </ScrollFadeUp>
          </div>

          {/* RIGHT — stats */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 w-full mt-10 lg:mt-0 md:w-auto md:grid-cols-[280px_280px] md:gap-x-0 md:gap-y-6 md:ml-auto">

            {/* Technical */}
            <ScrollInLeft delay={0}>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center shrink-0 overflow-hidden [&:hover>span]:translate-y-0">
                  <span className="absolute inset-0 rounded-full bg-white translate-y-full transition-transform duration-300 ease-out" />
                  <i className={`${course?.tech_icon || 'fa-solid fa-mountain'} text-[#2ea9ec] text-lg relative z-10`}></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase">{techName}</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Image key={i} src={star1} alt="star" className={`w-6 h-6 md:w-8 md:h-8 object-contain -mr-1 ${i < techStars ? '' : 'opacity-20'}`} />
                    ))}
                  </div>
                  <p className="text-white/70 text-xs md:text-sm mt-1">{techLabel}</p>
                </div>
              </div>
            </ScrollInLeft>

            {/* Terrains */}
            <ScrollInLeft delay={80}>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center shrink-0 overflow-hidden [&:hover>span]:translate-y-0">
                  <span className="absolute inset-0 rounded-full bg-white translate-y-full transition-transform duration-300 ease-out" />
                  <i className={`${course?.terrain_icon || 'fa-solid fa-shield-halved'} text-[#2ea9ec] text-lg relative z-10`}></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase">{terrainName}</h4>
                  <p className="text-white text-xs md:text-sm mt-1">{terrainLine1}</p>
                  <p className="text-white/70 text-xs md:text-sm">{terrainLine2}</p>
                </div>
              </div>
            </ScrollInLeft>

            {/* Metrics 1-4 */}
            {metrics.map((m, i) => (
              <ScrollInLeft key={i} delay={(i + 2) * 80}>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center shrink-0 overflow-hidden [&:hover>span]:translate-y-0">
                    <span className="absolute inset-0 rounded-full bg-white translate-y-full transition-transform duration-300 ease-out" />
                    <i className={`${m.icon} text-[#2ea9ec] text-lg relative z-10`}></i>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase leading-tight">
                      {m.name.split('\n').map((line, j, arr) => (
                        <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                      ))}
                    </h4>
                    <p className="text-[#2ea9ec] text-[26px] md:text-[42px] font-black leading-none mt-2">{m.value}</p>
                  </div>
                </div>
              </ScrollInLeft>
            ))}
          </div>
        </div>

        {/* Desktop Cards */}
        <ScrollInLeft delay={200}>
          <div className="hidden md:grid md:grid-cols-3 gap-4 relative z-30 translate-y-[clamp(0px,3vw,40px)] -mb-[clamp(0px,3vw,40px)]">
            {displayCards.map((card, i) => (
              <a key={i} href={card.url} className="group relative overflow-hidden rounded-[24px] aspect-[1.8/1] bg-slate-800 shadow-xl cursor-pointer block">
                <img src={card.src} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-5 px-6 flex items-end justify-between">
                  <h3 className="text-[18px] leading-[1.05] font-bold text-white max-w-[75%]">{card.title}</h3>
                  <span className="flex h-8 w-12 items-center justify-center rounded-full bg-white/90 shrink-0 transition-colors duration-300 group-hover:bg-[#36A5DD]">
                    <svg className="w-6 h-6 text-[#36A5DD] transition-all duration-300 group-hover:-rotate-45 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </ScrollInLeft>

        {/* Mobile Carousel */}
        <ScrollFadeUp delay={100}>
          <div className="md:hidden relative z-40 mt-2 translate-y-[20%]">
            <a href={displayCards[cardIndex].url} className="relative overflow-hidden rounded-[24px] aspect-[1.6/1] bg-slate-800 shadow-xl block">
              <img src={displayCards[cardIndex].src} alt={displayCards[cardIndex].title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-5 px-6">
                <h3 className="text-[18px] font-bold text-white">{displayCards[cardIndex].title}</h3>
              </div>
            </a>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={prevCard} className="w-10 h-10 rounded-full bg-[#061831] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
              <button onClick={nextCard} className="w-10 h-10 rounded-full bg-[#2ea9ec] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </ScrollFadeUp>

      </div>
      <div className="bg-white w-full h-64 md:h-[145px] relative -mt-[130px] md:-mt-[140px]" style={{ zIndex: 1 }} />
    </div>
  )
}