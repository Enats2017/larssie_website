import { prisma } from '@/lib/prisma'
import SideDock from '@/components/SideDock'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import TerritorySection from '@/components/TerritorySection'
import InfoSection from '@/components/InfoSection'
import GearUpSection from '@/components/GearUpSection'
import AidStations from '@/components/AidStation'
import TimelineSection from '@/components/TimelineSection'
import CourseDetailsSection from '@/components/CourseDetailsSection'
import Footer from '@/components/Footer'
import Sponsors from '@/components/Sponsors'


interface PageProps {
  searchParams: Promise<{
    brand_id?: string
    event_id?: string
    distance_id?: string
    lang?: string
    menu_id?: string   // 👈 add this
  }>
}

type Column = { icon?: string; label: string; label_nl?: string; label_fr?: string; type: "text" | "check" | "yesno" };
type StationRow = { name: string; dotColor?: string; finish?: boolean; values: any[] };

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const brandId = Number(params.brand_id || 2)
  const eventId = Number(params.event_id || 71)
  const distanceId = Number(params.distance_id || 49)
  const lang = params.lang || 'en'
  const menuId = Number(params.menu_id || 0)  // 👈 add this

// REPLACE your existing console.log with this:
console.log('=== PAGE PARAMS ===', {
  brandId,
  eventId,
  distanceId,
  lang,
  menuId,
  raw_menu_id: params.menu_id,
})

  const [brands] = await Promise.all([
    prisma.brand.findMany({
      orderBy: { sort_order: 'asc' },
    }),
  ])

  const menu = await prisma.menu.findFirst({
    where: { brand_id: brandId, event_id: eventId },
    orderBy: { menu_id: 'desc' },
    include: {
      tabs: {
        where: { nav_type: 'event' },
        orderBy: { id: 'asc' },
      },
    },
  })
  if (!menu) return <div>No menu found</div>

  // 👇 ADD THIS COLOR 👇 ADD THIS COLOR👇 ADD THIS COLOR👇 ADD THIS COLOR👇 ADD THIS COLOR
  const eventColor = menuId ? await prisma.menuColorSettings.findFirst({
    where: {
      menu_id: menuId,   // 👈 specific menu
      nav_type: "event"
    }
  }) : null

  // ADD this log right here:
  console.log('=== COLOR FETCH ===', {
    menuId,
    eventColor,
  })

  const navbarBg = eventColor?.navbar_bg_color ?? "#36A5DD"

  const tabIds = menu.tabs.map(t => t.id)

  // ── FIX: language_id se filter karo taaki sahi language ki rows aayein
  const langIdMap: Record<string, number> = { en: 1, fr: 2, nl: 3 }
  const activeLangId = langIdMap[lang] ?? 1

  const allFields = await prisma.menuField.findMany({
  where: {
    menu_id: menu.menu_id,
    tab_id: { in: tabIds },
    nav_type: menu.tabs[0]?.nav_type ?? 'event',
    OR: [
      { language_id: activeLangId },
      { language_id: null },
      { type: 'image' },
      { type: 'icon' },
      { extra_type: 'social' },
      { extra_type: 'text_block' },
    ],
  },
  orderBy: [{ column: 'asc' }, { sort_order: 'asc' }],
})

  const tabs = menu.tabs.map(tab => ({
    ...tab,
    fields: allFields.filter(f => f.tab_id === tab.id),
  }))

  const hero = await prisma.heroBuilder.findFirst({
    where: {
      brand_id: brandId,
      event_id: eventId,
      distance_id: distanceId,
    },
    orderBy: {
      hero_id: 'desc',
    },
  })

  if (!hero) {
    return <div>No hero found</div>
  }

  const course = await prisma.courseBuilder.findFirst({
    where: {
      event_id: eventId,
      distance_id: String(distanceId),
    },
  })

  const courseLinkCards = course
    ? await prisma.courseLinkCards.findMany({
      where: {
        course_id: course.course_id,
      },
      orderBy: {
        sort_order: 'asc',
      },
    })
    : []

  const info = await prisma.infoBuilder.findFirst({
    where: {
      event_id: eventId,
      distance_id: distanceId,
    },
    orderBy: { info_id: 'asc' },
  })

  const gearupRow = await prisma.gearup_builder.findFirst({
    where: { event_id: eventId, distance_id: distanceId },
    include: { gearup_link_cards: { orderBy: { sort_order: 'asc' } } },
  })

  const gearupData = gearupRow ? {
    titleWord: gearupRow.title_word ?? 'GEAR UP',
    titleScript: gearupRow.title_script ?? 'for the adventure',
    mandatoryTitle: gearupRow.mandatory_title ?? 'MANDATORY EQUIPMENT',
    mandatoryDesc: gearupRow.mandatory_desc ?? '',
    recommendedTitle: gearupRow.recommended_title ?? 'RECOMMENDED EQUIPMENT',
    recommendedDesc: gearupRow.recommended_desc ?? '',
    mandatoryItems: JSON.parse(gearupRow.mandatory_items ?? '[]') as { icon: string; label: string }[],
    recommendedItems: JSON.parse(gearupRow.recommended_items ?? '[]') as { icon: string; label: string }[],
    linkCards: gearupRow.gearup_link_cards.map(c => ({
      title: c.card_title ?? '',
      link: c.card_url ?? '#',
      img: c.card_image ?? '',
    })),
  } : null

  const sponsorRows = await prisma.$queryRaw<any[]>`
    SELECT sb.title_word, sl.logo_name, sl.logo_image, sl.logo_url
    FROM sponsor_builder sb
    JOIN sponsor_logos sl ON sl.sponsor_id = sb.sponsor_id
    WHERE sb.event_id = ${eventId}
      AND sb.brand_id = ${brandId}
      AND sb.distance_id = ${distanceId}
    ORDER BY sl.sort_order
  `

  const sponsorLogos = sponsorRows.map(r => ({
    name: r.logo_name,
    img: r.logo_image,
    url: r.logo_url,
  }))
  const sponsorTitle = sponsorRows[0]?.title_word ?? 'Proudly Supported By'

  const aidStationRow = await prisma.aidStationBuilder.findFirst({
    where: { event_id: eventId, distance_id: String(distanceId) },
  })

  const stationsArray = aidStationRow?.stations
    ? JSON.parse(aidStationRow.stations)
    : []

  const aidStationData = aidStationRow ? {
    titleWord: lang === 'nl' ? (aidStationRow.title_word_nl || aidStationRow.title_word || 'AID STATIONS') : lang === 'fr' ? (aidStationRow.title_word_fr || aidStationRow.title_word || 'AID STATIONS') : aidStationRow.title_word ?? 'AID STATIONS',
    titleScript: lang === 'nl' ? (aidStationRow.title_script_nl || aidStationRow.title_script || '8 aid stations + finish') : lang === 'fr' ? (aidStationRow.title_script_fr || aidStationRow.title_script || '8 aid stations + finish') : aidStationRow.title_script ?? '8 aid stations + finish',
    stationColIcon: aidStationRow.station_col_icon ?? 'fa-solid fa-location-dot',
    stationColLabel: lang === 'nl' ? (aidStationRow.station_col_label_nl || aidStationRow.station_col_label || 'STATIONS') : lang === 'fr' ? (aidStationRow.station_col_label_fr || aidStationRow.station_col_label || 'STATIONS') : aidStationRow.station_col_label ?? 'STATIONS',
    ctaLabel: lang === 'nl' ? (aidStationRow.cta_label_nl || aidStationRow.cta_label || 'Use Livio') : lang === 'fr' ? (aidStationRow.cta_label_fr || aidStationRow.cta_label || 'Use Livio') : aidStationRow.cta_label ?? 'Use Livio',
    ctaUrl: aidStationRow.cta_url ?? '#',
    ctaShow: Boolean(aidStationRow.cta_show ?? 1),
    bgImg: aidStationRow.bg_img ?? '',
    overlayOpacity: aidStationRow.overlay_opacity ?? 40,
    columns: (stationsArray[0]?.columns ?? []).map((col: any) => ({
      ...col,
      label: lang === 'nl' ? (col.label_nl || col.label)
        : lang === 'fr' ? (col.label_fr || col.label)
          : col.label,
    })),
    rows: stationsArray.map((s: any) => ({
      name: (s.name ?? '').trim(),
      dotColor: s.dot_color ?? undefined,
      finish: Boolean(s.is_finish),
      values: Array.isArray(s.values) ? s.values : [],
    })),
  } : null

  // ── TIMELINE ────────────────────────────────────────────────────────
  const timelineRow = await prisma.timeline_builder.findFirst({
    where: {
      event_id: eventId,
      distance_id: distanceId,
    },
  })

  const timelineItemRows = timelineRow
    ? await prisma.timeline_items.findMany({
      where: { timeline_id: timelineRow.timeline_id },
      orderBy: { sort_order: 'asc' },
    })
    : []

  const timelineData = {
    titleWord: timelineRow?.title_word ?? 'TIMELINE',
    titleScript: timelineRow?.title_script ?? '50k distance',
    items: timelineItemRows.map(it => ({
      day: (lang === 'nl' ? it.day_label_nl : lang === 'fr' ? it.day_label_fr : null) || it.day_label || '',
      time: (lang === 'nl' ? it.time_label_nl : lang === 'fr' ? it.time_label_fr : null) || it.time_label || '',
      title: (lang === 'nl' ? it.item_title_nl : lang === 'fr' ? it.item_title_fr : null) || it.item_title || '',
      subtitle: (lang === 'nl' ? it.item_subtitle_nl : lang === 'fr' ? it.item_subtitle_fr : null) || it.item_subtitle || '',
    })),
  }
  // ────────────────────────────────────────────────────────────────────

  // ── FOOTER ──────────────────────────────────────────────────────────
  const footer = await prisma.footerBuilder.findFirst({
    where: { brand_id: brandId, event_id: eventId, distance_id: distanceId },
    orderBy: { footer_id: 'desc' },
  })
  // ────────────────────────────────────────────────────────────────────

  return (
    <div>
      <SideDock />
      <Navbar
        tabs={tabs}
        brand_logo={menu.brand_logo ?? hero.brand_logo_img}
        lang={lang}
        navbarBg={navbarBg}
        searchParams={{
          brand_id: String(brandId),
          event_id: String(eventId),
          distance_id: String(distanceId),
          menu_id: String(menuId),
          lang
        }}
      />
      <HeroSection
        menu={menu}
        hero={hero}
      />

      {info?.layout_type === 'background' && (
        <TerritorySection
          info={info}
          sponsorLogos={sponsorLogos}
          sponsorTitle={sponsorTitle}
        />
      )}
      {(info?.layout_type === 'side' || info?.layout_type === 'side-left') && (
        <InfoSection
          brands={brands}
          info={info}
          sponsorLogos={sponsorLogos}
          sponsorTitle={sponsorTitle}
        />
      )}
      <GearUpSection data={gearupData} />
      <AidStations data={aidStationData} />

      <TimelineSection data={timelineData} lang={lang} />
      <CourseDetailsSection course={course} linkCards={courseLinkCards} lang={lang} />

      <Footer footer={footer} brandLogo={menu.brand_logo} lang={lang} />
    </div>
  )
}