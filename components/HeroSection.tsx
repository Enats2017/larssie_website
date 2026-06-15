'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Image from 'next/image'
import heroBg from '@/assets/herosection.png'
import heroBg1 from '@/assets/20K_bg.png'
import starIcon from '@/assets/star.png'
import handIcon from '@/assets/hand.png'
import runIcon  from '@/assets/run.png'
// add this import at the top
import trail from '@/assets/trail.png'
import logo  from '@/assets/logo.png'

import stopwatch from '@/assets/stopwatch.png'
import time from '@/assets/time.png'
import heroicon from '@/assets/heroicon.png'
import group from '@/assets/group.png'


export default function HeroSection() {
  return (

  <>
    <section
      className=" relative w-full min-h-[700px] md:min-h-[850px] h-[750px] md:h-screen md:max-h-[900px] overflow-hidden">
      {/* Background */}
      <Image
        src={heroBg}
        alt="Trail runners in snow-covered mountains"
        fill
        priority
        className="object-cover object-center md:object-top animate-hero-zoom"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d2a4a]/85 via-[#0d2a4a]/40 to-[#0d2a4a]/10" />
      <div className="absolute inset-0 bg-[#0d2a4a]/15" />

      {/* Logo overlay - mid left */}
      <div className="absolute hidden lg:block z-10" style={{ right: '34%', top: '45%' }}>
        <Image
          src={logo}
          alt="Trail Running"
          width={160}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <p className="text-white/80 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
                Trail du Grand Ballon Hivernale
              </p>

              <h1 className="text-white font-black leading-none">
                <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl">
                  50 KM
                </span>

                <span className="block mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  3200 D+
                </span>
              </h1>

              <p className="text-white/80 text-sm md:text-base italic max-w-md mx-auto lg:mx-0 mt-5 leading-relaxed">
                A demanding winter trail in the Vosges mountains.
                Expect technical terrain, unpredictable conditions and
                breathtaking scenery.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
                <a
                  href="/register"
                  className="
                    flex items-center justify-center gap-2
                    bg-sky-500 hover:bg-sky-400
                    text-white font-bold
                    px-6 py-3
                    rounded-full
                    transition-colors
                    shadow-lg
                  "
                >
                  Register Now
                <span className="bg-white rounded-full p-1.5 flex items-center justify-center">
                  <svg
                    className="w-10 h-4 text-[#36A5DD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5-5 5M6 12h12"
                    />
                  </svg>
                </span>
                </a>

                <a
                  href="/race-guide"
                  className="
                    flex items-center justify-center gap-2
                    border border-white/60
                    text-white font-bold
                    px-6 py-3
                    rounded-full
                    hover:bg-white/10
                    transition-colors
                  "
                >
                  Download Race Guide
                  <span className="bg-sky-500 rounded-full p-1.5">
                    <svg className="w-10 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </span>
                </a>
              </div>
              
            </div>

          {/* Desktop Card */}
          <div className="hidden lg:flex justify-end items-start pt-16">
            <div className="w-72 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

              {/* Image header */}
              <Image
                src={heroBg1}
                alt="20K Marathon"
                className="w-full block object-cover"
                style={{ marginTop: '-10px' }}
              />

              {/* Stats */}
              <div className="px-6 py-5">
                {[
                  { icon: starIcon, title: '4.7/5',  subtitle: '350 Reviews' },
                  { icon: handIcon, title: '2,250+', subtitle: 'Participants in 2024' },
                  { icon: runIcon,  title: '91%',    subtitle: 'Finish Rate' },
                ].map(({ icon, title, subtitle }, index, arr) => (
                  <div key={title}>
                    <div className="flex items-center gap-4 py-4">
                      {/* Icon — no background, just the image */}
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                        <Image
                          src={icon}
                          alt={title}
                          width={40}
                          height={40}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Text */}
                      <div>
                        <p className="text-white font-bold text-xl leading-tight">{title}</p>
                        <p className="text-white/60 text-sm">{subtitle}</p>
                      </div>
                    </div>

                    {/* Divider — skip after last item */}
                    {index < arr.length - 1 && (
                      <div className="h-px bg-white/20 w-full" />
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
          
          </div>
        </div>
      </div>

      {/* Bottom Shape */}
      {/* Mobile */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] md:hidden z-20 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 390 60"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            d="
              M0,0
              Q195,120 390,0
              L390,60
              L0,60
              Z
            "
          />
        </svg>
      </div>

      {/* Desktop */}
      <div className="absolute bottom-0 left-0 w-full h-[90px] hidden md:block z-20 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 89"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            d="
              M0,5
              C250,50 500,82 640,82
              C655,82 670,75 680,60
              C700,20 740,20 760,60
              C770,75 785,82 800,82
              C940,82 1190,50 1440,5
              L1440,90
              L0,90
              Z
            "
          />
        </svg>
      </div>

      {/* Centered Logo on wave */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30">
        <Image
          src={trail}
          alt="Trail Running"
          width={45}
          height={45}
          className="object-contain drop-shadow-md"
        />
      </div>
    </section>

    {/* Stats Bar */}
{/* Stats Bar */}
<div className="bg-white py-10">
  <div className="max-w-7xl mx-auto">

    {/* Desktop */}
    <div className="hidden md:grid md:grid-cols-4">

      {/* START */}
      <div className="flex items-start justify-between pr-10 border-r border-[#8ED9EE]">
        <div>
          <h4 className="text-[#0A2A4A] text-[18px] font-extrabold uppercase">
            START
          </h4>

          <h2 className="text-[#0A2A4A] text-[54px] font-black leading-none mt-1">
            06:00
          </h2>

          <div className="w-[110px] h-[2px] bg-[#8AA0BC] mt-2 mb-2" />

          <p className="text-[#0A2A4A] text-[16px]">
            May 24, 2025
          </p>
        </div>

        <Image src={time} alt="" width={64} height={64} />
      </div>

      {/* CUT OFF */}
      <div className="flex items-start justify-between px-10 border-r border-[#8ED9EE]">
        <div className="pt-8">
          <h4 className="text-[#0A2A4A] text-[18px] font-extrabold uppercase">
            CUT-OFF
          </h4>

          <h2 className="text-[#0A2A4A] text-[54px] font-black leading-none mt-1">
            14:00
          </h2>

          <div className="w-[110px] h-[2px] bg-[#8AA0BC] mt-2 mb-2" />

          <p className="text-[#0A2A4A] text-[16px]">
            8 Checkpoints
          </p>
        </div>

        <Image src={stopwatch} alt="" width={64} height={64} />
      </div>

      {/* AID STATION */}
      <div className="flex items-start justify-between px-10 border-r border-[#8ED9EE]">
        <div className="pt-8">
          <h4 className="text-[#0A2A4A] text-[18px] font-extrabold uppercase">
            AID STATION
          </h4>

          <h2 className="text-[#0A2A4A] text-[54px] font-black leading-none mt-1">
            05
          </h2>

          <div className="w-[110px] h-[2px] bg-[#8AA0BC] mt-2 mb-2" />

          <p className="text-[#0A2A4A] text-[16px]">
            Incl. Finish
          </p>
        </div>

        <Image src={heroicon} alt="" width={64} height={64} />
      </div>

      {/* PARTICIPANTS */}
      <div className="flex items-start justify-between pl-10">
        <div>
          <h4 className="text-[#0A2A4A] text-[18px] font-extrabold uppercase">
            MAXIMUM
            <br />
            PARTICIPANTS
          </h4>

          <h2 className="text-[#0A2A4A] text-[54px] font-black leading-none mt-1">
            600
          </h2>

          <div className="w-[110px] h-[2px] bg-[#8AA0BC] mt-2 mb-2" />

          <p className="text-[#0A2A4A] text-[16px]">
            Two Waves
          </p>
        </div>

        <Image src={group} alt="" width={64} height={64} />
      </div>
    </div>

    {/* Mobile Slider */}
    <div className="md:hidden px-4">

      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="statsSwiper pb-12"
      >

        {/* START */}
        <SwiperSlide>
          <div className="flex items-start justify-between rounded-2xl border border-[#8ED9EE] p-6">
            <div>
              <h4 className="text-[#0A2A4A] text-[16px] font-extrabold uppercase">
                START
              </h4>

              <h2 className="text-[#0A2A4A] text-[42px] font-black leading-none mt-1">
                06:00
              </h2>

              <div className="w-[90px] h-[2px] bg-[#8AA0BC] mt-2 mb-2" />

              <p className="text-[#0A2A4A] text-sm">
                May 24, 2025
              </p>
            </div>

            <Image src={time} alt="" width={52} height={52} />
          </div>
        </SwiperSlide>

        {/* CUT OFF */}
        <SwiperSlide>
          <div className="flex items-start justify-between rounded-2xl border border-[#8ED9EE] p-6">
            <div>
              <h4 className="text-[#0A2A4A] text-[16px] font-extrabold uppercase">
                CUT-OFF
              </h4>

              <h2 className="text-[#0A2A4A] text-[42px] font-black leading-none mt-1">
                14:00
              </h2>

              <div className="w-[90px] h-[2px] bg-[#8AA0BC] mt-2 mb-2" />

              <p className="text-[#0A2A4A] text-sm">
                8 Checkpoints
              </p>
            </div>

            <Image src={stopwatch} alt="" width={52} height={52} />
          </div>
        </SwiperSlide>

        {/* AID STATION */}
        <SwiperSlide>
          <div className="flex items-start justify-between rounded-2xl border border-[#8ED9EE] p-6">
            <div>
              <h4 className="text-[#0A2A4A] text-[16px] font-extrabold uppercase">
                AID STATION
              </h4>

              <h2 className="text-[#0A2A4A] text-[42px] font-black leading-none mt-1">
                05
              </h2>

              <div className="w-[90px] h-[2px] bg-[#8AA0BC] mt-2 mb-2" />

              <p className="text-[#0A2A4A] text-sm">
                Incl. Finish
              </p>
            </div>

            <Image src={heroicon} alt="" width={52} height={52} />
          </div>
        </SwiperSlide>

        {/* PARTICIPANTS */}
        <SwiperSlide>
          <div className="flex items-start justify-between rounded-2xl border border-[#8ED9EE] p-6">
            <div>
              <h4 className="text-[#0A2A4A] text-[16px] font-extrabold uppercase">
                MAXIMUM
                <br />
                PARTICIPANTS
              </h4>

              <h2 className="text-[#0A2A4A] text-[42px] font-black leading-none mt-1">
                600
              </h2>

              <div className="w-[90px] h-[2px] bg-[#8AA0BC] mt-2 mb-2" />

              <p className="text-[#0A2A4A] text-sm">
                Two Waves
              </p>
            </div>

            <Image src={group} alt="" width={52} height={52} />
          </div>
        </SwiperSlide>

      </Swiper>

    </div>
  </div>
</div>
  </>
  )
}