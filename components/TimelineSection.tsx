'use client'

import heroBg from '@/assets/herosection.png'
import rectangle from '@/assets/rectangle.png'

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

export default function TimelineSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #d7edf8 0%, #edf7fd 100%)',
      }}
    >
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
        <text x="600" y="85" textAnchor="middle" fontSize="44" fontWeight="900" fill="#08264a" letterSpacing="4">
          TIMELINE
        </text>

        <text x="600" y="122" textAnchor="middle" fontSize="28" fill="#23a8f2" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
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

      {/* Mountain Section Container */}
      <div 
        className="relative z-0 w-full text-white bg-[#061831]" 
        style={{ marginTop: '-220px' }}
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
        <div className="relative z-10 w-full px-[70px] xl:px-[90px] pt-44 pb-24 flex flex-col gap-16">
          
          {/* Top Half: Course Details & Stats Grid */}
          {/* Top Half: Course Details & Stats Grid */}
          {/* Top Half: Course Details & Stats Grid */}
          <div className="relative top-24 flex flex-col lg:flex-row justify-between items-start w-full">

            {/* LEFT SIDE */}
            <div className="w-full lg:w-[360px]">
              <h2 className="leading-[0.85]">
                <span className="block text-[64px] font-black uppercase text-white">
                  COURSE
                </span>

                <span
                  className="block text-[48px] text-[#2ea9ec] italic normal-case"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  details
                </span>
              </h2>

              <p className="mt-8 text-white/80 text-[20px] leading-[1.4] max-w-[320px]">
                Explore the course metrics and essential information to help you
                prepare for your adventure
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative -top-10 grid grid-cols-[280px_280px] gap-x-0 gap-y-6 ml-auto">

              {/* Technical */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  {/* icon */}
                </div>

                <div>
                  <h4 className="text-white font-bold text-[15px] uppercase">
                    TECHNICAL
                  </h4>

                  <div className="flex gap-1 mt-1">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                    <span className="text-white/20">★</span>
                  </div>

                  <p className="text-white/70 text-sm mt-1">
                    very technical
                  </p>
                </div>
              </div>

              {/* Terrains */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  {/* icon */}
                </div>

                <div>
                  <h4 className="text-white font-bold text-[15px] uppercase">
                    TERRAINS
                  </h4>

                  <p className="text-white text-sm mt-1">
                    Mountain trails & singletrack
                  </p>

                  <p className="text-white/70 text-sm">
                    Snow, rocks, forest
                  </p>
                </div>
              </div>

              {/* Wet */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  {/* icon */}
                </div>

                <div>
                  <h4 className="text-white font-bold text-[15px] uppercase leading-tight">
                    SPEED FACTOR
                    <br />
                    WET CONDITIONS
                  </h4>

                  <p className="text-[#2ea9ec] text-[42px] font-black leading-none mt-2">
                    1.2
                  </p>
                </div>
              </div>

              {/* Offroad */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  {/* icon */}
                </div>

                <div>
                  <h4 className="text-white font-bold text-[15px] uppercase">
                    OFFROAD RATIO
                  </h4>

                  <p className="text-[#2ea9ec] text-[42px] font-black leading-none mt-2">
                    85%
                  </p>
                </div>
              </div>

              {/* Vertical */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  {/* icon */}
                </div>

                <div>
                  <h4 className="text-white font-bold text-[15px] uppercase">
                    VERTICAL INDEX
                  </h4>

                  <p className="text-[#2ea9ec] text-[42px] font-black leading-none mt-2">
                    100K
                  </p>
                </div>
              </div>

              {/* Dry */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-[#2ea9ec] flex items-center justify-center shrink-0">
                  {/* icon */}
                </div>

                <div>
                  <h4 className="text-white font-bold text-[15px] uppercase leading-tight">
                    SPEED FACTOR
                    <br />
                    DRY CONDITIONS
                  </h4>

                  <p className="text-[#2ea9ec] text-[42px] font-black leading-none mt-2">
                    1.1
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* MODIFIED OVERLAP ROW:
            Added 'relative z-20 translate-y-[140px] -mb-[140px]' 
            This forces the cards down seamlessly through the color divider.
          */}
          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 relative z-30 translate-y-[110px] -mb-[110px]">

            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-[24px] aspect-[1.8/1] bg-slate-800 shadow-xl cursor-pointer">
              <img
                src={heroBg.src}
                alt="Summer at Val Thorens"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-5 px-6 flex items-end justify-between">
                <h3 className="text-[18px] leading-[1.05] font-bold text-white max-w-[70%]">
                  Summer at
                  <br />
                  Val Thorens
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
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-[24px] aspect-[1.8/1] bg-slate-800 shadow-xl cursor-pointer">
              <img
                src={heroBg.src}
                alt="Documentation and Brochures"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-5 px-6 flex items-end justify-between">
                <h3 className="text-[18px] leading-[1.05] font-bold text-white max-w-[75%]">
                  Documentation
                  <br />
                  and Brochures
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
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-[24px] aspect-[1.8/1] bg-slate-800 shadow-xl cursor-pointer">
              <img
                src={heroBg.src}
                alt="Frequently Asked Questions"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-5 px-6 flex items-end justify-between">
                <h3 className="text-[18px] leading-[1.05] font-bold text-white max-w-[75%]">
                  Frequently
                  <br />
                  Asked Questions
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
            </div>

          </div>

        </div>
        <div className="bg-white w-full h-56 relative" style={{ zIndex: 1 }} /> 
      </div>

      {/* ADDED WHITE SPACE CONTAINER BELOW:
        This generates the clean white block beneath the mountain block so 
        the shifted cards have a stark, bright layout section to sit across.
      */}
    </section>
  )
}