'use client'
import { useState } from "react";
import Image from "next/image";
import rectangle1 from '@/assets/rectangle1.png'
import rectangle2 from '@/assets/rectangle2.png'
import rectangle from '@/assets/rectangle.png'

import support from '@/assets/support.png'
import shield from '@/assets/shield.png'
import water from '@/assets/water.png'
import road1 from '@/assets/road1.png'
import mountain from '@/assets/mountain.png'
import temp from '@/assets/temp.png'

import star1 from '@/assets/star1.png'

const timelineData = [
  { x: 40, y: 425, textY: 215, title: 'FRIDAY', time: '14:00 - 20:00', text: 'Bib pick-up', sub: 'Le markstein',},
  { x: 215, y: 503, textY: 295, title: 'SATURDAY', time: '04:30 - 05:45', text: 'Last bib pick-up', sub: 'Le markstein',},
  { x: 405, y: 468, textY: 260, title: 'SATURDAY', time: '06:00', text: 'Start 50km', sub: 'Le markstein',},
  { x: 595, y: 422, textY: 210, title: 'SATURDAY', time: '11:00 (max)', text: 'Checkpoint 2 -', sub: 'Grand Ballon', km: '18km',},
  { x: 790, y: 437, textY: 225, title: 'SATURDAY', time: '16:00 (max)', text: 'Checkpoint 4 -', sub: 'Storkenkopf', km: '38km',},
  { x: 995, y: 480, textY: 270, title: 'SATURDAY', time: '20:00 (max)', text: 'Finish', sub: 'Le Markstein', km: '(50km)',},
]

const CURVE_PATH = `
 M 0,390
 C 150,530 250,520 400,470
 C 550,420 650,400 800,440
 C 950,480 1050,510 1200,430
`

const UPLOAD_BASE = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL || 'http://localhost'

// Fallback cards used only when no course_link_cards rows exist for this course
const defaultCards = [
  { src: rectangle1.src, alt: 'Summer at Val Thorens', title: 'Summer at Val Thorens', url: '#' },
  { src: rectangle2.src, alt: 'Documentation and Brochures', title: 'Documentation and Brochures', url: '#' },
  { src: rectangle1.src, alt: 'Frequently Asked Questions', title: 'Frequently Asked Questions', url: '#' },
]

type CourseData = {
  course_id: number
  title_word: string | null
  title_script: string | null
  tech_name: string | null
  tech_icon: string | null
  tech_stars: number | null
  tech_label: string | null
  terrain_name: string | null
  terrain_icon: string | null
  terrain_line1: string | null
  terrain_line2: string | null
  metric1_name: string | null
  metric1_sub_label: string | null
  metric1_value: string | null
  metric2_name: string | null
  metric2_sub_label: string | null
  metric2_value: string | null
  metric3_name: string | null
  metric3_sub_label: string | null
  metric3_value: string | null
  metric4_name: string | null
  metric4_sub_label: string | null
  metric4_value: string | null
} | null

type CourseLinkCard = {
  card_title: string | null
  card_image: string | null
  card_url: string | null
}

type Props = {
  course?: CourseData
  linkCards?: CourseLinkCard[]
}

