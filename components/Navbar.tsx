'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import logo  from '@/assets/logo.png'

const navLinks = [
  { label: 'Discover', href: '/discover', highlight: true },
  { label: 'Events', href: '/events' },
  { label: 'Community', href: '/community' },
  { label: 'FAQ', href: '/faq' },
]

export default function Navbar() {
  const [lang, setLang] = useState('NL')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div
        className="max-w-7xl mx-auto flex items-center justify-between
                   rounded-full px-5 py-2.5
                   bg-white/10 backdrop-blur-md
                   border border-white/20
                   shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center select-none">
          <Image
            src={logo}
            alt="Trail Running"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  link.highlight
                    ? 'text-sky-400 hover:text-sky-300'
                    : 'text-white hover:text-sky-300'
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            </li>
          ))}

          {/* Divider */}
          <span className="w-px h-5 bg-white/30" />

          {/* Language Selector */}
          <button
            onClick={() => setLang((l) => (l === 'NL' ? 'EN' : 'NL'))}
            className="flex items-center gap-1 text-sm font-semibold text-white
                       hover:text-sky-300 transition-colors"
          >
            {lang}
            <svg className="w-3.5 h-3.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">

          {/* Search Icon */}
          <button className="text-white hover:text-sky-300 transition-colors" aria-label="Search">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>

          {/* User Icon */}
          <button className="text-white hover:text-sky-300 transition-colors" aria-label="Account">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>
          </button>

          {/* CTA Button */}
          <Link
            href="/membership"
            className="
              flex items-center gap-6
              bg-sky-500 hover:bg-sky-400
              text-white font-bold
              px-8 py-3
              rounded-full
              transition-all duration-300
              shadow-lg
            "
          >
            <span className="text-base lg:text-lg">
              Become Member
            </span>

            <span
              className="
                flex items-center justify-center
                w-14 h-6
                bg-white
                rounded-full
                shrink-0
              "
            >
              <svg
                className="w-6 h-6 text-sky-500"
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
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="md:hidden mt-2 mx-auto max-w-7xl rounded-2xl px-5 py-4
                     bg-white/10 backdrop-blur-md border border-white/20
                     shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-semibold tracking-wide ${
                    link.highlight ? 'text-sky-400' : 'text-white'
                  }`}
                >
                  {link.label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-white/20">
            <Link
              href="/membership"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400
                         text-white text-sm font-bold px-5 py-2.5 rounded-full
                         transition-colors w-full"
            >
            <span className="text-base lg:text-lg">
              Become Member
            </span>

            <span
              className="
                flex items-center justify-center
                w-10 h-5
                bg-white
                rounded-full
                shrink-0
              "
            >
              <svg
                className="w-5 h-5 text-[#36A5DD]"
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
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
