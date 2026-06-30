'use client'

import Link from 'next/link'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { usePathname } from 'next/navigation'

const items = [
  { icon: 'fa-solid fa-house', href: '/', label: 'Home' },
  { icon: 'fa-solid fa-map', href: '/map', label: 'Map' },
  { icon: 'fa-solid fa-calendar', href: '/calendar', label: 'Calendar' },
  { icon: 'fa-solid fa-user', href: '/profile', label: 'Profile' },
]

// ── Curve nav (mobile only) ───────────────────────────────────────────────────
function CurveBottomNav({
  items,
  pathname,
}: {
  items: { icon: string; href: string; label: string }[]
  pathname: string
}) {
  const total = items.length
  const activeIndex = Math.max(items.findIndex((i) => i.href === pathname), 0)
  const slotPct = 100 / total
  const cx = slotPct * activeIndex + slotPct / 2  // centre of active slot (vb %)

  //
  // ViewBox: 0 0 100 100
  // White page is above the nav. Grey bar starts at y = CURVE_TOP (vb units).
  // The bell dips upward into the white area so the bubble floats there.
  //
  const CURVE_TOP = 32   // where grey bar starts — space above is white/transparent
  const CURVE_BOT = 70   // deepest point of the bell
  const HW = 13   // half-width of the bell

  const lx = cx - HW
  const rx = cx + HW

  const path = [
    `M0,${CURVE_TOP}`,
    `L${lx},${CURVE_TOP}`,
    `C${lx + HW * 0.42},${CURVE_TOP} ${cx - HW * 0.45},${CURVE_BOT} ${cx},${CURVE_BOT}`,
    `C${cx + HW * 0.45},${CURVE_BOT} ${rx - HW * 0.42},${CURVE_TOP} ${rx},${CURVE_TOP}`,
    `L100,${CURVE_TOP}`,
    `L100,100 L0,100 Z`,
  ].join(' ')

  // Total nav height in px — tall enough for bubble above + label below
  const NAV_H = 96
  const BUBBLE_SIZE = 40
  const BUBBLE_TOP = 16
  return (
    <nav
      className={`
        xl:hidden
        fixed bottom-0 left-0 right-0 z-50
        translate-y-0
        pb-[env(safe-area-inset-bottom)]
      `}
      style={{ height: NAV_H }}
    >
      {/* Grey bar with white bell-curve cutout */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <path
          d={path}
          fill="#E8EBEF"
          style={{ transition: 'd 0.35s cubic-bezier(.4,0,.2,1)' }}
        />
      </svg>

      {/* Floating violet bubble — slides left/right */}
      <span
        aria-hidden="true"
        className="absolute z-10 flex items-center justify-center rounded-full bg-blue-100 pointer-events-none"
        style={{
          width: BUBBLE_SIZE,
          height: BUBBLE_SIZE,
          top: BUBBLE_TOP,
          left: `${cx}%`,
          transform: 'translateX(-50%)',
          transition: 'left 0.35s cubic-bezier(.4,0,.2,1)',
        }}
      >
        <i className={`${items[activeIndex].icon} text-blue-500 text-lg`}></i>
      </span>

      {/* Tappable items — sit inside the grey bar area */}
      <div
        className="absolute left-0 right-0 bottom-0 flex"
        style={{ top: `${CURVE_TOP}%` }}
      >
        {items.map(({ icon, href, label }, i) => {
          const active = pathname === href
          return (
            <Link
              key={label}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2"
            >
              {/* Ghost icon keeps column width stable; hidden for active slot */}
              <i
                className={`${icon} text-lg transition-colors duration-200 ${active ? 'opacity-0 pointer-events-none' : 'text-slate-400'
                  }`}
              ></i>
              <span
                className={`text-[11px] font-medium leading-none transition-colors duration-200 ${active ? 'text-blue-500' : 'text-slate-400'
                  }`}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function SideDock() {
  const visible = useScrollDirection(10)
  const pathname = usePathname()

  return (
    <>
      {/* ── Desktop side dock (hidden on mobile) — unchanged ── */}
      <div
        className={`
          hidden xl:flex
          fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-4 z-50
          transition-all duration-300 ease-in-out
          opacity-100 translate-x-0
        `}
      >
        {items.map(({ icon, href, label }, i) => {
          const active = pathname === href
          return (
            <Link
              key={label}
              href={href}
              style={{ animationDelay: `${i * 0.3}s` }}
              className="
                group flex items-center
                w-14 hover:w-40 h-14
                bg-white rounded-full shadow-lg overflow-hidden
                transition-all duration-300
                animate-[float_3s_ease-in-out_infinite]
              "
            >
              <div className="w-14 h-14 flex items-center justify-center shrink-0">
                <i className={`${icon} text-lg ${active ? 'text-blue-500' : 'text-slate-400'}`}></i>
              </div>
              <span className="whitespace-nowrap text-slate-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {label}
              </span>
            </Link>
          )
        })}
      </div>

      {/* ── Mobile bottom bar with curve selected state ── */}
      <CurveBottomNav items={items} pathname={pathname} />
    </>
  )
}