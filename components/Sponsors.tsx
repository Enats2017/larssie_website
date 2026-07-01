'use client'

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

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
      className={`w-full transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 md:-translate-x-16'}`}
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
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 md:translate-y-8'}`}
    >
      {children}
    </div>
  )
}

type SponsorLogo = { name: string; img: string; url: string }

type Props = {
  variant?: 'territory' | 'info'
  sponsors?: SponsorLogo[]
  titleWord?: string
  activeColor?: string
}

export default function Sponsors({ variant = 'territory', sponsors = [], titleWord = 'Proudly Supported By', activeColor = '#36A5DD' }: Props) {
  const isInfo = variant === 'info'
  if (!sponsors || sponsors.length === 0) return null

  return (
    <div className={`relative z-10 ${isInfo ? 'pt-12 md:pt-20 pb-2 md:pb-4' : 'pb-12 md:pb-16'}`} style={{ '--active-color': activeColor } as React.CSSProperties}>
      <ScrollFadeUp delay={0}>
        <div className="flex items-center justify-center gap-3 md:gap-8 px-4 md:px-8">
          <div className={`h-px flex-1 ${isInfo ? 'bg-white/20 md:bg-gray-200' : 'bg-white/20'}`} />
          <span className={`text-[9px] md:text-[11px] font-semibold italic uppercase tracking-[3px] md:tracking-[4px] whitespace-nowrap ${isInfo ? 'text-white md:text-gray-500' : 'text-white'}`}>
            {titleWord}
          </span>
          <div className={`h-px flex-1 ${isInfo ? 'bg-white/20 md:bg-gray-200' : 'bg-white/20'}`} />
        </div>
      </ScrollFadeUp>

      <div className="mt-8 md:mt-10">
      <style jsx global>{`
        .sponsorSwiper { padding-bottom: 28px; }

        .sponsorSwiper .swiper-pagination {
          position: static;
          margin-top: 16px;
        }

        .sponsorSwiper .swiper-pagination-bullet {
          background: #8AA0BC;
          opacity: 0.3;
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          display: inline-block;
        }

        .sponsorSwiper .swiper-pagination-bullet::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 44px;
          height: 44px;
          transform: translate(-50%, -50%);
        }

        .sponsorSwiper .swiper-pagination-bullet-active {
          background: var(--active-color) !important;
          opacity: 1 !important;
          width: 28px !important;
          height: 10px !important;
          border-radius: 4px !important;
        }
      `}</style>

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 2, slidesPerGroup: 2 },
            480: { slidesPerView: 3, slidesPerGroup: 3 },
            768: { slidesPerView: 4, slidesPerGroup: 4 },
            1024: { slidesPerView: 6, slidesPerGroup: 6 },
          }}
          className={`sponsorSwiper px-6 ${isInfo ? 'sponsorSwiper-info' : 'sponsorSwiper-territory'}`}
        >
          {sponsors.map((s, i) => (
            <SwiperSlide key={i}>
              <ScrollInLeft delay={i * 80}>
                <div className="flex items-center justify-center h-12 md:h-16 w-full">

                  <a href={s.url || '#'} target="_blank" rel="noopener noreferrer">
                    <img
                      src={s.img}
                      alt={s.name}
                      className={`h-full w-auto object-contain max-h-16 transition-transform duration-300 ease-out hover:scale-125 ${isInfo ? 'brightness-0 invert opacity-80 md:invert-0 md:opacity-60' : ''}`} />
                  </a>
                </div>
              </ScrollInLeft>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}