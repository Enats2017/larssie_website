import { prisma } from '@/lib/prisma'
import SideDock from '@/components/SideDock'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import TerritorySection from '@/components/TerritorySection'
import InfoSection from '@/components/InfoSection'
import GearUpSection from '@/components/GearUpSection'
import AidStations from '@/components/AidStation'
import TimelineSection from '@/components/TimelineSection'
import Footer from '@/components/Footer'
import BrandsList from '@/components/BrandsList'




export default async function Page() {
  const [brands] = await Promise.all([
    prisma.brand.findMany({ orderBy: { sort_order: 'asc' } }),
  ])

  const menu = await prisma.menu.findFirst({
    orderBy: { menu_id: 'desc' },
    include: {
      tabs: {
        orderBy: { id: 'asc' },
        include: {
          fields: {
            orderBy: { sort_order: 'asc' },
          },
        },
      },
    },
    where: {
      tabs: {
        some: {
          fields: {
            some: {},
          },
        },
      },
    },
  })

  if (!menu) return <div>No menu found</div>

  const hero = await prisma.heroBuilder.findFirst({
    where: {
      brand_id: 2,
      event_id: 71,
      distance_id: 49,
    },
    orderBy: { hero_id: 'desc' },
  })

  if (!hero) return <div>No hero found</div>

  if (!hero) return <div>No hero found</div>
  const course = await prisma.courseBuilder.findFirst({
    where: {
      event_id: 71,
      distance_id: '49',
    },
  })

const courseLinkCards = course
  ? await prisma.courseLinkCards.findMany({
      where: { course_id: course.course_id },
      orderBy: { sort_order: 'asc' },
    })
  : []
  return (
    <div>
      <SideDock />
      <Navbar tabs={menu.tabs} brand_logo={menu.brand_logo} />
      <HeroSection menu={menu} hero={hero} />
      <TerritorySection />
      <InfoSection brands={brands} />
      <GearUpSection />
      <AidStations />
      <TimelineSection course={course} linkCards={courseLinkCards} />
      <Footer />
      <main >
        <div className="hidden md:block">
          {/* <BrandsList brands={brands} /> */}
        </div>
      </main>
    </div>
  )
}



