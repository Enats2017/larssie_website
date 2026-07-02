"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import social1 from "@/assets/social1.jpg";
import social2 from "@/assets/social2.jpg";
import social3 from "@/assets/social3.jpg";
import social4 from "@/assets/social4.jpg";
import social5 from "@/assets/social5.jpg";
import social6 from "@/assets/social6.jpg";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SocialEntry = {
  tagline: string | null      // e.g. "Volg ons"      -> same role as info.tagline in TerritorySection
  title: string | null        // e.g. "#WANTTOSKI"      -> same role as info.title in TerritorySection
  description: string | null  // e.g. "Vind ons op Instagram, TikTok of zelfs Facebook: we delen een stukje van ons dagelijks leven met je!"
  facebook_url?: string | null
  instagram_url?: string | null
  youtube_url?: string | null
  tiktok_url?: string | null
}

type Props = {
  social: SocialEntry
}

// ---------------------------------------------------------------------------
// Scroll animation helpers (same pattern as TerritorySection)
// ---------------------------------------------------------------------------

function ScrollInLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
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

function ScrollFadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
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

// ---------------------------------------------------------------------------
// Icon components (Facebook, Instagram, YouTube use simple inline SVGs so no
// extra icon package is required; TikTok has no lucide equivalent so it's
// hand-drawn too, matching the filled-circle badge style in the design)
// ---------------------------------------------------------------------------

function IconBadge({ href, children }: { href?: string | null; children: React.ReactNode }) {
  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex h-9 w-9 md:h-10 md:w-10 items-center justify-center
        rounded-full bg-[#35AFFF] text-white
        transition-all duration-300
        hover:bg-[#012f6f] hover:-translate-y-1 hover:shadow-[0_6px_18px_rgba(53,175,255,0.4)]
      "
    >
      {children}
    </a>
  )
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 md:w-5 md:h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
    <path d="M23 12s0-3.6-.46-5.32a2.9 2.9 0 0 0-2.05-2.05C18.77 4.17 12 4.17 12 4.17s-6.77 0-8.49.46A2.9 2.9 0 0 0 1.46 6.68C1 8.4 1 12 1 12s0 3.6.46 5.32a2.9 2.9 0 0 0 2.05 2.05c1.72.46 8.49.46 8.49.46s6.77 0 8.49-.46a2.9 2.9 0 0 0 2.05-2.05C23 15.6 23 12 23 12Z" opacity=".001" />
    <path fill="currentColor" d="M23 12s0-3.6-.46-5.32a2.9 2.9 0 0 0-2.05-2.05C18.77 4.17 12 4.17 12 4.17s-6.77 0-8.49.46A2.9 2.9 0 0 0 1.46 6.68C1 8.4 1 12 1 12s0 3.6.46 5.32a2.9 2.9 0 0 0 2.05 2.05c1.72.46 8.49.46 8.49.46s6.77 0 8.49-.46a2.9 2.9 0 0 0 2.05-2.05C23 15.6 23 12 23 12Zm-13.5 3.5v-7l6 3.5-6 3.5Z" />
  </svg>
)

const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
    <path d="M16.6 2h-3.2v13.7a2.9 2.9 0 1 1-2.05-2.77V9.6a6.1 6.1 0 1 0 5.25 6.05V8.9a7.9 7.9 0 0 0 4.4 1.33V6.98a4.85 4.85 0 0 1-4.4-4.98Z" />
  </svg>
)

// ---------------------------------------------------------------------------
// Hardcoded images (imported directly as static assets, same pattern as
// `background` / `mountain` in HeroSection - no base URL needed)
// ---------------------------------------------------------------------------

const hardcodedImages = [social1, social2, social3, social4, social5, social6]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Social({ social }: Props) {
  const slots = hardcodedImages

  return (
    <section className="relative w-full bg-white py-14 md:py-20 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Header row: icons + tagline + title (left)  |  description (right) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">

          <div>
            {/* Social icon row */}
            <ScrollInLeft delay={0}>
              <div className="flex items-center gap-2 md:gap-3 mb-1">
                <IconBadge href={social.facebook_url}><FacebookIcon /></IconBadge>
                <IconBadge href={social.instagram_url}><InstagramIcon /></IconBadge>
                <IconBadge href={social.youtube_url}><YoutubeIcon /></IconBadge>
                <IconBadge href={social.tiktok_url}><TiktokIcon /></IconBadge>
              </div>
            </ScrollInLeft>

            {/* Tagline - identical classes to info.tagline ("The Territory") */}
            <ScrollInLeft delay={100}>
              <h3 className="font-playlist text-[28px] md:text-[40px] text-sky-500 -mb-6 transition-all duration-300 hover:translate-x-1">
                {social.tagline || 'Volg ons'}
              </h3>
            </ScrollInLeft>

            {/* Title - identical classes to info.title ("VAL THORENS") */}
            <ScrollFadeUp delay={200}>
              <h2 className="font-black text-3xl md:text-4xl text-[#012f6f] tracking-wide mb-0">
                {social.title || '#WANTTOSKI'}
              </h2>
            </ScrollFadeUp>
          </div>

          {/* Description */}
          <ScrollFadeUp delay={300}>
            <p className="text-[#012f6f] text-[16px] md:text-[19px] leading-relaxed max-w-[420px] md:text-right">
              {social.description || 'Vind ons op Instagram, TikTok of zelfs Facebook: we delen een stukje van ons dagelijks leven met je!'}
            </p>
          </ScrollFadeUp>
        </div>

        {/* Image grid - hardcoded social1-social6, 6 across, alternating up/down wave */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-5">
          {slots.map((img, idx) => {
            // alternate rounded/edge-to-edge look, cycling every 4 like the reference design
            const roundedStyles = [
              'rounded-2xl shadow-lg',
              'rounded-none shadow-none',
              'rounded-2xl shadow-lg',
              'rounded-2xl shadow-md',
            ]
            const style = roundedStyles[idx % roundedStyles.length]

            // wave offset: even index rides up, odd index sits lower
            const waveOffset = idx % 2 === 0
              ? '-translate-y-2 md:-translate-y-8'
              : 'translate-y-2 md:translate-y-8'

            return (
              <ScrollFadeUp key={idx} delay={400 + idx * 80}>
                <div
                  className={`relative h-[110px] sm:h-[140px] md:h-[190px] w-full overflow-hidden bg-gray-100 ${style} ${waveOffset} transition-transform duration-300 hover:scale-[1.04]`}
                >
                  <Image
                    src={img}
                    alt={`Social photo ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollFadeUp>
            )
          })}
        </div>

      </div>
    </section>
  );
}