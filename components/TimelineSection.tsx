'use client'
import { useRef, useEffect, useState } from 'react'

// ── Animation helpers ────────────────────────────────────────────────────────

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

// ── Types ────────────────────────────────────────────────────────────────────

interface TimelineItem {
  day: string
  time: string
  title: string
  subtitle: string
}

interface TimelineSectionProps {
  data: {
    titleWord: string
    titleScript: string
    items: TimelineItem[]
  }
  lang?: string
}

// ── Wave / curve math (unchanged from original) ──────────────────────────────

const EDGE_Y = 390

function round(n: number) {
  return Math.round(n * 10) / 10
}

interface Point { x: number; y: number }
interface Segment { start: Point; cp1: Point; cp2: Point; end: Point }

function buildSmoothSegments(points: Point[]): Segment[] {
  const n = points.length
  const xs = points.map(p => p.x)
  const ys = points.map(p => p.y)

  const ex = [2 * xs[0] - xs[1], ...xs, 2 * xs[n - 1] - xs[n - 2]]
  const ey = [ys[0], ...ys, ys[n - 1]]

  const m = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    const j = i + 1
    const dxPrev = ex[j] - ex[j - 1]
    const dyPrev = ey[j] - ey[j - 1]
    const dxNext = ex[j + 1] - ex[j]
    const dyNext = ey[j + 1] - ey[j]

    const slopePrev = dxPrev !== 0 ? dyPrev / dxPrev : 0
    const slopeNext = dxNext !== 0 ? dyNext / dxNext : 0

    if (i === 0 || i === n - 1) {
      m[i] = 0
      continue
    }

    const wPrev = Math.abs(dxNext)
    const wNext = Math.abs(dxPrev)
    const wSum = wPrev + wNext
    m[i] = wSum > 0 ? (slopePrev * wPrev + slopeNext * wNext) / wSum : 0
  }

  for (let i = 0; i < n - 1; i++) {
    const dx = xs[i + 1] - xs[i]
    const d = dx !== 0 ? (ys[i + 1] - ys[i]) / dx : 0
    if (d === 0) continue
    const a = m[i] / d
    const b = m[i + 1] / d
    const s = a * a + b * b
    if (s > 9) {
      const t = 3 / Math.sqrt(s)
      m[i] *= t
      m[i + 1] *= t
    }
  }

  const segments: Segment[] = []
  for (let i = 0; i < n - 1; i++) {
    const dx = xs[i + 1] - xs[i]
    segments.push({
      start: { x: xs[i], y: ys[i] },
      cp1: { x: xs[i] + dx / 3, y: ys[i] + (m[i] * dx) / 3 },
      cp2: { x: xs[i + 1] - dx / 3, y: ys[i + 1] - (m[i + 1] * dx) / 3 },
      end: { x: xs[i + 1], y: ys[i + 1] },
    })
  }
  return segments
}

function toPath(segments: Segment[]) {
  let d = `M ${round(segments[0].start.x)},${round(segments[0].start.y)}`
  segments.forEach((s) => {
    d += ` C ${round(s.cp1.x)},${round(s.cp1.y)} ${round(s.cp2.x)},${round(s.cp2.y)} ${round(s.end.x)},${round(s.end.y)}`
  })
  return d
}

function toReversedCommands(segments: Segment[]) {
  const rev = [...segments].reverse()
  return rev
    .map(
      (s) =>
        `C ${round(s.cp2.x)},${round(s.cp2.y)} ${round(s.cp1.x)},${round(s.cp1.y)} ${round(s.start.x)},${round(s.start.y)}`
    )
    .join(' ')
}

// ── Fixed wave anchor points (same as original — only dots move with data) ──

const WAVE_ANCHORS: Point[] = [
  { x: 0, y: EDGE_Y },
  { x: 40, y: 425 },
  { x: 215, y: 503 },
  { x: 405, y: 468 },
  { x: 595, y: 422 },
  { x: 790, y: 437 },
  { x: 995, y: 480 },
  { x: 1200, y: EDGE_Y },
]

const curveSegments = buildSmoothSegments(WAVE_ANCHORS)
const CURVE_PATH = toPath(curveSegments)
const CURVE_PATH_REVERSED_COMMANDS = toReversedCommands(curveSegments)

// ── Dot Y positions on the wave (same fixed positions as original) ────────────

const DOT_Y_POSITIONS = [425, 503, 468, 422, 437, 480]
const TEXT_Y_POSITIONS = [215, 295, 260, 210, 225, 270]
const X_POSITIONS = [40, 215, 405, 595, 790, 995]

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

// ── Desktop SVG timeline ─────────────────────────────────────────────────────