export default function TimelineSection({ course, linkCards = [] }: Props) {
  const [cardIndex, setCardIndex] = useState(0);

  const cards = linkCards.length > 0
    ? linkCards.map((c) => ({
        src: c.card_image ? `${UPLOAD_BASE}${c.card_image}` : rectangle1.src,
        alt: c.card_title || 'Course link card',
        title: c.card_title || '',
        url: c.card_url || '#',
      }))
    : defaultCards;

  const prevCard = () => setCardIndex((i) => (i - 1 + cards.length) % cards.length);
  const nextCard = () => setCardIndex((i) => (i + 1) % cards.length);

  const techStars = course?.tech_stars ?? 4;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #d7edf8 0%, #edf7fd 100%)',
      }}
    >
      {/* ============ DESKTOP TIMELINE (horizontal SVG curve) ============ */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 1200 550"
          className="relative z-10 w-full h-auto block"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d7edf8" />
              <stop offset="100%" stopColor="#edf7fd" />
            </linearGradient>
          </defs>

          {/* Mask above the curve — gradient fill matches section background */}
          <path
            d={`
              M 0,0
              L 1200,0
              L 1200,430
              C 1050,510 950,480 800,440
              C 650,400 550,420 400,470
              C 250,520 150,530 0,390
              Z
            `}
            fill="url(#bgGradient)"
          />

          {/* Header Titles */}
          {/* Header Titles */}
          <text
            x="600"
            y="85"
            textAnchor="middle"
            fontSize="34"
            fontWeight="900"
            fill="#08264a"
            letterSpacing="3"
          >
            TIMELINE
          </text>

          <text
            x="600"
            y="108"
            textAnchor="middle"
            fontSize="42"
            fill="#23a8f2"
            style={{
              fontFamily: 'var(--font-playlist-script), cursive',
            }}
          >
            50k distance
          </text>
          {/* Curve stroke on top */}
          <path
            d={CURVE_PATH}
            fill="none"
            stroke="#35a8eb"
            strokeWidth="7"
            strokeLinecap="round"
            />

          {/* Timeline Nodes */}
          {timelineData.map((item, index) => (
            <g key={index}>
              <line
                x1={item.x}
                y1={item.textY + 38}
                x2={item.x}
                y2={item.y - 12}
                stroke="#6ca9d6"
                strokeWidth="1.5"
              />
              <circle cx={item.x} cy={item.y} r="11" fill="#fff" stroke="#35a8eb" strokeWidth="4" />
              <circle cx={item.x} cy={item.y} r="4" fill="#35a8eb" />
              <text x={item.x} y={item.textY} fontSize="20" fontWeight="800" fill="#08264a">
                {item.title}
              </text>
              <text x={item.x} y={item.textY + 26} fontSize="20" fontWeight="800" fill="#08264a">
                {item.time}
              </text>
              <text x={item.x + 20} y={item.textY + 56} fontSize="15" fontWeight="700" fill="#08264a">
                {item.text}
              </text>
              <text x={item.x + 20} y={item.textY + 76} fontSize="15" fontWeight="700" fill="#23a8f2">
                {item.sub}
              </text>
              {item.km && (
                <text x={item.x + 20} y={item.textY + 96} fontSize="15" fontWeight="700" fill="#23a8f2">
                  {item.km}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* ============ MOBILE TIMELINE (vertical zigzag list) ============ */}
      <div className="md:hidden">
        <div className="text-center pt-12 pb-8 px-6">
          <h2 className="text-[34px] font-black text-[#08264a] tracking-[4px]">TIMELINE</h2>
          <p className="text-[18px] text-[#23a8f2] italic mt-1" style={{ fontFamily: 'Georgia, serif' }}>
            50k distance
          </p>
        </div>

        <div className="relative px-6 pb-14">
          {/* connecting vertical line */}
          <div className="absolute left-1/2 top-2 bottom-2 w-[2px] bg-[#6ca9d6] -translate-x-1/2 z-0" />

          {timelineData.map((item, index) => {
            const isRight = index % 2 === 0;
            const content = (
              <>
                <div className="font-extrabold text-[#08264a] text-[17px] leading-tight">{item.title}</div>
                <div className="font-extrabold text-[#08264a] text-[17px] leading-tight mb-2">{item.time}</div>
                <div className="font-bold text-[#08264a] text-[14px] leading-snug">{item.text}</div>
                <div className="font-bold text-[#23a8f2] text-[14px] leading-snug">
                  {item.km ? `${item.sub} ${item.km}` : item.sub}
                </div>
              </>
            );

            return (
              <div
                key={index}
                className="relative z-10 grid grid-cols-2 gap-x-8 items-start mb-10 last:mb-0"
              >
                <div className={isRight ? "" : "text-right"}>
                  {!isRight && content}
                </div>
                <div>
                  {isRight && content}
                </div>

                {/* dot */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[4px] border-[#35a8eb] z-10" />
              </div>
            );
          })}
        </div>

        {/* decorative wave cap */}
        <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="block w-full" style={{ height: '40px' }}>
          <path d="M0,30 C100,55 200,5 400,30 L400,60 L0,60 Z" fill="#061831" />
        </svg>
      </div>

      {/* Mountain Section Container */}
      <div 
        className="relative z-0 w-full text-white bg-[#061831] -mt-px md:-mt-[13.3333vw]"
      >
        {/* Background Image & Ambient Blur Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={rectangle.src}
            alt="Mountain Background"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#edf7fd]/0 via-[#061831]/70 to-[#030d1a]" />
        </div>

        {/* Main Content Wrapper */}
        {/* <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-12 md:pt-44 pb-16 md:pb-24 flex flex-col gap-10 md:gap-16"> */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-12 md:pt-44 pb-16 md:pb-24 flex flex-col gap-10 md:gap-16 xl:pl-16">

          {/* Top Half: Course Details & Stats Grid */}
          <div className="flex flex-col lg:flex-row justify-between items-start w-full pt-0 md:pt-12 lg:pt-24">

            {/* LEFT SIDE — centered on mobile, left-aligned from lg up */}
            <div className="w-full lg:w-[360px] text-center lg:text-left">
              <h2 className="leading-[0.85]">
                <span className="block text-[40px] md:text-[64px] font-black uppercase text-white">
                  {course?.title_word ?? 'COURSE'}
                </span>

                <span
                  className="block text-[32px] md:text-[48px] text-[#2ea9ec] italic normal-case"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {course?.title_script ?? 'details'}
                </span>
              </h2>

              <p className="mt-6 md:mt-8 text-white/80 text-[16px] md:text-[20px] leading-[1.4] max-w-[320px] mx-auto lg:mx-0">
                Explore the course metrics and essential information to help you
                prepare for your adventure
              </p>
            </div>

            {/* RIGHT SIDE — 2-col grid full width on mobile, fixed 280/280 grid from md up */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 w-full mt-10 lg:mt-0 md:w-auto md:grid-cols-[280px_280px] md:gap-x-0 md:gap-y-6 md:ml-auto">

              {/* Technical */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  <Image
                    src={support}
                    alt="Technical"
                    className="w-5 h-5 md:w-6 md:h-6 object-contain"
                  />
                </div>

                <div>
                  <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase">
                    {course?.tech_name ?? 'TECHNICAL'}
                  </h4>

                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Image
                        key={i}
                        src={star1}
                        alt="star"
                        className={`w-6 h-6 md:w-8 md:h-8 object-contain -mr-1 ${i < techStars ? '' : 'opacity-20'}`}
                      />
                    ))}
                  </div>

                  <p className="text-white/70 text-xs md:text-sm mt-1">
                    {course?.tech_label ?? 'very technical'}
                  </p>
                </div>
              </div>

              {/* Terrains */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  <Image
                    src={shield}
                    alt="Terrains"
                    className="w-5 h-5 md:w-6 md:h-6 object-contain"
                  />
                </div>

                <div>
                  <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase">
                    {course?.terrain_name ?? 'TERRAINS'}
                  </h4>

                  <p className="text-white text-xs md:text-sm mt-1">
                    {course?.terrain_line1 ?? 'Mountain trails & singletrack'}
                  </p>

                  <p className="text-white/70 text-xs md:text-sm">
                    {course?.terrain_line2 ?? 'Snow, rocks, forest'}
                  </p>
                </div>
              </div>

              {/* Wet */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  <Image
                    src={water}
                    alt="Wet Conditions"
                    className="w-5 h-5 md:w-6 md:h-6 object-contain"
                  />
                </div>

                <div>
                  <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase leading-tight" style={{ whiteSpace: 'pre-line' }}>
                    {course?.metric1_name ?? 'SPEED FACTOR\nWET CONDITIONS'}
                  </h4>

                  <p className="text-[#2ea9ec] text-[26px] md:text-[42px] font-black leading-none mt-2">
                    {course?.metric1_value ?? '1.2'}
                  </p>
                </div>
              </div>

              {/* Offroad */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  <Image
                    src={road1}
                    alt="Offroad"
                    className="w-5 h-5 md:w-6 md:h-6 object-contain"
                  />
                </div>

                <div>
                  <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase">
                    {course?.metric2_name ?? 'OFFROAD RATIO'}
                  </h4>

                  <p className="text-[#2ea9ec] text-[26px] md:text-[42px] font-black leading-none mt-2">
                    {course?.metric2_value ?? '85%'}
                  </p>
                </div>
              </div>

              {/* Vertical */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  <Image
                    src={mountain}
                    alt="Terrains"
                    className="w-5 h-5 md:w-6 md:h-6 object-contain"
                  />
                </div>

                <div>
                  <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase">
                    {course?.metric3_name ?? 'VERTICAL INDEX'}
                  </h4>

                  <p className="text-[#2ea9ec] text-[26px] md:text-[42px] font-black leading-none mt-2">
                    {course?.metric3_value ?? '100K'}
                  </p>
                </div>
              </div>

              {/* Dry */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  <Image
                    src={temp}
                    alt="Dry Conditions"
                    className="w-5 h-5 md:w-6 md:h-6 object-contain"
                  />
                </div>

                <div>
                  <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase leading-tight" style={{ whiteSpace: 'pre-line' }}>
                    {course?.metric4_name ?? 'SPEED FACTOR\nDRY CONDITIONS'}
                  </h4>

                  <p className="text-[#2ea9ec] text-[26px] md:text-[42px] font-black leading-none mt-2">
                    {course?.metric4_value ?? '1.1'}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ============ DESKTOP CARDS — 3-col grid ============ */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 mt-4 relative z-30 translate-y-[110px] -mb-[110px]">
            {cards.map((card, i) => (
              <a
                key={i}
                href={card.url}
                className="group relative overflow-hidden rounded-[24px] aspect-[1.8/1] bg-slate-800 shadow-xl cursor-pointer block"
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-5 px-6 flex items-end justify-between">
                  <h3 className="text-[18px] leading-[1.05] font-bold text-white max-w-[75%]" style={{ whiteSpace: 'pre-line' }}>
                    {card.title}
                  </h3>

                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:translate-x-1">
                    <svg
                      className="w-4 h-4 text-[#2ea9ec]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* ============ MOBILE CARDS — single-card carousel ============ */}
          <div className="md:hidden relative z-30 mt-2">
            <a href={cards[cardIndex].url} className="relative overflow-hidden rounded-[24px] aspect-[1.6/1] bg-slate-800 shadow-xl block">
              <img
                src={cards[cardIndex].src}
                alt={cards[cardIndex].alt}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-5 px-6">
                <h3 className="text-[18px] leading-[1.05] font-bold text-white" style={{ whiteSpace: 'pre-line' }}>
                  {cards[cardIndex].title}
                </h3>
              </div>
            </a>

            {/* prev / next controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevCard}
                aria-label="Previous card"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>

              <button
                onClick={nextCard}
                aria-label="Next card"
                className="w-10 h-10 rounded-full bg-[#2ea9ec] flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

        </div>
        <div className="bg-white w-full h-40 md:h-56 relative" style={{ zIndex: 1 }} /> 
      </div>
    </section>
  )
}
