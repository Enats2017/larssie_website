'use client'

import { Home, Map, Calendar, User } from 'lucide-react'
import Link from 'next/link'

const items = [
  { icon: Home, href: '/', label: 'Home', active: true },
  { icon: Map, href: '/map', label: 'Map' },
  { icon: Calendar, href: '/calendar', label: 'Calendar' },
  { icon: User, href: '/profile', label: 'Profile' },
]

export default function SideDock() {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
      {items.map(({ icon: Icon, href, label, active }, i) => (
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
            <Icon
              className={`w-6 h-6 ${
                active ? 'text-orange-500' : 'text-slate-400'
              }`}
            />
          </div>

          <span
            className="
              whitespace-nowrap
              text-slate-700
              font-medium
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-200
            "
          >
            {label}
          </span>
        </Link>
      ))}
    </div>
  )
}