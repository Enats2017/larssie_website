'use client'

const timelineData = [
  { x: 40, y: 425, textY: 215, title: 'FRIDAY', time: '14:00 - 20:00', text: 'Bib pick-up', sub: 'Le markstein',},
  { x: 215, y: 503, textY: 295, title: 'SATURDAY', time: '04:30 - 05:45', text: 'Last bib pick-up', sub: 'Le markstein',},
  { x: 405, y: 468, textY: 260, title: 'SATURDAY', time: '06:00', text: 'Start 50km', sub: 'Le markstein',},
  { x: 595, y: 422, textY: 210, title: 'SATURDAY', time: '11:00 (max)', text: 'Checkpoint 2 -', sub: 'Grand Ballon', km: '18km',},
  { x: 790, y: 437, textY: 225, title: 'SATURDAY', time: '16:00 (max)', text: 'Checkpoint 4 -', sub: 'Storkenkopf', km: '38km',},
  { x: 995, y: 480, textY: 270, title: 'SATURDAY', time: '20:00 (max)', text: 'Finish', sub: 'Le Markstein', km: '(50km)',},
]

// The curve is generated to pass exactly through every dot's (x, y), plus a
// fixed point at each side edge. The markers sit ON the line by
// construction -- if timelineData ever changes, the curve follows
// automatically instead of drifting out of sync with the dots again.
const EDGE_Y = 390
const curvePoints = [
  { x: 0, y: EDGE_Y },
  ...timelineData.map(({ x, y }) => ({ x, y })),
  { x: 1200, y: EDGE_Y },
]

function round(n) {
  return Math.round(n * 10) / 10
}

// Catmull-Rom -> cubic Bezier, using centripetal-style tangents so every
// turn (peak or valley) comes out as a smooth, rounded curve instead of a
// pinched corner. Mirrored phantom points are added before the first and
// after the last point so the tangent at both edges comes out perfectly
// horizontal (the line lands flush on the margin instead of entering/
// exiting on a slope). Every interior tangent is derived from its
// neighbours, so adjoining segments always match in direction -- no kinks
// at any joint, including the dots themselves.
function buildSmoothSegments(points) {
  const n = points.length
  const xs = points.map(p => p.x)
  const ys = points.map(p => p.y)

  // Extend with mirrored phantom points at both ends so edge tangents are
  // computed the same way as interior ones (keeps the flat entry/exit).
  const ex = [2 * xs[0] - xs[1], ...xs, 2 * xs[n - 1] - xs[n - 2]]
  const ey = [ys[0], ...ys, ys[n - 1]]

  // Tangent at each real point (index i in 0..n-1, shifted by +1 in ex/ey)
  // is the average of the slopes of its two neighbouring segments,
  // weighted by segment length (centripetal-ish) -- this rounds off
  // direction changes instead of collapsing them to a flat zero.
  const m = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    const j = i + 1 // index into ex/ey
    const dxPrev = ex[j] - ex[j - 1]
    const dyPrev = ey[j] - ey[j - 1]
    const dxNext = ex[j + 1] - ex[j]
    const dyNext = ey[j + 1] - ey[j]

    const slopePrev = dxPrev !== 0 ? dyPrev / dxPrev : 0
    const slopeNext = dxNext !== 0 ? dyNext / dxNext : 0

    // Force flat tangents at the true edges (first/last real point)
    if (i === 0 || i === n - 1) {
      m[i] = 0
      continue
    }

    // Weighted average favouring the shorter adjacent segment a little,
    // which keeps overshoot in check while still rounding the corner.
    const wPrev = Math.abs(dxNext)
    const wNext = Math.abs(dxPrev)
    const wSum = wPrev + wNext
    m[i] = wSum > 0 ? (slopePrev * wPrev + slopeNext * wNext) / wSum : 0
  }

  // Limit tangent magnitude per segment (Fritsch-Carlson-style clamp) to
  // avoid overshoot/wobble while still allowing a smooth, rounded turn
  // rather than snapping to zero like a strict monotonic filter would.
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

  const segments = []
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