function DesktopTimeline({
  titleWord,
  titleScript,
  items,
}: {
  titleWord: string
  titleScript: string
  items: TimelineItem[]
}) {
  const chunks = chunkArray(items, 6)
  const isScrollable = chunks.length > 1

  return (
    <div className="relative">
      <div
        className={
          isScrollable
            ? 'flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-[#35a8eb] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#d7edf8]'
            : ''
        }
      >
        {chunks.map((chunkItems, chunkIndex) => (
          <div
            key={chunkIndex}
            className={isScrollable ? 'w-full shrink-0 snap-start' : 'w-full'}
          >
            <TimelinePage
              titleWord={titleWord}
              titleScript={titleScript}
              items={chunkItems}
              showHeader={chunkIndex === 0}
            />
          </div>
        ))}
      </div>

      {isScrollable && (
        <div className="absolute top-16 right-2 text-[#23a8f2] text-xs font-semibold flex items-center gap-1 animate-pulse">
          <span>Scroll to see more</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="#23a8f2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  )
}

function TimelinePage({
  titleWord,
  titleScript,
  items,
  showHeader,
}: {
  titleWord: string
  titleScript: string
  items: TimelineItem[]
  showHeader: boolean
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting) },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 550"
      className="relative z-10 w-full h-auto block"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease-out',
      }}
    >
      <defs>
        <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d7edf8" />
          <stop offset="100%" stopColor="#edf7fd" />
        </linearGradient>
      </defs>

      {/* Background fill above wave */}
      <path
        d={`
          M 0,0
          L 1200,0
          L 1200,${EDGE_Y}
          ${CURVE_PATH_REVERSED_COMMANDS}
          Z
        `}
        fill="url(#bgGradient)"
      />

      {/* Header — only on first page */}
      {showHeader && (
        <>
          <text x="600" y="85" textAnchor="middle" fontSize="28" fontWeight="900" fill="#08264a" letterSpacing="3">
            {titleWord}
          </text>
          <text
            x="600" y="108" textAnchor="middle" fontSize="30" fill="#23a8f2"
            style={{ fontFamily: 'var(--font-playlist-script), cursive' }}
          >
            {titleScript}
          </text>
        </>
      )}

      {/* Wave line */}
      <path d={CURVE_PATH} fill="none" stroke="#35a8eb" strokeWidth="7" strokeLinecap="round" />

      {/* Timeline dots + labels — positions cycle through fixed slots */}
      {items.map((item, index) => {
        const slot = index % X_POSITIONS.length
        const x = X_POSITIONS[slot]
        const dotY = DOT_Y_POSITIONS[slot]
        const textY = TEXT_Y_POSITIONS[slot]

        return (
          <g
            key={index}
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? `fadeInUp 0.6s ease-out ${index * 120}ms both` : 'none',
            }}
          >
            <line
              x1={x} y1={textY + 38}
              x2={x} y2={dotY - 12}
              stroke="#6ca9d6" strokeWidth="1.5"
            />
            <circle cx={x} cy={dotY} r="11" fill="#fff" stroke="#35a8eb" strokeWidth="4" />
            <circle cx={x} cy={dotY} r="4" fill="#35a8eb" />
            <text x={x} y={textY} fontSize="20" fontWeight="800" fill="#08264a">{item.day}</text>
            <text x={x} y={textY + 26} fontSize="20" fontWeight="800" fill="#08264a">{item.time}</text>
            <text x={x + 20} y={textY + 56} fontSize="15" fontWeight="700" fill="#08264a">{item.title}</text>
            <text x={x + 20} y={textY + 76} fontSize="15" fontWeight="700" fill="#23a8f2">{item.subtitle}</text>
          </g>
        )
      })}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </svg>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function TimelineSection({ data, lang = 'en' }: TimelineSectionProps) {
  const { titleWord, titleScript, items } = data

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #d7edf8 0%, #edf7fd 100%)' }}
    >

      {/* ============ DESKTOP TIMELINE ============ */}
      <div className="hidden md:block mx-auto max-w-[1520px]">
        <DesktopTimeline
          titleWord={titleWord}
          titleScript={titleScript}
          items={items}
        />
      </div>

      {/* ============ MOBILE TIMELINE ============ */}
      <div className="md:hidden">
        <ScrollFadeUp delay={0}>
          <div className="text-center pt-12 pb-8 px-6">
            <h2 className="text-[34px] font-black text-[#08264a] tracking-[4px]">{titleWord}</h2>
            <p className="font-playlist text-[#23a8f2] -mt-5" style={{ fontSize: '28px' }}>
              {titleScript}
            </p>
          </div>
        </ScrollFadeUp>

        <div className="relative px-6 pb-14">
          <div className="absolute left-1/2 top-2 bottom-2 w-[2px] bg-[#6ca9d6] -translate-x-1/2 z-0" />

          {items.map((item, index) => {
            const isRight = index % 2 === 0
            const content = (
              <>
                <div className="font-extrabold text-[#08264a] text-[17px] leading-tight">{item.day}</div>
                <div className="font-extrabold text-[#08264a] text-[17px] leading-tight mb-2">{item.time}</div>
                <div className="font-bold text-[#08264a] text-[14px] leading-snug">{item.title}</div>
                <div className="font-bold text-[#23a8f2] text-[14px] leading-snug">{item.subtitle}</div>
              </>
            )

            return (
              <ScrollInLeft key={index} delay={index * 100}>
                <div className="relative z-10 grid grid-cols-2 gap-x-8 items-start mb-10 last:mb-0">
                  <div className={isRight ? '' : 'text-right'}>
                    {!isRight && content}
                  </div>
                  <div>
                    {isRight && content}
                  </div>
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[4px] border-[#35a8eb] z-10" />
                </div>
              </ScrollInLeft>
            )
          })}
        </div>

        {/* decorative wave cap — exactly as original */}
        <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="block w-full" style={{ height: '40px' }}>
          <path d="M0,30 C100,55 200,5 400,30 L400,60 L0,60 Z" fill="#061831" />
        </svg>
      </div>

    </section>
  )
}