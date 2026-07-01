'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import territoryImg from '@/assets/trek.png'
import mountainIcon from '@/assets/Mask group.png'
import Sponsors from '@/components/Sponsors'

type Brand = {
  brand_id: number
  brand_name: string
  sort_order: number
}

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
      className={`w-full transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 md:-translate-x-16'
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
type SponsorLogo = { name: string; img: string; url: string }

type Props = {
  brands: Brand[]
  info: InfoEntry
  sponsorLogos?: SponsorLogo[]
  sponsorTitle?: string
  activeColor?: string
}

export default function InfoSection({ brands, info, sponsorLogos = [], sponsorTitle = 'Proudly Supported By', activeColor = '#36A5DD' }: Props) {
  const cssVars = { '--active-color': activeColor } as React.CSSProperties

  return (
    <section className="w-full bg-[#0d2a4a] md:bg-white py-10 px-6 md:px-10" style={cssVars}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 xl:pl-16 mt-10">

        {/* Left Image */}
        <ScrollInLeft delay={0}>
          <div className="w-full md:w-1/2" style={{ width: '100%' }}>
            <div className="group relative w-full h-[280px] sm:h-[360px] md:h-[460px] lg:h-[566px] rounded-[15px] overflow-hidden cursor-pointer">
              {info.image_path ? (
                <img
                  src={`http://91.99.229.154${info.image_path}`}
                  alt={info.title || ''}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={territoryImg}
                  alt="Val Thorens trail runners"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              )}

            </div>
          </div>
        </ScrollInLeft>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-1 p-2 md:p-4 text-center md:text-left">

          <ScrollInLeft delay={100}>
            <p className="font-playlist text-[28px] md:text-[40px] -mb-4 transition-all duration-300 hover:translate-x-1 [color:var(--active-color)]">
              {info.tagline || 'The Territory'}
            </p>
          </ScrollInLeft>

          <ScrollFadeUp delay={200}>
            <h2 className="font-black text-3xl md:text-4xl text-white md:text-gray-900 tracking-wide mb-0">
              {info.title || 'VAL THORENS'}
            </h2>
          </ScrollFadeUp>

          <ScrollInLeft delay={300}>
            <div className="flex items-center justify-center md:justify-start gap-3 text-white md:text-gray-700 text-sm md:text-base font-[500] italic mb-3">
              <Image src={mountainIcon} alt="Altitude" width={40} height={40} className="brightness-0 invert md:filter-none" />
              <span>
                {`${info.alt_label || 'ALTITUDE'} : ${info.altitude || ''}`}
              </span>
            </div>
          </ScrollInLeft>

          <ScrollFadeUp delay={400}>
            <div
              className="group flex flex-col gap-[15px] mb-6 text-white md:text-black"
              style={{
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: 'clamp(14px, 1.6vw, 18px)',
                lineHeight: '28px',
              }}
            >
              <p>{info.description}</p>
            </div>
          </ScrollFadeUp>

          <ScrollInLeft delay={500}>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {/* Explore */}
              <a
                href={info.cta_link || '/territory'}
                className="
                  relative overflow-hidden
                  flex items-center justify-center
                  w-full sm:w-[264px]
                  h-[52px]
                  rounded-full
                  bg-[var(--active-color)]
                  border-2 border-[var(--active-color)]
                  px-6
                  text-white text-sm font-bold

                  before:absolute before:inset-0
                  before:bg-white before:rounded-full
                  before:-translate-x-[110%]
                  hover:before:translate-x-0
                  before:transition-transform
                  before:duration-[600ms]
                  before:ease-in-out

                  transition-colors duration-[600ms]
                  hover:[color:var(--active-color)]
                "
              >
                 <span className="relative z-10">{info.cta_text || 'Explore The Territory'}</span>
              </a>

              {/* FAQ */}
              <a
                href={info.faq_link || '/faq'}
                className="
                  relative overflow-hidden
                  flex items-center justify-center
                  w-full sm:w-[139px]
                  h-[52px]
                  rounded-full
                  bg-white
                  border-2 border-[var(--active-color)]
                  px-6
                  text-sm font-bold
                  [color:var(--active-color)]

                  before:absolute before:inset-0
                  before:bg-[var(--active-color)]
                  before:rounded-full
                  before:-translate-x-[110%]
                  hover:before:translate-x-0
                  before:transition-transform
                  before:duration-[600ms]
                  before:ease-in-out

                  transition-colors duration-[600ms]
                  hover:text-white
                "
              >
                <span className="relative z-10">{info.faq_text || 'FAQs'}</span>
              </a>
            </div>
          </ScrollInLeft>

        </div>
      </div>


      {/* Sponsors */}
    <Sponsors
      variant="info"
      sponsors={sponsorLogos}
      titleWord={sponsorTitle}
      activeColor={activeColor}
    />

    </section>
  )
}
