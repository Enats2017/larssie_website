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

const cards = [
  { image: rectangle1, alt: 'Summer at Val Thorens', title: ['Summer at', 'Val Thorens'] },
  { image: rectangle2, alt: 'Documentation and Brochures', title: ['Documentation', 'and Brochures'] },
  { image: rectangle1, alt: 'Frequently Asked Questions', title: ['Frequently', 'Asked Questions'] },
]

export default function CourseDetailsSection() {
  const [cardIndex, setCardIndex] = useState(0);
  const prevCard = () => setCardIndex((i) => (i - 1 + cards.length) % cards.length);
  const nextCard = () => setCardIndex((i) => (i + 1) % cards.length);

  return (
    <div className="relative z-0 w-full min-h-[560px] text-white bg-[#061831] -mt-px md:[margin-top:max(-15vw,-206.55px)]">

      {/* ── BLUE STROKE BRIDGE ── */}
      <div
        className="hidden md:block absolute -top-0 left-0 w-full pointer-events-none"
        style={{ zIndex: 20, height: '8.55px', backgroundColor: '#35a8eb' }}
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={rectangle.src}
          alt="Mountain Background"
          className="w-full h-full object-cover opacity-35"
        />
      </div>

      {/* Main Content Wrapper */}
     <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-10 md:pt-[155px] pb-14 md:pb-[85px] flex flex-col gap-8 md:gap-8">

        {/* Top Half: Course Details & Stats Grid */}
        <div className="flex flex-col lg:flex-row justify-between items-start w-full pt-0 md:pt-[42px] lg:pt-[85px]">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-[360px] text-center lg:text-left">
          <h2 className="leading-[0.85]">
            <span className="block text-[32px] md:text-[51px] font-black uppercase text-white">
              COURSE
            </span>

            <span
              className="
                inline-block
                font-playlist text-[28px] md:text-[40px]
                text-sky-500 -mb-6 ml-10 md:ml-16
                transition-all duration-300
                hover:translate-x-1
              "
            >
              details
            </span>
          </h2>

            <p className="mt-6 md:mt-8 text-white/80 text-[16px] md:text-[20px] leading-[1.4] max-w-[320px] mx-auto lg:mx-0">
              Explore the course metrics and essential information to help you
              prepare for your adventure
            </p>
          </div>

          {/* RIGHT SIDE — stats grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 w-full mt-10 lg:mt-0 md:w-auto md:grid-cols-[280px_280px] md:gap-x-0 md:gap-y-6 md:ml-auto">

            {/* Technical */}
            <div className="flex items-start gap-3 md:gap-4">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-transparent flex items-center justify-center shrink-0 overflow-hidden [&:hover>span]:translate-y-0">
                <span className="absolute inset-0 rounded-full bg-white translate-y-full transition-transform duration-300 ease-out" />
                <Image
                  src={support}
                  alt="Technical"
                  className="relative z-10 w-5 h-5 md:w-6 md:h-6 object-contain [filter:invert(51%)_sepia(98%)_saturate(400%)_hue-rotate(170deg)_brightness(95%)]"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase">
                  TECHNICAL
                </h4>
                <div className="flex items-center mt-1">
                  {[...Array(4)].map((_, i) => (
                    <Image
                      key={i}
                      src={star1}
                      alt="star"
                      className="w-6 h-6 md:w-8 md:h-8 object-contain -mr-1"
                    />
                  ))}
                  <Image
                    src={star1}
                    alt="star"
                    className="w-6 h-6 md:w-8 md:h-8 object-contain opacity-20"
                  />
                </div>
                <p className="text-white/70 text-xs md:text-sm mt-1">very technical</p>
              </div>
            </div>

            {/* Terrains */}
            <div className="flex items-start gap-3 md:gap-4">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-transparent flex items-center justify-center shrink-0 overflow-hidden [&:hover>span]:translate-y-0">
                <span className="absolute inset-0 rounded-full bg-white translate-y-full transition-transform duration-300 ease-out" />
                <Image
                  src={shield}
                  alt="Terrains"
                  className="relative z-10 w-5 h-5 md:w-6 md:h-6 object-contain [filter:invert(51%)_sepia(98%)_saturate(400%)_hue-rotate(170deg)_brightness(95%)]"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase">
                  TERRAINS
                </h4>
                <p className="text-white text-xs md:text-sm mt-1">Mountain trails & singletrack</p>
                <p className="text-white/70 text-xs md:text-sm">Snow, rocks, forest</p>
              </div>
            </div>

            {/* Wet */}
            <div className="flex items-start gap-3 md:gap-4">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-transparent flex items-center justify-center shrink-0 overflow-hidden [&:hover>span]:translate-y-0">
                <span className="absolute inset-0 rounded-full bg-white translate-y-full transition-transform duration-300 ease-out" />
                <Image
                  src={water}
                  alt="Wet Conditions"
                  className="relative z-10 w-5 h-5 md:w-6 md:h-6 object-contain [filter:invert(51%)_sepia(98%)_saturate(400%)_hue-rotate(170deg)_brightness(95%)]"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase leading-tight">
                  SPEED FACTOR<br />WET CONDITIONS
                </h4>
                <p className="text-[#2ea9ec] text-[26px] md:text-[42px] font-black leading-none mt-2">1.2</p>
              </div>
            </div>

            {/* Offroad */}
            <div className="flex items-start gap-3 md:gap-4">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-transparent flex items-center justify-center shrink-0 overflow-hidden [&:hover>span]:translate-y-0">
                <span className="absolute inset-0 rounded-full bg-white translate-y-full transition-transform duration-300 ease-out" />
                <Image
                  src={road1}
                  alt="Offroad"
                  className="relative z-10 w-5 h-5 md:w-6 md:h-6 object-contain [filter:invert(51%)_sepia(98%)_saturate(400%)_hue-rotate(170deg)_brightness(95%)]"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase">
                  OFFROAD RATIO
                </h4>
                <p className="text-[#2ea9ec] text-[26px] md:text-[42px] font-black leading-none mt-2">85%</p>
              </div>
            </div>

            {/* Vertical */}
            <div className="flex items-start gap-3 md:gap-4">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-transparent flex items-center justify-center shrink-0 overflow-hidden [&:hover>span]:translate-y-0">
                <span className="absolute inset-0 rounded-full bg-white translate-y-full transition-transform duration-300 ease-out" />
                <Image
                  src={mountain}
                  alt="Vertical Index"
                  className="relative z-10 w-5 h-5 md:w-6 md:h-6 object-contain [filter:invert(51%)_sepia(98%)_saturate(400%)_hue-rotate(170deg)_brightness(95%)]"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase">
                  VERTICAL INDEX
                </h4>
                <p className="text-[#2ea9ec] text-[26px] md:text-[42px] font-black leading-none mt-2">100K</p>
              </div>
            </div>

            {/* Dry */}
            <div className="flex items-start gap-3 md:gap-4">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-transparent flex items-center justify-center shrink-0 overflow-hidden [&:hover>span]:translate-y-0">
                <span className="absolute inset-0 rounded-full bg-white translate-y-full transition-transform duration-300 ease-out" />
                <Image
                  src={temp}
                  alt="Dry Conditions"
                  className="relative z-10 w-5 h-5 md:w-6 md:h-6 object-contain [filter:invert(51%)_sepia(98%)_saturate(400%)_hue-rotate(170deg)_brightness(95%)]"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-[12px] md:text-[15px] uppercase leading-tight">
                  SPEED FACTOR<br />DRY CONDITIONS
                </h4>
                <p className="text-[#2ea9ec] text-[26px] md:text-[42px] font-black leading-none mt-2">1.1</p>
              </div>
            </div>

          </div>
        </div>

        {/* ============ DESKTOP CARDS — 3-col grid ============ */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 relative z-30 translate-y-[clamp(0px,3vw,40px)] -mb-[clamp(0px,3vw,40px)]">
          {cards.map((card, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[24px] aspect-[1.8/1] bg-slate-800 shadow-xl cursor-pointer">
              <img
                src={card.image.src}
                alt={card.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-5 px-6 flex items-end justify-between">
                <h3 className="text-[18px] leading-[1.05] font-bold text-white max-w-[75%] transition-all duration-300 group-hover:translate-x-1">
                  {card.title[0]}<br />{card.title[1]}
                </h3>

                <span
                  className="
                    flex h-8 w-12 items-center justify-center
                    rounded-full bg-white/90 shrink-0
                    transition-all duration-300
                    group-hover:bg-[#36A5DD]
                  "
                >
                  <svg
                    className="
                      w-6 h-6 text-[#36A5DD]
                      transition-all duration-300
                      group-hover:text-white
                      group-hover:-rotate-45
                    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-5-5 5 5-5 5"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ============ MOBILE CARDS — single-card carousel ============ */}
        <div className="md:hidden relative z-30 mt-2">
          <div className="relative overflow-hidden rounded-[24px] aspect-[1.6/1] bg-slate-800 shadow-xl">
            <img
              src={cards[cardIndex].image.src}
              alt={cards[cardIndex].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-5 px-6">
              <h3 className="text-[18px] leading-[1.05] font-bold text-white">
                {cards[cardIndex].title[0]}<br />{cards[cardIndex].title[1]}
              </h3>
            </div>
          </div>

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
      <div className="bg-white w-full h-36 md:h-[145px] relative -mt-[130px] md:-mt-[140px]" style={{ zIndex: 1 }} />
    </div>
  )
}