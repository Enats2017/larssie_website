'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import checkIcon from '@/assets/rightsign.png'
import shieldIcon from '@/assets/shield.png'

const UPLOAD_BASE_URL = 'http://91.99.229.154'

function resolveImg(path: string) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return path.startsWith('/') ? `${UPLOAD_BASE_URL}${path}` : `${UPLOAD_BASE_URL}/${path}`
}

type GearItem = { icon: string; label: string }
type LinkCard = { title: string; link: string; img: string }

type GearUpData = {
  titleWord: string
  titleScript: string
  mandatoryTitle: string
  mandatoryDesc: string
  recommendedTitle: string
  recommendedDesc: string
  mandatoryItems: GearItem[]
  recommendedItems: GearItem[]
  linkCards: LinkCard[]
}

const DEFAULT_DATA: GearUpData = {
  titleWord: 'GEAR UP',
  titleScript: 'for the adventure',
  mandatoryTitle: 'Mandatory Equipment',
  mandatoryDesc: 'All gear listed below must be carried throughout the event.',
  recommendedTitle: 'Recommended Equipment',
  recommendedDesc: 'The gear listed below can help improve your experience.',
  mandatoryItems: [
    { icon: 'fa-solid fa-shirt', label: 'Waterproof\nJacket with Hood' },
    { icon: 'fa-solid fa-person-dress', label: 'Long Pants\nor Tights' },
    { icon: 'fa-solid fa-hand', label: 'Gloves\nand Hat' },
    { icon: 'fa-solid fa-bottle-water', label: 'Min. 1L\nWater' },
    { icon: 'fa-solid fa-apple-whole', label: 'Energy Food\n& Drinks' },
  ],
  recommendedItems: [
    { icon: 'fa-solid fa-shoe-prints', label: 'Trail Running\nShoes' },
    { icon: 'fa-solid fa-lightbulb', label: 'Headlamp with\nSpare Battery' },
    { icon: 'fa-solid fa-person-hiking', label: 'Trekking\nPoles' },
  ],
  linkCards: [
    { title: 'Summer at Trail Running', link: '#', img: '' },
    { title: 'Documentation and brochures', link: '#', img: '' },
  ],
}

function useScrollVisible() {
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
  return { ref, visible }
}

