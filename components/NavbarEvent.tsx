'use client'

import Link from 'next/link'
import { useState, useRef, ReactNode } from 'react'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import NotifyMe from '@/components/NotifyMe'
import Register from '@/components/Register'
import ContactUs from '@/components/ContactUs'

const BASE_URL = 'http://91.99.229.154'

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
  lang: string
}

// ── Field renderers ────────────────────────────────────────────────────────

function FieldImage({ field }: { field: MenuField }) {
  if (!field.image) return null
  return (
    <a href={field.link_en ?? '#'} className="block group mb-4 last:mb-0">
      <div className="overflow-hidden rounded-xl">
        <img
          src={field.image}
          alt={field.label ?? ''}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {field.label && (
        <p className="mt-2 text-sm font-semibold text-[#0d2a4a]">{field.label}</p>
      )}
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
        {field.contact_body && (
          <p className="text-xs text-gray-500 whitespace-pre-line">{field.contact_body}</p>
        )}
        {field.contact_link_url && (
          <a
            href={field.contact_link_url}
            className="mt-2 inline-block text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors"
          >
            {field.contact_link_label ?? field.contact_link_url}
          </a>
        )}
      </div>
    )
  }

  return (
    <a
      href={field.link_en ?? '#'}
      className="flex flex-row gap-3 items-center group px-3 py-2 transition-colors"

    >
      {field.icon && (
        <span
          className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
          style={{ background: field.icon_background ?? '#e0f2fe', color: field.icon_color ?? '#0284c7' }}
        >
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

function FieldText({ field, isOpen, onToggle, hasChildren }: {
  field: MenuField
  isOpen?: boolean
  onToggle?: () => void
  hasChildren?: boolean
}) {
  const isSubsection = !!field.label

  if (isSubsection) {
    return (
      <a
        href={field.link_en ?? '#'}
        className="text-[11px] font-normal tracking-wider uppercase text-gray-400 hover:text-sky-500 transition-colors block py-1"
      >
        {field.section_heading_en}
      </a>
    )
  }

  // Parent/section — bold dark text, arrow if has children
  return (
    <div>
      <div
        onClick={() => hasChildren && onToggle?.()}
        className={`flex items-center justify-between gap-2 mb-1 ${hasChildren ? 'cursor-pointer group' : ''}`}
      >
        <p className={`text-sm font-bold text-[#0d2a4a] transition-colors ${hasChildren ? 'group-hover:text-sky-500' : ''}`}>
          {field.section_heading_en}
        </p>
        {hasChildren && (
          <svg
            className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-sky-500' : 'text-sky-400'
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
    </div>
  )
}

function FieldExtra({ field }: { field: MenuField }) {
  if (field.extra_type === 'social') {
    const SocialCircle = ({
      href,
      bg,
      children,
    }: {
      href?: string | null
      bg: string
      children: React.ReactNode
    }) => {
      const circle = (
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0"
          style={{ background: bg }}
        >
          {children}
        </div>
      )
      return href ? (
        <a href={href} target="_blank" rel="noreferrer">{circle}</a>
      ) : circle
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
        {title && (
          <p className="text-[11px] font-bold tracking-wider uppercase text-[#0d2a4a] mb-2.5">{title}</p>
        )}
        {field.text_block_body && (
          <p className="text-xs text-gray-500 whitespace-pre-line">{field.text_block_body}</p>
        )}
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

function ColumnWithToggle({ fields }: { fields: MenuField[] }) {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set())

  const toggleSection = (id: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // Filter only English content fields
  const visibleFields = fields.filter(f => {
    if (f.type === 'text') return !!f.section_heading_en
    return true
  })

  // Separate parents and children
  const parents = visibleFields.filter(f => f.label === null || f.type !== 'text')
  const children = visibleFields.filter(f => f.type === 'text' && f.label !== null)

  // Group children under their parent by matching label (parent id as string)
  const childrenByParentId: Record<number, MenuField[]> = {}
  children.forEach(child => {
    const parentId = Number(child.label)
    if (!childrenByParentId[parentId]) childrenByParentId[parentId] = []
    childrenByParentId[parentId].push(child)
  })

  return (
    <div className="flex flex-col gap-3">
      {parents.map((field) => {
        if (field.type !== 'text') {
          return <Field key={field.id} field={field} />
        }

        const fieldChildren = childrenByParentId[field.id] ?? []
        const hasChildren = fieldChildren.length > 0
        const isOpen = openSections.has(field.id)

        return (
          <div key={field.id} className="mb-2">
            <div
              onClick={() => hasChildren && toggleSection(field.id)}
              className={`flex items-center justify-between gap-2 ${hasChildren ? 'cursor-pointer group' : ''}`}
            >
              <p className={`text-sm font-bold text-[#0d2a4a] transition-colors leading-snug ${hasChildren ? 'group-hover:text-sky-500' : ''}`} style={{ color: '#0d2a4a' }}>
                {field.section_heading_en}
              </p>
              {hasChildren && (
                <svg
                  className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-sky-500' : 'text-sky-400'
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>

            {isOpen && hasChildren && (
              <div className="flex flex-col gap-0.5 mt-1">
                {fieldChildren.map((child) => (
                  <a
                    key={child.id}
                    href={child.link_en ?? '#'}
                    className="text-[11px] font-normal tracking-wider uppercase text-gray-400 hover:text-sky-500 transition-colors block py-1 pl-2"
                  >
                    {child.section_heading_en}
                  </a>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
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
  const currentTab = tabs.find((t) => t.id === activeTabId)
  if (!currentTab || currentTab.fields.length === 0) return null

  const byColumn = currentTab.fields.reduce<Record<number, MenuField[]>>((acc, f) => {
    const col = f.column ?? 0
      ; (acc[col] ??= []).push(f)
    return acc
  }, {})
  const colKeys = Object.keys(byColumn).map(Number).sort((a, b) => a - b)
  const cols = currentTab.num_cols ?? 4

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[90vw] max-w-6xl
                 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                 border border-gray-100 overflow-hidden z-50"
    >
      {colKeys.length > 0 ? (
        <div
          className="grid gap-6 p-6"
          style={{ gridTemplateColumns: `repeat(${Math.min(cols, colKeys.length)}, minmax(0, 1fr))` }}
        >
          {colKeys.map((col) => (
            <ColumnWithToggle key={col} fields={byColumn[col]} />
          ))}
        </div>
      ) : (
        <p className="p-6 text-sm text-gray-400">No items yet.</p>
      )}
    </div>
  )
}

// ── Navbar ─────────────────────────────────────────────────────────────────

export default function Navbar({ tabs, brand_logo, lang }: Props) {
  const currentLang = lang.toUpperCase()
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [activeTabId, setActiveTabId] = useState<number>(tabs[0]?.id ?? 0)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMega = (tabId: number) => {
    const tab = tabs.find((t) => t.id === tabId)
    if (!tab || tab.fields.length === 0) {
      closeMega()
      return
    }
    leaveTimer.current && clearTimeout(leaveTimer.current)
    setActiveTabId(tabId)
    setMegaOpen(true)
  }

  const closeMega = () => {
    leaveTimer.current = setTimeout(() => setMegaOpen(false), 120)
  }

  // ✅ locked=menuOpen pauses hide-on-scroll while mobile menu is open
  const visible = useScrollDirection(10, menuOpen)

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 px-4 py-3
        transition-transform duration-300 ease-in-out
        ${visible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      {/* ── Pill bar ── */}
      <div
        className="max-w-7xl mx-auto flex items-center justify-between
                   rounded-full px-5 py-2.5
                   bg-white/10 backdrop-blur-md
                   border border-white/20
                   shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center select-none group">
          {brand_logo ? (
            <img
              src={imgUrl(brand_logo) ?? ''}
              alt="Brand Logo"
              className="h-10 w-auto object-contain
      transition-transform duration-500 ease-out
      group-hover:-translate-y-1 group-hover:translate-x-1
      group-hover:scale-105"
            />
          ) : (
            <Image
              src={logo}
              alt="Trail Running"
              className="h-10 w-auto object-contain
      transition-transform duration-500 ease-out
      group-hover:-translate-y-1 group-hover:translate-x-1
      group-hover:scale-105"
            />
          )}
        </Link>

        {/* Desktop nav tabs */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-8">
          {tabs.map((tab) => (
            <li key={tab.id} className="relative">
              <button
                onMouseEnter={() => openMega(tab.id)}
                onMouseLeave={closeMega}
                className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors
  relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px]
  after:bg-sky-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200
  ${activeTabId === tab.id && megaOpen ? 'text-white after:scale-x-100' : 'text-sky-400 hover:text-white'}`}
              >
                {tab.tab_name.toUpperCase()}

              </button>
            </li>
          ))}

          <span className="w-px h-5 bg-white/30" />

          {/* Language */}
          <button className="flex items-center gap-1 text-sm font-semibold text-white hover:text-sky-300 transition-colors">
            {currentLang}
            <svg className="w-3.5 h-3.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </ul>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-white hover:text-sky-300 transition-colors"
            aria-label="Notifications"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button
            onClick={() => setContactOpen(true)}
            className="text-white hover:text-sky-300 transition-colors"
            aria-label="Contact Us"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Zm-2 0-7 5-7-5" />
            </svg>
          </button>
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
          <button
            onClick={() => setRegisterOpen(true)}
            className="flex items-center gap-3 xl:gap-6
    relative overflow-hidden
    bg-sky-500 text-white font-bold
    px-5 py-2.5 xl:px-8 xl:py-3
    rounded-full shadow-lg whitespace-nowrap
    before:absolute before:inset-0 before:bg-white before:rounded-full
    before:-translate-x-[110%] hover:before:translate-x-0
    before:transition-transform before:duration-[600ms] before:ease-in-out
    hover:text-sky-500 transition-colors duration-[600ms]"
          >
            <span className="relative z-10 text-base lg:text-lg">Become Member</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white"
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

      {/* ── Desktop mega menu ── */}
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

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div
          className="lg:hidden mt-2 mx-auto max-w-7xl rounded-2xl
           bg-white border border-gray-100
           shadow-[0_20px_60px_rgba(0,0,0,0.15)]
           flex flex-col overflow-hidden"
          style={{ maxHeight: 'calc(100dvh - 5rem)' }}
        >
          {/* ✅ overflow-y-auto + overscroll-contain: scrollable, won't bubble to window */}
          <div className="overflow-y-auto overscroll-contain px-5 py-4">
            <ul className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <details className="group">
                    <summary
                      className="text-sm font-semibold text-[#0d2a4a] cursor-pointer list-none
  flex items-center justify-between py-1
  relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px]
  after:bg-sky-400 after:scale-x-0 active:after:scale-x-100
  after:transition-transform after:duration-200
  active:text-sky-500 transition-colors duration-200"
                    >
                      {tab.tab_name.toUpperCase()}
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-open:rotate-180 text-sky-500 shrink-0"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>

                    {tab.fields.length > 0 && (
                      <div className="pl-2 pt-2 pb-1 bg-gray-50 rounded-xl mt-1">
                        <ColumnWithToggle fields={tab.fields} />
                      </div>
                    )}
                  </details>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-gray-100 pb-2">
              <button
                onClick={() => { setMenuOpen(false); setRegisterOpen(true) }}
                className="flex items-center justify-center gap-2
   relative overflow-hidden
   bg-sky-500 text-white text-sm font-bold
   px-5 py-2.5 rounded-full w-full
   before:absolute before:inset-0 before:bg-white before:rounded-full
   before:-translate-x-[110%] active:before:translate-x-0
   before:transition-transform before:duration-[400ms] before:ease-in-out
   active:text-sky-500 transition-colors duration-[400ms]"
              >
                <span className="relative z-10 text-base lg:text-lg">Become Member</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── Notification Drawer ── */}

      {/* Backdrop */}
      <div
        onClick={() => { setDrawerOpen(false); setRegisterOpen(false); setContactOpen(false) }}
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300
    ${drawerOpen || registerOpen || contactOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-[35vw] min-w-[320px] bg-white z-[70] shadow-2xl
    transition-transform duration-500 ease-in-out overflow-y-auto
    ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close Button */}
        <button
          onClick={() => setDrawerOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sky-100 hover:bg-sky-200
  flex items-center justify-center transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* NotifyMe content — remove outer bg wrapper */}
        <NotifyMe />
      </div>

      {/* ── Register Drawer ── */}
      <div
        className={`fixed top-0 right-0 h-screen w-[35vw] min-w-[320px] bg-white z-[70] shadow-2xl
          transition-transform duration-500 ease-in-out overflow-y-auto
          ${registerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button
          onClick={() => setRegisterOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sky-100 hover:bg-sky-200
            flex items-center justify-center transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Register />
      </div>

      {/* ── Contact Us Drawer ── */}
      <div
        className={`fixed top-0 right-0 h-screen w-[35vw] min-w-[320px] bg-white z-[70] shadow-2xl
          transition-transform duration-500 ease-in-out overflow-y-auto
          ${contactOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button
          onClick={() => setContactOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sky-100 hover:bg-sky-200
    flex items-center justify-center transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ContactUs />
      </div>

    </nav>
  )
}