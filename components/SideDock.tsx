'use client'

import { Home, Map, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { usePathname } from 'next/navigation'

const items = [
  { icon: Home, href: '/', label: 'Home' },
  { icon: Map, href: '/map', label: 'Map' },
  { icon: Calendar, href: '/calendar', label: 'Calendar' },
  { icon: User, href: '/profile', label: 'Profile' },
]

export default function SideDock() {
  const visible = useScrollDirection(10)
  const pathname = usePathname()

  return (
    <>
      {/* ── Desktop side dock (hidden on mobile) ── */}
      <div
        className={`
          hidden xl:flex
          fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-4 z-50
          transition-all duration-300 ease-in-out
          // ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
          opacity-100 translate-x-0
        `}
      >
        {items.map(({ icon: Icon, href, label }, i) => {
          const active = pathname === href
          return (
            <Link
              key={label}
              href={href}
              style={{ animationDelay: `${i * 0.3}s` }}
              className="
                group
                flex items-center
                w-14 hover:w-40
                h-14
                bg-white
                rounded-full
                shadow-lg
                overflow-hidden
                transition-all
                duration-300
                animate-[float_3s_ease-in-out_infinite]
              "
            >
              <div className="w-14 h-14 flex items-center justify-center shrink-0">
                <Icon className={`w-6 h-6 ${active ? 'text-blue-500' : 'text-slate-400'}`} />
              </div>
              <span className="
                whitespace-nowrap text-slate-700 font-medium
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
              ">
                {label}
              </span>
            </Link>
          )
        })}
      </div>

      {/* ── Mobile bottom bar (hidden on desktop) ── */}
      <nav
        className={`
          flex xl:hidden
          fixed bottom-0 left-0 right-0 z-50
          bg-white border-t border-slate-100
          shadow-[0_-4px_24px_rgba(0,0,0,0.06)]
          transition-transform duration-300 ease-in-out
          ${visible ? 'translate-y-0' : 'translate-y-full'}
          // translate-y-0
          pb-[env(safe-area-inset-bottom)]
        `}
      >
        {items.map(({ icon: Icon, href, label }) => {
          const active = pathname === href
          return (
            <Link
              key={label}
              href={href}
              className="
                flex-1 flex flex-col items-center justify-center
                gap-1 py-3
                transition-colors duration-200
              "
            >
              <Icon
                className={`w-6 h-6 transition-colors duration-200 ${
                  active ? 'text-blue-500' : 'text-slate-400'
                }`}
              />
              <span className={`text-[11px] font-medium ${active ? 'text-blue-500' : 'text-slate-400'}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}