export default function GearUpSection({ data, activeColor = '#36A5DD' }: { data: GearUpData | null; activeColor?: string }) {
  const d = data ?? DEFAULT_DATA
  const leftCol = useScrollVisible()
  const heading = useScrollVisible()
  const card1 = useScrollVisible()
  const card2 = useScrollVisible()
  const mandatory = useScrollVisible()
  const recommended = useScrollVisible()

  const card1Data = d.linkCards[0] ?? { title: '', link: '#', img: '' }
  const card2Data = d.linkCards[1] ?? { title: '', link: '#', img: '' }

  const card1Img = resolveImg(card1Data.img)
  const card2Img = resolveImg(card2Data.img)

  const cssVars = { '--active-color': activeColor } as React.CSSProperties

  return (
    <section className="w-full bg-white py-10 px-6 md:px-10" style={cssVars}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 xl:pl-16">

          {/* LEFT COLUMN */}
          <div
            ref={leftCol.ref}
            className={`w-full md:w-1/3 flex flex-col gap-4 transition-all duration-700 ease-out ${
              leftCol.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 md:-translate-x-16'
            }`}
          >
            <div
              ref={heading.ref}
              style={{ transitionDelay: heading.visible ? '100ms' : '0ms' }}
              className={`transition-all duration-700 ease-out ${
                heading.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 md:translate-y-8'
              }`}
            >
              <h2 className="font-black text-3xl md:text-4xl text-[#0d2a4a] tracking-wide leading-tight">
                {d.titleWord}
              </h2>
              <p
                className="font-playlist leading-none transition-all duration-300 hover:translate-x-1 [color:var(--active-color)]"
                style={{ fontSize: 'clamp(26px,4vw,40px)', marginTop: '-4px' }}
              >
                {d.titleScript}
              </p>
            </div>

        {/* Card 1 */}
            {card1Img && (
              <div
                ref={card1.ref}
                style={{ transitionDelay: card1.visible ? '200ms' : '0ms' }}
                className={`transition-all duration-700 ease-out ${
                  card1.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 md:-translate-x-16'
                }`}
              >
                <a href={card1Data.link} className="group relative w-full h-[160px] sm:h-[180px] rounded-xl overflow-hidden cursor-pointer block">
                  <Image
                    src={card1Img}
                    alt={card1Data.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <p className="text-white font-bold text-lg leading-tight transition-all duration-300 group-hover:translate-x-1" style={{ whiteSpace: 'pre-line' }}>
                      {card1Data.title}
                    </p>
                    <span className="flex h-8 w-12 items-center justify-center rounded-full bg-white/90 shrink-0 transition-all duration-300 group-hover:[background-color:var(--active-color)]">
                      <svg className="w-6 h-6 transition-all duration-300 group-hover:text-white group-hover:-rotate-45 [color:var(--active-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
                      </svg>
                    </span>
                  </div>
                </a>
              </div>
            )}
            {/* Card 2 */}
            {card2Img && (
              <div
                ref={card2.ref}
                style={{ transitionDelay: card2.visible ? '300ms' : '0ms' }}
                className={`transition-all duration-700 ease-out ${
                  card2.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 md:-translate-x-16'
                }`}
              >
                <a href={card2Data.link} className="group relative w-full h-[160px] sm:h-[180px] rounded-xl overflow-hidden cursor-pointer block">
                  <Image
                    src={card2Img}
                    alt={card2Data.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <p className="text-white font-bold text-lg leading-tight transition-all duration-300 group-hover:translate-x-1" style={{ whiteSpace: 'pre-line' }}>
                      {card2Data.title}
                    </p>
                    <span className="flex h-8 w-12 items-center justify-center rounded-full bg-white/90 shrink-0 transition-all duration-300 group-hover:[background-color:var(--active-color)]">
                      <svg className="w-6 h-6 transition-all duration-300 group-hover:text-white group-hover:-rotate-45 [color:var(--active-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
                      </svg>
                    </span>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* MANDATORY EQUIPMENT */}
          <div
            ref={mandatory.ref}
            style={{ transitionDelay: mandatory.visible ? '150ms' : '0ms', borderColor: 'color-mix(in srgb, var(--active-color) 40%, transparent)' }}
            className={`w-full md:w-1/3 md:border-r md:pr-8 transition-all duration-700 ease-out ${
              mandatory.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 md:translate-y-8'
            }`}
          >
            <div className="flex items-center gap-2 md:justify-between md:items-start mb-2 md:w-full">
              <span
                aria-label="check"
                role="img"
                className="order-first md:order-last w-6 h-6 md:w-10 md:h-10 shrink-0 inline-block"
                style={{
                  backgroundColor: activeColor,
                  WebkitMaskImage: `url(${checkIcon.src})`,
                  maskImage: `url(${checkIcon.src})`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                }}
              />
              <h3 className="font-extrabold text-lg leading-snug [color:var(--active-color)]">
                {d.mandatoryTitle}
              </h3>
            </div>
            <p className="font-[600] text-gray-600 text-sm mb-4" style={{ whiteSpace: 'pre-line' }}>
              {d.mandatoryDesc}
            </p>
            <div className="flex flex-col">
              {d.mandatoryItems.map((item, index) => (
                <div key={index}>
                  <div className="group flex items-center gap-4 py-4 transition-all duration-300 hover:translate-x-2">
                    <i className={`${item.icon} text-2xl w-8 text-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 [color:var(--active-color)]`} />
                    <div>
                      <p className="md:hidden font-semibold text-base leading-tight transition-all duration-300 group-hover:text-black [color:var(--active-color)]">
                        {item.label.replace(/\\n|\n/g, ' ')}
                      </p>
                      <p className="hidden md:block font-semibold text-base leading-tight transition-all duration-300 group-hover:text-black [color:var(--active-color)]" style={{ whiteSpace: 'pre-line' }}>
                        {item.label.replace(/\\n/g, '\n')}
                      </p>
                    </div>
                  </div>
                  {index < d.mandatoryItems.length - 1 && (
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RECOMMENDED EQUIPMENT */}
          <div
            ref={recommended.ref}
            style={{ transitionDelay: recommended.visible ? '300ms' : '0ms' }}
            className={`w-full md:w-1/3 transition-all duration-700 ease-out ${
              recommended.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 md:translate-y-8'
            }`}
          >
            <div className="flex items-center gap-2 md:justify-between md:items-start mb-2 md:w-full">
              <span
                aria-label="shield"
                role="img"
                className="order-first md:order-last w-6 h-6 md:w-10 md:h-10 shrink-0 inline-block"
                style={{
                  backgroundColor: activeColor,
                  WebkitMaskImage: `url(${shieldIcon.src})`,
                  maskImage: `url(${shieldIcon.src})`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                }}
              />
              <h3 className="font-extrabold text-lg text-[#0d2a4a] leading-snug">
                {d.recommendedTitle}
              </h3>
            </div>
            <p className="font-[600] text-gray-600 text-sm mb-4" style={{ whiteSpace: 'pre-line' }}>
              {d.recommendedDesc}
            </p>
            <div className="flex flex-col">
              {d.recommendedItems.map((item, index) => (
                <div key={index}>
                  <div className="group flex items-center gap-4 py-4 transition-all duration-300 hover:translate-x-2">
                    <i className={`${item.icon} text-2xl text-[#0d2a4a] w-8 text-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`} />
                    <div>
                      <p className="md:hidden font-semibold text-[#0d2a4a] text-base leading-tight transition-all duration-300 group-hover:[color:var(--active-color)]">
                        {item.label.replace(/\\n|\n/g, ' ')}
                      </p>
                      <p className="hidden md:block font-semibold text-[#0d2a4a] text-base leading-tight transition-all duration-300 group-hover:[color:var(--active-color)]" style={{ whiteSpace: 'pre-line' }}>
                        {item.label.replace(/\\n/g, '\n')}
                      </p>
                    </div>
                  </div>
                  {index < d.recommendedItems.length - 1 && (
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
