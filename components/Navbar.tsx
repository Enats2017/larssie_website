'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const BASE_URL = 'http://localhost'

function imgUrl(path: string | null | undefined): string | null {
  if (!path) return null
  if (path.startsWith('http') || path.startsWith('//')) return path
  return `${BASE_URL}${path}`
}

// ── Types ──────────────────────────────────────────────────────────────────

type MenuField = {
  id: number
  menu_id: number
  tab_id: number
  type: 'text' | 'image' | 'icon' | null
  col_type: 'text' | 'image' | 'icon' | null
  icon_sub_type: 'vertical' | 'horizontal' | 'contact' | null
  extra_type: 'social' | 'text_block' | null
  column: number | null
  label: string | null
  link_en: string | null
  image: string | null
  icon: string | null
  icon_color: string | null
  icon_background: string | null
  section_heading_en: string | null
  contact_title: string | null
  contact_body: string | null
  contact_link_label: string | null
  contact_link_url: string | null
  social_fb: string | null
  social_tt: string | null
  social_ig: string | null
  text_block_title: string | null
  text_block_body: string | null
  sort_order: number
  num_cols: number
}

type MenuTab = {
  id: number
  tab_name: string
  tab_icon: string | null
  tab_image: string | null
  num_cols: number
  fields: MenuField[]
}

type Props = {
  tabs: MenuTab[]
  brand_logo: string | null
}

// ── Field renderers ────────────────────────────────────────────────────────

function FieldImage({ field }: { field: MenuField }) {
  if (!field.image) return null
  return (
    <a href={field.link_en ?? '#'} className="block group">
      <div className="overflow-hidden rounded-xl">
        <img src={field.image} alt={field.label ?? ''}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      {field.label && <p className="mt-2 text-sm font-semibold text-[#0d2a4a]">{field.label}</p>}
    </a>
  )
}

function FieldIcon({ field }: { field: MenuField }) {
  const isContact = field.icon_sub_type === 'contact'

  if (isContact) {
    return (
      <div className="border-t border-gray-100 pt-3 mt-1">
        {field.contact_title && (
          <p className="text-[11px] font-bold tracking-wider uppercase text-[#0d2a4a] mb-2.5">
            {field.contact_title}
          </p>
        )}
        {field.contact_body && <p className="text-xs text-gray-500 whitespace-pre-line">{field.contact_body}</p>}
        {field.contact_link_url && (
          <a href={field.contact_link_url} className="mt-2 inline-block text-xs font-semibold text-sky-500 hover:underline">
            {field.contact_link_label ?? field.contact_link_url}
          </a>
        )}
      </div>
    )
  }

  return (
    <a href={field.link_en ?? '#'}
      className="flex flex-row gap-3 items-center group rounded-xl px-3 py-2 hover:bg-gray-50 transition-colors">
      {field.icon && (
        <span className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
          style={{ background: field.icon_background ?? '#e0f2fe', color: field.icon_color ?? '#0284c7' }}>
          {field.icon.startsWith('fa-') || field.icon.includes(' fa-') ? (
            <i className={`${field.icon} text-sm`} aria-hidden="true" />
          ) : (
            <img src={field.icon} alt="" className="w-4 h-4 object-contain" />
          )}
        </span>
      )}
      {field.label && (
        <span className="text-sm font-semibold text-[#0d2a4a] group-hover:text-sky-500 transition-colors">
          {field.label}
        </span>
      )}
    </a>
  )
}

function FieldText({ field }: { field: MenuField }) {
  const isSubsection = !!field.label

  return (
    <div>
      {field.section_heading_en && (
        <p className={
          isSubsection
            ? 'text-[11px] font-bold tracking-wider uppercase text-gray-400 mb-2.5'
            : 'text-[11px] font-bold tracking-wider uppercase text-[#0d2a4a] mb-2.5'
        }>
          {field.section_heading_en}
        </p>
      )}
      {field.link_en && (
        <a href={field.link_en}
          className="text-[13px] text-gray-400 hover:text-[#0d2a4a] transition-colors mb-1.5 leading-snug block py-0.5">
          {field.link_en}
        </a>
      )}
    </div>
  )
}

