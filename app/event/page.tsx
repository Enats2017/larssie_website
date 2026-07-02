import { prisma } from '@/lib/prisma'
import NavbarSectionEvent from '@/components/NavbarEvent'
import HeroSectionEvent from '@/components/HeroEvent'
import DistanceSlider from '@/components/DistanceSlider'
import InfoSectionEvent from '@/components/InfoSec'
import SideDock from '@/components/SideDock'
import Social from '@/components/Social'
import FaqEventSection from '@/components/FaqEventSection'



const BASE_URL = 'http://91.99.229.154'

function imgUrl(path: string | null | undefined): string | null {
  if (!path) return null
  if (path.startsWith('http') || path.startsWith('//')) return path
  return `${BASE_URL}${path}`
}

function formatRaceDate(date: Date | null): string {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}

const DISTANCE_COLORS = [
  '#FACC15',
  '#36A5DD',
  '#0D2A4A',
  '#7C3AED',
  '#DC2626',
  '#059669',
]

export default async function EventPage({
  searchParams,
}: {
  searchParams: { brand_id?: string; event_id?: string }
}) {
  const BRAND_ID = Number(searchParams.brand_id ?? 1)
  const EVENT_ID = Number(searchParams.event_id ?? 78)

  if (!BRAND_ID || !EVENT_ID) {
    return <div>Invalid brand_id or event_id</div>
  }
  // ───────────────────────────────────────────────────────────────
  // Navbar
  // ───────────────────────────────────────────────────────────────
  const menu = await prisma.menu.findFirst({
    where: {
      brand_id: BRAND_ID,
      event_id: EVENT_ID,
    },
    orderBy: {
      menu_id: 'desc',
    },
    include: {
      tabs: {
        where: {
          nav_type: 'event',
        },
        orderBy: {
          id: 'asc',
        },
      },
    },
  })

  if (!menu) {
    return <div>No menu found</div>
  }

  const tabIds = menu.tabs.map((tab) => tab.id)

  const allFields = await prisma.menuField.findMany({
    where: {
      menu_id: menu.menu_id,
      tab_id: {
        in: tabIds,
      },
    },
    orderBy: [
      { column: 'asc' },
      { sort_order: 'asc' },
    ],
  })

  const tabs = menu.tabs.map((tab) => ({
    ...tab,
    fields: allFields.filter((field) => field.tab_id === tab.id),
  }))

  // ───────────────────────────────────────────────────────────────
  // Hero Event Builder (Hero Banner)
  // ───────────────────────────────────────────────────────────────
  const heroRow = await prisma.heroEventBuilder.findFirst({
    where: {
      brand_id: BRAND_ID,
      event_id: EVENT_ID,
    },
  })

  if (!heroRow) {
    return <div>No hero found</div>
  }

 const hero = {
    bg_desktop: imgUrl(heroRow.bg_desktop),
    bg_mobile: imgUrl(heroRow.bg_mobile),
    overlay_opacity: heroRow.overlay_opacity ?? 40,
    event_name: heroRow.event_name ?? '',
    race_title: heroRow.race_title ?? '',
    race_date: heroRow.race_date ?? null,
    description: heroRow.description ?? '',
    sidebar_stats: heroRow.sidebar_stats,
    cta_buttons: heroRow.cta_buttons,
    bottom_stats: heroRow.bottom_stats,
    tagline: heroRow.tagline ?? '',
  }

  // ───────────────────────────────────────────────────────────────
  // Hero Builder (Distance Slider)
  // ───────────────────────────────────────────────────────────────
  const heroRows = await prisma.heroBuilder.findMany({
    where: {
      brand_id: BRAND_ID,
      event_id: EVENT_ID,
    },
    orderBy: {
      distance_id: 'asc',
    },
  })

  const distances =
    heroRows.length > 0
      ? heroRows.map((h, i) => {
        const label = (
          h.distance_name ??
          h.distance ??
          `D${i + 1}`
        ).toUpperCase()

        return {
          id: h.hero_id,
          brandId: BRAND_ID,        // ← add this
          eventId: EVENT_ID,        // ← add this
          distanceId: h.distance_id, // ← add this
          label,
          color: DISTANCE_COLORS[i % DISTANCE_COLORS.length],
          initial: label.charAt(0),
          distance: h.distance ?? '—',
          elevation: h.elevation ?? '—',
          date: formatRaceDate(h.race_date),
          time: h.race_time ?? '—',
          waves: `Start ${h.race_waves ?? 1} wave${(h.race_waves ?? 1) > 1 ? 's' : ''
            }`,
          image:
            imgUrl(h.race_photo) ??
            imgUrl(h.bg_img) ??
            '',
          badgeImg: imgUrl(h.badge_img),
        }
      })
      : []

  // Default distance for Info section
  const defaultDistanceId =
    heroRows.length > 0 ? heroRows[0].distance_id : undefined

  // ───────────────────────────────────────────────────────────────
  // Info Builder
  // ───────────────────────────────────────────────────────────────
  const infoRow = await prisma.infoBuilder.findFirst({
    where: {
      event_id: EVENT_ID,
      distance_id: defaultDistanceId ?? undefined,
    },
    orderBy: {
      info_id: 'asc',
    },
  })

  const info = infoRow
    ? {
      tagline: infoRow.tagline ?? 'The Territory',
      title: infoRow.title ?? '',
      altitude: infoRow.altitude ?? '',
      alt_label: infoRow.alt_label ?? 'ALTITUDE',
      description: infoRow.description ?? '',
      cta_text: infoRow.cta_text ?? 'Explore The Territory',
      cta_link: infoRow.cta_link ?? '#',
      faq_text: infoRow.faq_text ?? 'FAQs',
      faq_link: infoRow.faq_link ?? '#',
      image_path: imgUrl(infoRow.image_path ?? infoRow.bg_img),
    }
    : null

  // ───────────────────────────────────────────────────────────────
  // Render
  // ───────────────────────────────────────────────────────────────
  return (
    <div>
      <NavbarSectionEvent
        tabs={tabs}
        brand_logo={menu.brand_logo}
        lang="en"
      />
       
       <SideDock />
      <HeroSectionEvent
        menu={menu}
        hero={hero}
      />

   

      {distances.length > 0 && (
        <DistanceSlider distances={distances} />
      )}

      {info && (
        <InfoSectionEvent info={info} />
      )}
      <Social
  social={{
    tagline: "Volg ons",
    title: "#WANTTOSKI",
    description: "Vind ons op Instagram, TikTok of zelfs Facebook: we delen een stukje van ons dagelijks leven met je!",
    facebook_url: "...",
    instagram_url: "...",
    youtube_url: "...",
    tiktok_url: "...",
  }}
  images={[
    { image_path: "/uploads/social1.jpg" },
    { image_path: "/uploads/social2.jpg" },
    { image_path: "/uploads/social3.jpg" },
    { image_path: "/uploads/social4.jpg" },
  ]}

  
/>
<FaqEventSection brandId={BRAND_ID} eventId={EVENT_ID} locale="en" />
    </div>
  )
}