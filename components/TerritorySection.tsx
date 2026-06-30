"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import background from "@/assets/background.png";
import mountain from "@/assets/mountain.png";
import Sponsors from '@/components/Sponsors'

// Add at top (after existing imports)
type InfoEntry = {
  tagline: string | null
  title: string | null
  altitude: string | null
  alt_label: string | null
  description: string | null
  cta_text: string | null
  cta_link: string | null
  faq_link: string | null
  faq_text: string | null
  image_path: string | null
  video_path: string | null
  video_url: string | null
  media_type: string | null
}


function ScrollInLeft({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
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

function ScrollFadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
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

type SponsorLogo = { name: string; img: string; url: string }

type Props = { 
  info: InfoEntry
  sponsorLogos?: SponsorLogo[]
  sponsorTitle?: string
}

export default function TerritorySection({ info, sponsorLogos = [], sponsorTitle = 'Proudly Supported By' }: Props) {
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
        {info.image_path ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`http://91.99.229.154${info.image_path}`}
            alt={info.title || 'Section background'}
            className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
          />
        ) : (
          <Image
            src={background}
            alt="Val Thorens"
            fill
            priority
            className="object-cover object-center md:object-top"
          />
        )}

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
            <ScrollInLeft delay={0}>
              <h3 className="font-playlist text-[28px] md:text-[40px] text-sky-500 -mb-6 transition-all duration-300 hover:translate-x-1">
                {info.tagline || 'The Territory'}
              </h3>
            </ScrollInLeft>

            <ScrollFadeUp delay={100}>
              <h2 className="font-black text-3xl md:text-4xl text-white tracking-wide mb-0">
                {info.title || 'VAL THORENS'}
              </h2>
            </ScrollFadeUp>

            {/* Altitude */}
            <ScrollInLeft delay={200}>
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
                    {`${info.alt_label || 'ALTITUDE'} : ${info.altitude || ''}`}
                  </span>
                </div>
              </div>
            </ScrollInLeft>

            {/* Description */}
            <ScrollFadeUp delay={300}>
              <div className="mt-8 md:mt-10 max-w-[950px] mx-auto">

                <p className="text-white text-[16px] md:text-[20px] italic font-medium leading-relaxed">
                  {info.description}
                </p>

                

              </div>
            </ScrollFadeUp>

            {/* Buttons */}
            <ScrollInLeft delay={450}>
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
                    {info.cta_text || 'Explore The Territory'}
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
                    {info.faq_text || 'FAQs'}
                  </span>
                </button>

              </div>
            </ScrollInLeft>
          </div>
        </div>

      

      {/* Sponsors */}
        <Sponsors
  variant="territory"
  sponsors={sponsorLogos}
  titleWord={sponsorTitle}
/>

      </div>
    </section>
  );
}