function FieldExtra({ field }: { field: MenuField }) {
  if (field.extra_type === 'social') {
    const SocialCircle = ({
      href, bg, children,
    }: { href?: string | null; bg: string; children: React.ReactNode }) => {
      const circle = (
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0"
          style={{ background: bg }}
        >
          {children}
        </div>
      )
      return href
        ? <a href={href} target="_blank" rel="noreferrer">{circle}</a>
        : circle
    }

    return (
      <div className="border-t border-gray-100 pt-3 mt-1">
        <p className="text-[11px] font-bold tracking-wider uppercase text-[#0d2a4a] mb-2.5">Follow Us</p>
        <div className="flex items-center gap-3 flex-wrap">
          <SocialCircle href={field.social_fb} bg="#1877f2">
            <i className="fab fa-facebook-f" aria-hidden="true" />
          </SocialCircle>
          <SocialCircle href={field.social_tt} bg="#010101">
            <i className="fab fa-tiktok" aria-hidden="true" />
          </SocialCircle>
          <SocialCircle
            href={field.social_ig}
            bg="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)"
          >
            <i className="fab fa-instagram" aria-hidden="true" />
          </SocialCircle>
        </div>
      </div>
    )
  }
  if (field.extra_type === 'text_block') {
    const title = field.text_block_title ?? field.contact_link_label
    if (!title && !field.text_block_body) return null
    return (
      <div className="border-t border-gray-100 pt-3 mt-1">
        {title && <p className="text-[11px] font-bold tracking-wider uppercase text-[#0d2a4a] mb-2.5">{title}</p>}
        {field.text_block_body && <p className="text-xs text-gray-500 whitespace-pre-line">{field.text_block_body}</p>}
      </div>
    )
  }
  return null
}

function Field({ field }: { field: MenuField }) {
  if (field.extra_type) return <FieldExtra field={field} />
  if (field.type === 'image') return <FieldImage field={field} />
  if (field.type === 'icon') return <FieldIcon field={field} />
  if (field.type === 'text') return <FieldText field={field} />
  return null
}

// ── Mega menu panel ────────────────────────────────────────────────────────

