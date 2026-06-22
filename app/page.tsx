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

interface PageProps {
  searchParams: {
    brand_id?: string
    event_id?: string
    distance_id?: string
    lang?: string
  }
}

export default async function Page({ searchParams }: PageProps) {
  const brandId = Number(searchParams.brand_id || 2)
  const eventId = Number(searchParams.event_id || 71)
  const distanceId = Number(searchParams.distance_id || 49)
  const lang = searchParams.lang || 'en'

  console.log({
    brandId,
    eventId,
    distanceId,
    lang,
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

  const tabIds = menu.tabs.map(t => t.id)

const allFields = await prisma.menuField.findMany({
  where: {
    menu_id: menu.menu_id,
    tab_id: { in: tabIds },
    nav_type: menu.tabs[0]?.nav_type ?? 'event',  // all tabs share same nav_type
  },
  orderBy: [{ column: 'asc' }, { sort_order: 'asc' }],
})

// Group fields by tab_id and attach to tabs
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

  return (
    <div>
      <SideDock />
      <Navbar tabs={tabs} brand_logo={menu.brand_logo ?? hero.brand_logo_img} lang={lang} />
      <HeroSection
        menu={menu}
        hero={hero}
      />

      <TerritorySection />
      <InfoSection brands={brands} />
      <GearUpSection />
      <AidStations />

      <TimelineSection />
      <CourseDetailsSection />

      <Footer />
    </div>
  )
}
