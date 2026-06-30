'use client'

import Image from 'next/image'
import Link from 'next/link'
import heroBg from '@/assets/herosection.png'
import trail from '@/assets/livio.png'

type CtaButton = {
  label:  string
  url?:   string
  link?:  string
  style?: 'primary' | 'secondary'
  type?:  'primary' | 'secondary'
}

type HeroProps = {
  brand_name:  string
  description: string
  cta_buttons: CtaButton[]
  bg_desktop:  string | null
}

export default function Hero({ brand_name = "", description = "", cta_buttons = [], bg_desktop = null }: HeroProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Background Photo */}
      {bg_desktop ? (
        <img
          src={bg_desktop}
          alt="Hero background"
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />
      ) : (
        <Image
          src={heroBg}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-8 md:px-16">
        <div className="max-w-4xl text-white">

          {/* Brand Name */}
          <p className="text-xl md:text-2xl font-semibold mb-6">
            {brand_name}
          </p>

          {/* Description */}
          <p className="text-lg md:text-2xl leading-relaxed max-w-3xl mb-10">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            {cta_buttons.length > 0 ? (
              cta_buttons.map((btn, i) => {
                const isPrimary = i === 0 || (btn.style ?? btn.type) === 'primary'
                const href = btn.url ?? btn.link ?? '#'
                return (
                  <a
                    key={i}
                    href={href}
                    className={`group relative overflow-hidden inline-flex items-center justify-center font-bold px-6 py-3 rounded-full whitespace-nowrap
                      ${isPrimary
                        ? 'bg-[#36A5DD] text-white'
                        : 'border border-white/60 text-white'
                      }
                      before:absolute before:inset-0 before:bg-white before:rounded-full
                      before:-translate-x-[110%] hover:before:translate-x-0
                      before:transition-transform before:duration-[600ms] before:ease-in-out
                      transition-colors duration-[600ms] hover:text-[#36A5DD]`}
                  >
                    <span className="relative z-10">{btn.label}</span>
                  </a>
                )
              })
            ) : (
              <>
                <a
                  href="/register"
                  className="group flex items-center justify-between gap-3 bg-[#36A5DD] text-white font-bold text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full w-full sm:w-auto max-w-[260px] sm:max-w-none transition-all duration-300 hover:bg-white hover:text-[#36A5DD]"
                >
                  <span className="transition-all duration-300 group-hover:translate-x-1">
                    Who we are
                  </span>
                  <span className="flex h-7 w-10 sm:h-8 sm:w-12 items-center justify-center rounded-full bg-white transition-all duration-300 group-hover:bg-[#36A5DD]">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-[#36A5DD] transition-all duration-300 group-hover:text-white group-hover:-rotate-45"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
                    </svg>
                  </span>
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between gap-3 border border-white/60 text-white font-bold text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full w-full sm:w-auto max-w-[260px] sm:max-w-none transition-all duration-300 hover:bg-white hover:text-[#36A5DD]"
                >
                  <span className="transition-all duration-300 group-hover:translate-x-1">
                    Learn More
                  </span>
                  <span className="flex h-7 w-10 sm:h-8 sm:w-12 items-center justify-center rounded-full bg-[#36A5DD] transition-all duration-300 group-hover:bg-white">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-all duration-300 group-hover:text-[#36A5DD] group-hover:-rotate-45"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
                    </svg>
                  </span>
                </a>
              </>
            )}
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
  )
}