function MegaMenu({
  tabs,
  activeTabId,
  onMouseEnter,
  onMouseLeave,
}: {
  tabs: MenuTab[]
  activeTabId: number
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const currentTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0]

  const byColumn = (currentTab?.fields ?? []).reduce<Record<number, MenuField[]>>((acc, f) => {
    const col = f.column ?? 0
      ; (acc[col] ??= []).push(f)
    return acc
  }, {})
  const colKeys = Object.keys(byColumn).map(Number).sort((a, b) => a - b)
  const cols = currentTab?.num_cols ?? 4

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[90vw] max-w-6xl
                 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                 border border-gray-100 overflow-hidden z-50"
    >
      {/* Content grid */}
      {currentTab && colKeys.length > 0 ? (
        <div
          className="grid gap-6 p-6"
          style={{ gridTemplateColumns: `repeat(${Math.min(cols, colKeys.length)}, minmax(0, 1fr))` }}
        >
          {colKeys.map((col) => (
            <div key={col} className="flex flex-col gap-1">
              {byColumn[col].map((field) => (
                <Field key={field.id} field={field} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="p-6 text-sm text-gray-400">No items yet.</p>
      )}
    </div>
  )
}

// ── Navbar ─────────────────────────────────────────────────────────────────

export default function Navbar({ tabs, brand_logo }: Props) {
  const [lang, setLang] = useState('NL')
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? 0)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMega = (tabId: number) => {
    leaveTimer.current && clearTimeout(leaveTimer.current)
    setActiveTabId(tabId)
    setMegaOpen(true)
  }
  const closeMega = () => {
    leaveTimer.current = setTimeout(() => setMegaOpen(false), 120)
  }

  const visible = useScrollDirection(10)

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 px-4 py-3
        transition-transform duration-300 ease-in-out
        ${visible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between
                   rounded-full px-5 py-2.5
                   bg-white/10 backdrop-blur-md
                   border border-white/20
                   shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
      >

        {/* Logo */}
        <Link href="/" className="flex items-center select-none">
          {brand_logo
            ? <img src={imgUrl(brand_logo) ?? ''} alt="Brand Logo" className="h-10 w-auto object-contain" />
            : <Image src={logo} alt="Trail Running" className="h-10 w-auto object-contain" />
          }
        </Link>

        {/* Desktop — one button per tab from DB */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-8">
          {tabs.map((tab) => (
            <li key={tab.id} className="relative">
              <button
                onMouseEnter={() => openMega(tab.id)}
                onMouseLeave={closeMega}
                className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors
                  ${activeTabId === tab.id && megaOpen ? 'text-sky-300' : 'text-sky-400 hover:text-sky-300'}`}
              >
                {tab.tab_name.toUpperCase()}
                <svg
                  className={`w-3 h-3 mt-0.5 transition-transform ${activeTabId === tab.id && megaOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </li>
          ))}

          <span className="w-px h-5 bg-white/30" />

          {/* Language */}
          <button
            onClick={() => setLang((l) => (l === 'NL' ? 'EN' : 'NL'))}
            className="flex items-center gap-1 text-sm font-semibold text-white hover:text-sky-300 transition-colors"
          >
            {lang}
            <svg className="w-3.5 h-3.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </ul>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <button className="text-white hover:text-sky-300 transition-colors" aria-label="Search">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>
          <button className="text-white hover:text-sky-300 transition-colors" aria-label="Account">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>
          </button>
          <Link href="/membership"
            className=" flex items-center gap-3 xl:gap-6
              bg-sky-500 hover:bg-sky-400
              text-white font-bold
              px-5 py-2.5 xl:px-8 xl:py-3
              rounded-full
              transition-all duration-300
              shadow-lg
              whitespace-nowrap">
            <span className="text-base lg:text-lg">Become Member</span>
            <span className="flex items-center justify-center w-14 h-6 bg-white rounded-full shrink-0">
              <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-white" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
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

      {/* Mega menu — rendered OUTSIDE the pill, full width below it */}
      {megaOpen && tabs.length > 0 && (
        <div className="hidden md:block relative max-w-7xl mx-auto">
          <MegaMenu
            tabs={tabs}
            activeTabId={activeTabId}
            onMouseEnter={() => { leaveTimer.current && clearTimeout(leaveTimer.current) }}
            onMouseLeave={closeMega}
          />
        </div>
      )}

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl rounded-2xl px-5 py-4
                        bg-white/10 backdrop-blur-md border border-white/20
                        shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
          <ul className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <details className="group">
                  <summary className="text-sm font-semibold text-sky-400 cursor-pointer list-none
                                      flex items-center justify-between py-1">
                    {tab.tab_name.toUpperCase()}
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="pl-3 pt-2 flex flex-col gap-1.5">
                    {tab.fields.map((field) => field.label && (
                      <a key={field.id} href={field.link_en ?? '#'}
                        className="text-sm text-white/70 hover:text-white transition-colors">
                        {field.label}
                      </a>
                    ))}
                  </div>
                </details>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-white/20">
            <Link href="/membership" onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400
                             text-white text-sm font-bold px-5 py-2.5 rounded-full
                             transition-colors w-full">
              <span className="text-base lg:text-lg">Become Member</span>
              <span className="flex items-center justify-center w-10 h-5 bg-white rounded-full shrink-0">
                <svg className="w-5 h-5 text-[#36A5DD]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}