function toPath(segments) {
  let d = `M ${round(segments[0].start.x)},${round(segments[0].start.y)}`
  segments.forEach((s) => {
    d += ` C ${round(s.cp1.x)},${round(s.cp1.y)} ${round(s.cp2.x)},${round(s.cp2.y)} ${round(s.end.x)},${round(s.end.y)}`
  })
  return d
}

// Same segments, reversed direction, with each segment's control points
// swapped -- used so the fill mask traces the exact mirror of the visible
// stroke and stays perfectly seamed to it (no gap, no double edge).
function toReversedCommands(segments) {
  const rev = [...segments].reverse()
  return rev
    .map(
      (s) =>
        `C ${round(s.cp2.x)},${round(s.cp2.y)} ${round(s.cp1.x)},${round(s.cp1.y)} ${round(s.start.x)},${round(s.start.y)}`
    )
    .join(' ')
}

const curveSegments = buildSmoothSegments(curvePoints)
const CURVE_PATH = toPath(curveSegments)
const CURVE_PATH_REVERSED_COMMANDS = toReversedCommands(curveSegments)

export default function TimelineSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #d7edf8 0%, #edf7fd 100%)',
      }}
    >
      {/* ============ DESKTOP TIMELINE (horizontal SVG curve) ============ */}
      <div className="hidden md:block mx-auto max-w-[1520px]">
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

          {/* Header Titles */}
          <text
            x="600"
            y="85"
            textAnchor="middle"
            fontSize="28"
            fontWeight="900"
            fill="#08264a"
            letterSpacing="3"
          >
            TIMELINE
          </text>

          <text
            x="600"
            y="108"
            textAnchor="middle"
            fontSize="30"
            fill="#23a8f2"
            className="transition-all duration-300 hover:translate-x-1"
            style={{
              fontFamily: 'var(--font-playlist-script), cursive',
            }}
          >
            50k distance
          </text>

          <path
            d={CURVE_PATH}
            fill="none"
            stroke="#35a8eb"
            strokeWidth="7"
            strokeLinecap="round"
          />

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
      </div>

      {/* ============ MOBILE TIMELINE (vertical zigzag list) ============ */}
      <div className="md:hidden">
        <div className="text-center pt-12 pb-8 px-6">
          <h2 className="text-[34px] font-black text-[#08264a] tracking-[4px]">TIMELINE</h2>
          <p className="text-[18px] text-[#23a8f2] italic mt-1" style={{ fontFamily: 'Georgia, serif' }}>
            50k distance
          </p>
        </div>

        <div className="relative px-6 pb-14">
          {/* connecting vertical line */}
          <div className="absolute left-1/2 top-2 bottom-2 w-[2px] bg-[#6ca9d6] -translate-x-1/2 z-0" />

          {timelineData.map((item, index) => {
            const isRight = index % 2 === 0;
            const content = (
              <>
                <div className="font-extrabold text-[#08264a] text-[17px] leading-tight">{item.title}</div>
                <div className="font-extrabold text-[#08264a] text-[17px] leading-tight mb-2">{item.time}</div>
                <div className="font-bold text-[#08264a] text-[14px] leading-snug">{item.text}</div>
                <div className="font-bold text-[#23a8f2] text-[14px] leading-snug">
                  {item.km ? `${item.sub} ${item.km}` : item.sub}
                </div>
              </>
            );

            return (
              <div
                key={index}
                className="relative z-10 grid grid-cols-2 gap-x-8 items-start mb-10 last:mb-0"
              >
                <div className={isRight ? "" : "text-right"}>
                  {!isRight && content}
                </div>
                <div>
                  {isRight && content}
                </div>

                {/* dot */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[4px] border-[#35a8eb] z-10" />
              </div>
            );
          })}
        </div>

        {/* decorative wave cap — transitions into the dark CourseDetailsSection below */}
        <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="block w-full" style={{ height: '40px' }}>
          <path d="M0,30 C100,55 200,5 400,30 L400,60 L0,60 Z" fill="#061831" />
        </svg>
      </div>
    </section>
  )
}
