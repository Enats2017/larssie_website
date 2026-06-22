"use client";

import Image from "next/image";
import background from "@/assets/background.png";
import mountain from "@/assets/mountain.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function TerritorySection() {
  return (
      <section className="relative w-full overflow-hidden bg-white">

      {/* Top Curve */}
      <div className="absolute top-0 left-0 w-full z-20">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[45px] md:h-[55px]"
        >
          <path
            d="M0,45 C480,0 960,0 1440,45 L1440,0 L0,0 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="relative min-h-[850px] md:min-h-[950px] w-full">

        {/* Background */}
        <Image
          src={background}
          alt="Val Thorens"
          fill
          priority
          className="object-cover object-center md:object-top"
        />

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-[#00245a]/35 z-[1]" /> */}

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-[#001e4a] via-[#001e4a]/70 to-transparent z-[2]" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[700px] md:min-h-[760px] items-center justify-center px-5 md:px-6 pt-24 md:pt-32">

          <div
            className="
              w-full
              max-w-[1200px]
              text-center
              rounded-[30px]
              md:rounded-none
              bg-[#012f6f]/40
              md:bg-transparent
              backdrop-blur-sm
              md:backdrop-blur-0
              px-6
              py-10
              md:p-0
            "
          >
            {/* Subtitle */}
<h3 className="font-playlist text-[28px] md:text-[40px] text-sky-500 -mb-6 transition-all duration-300 hover:translate-x-1">
  The Territory
</h3>

<h2 className="font-black text-3xl md:text-4xl text-white tracking-wide mb-0">
  VAL THORENS
</h2>

            {/* Altitude */}
            <div className="mt-6 md:mt-8 flex justify-center">
              <div
                className="
                  group
                  flex items-center gap-2 md:gap-3
                  rounded-full
                  border border-white/20
                  bg-white/10
                  px-5 md:px-8
                  py-2 md:py-3
                  backdrop-blur-sm

                  transition-all duration-300
                  hover:bg-white/15
                  hover:border-white/40
                  hover:-translate-y-1
                  hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]
                "
              >
                <Image
                  src={mountain}
                  alt="Mountain"
                  width={34}
                  height={34}
                  className="
                    md:w-10 md:h-10
                    transition-all duration-300
                    group-hover:scale-110
                  "
                />

                <span
                  className="
                    text-white
                    text-[14px] md:text-[20px]
                    italic
                    transition-all duration-300
                    group-hover:translate-x-1
                  "
                >
                  Altitude : 2,300m to 3,200m
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 md:mt-10 max-w-[950px] mx-auto">

              <p className="text-white text-[16px] md:text-[20px] italic font-medium leading-relaxed">
                Val Thorens is located in the heart of the 3 Valleys,
                the world's largest ski area.
              </p>

              <p className="mt-3 text-white text-[16px] md:text-[20px] italic font-medium leading-relaxed">
                A unique alpine destination with breathtaking panoramas
                all year round.
              </p>

            </div>

            {/* Buttons */}
            <div
              className="
                mt-10 md:mt-12
                flex flex-col md:flex-row
                items-center
                justify-center
                gap-4 md:gap-6
                w-full
                max-w-md
                md:max-w-none
                mx-auto
              "
            >
              {/* Explore */}
              {/* <button
                className="
                  group
                  flex items-center justify-between
                  w-full md:min-w-[360px]
                  md:w-auto
                  h-[58px] md:h-[68px]
                  rounded-full
                  bg-[#35AFFF]
                  border-2 border-[#35AFFF]
                  px-6 md:px-8
                  text-white
                  text-[15px] md:text-[18px]
                  font-semibold
                  transition-all duration-300
                  hover:bg-white
                  hover:text-[#35AFFF]
                  hover:border-white
                "
              >
                <span>Explore The Territory</span>

                <span
                  className="
                    flex h-8 w-12 items-center justify-center
                    rounded-full bg-white shrink-0
                    transition-all duration-300
                    group-hover:bg-[#35AFFF]
                  "
                >
                  <svg
                    className="
                      w-6 h-6 text-[#35AFFF]
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
              </button> */}
              <button
                className="
                  relative overflow-hidden
                  flex items-center justify-center
                  w-full md:min-w-[360px]
                  md:w-auto
                  h-[58px] md:h-[68px]
                  rounded-full
                  bg-[#35AFFF]
                  text-white
                  text-[15px] md:text-[18px]
                  font-semibold

                  before:absolute before:inset-0
                  before:bg-white before:rounded-full
                  before:-translate-x-[110%]
                  hover:before:translate-x-0
                  before:transition-transform
                  before:duration-[600ms]
                  before:ease-in-out

                  transition-colors duration-[600ms]
                  hover:text-[#35AFFF]
                "
              >
                <span className="relative z-10">
                  Explore The Territory
                </span>
              </button>

              {/* FAQ */}
              {/* <button
                className="
                  group
                  flex items-center justify-between
                  w-full md:min-w-[180px]
                  md:w-auto
                  h-[58px] md:h-[68px]
                  rounded-full
                  bg-white
                  px-6 md:px-8
                  text-[#35AFFF]
                  text-[15px] md:text-[18px]
                  font-semibold
                  transition-all duration-300
                  hover:bg-[#35AFFF]
                  hover:text-white
                "
              >
                <span>FAQs</span>

                <span
                  className="
                    flex h-8 w-12 items-center justify-center
                    rounded-full bg-[#35AFFF] shrink-0
                    transition-all duration-300
                    group-hover:bg-white
                  "
                >
                  <svg
                    className="
                      w-6 h-6 text-white
                      transition-all duration-300
                      group-hover:text-[#35AFFF]
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
              </button> */}
              <button
                className="
                  relative overflow-hidden
                  flex items-center justify-center
                  w-full md:min-w-[180px]
                  md:w-auto
                  h-[58px] md:h-[68px]
                  rounded-full
                  bg-white
                  text-[#35AFFF]
                  text-[15px] md:text-[18px]
                  font-semibold

                  before:absolute before:inset-0
                  before:bg-[#35AFFF] before:rounded-full
                  before:-translate-x-[110%]
                  hover:before:translate-x-0
                  before:transition-transform
                  before:duration-[600ms]
                  before:ease-in-out

                  transition-colors duration-[600ms]
                  hover:text-white
                "
              >
                <span className="relative z-10">
                  FAQs
                </span>
              </button>

            </div>
          </div>
        </div>

        {/* Sponsors */}
        {/* <div className="relative z-10 pb-12 md:pb-16">

          <div className="flex items-center justify-center gap-3 md:gap-8 px-4 md:px-8">

            <div className="h-px flex-1 bg-white/20" />

            <span className="text-[9px] md:text-[11px] font-semibold italic uppercase tracking-[3px] md:tracking-[4px] text-white whitespace-nowrap">
              Proudly Supported By
            </span>

            <div className="h-px flex-1 bg-white/20" />

          </div>

          <div className="mt-8 md:mt-10 overflow-hidden">

            <div className="flex w-max items-center gap-10 md:gap-20 animate-sponsors">

              <span className="text-2xl md:text-5xl font-bold text-white">
                amazon
              </span>

              <span className="text-2xl md:text-5xl font-bold text-white">
                facebook
              </span>

              <span className="text-2xl md:text-5xl font-black italic text-white">
                Nike
              </span>

              <div className="text-center font-black uppercase leading-none text-white text-sm md:text-base">
                <div>THE</div>
                <div>NORTH</div>
                <div>FACE</div>
              </div>

              <span className="text-2xl md:text-5xl font-bold text-white">
                GoPro
              </span>

              <span className="text-2xl md:text-5xl font-bold text-white">
                amazon
              </span>

              <span className="text-2xl md:text-5xl font-bold text-white">
                facebook
              </span>

              <span className="text-2xl md:text-5xl font-black italic text-white">
                Nike
              </span>

              <div className="text-center font-black uppercase leading-none text-white text-sm md:text-base">
                <div>THE</div>
                <div>NORTH</div>
                <div>FACE</div>
              </div>

              <span className="text-2xl md:text-5xl font-bold text-white">
                GoPro
              </span>

            </div>

          </div>
        </div> */}

        {/* Sponsors */}
        <div className="relative z-10 pb-12 md:pb-16">
          <div className="flex items-center justify-center gap-3 md:gap-8 px-4 md:px-8">
            <div className="h-px flex-1 bg-white/20" />

            <span className="text-[9px] md:text-[11px] font-semibold italic uppercase tracking-[3px] md:tracking-[4px] text-white whitespace-nowrap">
              Proudly Supported By
            </span>

            <div className="h-px flex-1 bg-white/20" />
          </div>

     
          {/* Sponsors List */}
          {/* Sponsors List */}
          <div className="mt-8 md:mt-10">
            {(() => {
              const sponsors = [
                { type: 'text', label: 'amazon', className: 'font-bold' },
                { type: 'text', label: 'facebook', className: 'font-bold' },
                { type: 'text', label: 'Nike', className: 'font-black italic' },
                { type: 'stack', lines: ['THE', 'NORTH', 'FACE'] },
                { type: 'text', label: 'GoPro', className: 'font-bold' },
                { type: 'text', label: 'GoPro', className: 'font-bold' },
                { type: 'text', label: 'GoPro', className: 'font-bold' },
                { type: 'text', label: 'GoPro', className: 'font-bold' },
              ]

              const showPagination = sponsors.length > 5

              const renderSponsor = (s, i) =>
                s.type === 'stack' ? (
                  <div key={i} className="text-center font-black uppercase leading-none text-white text-sm md:text-base shrink-0">
                    {s.lines.map((line, j) => <div key={j}>{line}</div>)}
                  </div>
                ) : (
                  <span key={i} className={`text-2xl md:text-5xl text-white shrink-0 whitespace-nowrap ${s.className}`}>
                    {s.label}
                  </span>
                )

              if (!showPagination) {
                return (
                  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 px-6">
                    {sponsors.map((s, i) => renderSponsor(s, i))}
                  </div>
                )
              }

              // Chunk sponsors into pages of 5
              const groupedSponsors = []
              for (let i = 0; i < sponsors.length; i += 5) {
                groupedSponsors.push(sponsors.slice(i, i + 5))
              }

              return (
                <>
                  <style jsx global>{`
                    .sponsorSwiper {
                      padding-bottom: 28px;
                    }
                    .sponsorSwiper .swiper-pagination {
                      position: static;
                      margin-top: 16px;
                    }
                    .sponsorSwiper .swiper-pagination-bullet {
                      background: #8AA0BC;
                      opacity: 0.3;
                      width: 6px;
                      height: 6px;
                      transition: all 0.3s ease;
                    }
                    .sponsorSwiper .swiper-pagination-bullet-active {
                      background: #ffffff;
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
                    className="sponsorSwiper px-6"
                  >
                    {groupedSponsors.map((group, slideIndex) => (
                      <SwiperSlide key={slideIndex}>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20">
                          {group.map((s, i) => renderSponsor(s, i))}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              )
            })()}
          </div>
        </div>

      </div>
    </section>
  );
}